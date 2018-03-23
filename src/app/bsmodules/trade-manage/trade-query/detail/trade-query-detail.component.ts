import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {HelperService} from '../../../../common/services/helper.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {TradeQueryService} from '../../../../common/services/request/trade-manage/trade-query.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {MenuService} from '@delon/theme';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {ReuseTabService} from '@delon/abc';

/**
 * 交易查询详情页
 */
@Component({
    selector:'tq-detail',
    templateUrl:'./trade-query-detail.component.html',
    providers:[TradeQueryService]
})
export class TradeQueryDetailComponent implements OnInit, OnDestroy{
    public tqInfoData = {}; // 订单详情参数

    /**
     * 基础信息配置
     */
    public tqDetailFields:Array<any> = [
        {
            // 订单号
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.orderNo"),
            field:'orderNo'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.outTradeNo"),
            field:'outTradeNo'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.transactionId"),
            field:'transactionId'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.appid"),
            field:'appid'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.subAppid"),
            field:'subAppid'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.merchantNo"),
            field:'merchantNo'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.merchantName"),
            field:'merchantName'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.bankNo"),
            field:'bankNo'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.chanNo"),
            field:'chanNo'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.chanName"),
            field:'chanName'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.groupno"),
            field:'groupno'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.deparno"),
            field:'deparno'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.openid"),
            field:'openid'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.subOpenid"),
            field:'subOpenid'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.transType"),
            field:'transType'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.signType"),
            field:'signType'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.reqtype"),
            field:'reqtype',
            type:'dict',
            transKey:'ACTV_STATUS'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.tradeState"),
            field:'tradeState',
            type:'dict',
            transKey:'TRADE_STATUS'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.notifyState"),
            field:'notifyState',
            type:'dict',
            transKey:'ORDER_NOTIFY_STATE'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.notifyTime"),
            field:'notifyTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.notifyUrl"),
            field:'notifyUrl'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.messageCharset"),
            field:'messageCharset'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.tradeMoney"),
            field:'tradeMoney',
            type:'currency'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.refundMoney"),
            field:'refundMoney',
            type:'currency'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.totalFee"),
            field:'totalFee',
            type:'currency'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.currency"),
            field:'currency',
            type:'dict',
            transKey:'FEETYPE'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.cashCurrency"),
            field:'cashCurrency',
            type:'dict',
            transKey:'FEETYPE'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.cashFee"),
            field:'cashFee',
            type:'currency'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.termtype"),
            field:'termtype'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.termno"),
            field:'termno'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.operno"),
            field:'operno'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.shopno"),
            field:'shopno'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.addTime"),
            field:'addTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.tradeTime"),
            field:'tradeTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.body"),
            field:'body'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.bankType"),
            field:'bankType'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.bankTypeNo"),
            field:'bankTypeNo'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.attach"),
            field:'attach'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.deviceInfo"),
            field:'deviceInfo'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.isSubscribe"),
            field:'isSubscribe'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.subIsSubscribe"),
            field:'subIsSubscribe'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.couponFee"),
            field:'couponFee',
            type:'currency'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.mchCreateIp"),
            field:'mchCreateIp'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.payCreateIp"),
            field:'payCreateIp'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.return_url"),
            field:'return_url'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.companion"),
            field:'companion'
        },
        {
            title:this.i18n.fanyi("TradeQuery.detailPage.detail.subCompanion"),
            field:'subCompanion'
        }
    ];

    constructor(
        public tqService:TradeQueryService,
        public helper:HelperService,
        public i18n:I18NService,
        public menuService:MenuService,
        public router:Router,
        public _msg: NzMessageService,
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
        this.tqService.getTQ(data).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tqInfoData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 返回列表页
     */
    public _onBack(){
        this.helper.navigate('/admin/trades/tradequery',this.i18n.fanyi('TradeQuery.listPage.title'),{});
    }
}
