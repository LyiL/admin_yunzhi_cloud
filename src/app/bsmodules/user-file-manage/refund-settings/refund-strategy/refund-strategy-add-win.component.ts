import { Component, Input, OnInit } from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../common/services/request/common.service";
import {HelperService} from "../../../../common/services/helper.service";
import {RefundStrategyModel} from "../../../../common/model/user-file-manage/refund-settings/refund-strategy.model";
import {RefundSetsService} from "../../../../common/services/request/user-file-manage/refund-setting.service";
import {Observable} from "rxjs/Observable";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {I18NService} from "../../../../common/i18n/i18n.service";

@Component({
    selector: 'refund-strategy-add-win',
    templateUrl: './refund-strategy-add-win.component.html',
    providers:[RefundSetsService]
})
export class RefundStrategyAddWinComponent implements OnInit {
    _paramsInfo:any;
    @Input()
    set paramsInfo(value: string) {
        this._paramsInfo = value;
    }

    public isLoading:boolean = false;//按钮加载效果
    public payTypes:Observable<any>;//支付类型
    public useStates:Array<any> = [];//启用状态

    public refundStrategyForm: FormGroup;
    public model: RefundStrategyModel = new RefundStrategyModel();
    constructor(private subject: NzModalSubject,
                protected fb: FormBuilder,
                public commonDB:CommonService,
                public helper:HelperService,
                public message: NzMessageService,
                protected refundDBService: RefundSetsService,
                protected i18n:I18NService,
    ) {}

    ngOnInit() {
        this.refundStrategyForm = this.fb.group({
            name:[this.model.name, [Validators.required]],
            transId:[this.model.transId, [Validators.required]],
            transType:[this.model.transType],
            useState:[this.model.useState, [Validators.required]],
            refundDayRange:[this.model.refundDayRange, [Validators.required, this.numberValidator]],
            dayRefundCount:[this.model.dayRefundCount, [Validators.required, this.numberValidator, Validators.maxLength(5)]],
            singleRefundFee:[this.model.singleRefundFee, [Validators.required, this.numberValidator]],
            dayRefundFee:[this.model.dayRefundFee, [Validators.required, this.numberValidator]],
        });
        this.model.name = this._paramsInfo['name'];
        this.model.merchantNo = this._paramsInfo['merchantNo'];
        /**
         * 根据id判断是进入新增还是编辑模式
         */
        if(this._paramsInfo && this._paramsInfo['id']) {
            this.refundDBService.loadStrategyInfo({ id: this._paramsInfo['id']})
                .subscribe( res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                        this.model.name = this._paramsInfo['name'];
                        this.model.id = this._paramsInfo['id'];
                        this.model.singleRefundFee = this.model.singleRefundFee / 100;
                        this.model.dayRefundFee = this.model.dayRefundFee / 100;
                    }
                })
        }

        this.payTypes = this.commonDB.loadTransApi({transId:""});//支付类型
        this.useStates = this.helper.getDictByKey('ENABLE_STATUS');//启用状态
    }

    getTransType(value){
        this.model.transType = value.nzLabel;
    }

    /**
     *保存
     */
    onSave() {
        if(Number(this.model.refundDayRange) > 90){
            this.message.warning(this.i18n.fanyi('RefundSets.refStrategyPage.message.refundDayRangeMsg'));
            return;
        }
        //当日退款笔数不做90笔的限制提示，改为最大不能超过五位数字
        // if(Number(this.model.dayRefundCount) > 90){
        //     this.message.warning(this.i18n.fanyi('RefundSets.refStrategyPage.message.dayRefundCountMsg'));
        //     return;
        // }
        if(Number(this.model.singleRefundFee) > Number(this.model.dayRefundFee)){
            this.message.warning(this.i18n.fanyi('RefundSets.refStrategyPage.message.singleRefundFeeMsg'));
            return;
        }
        this.onUpdateStrategyInfo();
    }

    onUpdateStrategyInfo() {
        this.isLoading = true;
        if (this.refundStrategyForm.valid) {
            this.refundDBService.changeStrategyInfo(this.model).subscribe(res => {
                this.isLoading = false;
                if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.message.success(this.i18n.fanyi('RefundSets.refStrategyPage.message.saveOkMsg'));
                    this.subject.destroy('onOk');
                } else {
                    this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            var req = /^[0-9]*$/;//整数
            // var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.refundStrategyForm.controls[ name ];
    }
}
