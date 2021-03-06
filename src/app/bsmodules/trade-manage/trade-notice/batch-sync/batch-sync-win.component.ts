import {Component, OnInit} from '@angular/core';
import {TradeNoticeService} from '../../../../common/services/request/trade-manage/trade-notice.service';
import {TradeBatchSyncModel} from '../../../../common/model/trade-manage/trade-batchSync.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../common/services/request/common.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {SearchWindowConfig} from '@delon/abc';
import {HelperService} from '../../../../common/services/helper.service';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {I18NService} from '../../../../common/i18n/i18n.service';

/**
 * 交易通知-批量同步弹窗
 */
@Component({
    selector:'trade-batch-sync-win',
    templateUrl:'./batch-sync-win.component.html',
    providers:[TradeNoticeService]
})
export class TradeBatchSyncWinComponent implements OnInit{

    public model: TradeBatchSyncModel = new TradeBatchSyncModel(); // 表单数据模板
    public tradeBatchSyncForm: FormGroup; // 表单
    isLoadingOne = false;

    public ordStates:Array<string>= []; // 订单状态

    /**
     * 商户控件配置
     */
    public merchantNoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.title'),
        url:CommonService.MCH_INFO_URL,
        params:{
            isStore:0
        },
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantName'),
            index:'name'
        }]
    };

    constructor(
        protected fb: FormBuilder,
        public helper: HelperService,
        public msg: NzMessageService,
        public i18n:I18NService,
        public subject: NzModalSubject,
        public noticeService:TradeNoticeService
    ) {

        this.ordStates = this.helper.getDictByKey('ORDER_NOTIFY_STATUS');
    }

    ngOnInit() {
        /**
         * 响应式表单设置
         * @type {FormGroup}
         */
        this.tradeBatchSyncForm = this.fb.group({
            tradeTimeStart: [this.model.tradeTimeStart, Validators.required], // 开始时间
            tradeTimeEnd:[this.model.tradeTimeEnd,Validators.required], // 结束时间
            mchNo:[this.model.mchNo,Validators.required], // 商户名称
            orderStatus:[this.model.orderStatus,Validators.required] // 商户名称
        });
    }

    /**
     * 表单提交
     * @returns {boolean}
     */
    _submitForm() {
        this.isLoadingOne = true;
        this.noticeService.loadBatchSync(this.model).subscribe( res => {
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('TradeNotice.win.sync.sucTip'));
                this.subject.destroy('onOk');
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.tradeBatchSyncForm.controls[name];
    }

    /**
     * 结束时间控制
     */
    onTradeTimeEndDateDisabled(endValue:any) {
        if (!endValue || !this.model.tradeTimeEnd) {
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.model.tradeTimeStart);
    }
}
