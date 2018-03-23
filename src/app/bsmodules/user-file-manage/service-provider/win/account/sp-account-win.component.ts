import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../../common/services/helper.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {NzMessageService, NzModalSubject, ObjectExtend} from 'ng-zorro-antd';
import {CommonService} from "../../../../../common/services/request/common.service";
import {SearchWindowConfig} from "@delon/abc";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {SpAccountModel} from "app/common/model/user-file-manage/service-provide/sp-account.model";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";

/**
 * 服务商新增/编辑账户信息弹窗
 */
@Component({
    selector:'sp-account-win',
    templateUrl:'./sp-account-win.component.html',
    providers:[ServiceProviderService]
})
export class SpAccountWinComponent implements OnInit, AfterContentChecked{

    public model: SpAccountModel = new SpAccountModel();
    public SpAccountWinFormGroup: FormGroup;

    public payTypes:Array<string>= []; // 支付类型配置
    public accountTypes: Array<any> = []; // 账户类型
    public cardType: Array<any> = []; // 行内帐户

    public acntId: any; // 账户信息ID 编辑时必填
    public orgId: any;
    public step: any; // 新增页必传
    public tableData: any; // 表单数据
    public tmpTransIdArr = [];//接收支付类型的临时数组
    // public tableId:any;
    isLoadingOne = false;

    /**
     * 开户支行控件配置
     */
    public subBankCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('SP.detailPage.detail.accountWin.title'),
        url:CommonService.BANKLINKNO_INFO_URL,
        params:{chanType: 0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'linkNo',
            label:this.i18n.fanyi('SP.detailPage.detail.accountWin.subbanrchCode')
        },{
            field:'subBankName',
            label:this.i18n.fanyi('SP.detailPage.detail.accountWin.subbranchName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('SP.detailPage.detail.accountWin.subbanrchCode'),
            index:'linkNo'
        },{
            title:this.i18n.fanyi('SP.detailPage.detail.accountWin.subbranchName'),
            index:'subBankName'
        }]
    };

    constructor(
        protected fb: FormBuilder,
        public helper: HelperService,
        public message: NzMessageService,
        public msg: NzMessageService,
        public i18n:I18NService,
        public objExtend:ObjectExtend,
        public modal: NzModalSubject,
        public spService: ServiceProviderService,
        public subject: NzModalSubject,
        public changeDetectorRef: ChangeDetectorRef
    ) {
        this.accountTypes = this.helper.getDictByKey('ACCOUNT_TYPE');
        this.cardType = this.helper.getDictByKey('ACCOUNT_CARD_TYPE');
        this.payTypes = this.helper.getDictByKey('BANK_ACT_TRADE_TYPE');//支付类型
        this.payTypes.forEach((item)=>{
            item['label'] = item['name'];//label赋值
            item['value'] = item['id'];//value赋值
        });
    }

    ngOnInit() {
        this.SpAccountWinFormGroup = this.fb.group({
            name: [this.model.name, [Validators.required]],                     // 开户名称
            type: [this.model.type, [Validators.required]],                     // 账户类型
            bankCardno: [this.model.bankCardno, [Validators.required,this.numberValidator]],         // 银行账号
            bankName: [this.model.bankName, [Validators.required]],             // 开户行
            subbranchName: [this.model.subbranchName, [Validators.required]],   // 开户支行
            subbanrchCode: [this.model.subbanrchCode, [Validators.required,this.numberValidator]],   // 联行号
            transId: [this.model.transId, [Validators.required]],               // 支付类型
            cardType: [this.model.cardType, [Validators.required]]              // 行内账户
        });

        this.model.orgId = this.orgId;

        /**
         * 新增下一步页面中判断是新增还是编辑进来
         */
        if(this.model['table_id']){//编辑
            // this.tableId = this.model['table_id'];
            let _str = this.model['transId'],
                _arr = _str.split(',');
            if(_arr){
                this.tmpTransIdArr = _arr;
            }
        }

        /**
         * 详情页面中编辑功能获取单条账户信息
         */
        if(!this.step && this.acntId) {
            this.spService.loadAccount({ acntId: this.acntId})
                .subscribe( res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                        this.model.acntId = this.acntId;

                        //支付类型
                        let _str = res[CommonEnum.SERVER_DATA_KEY]['transId'],
                            _arr = _str.split(',');
                        if(_arr){
                            this.tmpTransIdArr = _arr;
                        }
                    }
                })
        }
    }

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * 开户支行选择事件
     * @param value
     */
    subSelect(value: any) {
        this.model.subbanrchCode = value.linkNo; // 获取联行号
        this.model.subbranchName = value.subBankName; // 获取联行号
    }

    /**
     * 表单提交
     * @returns {boolean}
     */
    onSubmit() {
        // 新增下一步中对比条件是this.model['table_id']，详情中是this.model['acntId']
        let condition = (this.step && this.step == 'accountStep') ? 'table_id': 'acntId';
        let hasDataSourceInTransId = this.tableData.find((item)=>{
            let _tmpTransId = this.objExtend.isArray(item['transId']) ? item['transId'].join(',') : item['transId'];
            let flag = false;
            if((this.model[condition] != item[condition])){
                this.tmpTransIdArr.forEach((_rowTransId)=>{
                    if(!this.objExtend.isEmpty(_rowTransId) && _tmpTransId.indexOf(_rowTransId) != -1){
                        flag = true;
                    }
                });
            }
            return flag;
        });
        if(hasDataSourceInTransId){
            this.message.warning(this.i18n.fanyi('Agency.addPage.tips.AccPayTypeTip'));
            return false;
        }

        // 当账户类型为企业时（type == '1'）,开户支行和联行号为必填项
        if(this.model.type == '1'){
            if(this.helper.isEmpty(this.model.subbranchName) || this.helper.isEmpty(this.model.subbanrchCode)){
                this.message.warning(this.i18n.fanyi('Agency.addPage.tips.AccCardNoTip'));
                return false;
            }
        }

        if(this.step){
            // 新增下一步中打开弹框
            this.onSaveTmpAccountInfo();
        }else{
            // 详情中打开弹框
            this.onSaveAccountInfo();
        }

    }

    /**
     * 保存临时账户信息
     */
    public onSaveTmpAccountInfo(){
        this.isLoadingOne = true;
        this.model['transId'] = this.tmpTransIdArr.join(','); // 支付类型
        if (this.SpAccountWinFormGroup.valid) {
            this.isLoadingOne = false;
            this.subject.next(this.model);
            this.subject.destroy();
        }
    }

    /**
     * 保存单条账户信息给后台
     */
    public onSaveAccountInfo() {
        this.isLoadingOne = true;
        let _value = this.model;
        _value['transId'] = this.tmpTransIdArr.join(',');//支付类型
        if (this.SpAccountWinFormGroup.valid) {
            this.spService.addAccount([_value]).subscribe(res => {
                this.isLoadingOne = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.subject.destroy('onOk'); //传'onOk'为了做刷新
                } else {
                    this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.SpAccountWinFormGroup.controls[name];
    }

    /**
     * 根据某个条件判断某个参数是否为必填项
     * @param name
     * @returns {boolean}
     */
    public onChangeControl(name) {
        let _control = this.getFormControl(name);
        let subNameControl = this.SpAccountWinFormGroup.controls['subbranchName'];
        let subCodeControl = this.SpAccountWinFormGroup.controls['subbanrchCode'];
        if (_control && _control.value == 1 && (!subCodeControl.value || !subNameControl.value)) {
            subNameControl.setValidators([Validators.required]);
            subNameControl.updateValueAndValidity();
            subCodeControl.setValidators([Validators.required]);
            subCodeControl.updateValueAndValidity();
            return true;
        }
        subNameControl.clearValidators();
        subNameControl.updateValueAndValidity();
        subCodeControl.clearValidators();
        subCodeControl.updateValueAndValidity();
        return false;
    }

    /**
     * 定义数字的校验器
     */
    public numberValidator(control: FormControl): any{
        if(control.value){
            var req = /^[0-9]*$/;//整数
            // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            // this.log.debug("数字校验结果是：" + valid);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }
}
