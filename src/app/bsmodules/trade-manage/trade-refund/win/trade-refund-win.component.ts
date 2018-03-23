import {Component, OnInit} from '@angular/core';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {SearchWindowConfig} from '@delon/abc';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzLocaleService, NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {CommonService} from '../../../../common/services/request/common.service';
import {TradeRefundApplyModel} from '../../../../common/model/trade-manage/trade-refund.model';
import {TradeRefundService} from '../../../../common/services/request/trade-manage/trade-refund.service';
import {CommonEnum} from '../../../../common/enum/common.enum';

/**
 * 退款审核申请弹窗
 */
@Component({
    selector:'trade-refund-win',
    templateUrl:'./trade-refund-win.component.html',
    providers:[TradeRefundService]
})
export class TradeRefundWinComponent implements OnInit{
    public treApplyForm:FormGroup;
    public tradeRefundApplyModel:TradeRefundApplyModel = new TradeRefundApplyModel(); // 退款申请信息
    public availableFee:number; // 可退金额
    public tmpRefundFee:number; // 退款金额
    isLoadingOne = false;

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _modal:NzModalSubject,
        public treService:TradeRefundService,
        public _msg: NzMessageService,
        public _localeLog: NzLocaleService
    ){}

    ngOnInit(){
        this.treApplyForm = this.fb.group({
            orderNo: [this.tradeRefundApplyModel.orderNo,Validators.required],
            availableFee: [this.availableFee],
            merchantNo: [this.tradeRefundApplyModel.merchantNo,Validators.required],
            refundFee:[this.tmpRefundFee,[this.refundFeeValidator]],
            mchRefuseReason:[this.tradeRefundApplyModel.mchRefuseReason,Validators.required]
        })
    }

    /**
     * 商户控件配置
     */
    public merchantNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.title'),
        url:CommonService.MCH_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantName'),
            index:'name'
        }]
    };

    /**
     * 平台单号失焦事件
     */
    public orderNoBlur(){
        if(this.tradeRefundApplyModel.orderNo){
            this.treService.changeNo({orderNo:this.tradeRefundApplyModel.orderNo}).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    let _data = res[CommonEnum.SERVER_DATA_KEY],
                        _availableFee = _data['availableFee'];
                    this._localeLog.debug('see availableFeeData:::', _data);
                    this.tmpRefundFee = this.availableFee = this.helper.numberTrans(_availableFee,'division',100);
                    let _redundFee = this.treApplyForm.controls['refundFee'];
                    _redundFee.markAsDirty();
                    _redundFee.updateValueAndValidity();
                }else{
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    /**
     * 提交表单
     */
    public _submitForm(){
        this.isLoadingOne = true;
        // 退款金额元转分
        let refundFeeYuanVal = this.treApplyForm.get('refundFee').value; // 退款金额（元）
        if(refundFeeYuanVal){
            let refundFeeFenVal = this.helper.numberTrans(refundFeeYuanVal,'multiplication',100); // 退款金额（分）
            this.tradeRefundApplyModel['refundFee'] = refundFeeFenVal;
            // 提交数据
            this.treService.submit(this.tradeRefundApplyModel).subscribe(res => {
                this.isLoadingOne = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this._modal.destroy('onOk');
                }else{
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        };
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.treApplyForm.controls[ name ];
    }

    /**
     * 退款金额验证
     */
    public refundFeeValidator= (control: FormControl): { [s: string]: boolean } =>{
        let _val = control.value;
        let _refundNum = _val * 1;
        let _availableNum = this.availableFee && this.availableFee * 1;
        if(this.helper.isEmpty(_val)){
            return { required: true };
        }else if(_refundNum <= 0){
            return { minError: true, error: true } // 退款金额必须大于0
        }else if(_availableNum > -1 && _refundNum > _availableNum){
            return { maxError: true, error: true } // 退款金额不能大于可退金额
        }
    };
}

