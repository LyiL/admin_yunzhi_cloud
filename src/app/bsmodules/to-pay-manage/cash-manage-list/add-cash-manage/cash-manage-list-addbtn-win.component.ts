import {Component, Input, OnInit} from '@angular/core';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';

import {CashManageListAddbtnWinModel} from "../../../../common/model/to-papy-manage/cash-manage-list-addbtn-win.model";
import {SearchWindowConfig} from "@delon/abc";
import {CashManageListService} from "../../../../common/services/request/to-pay-manage/cash-manage-list.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {CommonService} from "../../../../common/services/request/common.service";

/**
 * 新增资金池
 */
@Component({
    selector:'cash-manage-list-addbtn-win',
    templateUrl:'./cash-manage-list-addbtn-win.component.html',
    providers:[CashManageListService]
})
export class CashManageListAddbtnWinComponent implements OnInit{

    public cashAddformGroup: FormGroup; //表单名
    public model: CashManageListAddbtnWinModel = new CashManageListAddbtnWinModel(); //实例form
    public cashPoolTypes:Array<any> = []; //资金池类型定义
    public _poolNo:string; // 列表页传入资金池编号
    public _accountName:string; // 列表页传入资金池账户名称
    // public  disebled:boolean=false; //是否允许编辑

    public isLoading:boolean = false;  //按钮载入状态样式


    // 获取列表页传入资金池编号
    set poolNo(value: any) {
        this._poolNo = value;
    }
    // 获取列表页传入资金池账户名称
    set accountName(value: any) {
        this._accountName = value;
    }

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg:NzMessageService,
        public cashManageListService:CashManageListService,
        public _modal: NzModalSubject,
    ){
    }

    ngOnInit(){
        /**
         * 资金池基本数据获取
         */
        if(this._poolNo&&this._accountName){
            this.cashManageListService.loadCashPoolInfo({poolNo:this._poolNo})
                .subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.model= res[CommonEnum.SERVER_DATA_KEY];
                        this.model.advanceProcsFee *= 100;
                        // this.disebled=true;

                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
        }

        this.cashAddformGroup = this.fb.group({
            accountName:[this.model.accountName, [Validators.required]],
            bankNo:[this.model.bankNo, [Validators.required]],
            bankName:[this.model.bankName],
            singleProcsFee:[this.model.singleProcsFee, [Validators.required,this.numberValidator]],
            advanceProcsFee:[this.model.advanceProcsFee, [Validators.required,this.numberValidator]],
            poolType:[this.model.poolType, [Validators.required]],
            apiCode:[this.model.apiCode, [Validators.required]],
        });

       this.cashPoolTypes = this.helper.getDictByKey('CASH_POOL_TYPE');  //资金池类型数据
    }

    /**
     * 受理机构配置
     */
    public mechanismCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('cashManage.listPage.search.bankNoTitle'),
        // url:CashManageListService.QUERY_BANKORG_URL,
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('cashManage.listPage.search.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('cashManage.listPage.search.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('cashManage.listPage.search.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('cashManage.listPage.search.name'),
            index:'name'
        }]
    }

    /**
     * check
     * @param value
     */
    onSelect(value){
        this.model.bankName=value.name;
    }


    /**
     * 提交
     * @private
     */
    _submitForm(){

        /**
         *  新增loadAdd
         *  编辑 loadEdit
         */
        this.isLoading=true;
        let _obs = this._poolNo ? this.cashManageListService.loadEdit(this.model):this.cashManageListService.loadAdd(this.model);
        // this.cashManageListService.loadAdd(this.model).subscribe(res=>{
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
        return this.cashAddformGroup.controls[name];
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

