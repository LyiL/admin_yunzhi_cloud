import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MchAccountModel} from "../../../../common/model/user-file-manage/merchant/mch.account.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {mchService} from "../../../../common/services/request/user-file-manage/mch.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {NzMessageService, NzModalSubject, ObjectExtend} from 'ng-zorro-antd';
import {CommonService} from "../../../../common/services/request/common.service";
import {SearchWindowConfig} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
/**
 * 新增或编辑商户帐户信息弹出框
 */
@Component({
    selector:'mch-account-info-win',
    templateUrl:'./mch-account-info-win.html',
    providers:[mchService,CommonService]
})
export class MchAccountInfoWinComponent implements OnInit,AfterContentChecked{
    public modelGroup: FormGroup;
    public model: MchAccountModel = new MchAccountModel();
    public isLoadingOne = false; // loading
    /**
     * 支付类型配置
     */
    public payTypes:Array<string>= [];
    /**
     * 账户类型
     */
    public type: Array<any> = [];
    /**
     * 行内帐户
     */
    public cardType: Array<any> = [];
    public tmpTransIdArr = [];//接收支付类型的临时数组
    public acntId:any;//来源
    public orgId:any;//来源
    public tableData:any;//来源
    public stepAccount:string;//步骤新增带的数据

    /**
     * 开户支行控件配置
     */
    public subBankCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Mch.listPage.subBankCfg.title'),
        url:CommonService.BANKLINKNO_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
    searchFields:[{
            field:'linkNo',
            label:this.i18n.fanyi('Mch.listPage.subBankCfg.linkNo')
        },{
            field:'subBankName',
            label:this.i18n.fanyi('Mch.listPage.subBankCfg.subBankName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Mch.listPage.subBankCfg.linkNo'),
            index:'linkNo'
        },{
            title:this.i18n.fanyi('Mch.listPage.subBankCfg.subBankName'),
            index:'subBankName'
        }]
    };

    constructor(public helper: HelperService, public mchDB: mchService,   public message: NzMessageService,
                public msg: NzMessageService,public i18n:I18NService,public objExtend:ObjectExtend,public changeDetectorRef: ChangeDetectorRef,
                public modal: NzModalSubject) {
    }

    ngOnInit() {
        this.modelGroup = new FormGroup({
            name: new FormControl(this.model.name, [Validators.required]),
            type: new FormControl(this.model.type, [Validators.required]),
            bankCardno: new FormControl(this.model.bankCardno, [Validators.required,this.numberValidator]),
            bankName: new FormControl(this.model.bankName, [Validators.required]),
            subbranchName: new FormControl(this.model.subbranchName),
            subbanrchCode: new FormControl(this.model.subbanrchCode),
            transId: new FormControl(this.model.transId, [Validators.required]),
            cardType: new FormControl(this.model.cardType, [Validators.required]),
        });
        this.model.orgId = this.orgId;
        this.model.stepAccount = this.stepAccount;
        this.type = this.helper.getDictByKey('ACCOUNT_TYPE');//账户类型
        this.cardType = this.helper.getDictByKey('ACCOUNT_CARD_TYPE');//行内帐户
        this.payTypes = this.helper.getDictByKey('BANK_ACT_TRADE_TYPE');//支付类型
        this.payTypes.forEach((item)=>{
            item['label'] = item['name'];//label赋值
            item['value'] = item['id'];//value赋值
        });
        if(this.acntId) {
            this.mchDB.loadAccountDataById({ acntId: this.acntId})
                .subscribe( res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
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

    }
    /**
     *开户支行选中事件
     */
    public onSelect(value){
        this.model.subbanrchCode = value.linkNo;
    }
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }
    onSubmit(){
        //新增下一步中对比条件是this.model['table_id']，详情中是this.model['acntId']
        let condition = (this.stepAccount && this.stepAccount == 'account')?'table_id':'acntId';
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
            this.message.warning(this.i18n.fanyi('Mch.step.accountInfo.tips.transId')); //"支付类型已经存在，请调整！",
            return false;
        }
        if(this.model.type == '1'){
            if(this.objExtend.isEmpty(this.model.subbranchName) || this.objExtend.isEmpty(this.model.subbanrchCode)){
                this.message.warning(this.i18n.fanyi('Mch.step.accountInfo.tips.type'));
                return false;
            }
        }
        if(this.model.stepAccount){//新增下一步中打开弹框
            this.onSaveTmpAccountInfo();
        }else{//详情中打开弹框
            this.onSaveDetail();
        }
    }
  public  onSaveDetail(){//详情中打开弹框
      let _value = this.model;
      _value['transId'] = this.tmpTransIdArr.join(',');//支付类型
      if (this.modelGroup.valid) {
          this.isLoadingOne = true;
          this.mchDB.saveAccountInfos([_value]).subscribe(res => {
              if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                  this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                  this.modal.destroy('onOk');
              } else {
                  this.message.error(res[CommonEnum.SERVER_MES_KEY]);
              }
              this.isLoadingOne = false;
          })
      }

    }
    onSaveTmpAccountInfo(){//新增下一步中打开弹框
        this.model['transId'] = this.tmpTransIdArr.join(',');//支付类型
        if (this.modelGroup.valid) {
            this.modal.next(this.model);
            this.modal.destroy();
        }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.modelGroup.controls[name];
    }

    /**
     * 根据账户类型判断开户支行和联行号信息是否必填
     * 当账户类型为企业时（type == '1'）,开户支行和联行号为必填项
     */
    public onChangeControl(name) {
        let _control = this.getFormControl(name);
        let subNameControl = this.modelGroup.controls['subbranchName'];
        let subCodeControl = this.modelGroup.controls['subbanrchCode'];
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
        var req = /^[0-9]*$/;//整数
        // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
        let valid = req.test(control.value);
        if(!valid){
            return {numberError:true,error:true}
        }
    }
}
