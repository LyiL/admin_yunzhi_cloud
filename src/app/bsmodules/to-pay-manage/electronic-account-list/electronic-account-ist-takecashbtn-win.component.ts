import {Component, OnInit} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {ElectronicAccountIstTakecashbtnWinModel} from "../../../common/model/to-papy-manage/electronic-account-ist-takecashbtn-win.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {CommonEnum} from "../../../common/enum/common.enum";


/**
 * 提现
 */
@Component({
    selector:'electronic-account-ist-takecashbtn-win',
    templateUrl:'./electronic-account-ist-takecashbtn-win.component.html',
    providers:[ElectronicAccountListSevice]
})
export class ElectronicAccountIstTakecashbtnWinComponent implements OnInit{

    public takecasformGroup: FormGroup;  //表单名
    public model: ElectronicAccountIstTakecashbtnWinModel = new ElectronicAccountIstTakecashbtnWinModel();

    public prodTypes:Array<any> = [];  //产品类型
    public bankAccounts:Array<string>= []; //提现账户配置
    public _accountNo:any;             //电子账户ID
    public cashpoolNo:any;             //资金池编号
    public isLoading = false;  //按钮载入状态样式

    // 获取列表页传入电子账户ID
    set accountNo(value: any) {
        this._accountNo = value;
    }


    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg:NzMessageService,
        public electronicAccountListSevice:ElectronicAccountListSevice,
        public _modal: NzModalSubject,
    ){
        this.takecasformGroup = fb.group({
            accountId:[this.model.accountId, [Validators.required]],
            organNo:[this.model.organNo, [Validators.required]],
            organName:[{value: this.model.organName, disabled: true}, [Validators.required]],
            productType:[this.model.productType],
            bankCity:[this.model.bankCity],
            extractPrice:[this.model.extractPrice, [Validators.required, this.numberValidator]],
        });
    }
    ngOnInit(){
        this.prodTypes = this.helper.getDictByKey('CASH_PRODUC_TTYPE');  //产品类型数据
         this.model.accountNo=this._accountNo;

        this.electronicAccountListSevice.loadAccountInfo({accountNo:this._accountNo})
            .subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    // this.model= res[CommonEnum.SERVER_DATA_KEY];

                    // this.model.accountId = res[CommonEnum.SERVER_DATA_KEY].accountId;
                    this.model.organNo = res[CommonEnum.SERVER_DATA_KEY].organNo;
                    this.model.organName = res[CommonEnum.SERVER_DATA_KEY].organName;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             this.model.extractPrice = res[CommonEnum.SERVER_DATA_KEY].extractPrice;
                    this.model.bankCity = res[CommonEnum.SERVER_DATA_KEY].bankCity;
                    this.model.productType = res[CommonEnum.SERVER_DATA_KEY].productType;
                    this.cashpoolNo = res.data.cashpoolNo;


                    //银行账户数据
                    this.electronicAccountListSevice.loadCashPoolBank({mchNo: this.model.organNo}).subscribe(res =>{
                        this.bankAccounts = res[CommonEnum.SERVER_DATA_KEY];

                    });
                }else{
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
    }


    /**
     * 保存
     */
    submitForm(){
        // if(this.helper.isEmpty(this.model.accountId)) {
        //     this._msg.error(this.i18n.fanyi('eleAccount.listPage.alert.takecashnone'));
        //     return
        // }
        this.isLoading = true;
        let cashpoolNo = this.cashpoolNo;
        let condition = this.helper.isEmpty(this.model.productType) || this.helper.isEmpty(this.model.bankCity)
        //判断产品类型和收款银行所在城市是否填写
        if(condition){
            if(this.helper.hasConfigValueMatch('AGENTPAY_JOIN',cashpoolNo)){
                //当资金池编号存在于配置项中，产品类型和收款银行所在城市为必填项
                this._msg.warning(this.i18n.fanyi('eleAccount.listPage.alert.hasnone'));
                this.isLoading=false;
            }else if(!this.helper.hasConfigValueMatch('AGENTPAY_JOIN',cashpoolNo)){
                this.takeCash();
            }
        }else{
            this.takeCash();
        }
    }


    /**
     * 提现方法
     */
    takeCash(){
        this.electronicAccountListSevice.loadTakeCash(this.model)
            .subscribe((res) => {
                this.isLoading=false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this._modal.destroy('onOk');
                }else {
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            });
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.takecasformGroup.controls[name];
    }
    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            // var req = /^[0-9]*$/;//整数
            var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            // this.log.debug("数字校验结果是：" + valid);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }
}
