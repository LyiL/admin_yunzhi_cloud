import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {CashManageListService} from "../../../../common/services/request/to-pay-manage/cash-manage-list.service";
import {AddElectronicAccountListWinModel} from "../../../../common/model/to-papy-manage/add-electronic-account-list-win.model";
import {SearchWindowConfig} from "@delon/abc";
import {ElectronicAccountListSevice} from "../../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {CommonService} from "../../../../common/services/request/common.service";

/**
 * 新增电子账户
 */
@Component({
    selector:'add-electronic-account-win',
    templateUrl:'./add-electronic-account-win.component.html',
    providers:[ElectronicAccountListSevice]
})
export class AddElectronicAccountWinComponent implements OnInit{

    public AddeleformGroup: FormGroup;
    public model: AddElectronicAccountListWinModel = new AddElectronicAccountListWinModel();

    public bankAccounts:Array<string>= [];  //银行账户
    public accountTypes:Array<string>= []; //资金池账户配置
    public _accountNo:any      //电子账户id
    public  disebed:boolean=false //是否编辑
    public isLoading = false;  //按钮载入状态样式

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg:NzMessageService,
        public electronicAccountListSevice:ElectronicAccountListSevice,
        public _modal: NzModalSubject,
    ){
        this.AddeleformGroup = fb.group({
            accountName:[this.model.accountName, [Validators.required]],
            organNo:[this.model.organNo, [Validators.required]],
            organName:[this.model.organName],
            accountId:[this.model.accountId],
            cashpoolNo:[this.model.cashpoolNo, [Validators.required]],
            cashpoolName:[this.model.cashpoolName],
            outMchno:[this.model.outMchno],
            signkey:[this.model.signkey],
            singleProcsFee:[this.model.singleProcsFee, [Validators.required, this.numberValidator]],
            privProcsFee:[this.model.privProcsFee, [Validators.required, this.numberValidator]],
            advanceProcsFee:[this.model.advanceProcsFee, [Validators.required, this.numberValidator]],
        });
    }


    // 获取列表页传入电子账户ID
    set accountNo(value: any) {
        this._accountNo = value;
    }

    ngOnInit(){
         /**
         * 资金池账户数据
          */
        this.electronicAccountListSevice.loadCashPoolAccount({useState:"1"}).subscribe(res =>{
            this.accountTypes = res;
        });


        /**
         * 是否电子账户ID请求数据
         */
        if(this._accountNo){
            this.electronicAccountListSevice.loadAccountInfo({accountNo:this._accountNo})
                .subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model= res[CommonEnum.SERVER_DATA_KEY];
                        this.model.advanceProcsFee *= 100;
                        this.disebed=true;
                        this.isLoading=false;
                        this.electronicAccountListSevice.loadCashPoolBank({mchNo:this.model['organNo']}).subscribe(res =>{
                            this.bankAccounts = res.data;
                        });

                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
        }


    }

    /**
     * 所属商户配置
     * @type {{title: (string | any); url: string; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; searchFields: [{field: string; label: (string | any)} , {field: string; label: (string | any)}]; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string}]}}
     */
    public addeleCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('eleAccount.listPage.search.organNoTitle'),
        // url:ElectronicAccountListSevice.QUERY_DEALERINFO_URL,
        url:CommonService.MCH_INFO_URL,
        params:{isStore:0,examState:1},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('eleAccount.listPage.search.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('eleAccount.listPage.search.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('eleAccount.listPage.search.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('eleAccount.listPage.search.name'),
            index:'name'
        }]
    }



    /**
     * 获取商户名称,银行账户数据
     */
    public onSelect(value: any ){
        this.model.accountId=null;
        this.model.organName = value.name;
        this.electronicAccountListSevice.loadCashPoolBank({mchNo: value.merchantNo}).subscribe(res =>{
            this.bankAccounts = res.data;
        });
    }

    /**
     * cashpoolName值
     * @param value
     */
    public onCashpool(value:any){
        this.model.cashpoolName = value['_label'];
    }


    /**
     * 保存:
     *  新增loadAdd
     *  编辑 loadEdit
     */
    submitForm(){
        this.isLoading=true;
        let _cashpoolNo = this.model.cashpoolNo;
        //判断外部商户号是否填写
        if(this.helper.isEmpty(this.model.outMchno)){
            if(this.helper.hasConfigValueMatch('AGENTPAY_JOIN',_cashpoolNo)){
                //当资金池编号存在于配置项中，外部商户号为必填项
                this._msg.warning(this.i18n.fanyi('eleAccount.listPage.alert.hasoutMchno'));
                this.isLoading=false;
            }else if(!this.helper.hasConfigValueMatch('AGENTPAY_JOIN',_cashpoolNo)){
                this.submitFunc();
            }
        }else{
            this.submitFunc();
        }
    }

    /**
     * 提交保存方法
     */
    submitFunc(){
        let _obs = this._accountNo? this.electronicAccountListSevice.loadEdit(this.model):this.electronicAccountListSevice.loadAdd(this.model);
        _obs.subscribe(res=>{
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
        return this.AddeleformGroup.controls[name];
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
