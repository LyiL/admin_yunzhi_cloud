import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NzLocaleService, NzMessageService, NzModalSubject, ObjectExtend} from 'ng-zorro-antd';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {AgencyService} from "../../../../../common/services/request/user-file-manage/agency.service";
import {HelperService} from "../../../../../common/services/helper.service";
import {CommonService} from "../../../../../common/services/request/common.service";
import {AgencyAccountInfoModel} from "../../../../../common/model/user-file-manage/agency/agency-account.model";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {SearchWindowConfig} from "@delon/abc";
import {newClone} from "@delon/abc/utils/utils";

/**
 * 代理商新增|编辑账户信息弹框
 */
@Component({
    selector: 'agency-account-add-win',
    templateUrl: './agency-account-add-win.component.html',
    providers:[AgencyService]
})
export class AgencyAccountAddWinComponent implements OnInit ,AfterContentChecked{
    public isLoading:boolean = false;//按钮加载效果
    public tmpTransIdArr = [];//接收支付类型的临时数组
    public acntId:any;//来源
    public orgId:any;//来源
    public tableData:any;//来源
    public step:any;//来源

    /**
     * 支付类型配置
     */
    public payTypes:Array<string>= [];
    /**
     * 账户类型
     */
    public accountTypes:Array<any> = [];
    /**
     * 行内账户
     */
    public cardTypes:Array<any> = [];
    public agencyAccountForm: FormGroup;
    public model: AgencyAccountInfoModel = new AgencyAccountInfoModel();
    constructor(public subject: NzModalSubject,
                protected fb: FormBuilder,
                public commonDB:CommonService,
                public helper:HelperService,
                public message: NzMessageService,
                protected agencyDBService: AgencyService,
                public i18n:I18NService,
                public objExtend:ObjectExtend,
                public changeDetectorRef: ChangeDetectorRef,
                public log:NzLocaleService,
    ) {}
    /**
     * 开户支行控件配置
     */
    public subbranchNameTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Agency.detailPage.detail.accountTable.subbranchNameSearch'),
        url:CommonService.BANKLINKNO_INFO_URL,
        params:{chanType: 0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'linkNo',
            label:this.i18n.fanyi('Agency.detailPage.detail.accountTable.subbanrchCode')
        },{
            field:'subBankName',
            label:this.i18n.fanyi('Agency.detailPage.detail.accountTable.subbranchName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Agency.detailPage.detail.accountTable.subbanrchCode'),
            index:'linkNo'
        },{
            title:this.i18n.fanyi('Agency.detailPage.detail.accountTable.subbranchName'),
            index:'subBankName'
        }]
    };

    ngOnInit() {
        // this.log.debug("this.tableData::",this.tableData);
        this.agencyAccountForm = this.fb.group({
            name:[this.model.name, [Validators.required]],
            type:[this.model.type, [Validators.required]],
            bankCardno:[this.model.bankCardno, [Validators.required,this.numberValidator]],
            bankName:[this.model.bankName, [Validators.required]],
            subbranchName:[this.model.subbranchName],
            subbanrchCode:[this.model.subbanrchCode,this.numberValidator],
            transId:[this.model.transId, [Validators.required]],
            cardType:[this.model.cardType, [Validators.required]],
        });
        this.model.orgId = this.orgId;
        /**
         * 详情页面中根据acntId判断是进入新增还是编辑模式
         */
        if(this.acntId) {
            this.agencyDBService.loadAgencyAccount({ acntId: this.acntId})
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

        /**
         * 新增下一步页面中判断是新增还是编辑进来
         */
        if(this.model['table_id']){//编辑
            let _str = this.model['transId'],
                _arr = _str.split(',');
            if(_arr){
                this.tmpTransIdArr = _arr;
            }
        }


        this.accountTypes = this.helper.getDictByKey('ACCOUNT_TYPE');//账户类型
        this.payTypes = this.helper.getDictByKey('BANK_ACT_TRADE_TYPE');//支付类型
        this.payTypes.forEach((item)=>{
            item['label'] = item['name'];//label赋值
            item['value'] = item['id'];//value赋值
        });
        // this.log.debug('支付类型:::',this.payTypes)//支付类型
        this.cardTypes = this.helper.getDictByKey('ACCOUNT_CARD_TYPE');//行内帐户

    }
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }


    /**
     *开户支行选中事件
     */
    public onSelect(value){
        this.model.subbanrchCode = value.linkNo;
    }
    /**
     *保存
     */
    onSave() {
        //新增下一步中对比条件是this.model['table_id']，详情中是this.model['acntId']
        let condition = (this.step && this.step == 'accountStep')?'table_id':'acntId';
        let hasDataSourceInTransId = this.tableData.find((item)=>{
            let _tmpTransId = this.objExtend.isArray(item['transId']) ? item['transId'].join(',') : item['transId'];
            let flag = false;
            if(!(this.model[condition] == item[condition])){
                this.tmpTransIdArr.forEach((_rowTransId)=>{
                    if(!this.objExtend.isEmpty(_rowTransId) && _tmpTransId.includes(_rowTransId)){
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
        //当账户类型为企业时（type == '1'）,开户支行和联行号为必填项
        if(this.model.type == '1'){
            if(this.objExtend.isEmpty(this.model.subbranchName) || this.objExtend.isEmpty(this.model.subbanrchCode)){
                this.message.warning(this.i18n.fanyi('Agency.addPage.tips.AccCardNoTip'));
                return false;
            }
        }
        if(this.step){//新增下一步中打开弹框
            this.onSaveTmpAccountInfo();
        }else{//详情中打开弹框
            this.onSaveAccountInfo();
        }
    }

    onSaveAccountInfo() {//详情中打开弹框
        this.isLoading = true;
        let _value = this.model;
        _value['transId'] = this.tmpTransIdArr.join(',');//支付类型
        if (this.agencyAccountForm.valid) {
            this.isLoading = false;
            this.agencyDBService.saveAccountInfos([_value]).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.subject.destroy('onOk');//传'onOk'为了做刷新
                } else {
                    this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    onSaveTmpAccountInfo(){//新增下一步中打开弹框
        // if(this._paramsInfo && this._paramsInfo['row']){//编辑进来修改的这一条row

        // }else{ //新增进来是对整个tableData追加数据
            this.model['transId'] = this.tmpTransIdArr.join(',');//支付类型
            if (this.agencyAccountForm.valid) {
                this.subject.next(this.model);
                this.subject.destroy();
            }
        // }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.agencyAccountForm.controls[name];
    }

    /**
     * 根据账户类型判断开户支行和联行号信息是否必填
     * 当账户类型为企业时（type == '1'）,开户支行和联行号为必填项
     */
    public onChangeControl(name) {
        let _control = this.getFormControl(name);
        let subNameControl = this.agencyAccountForm.controls['subbranchName'];
        let subCodeControl = this.agencyAccountForm.controls['subbanrchCode'];
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
    numberValidator(control: FormControl): any{
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
