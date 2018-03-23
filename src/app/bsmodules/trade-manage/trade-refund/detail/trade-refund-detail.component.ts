import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {HelperService} from '../../../../common/services/helper.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {MenuService} from '@delon/theme';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {TradeRefundService} from '../../../../common/services/request/trade-manage/trade-refund.service';
import {ReuseTabService} from '@delon/abc';

/**
 * 退款审核详情页
 */
@Component({
    selector:'trade-refund-detail',
    templateUrl:'./trade-refund-detail.component.html',
    providers:[TradeRefundService]
})
export class TradeRefundDetailComponent implements OnInit, OnDestroy{
    public tradeRefundInfoData = {}; // 退款详情参数

    /**
     * 基础信息配置
     */
    public tradeRefundDetailFields:Array<any> = [
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundNo"),
            field:'refundNo'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.outTradeNo"),
            field:'outTradeNo'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.orderNo"),
            field:'orderNo'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundid"),
            field:'refundid'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.transactionId"),
            field:'transactionId'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.outRefundNo"),
            field:'outRefundNo'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundChannel"),
            field:'refundChannel'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.merchantNo"),
            field:'merchantNo'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.merchantName"),
            field:'merchantName'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.transType"),
            field:'transType'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.totalFee"),
            field:'totalFee',
            type:'currency'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundFee"),
            field:'refundFee',
            type:'currency'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.currency"),
            field:'currency',
            type:'dict',
            transKey:'FEETYPE'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.addTime"),
            field:'addTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.merchantExam"),
            field:'merchantExam',
            type:'dict',
            transKey:'REFUND_MCH_AUDIT_STATUS'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.orderState"),
            field:'orderState',
            type:'dict',
            transKey:'TRADE_STATUS'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.merchantExamUser"),
            field:'merchantExamUser'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.mchReviewTime"),
            field:'mchReviewTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.mchRefuseReason"),
            field:'mchRefuseReason'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.daemonAudit"),
            field:'daemonAudit',
            type:'dict',
            transKey:'TRADE_STATUS'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.ptReviewTime"),
            field:'ptReviewTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refuseReason"),
            field:'refuseReason'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundState"),
            field:'refundState',
            type:'dict',
            transKey:'REFUND_STATUS'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundTime"),
            field:'refundTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.riskCtr"),
            field:'riskCtr',
            type:'dict',
            transKey:'RISK_CTR_STATU'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.riskInfo"),
            field:'riskInfo'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundUser"),
            field:'refundUser'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.refundSource"),
            field:'refundSource',
            type:'dict',
            transKey:'REFUND_REFUNDSOURCE'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.bankNo"),
            field:'bankNo'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.groupno"),
            field:'groupno'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.agentno"),
            field:'agentno'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.deparno"),
            field:'deparno'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.termtype"),
            field:'termtype'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.termno"),
            field:'termno'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.operno"),
            field:'operno'
        },
        {
            title:this.i18n.fanyi("TradeRefund.detailPage.detail.storeno"),
            field:'storeno'
        }
    ];

    constructor(
        public tradeRefundService:TradeRefundService,
        public helper:HelperService,
        public i18n:I18NService,
        public menuService:MenuService,
        public router:Router,
        public _msg:NzMessageService,
        private reuseTabService:ReuseTabService
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let _params = menu['params'];
            this.loadDetail(_params);
        }
    }

    ngOnDestroy(){
        this.reuseTabService.refresh();
    }

    /**
     * 加载订单详情
     */
    public loadDetail(data){
        this.tradeRefundService.queryNo(data).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tradeRefundInfoData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 返回列表页
     */
    public _onBack(){
        this.helper.navigate('/admin/trades/traderefund',this.i18n.fanyi('TradeRefund.listPage.title'),{});
    }
}
