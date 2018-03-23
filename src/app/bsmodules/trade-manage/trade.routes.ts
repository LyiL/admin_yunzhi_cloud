import {TradeQueryListComponent} from './trade-query/trade-query-list.component';
import {TradeRankListComponent} from './trade-rank/trade-rank-list.component';
import {TradeRefundListComponent} from './trade-refund/trade-refund-list.component';
import {TradeQueryDetailComponent} from './trade-query/detail/trade-query-detail.component';
import {TradeRefundDetailComponent} from './trade-refund/detail/trade-refund-detail.component';
import {TradeRatioListComponent} from './trade-ratio/trade-ratio-list.component';
import {TradeNoticeListComponent} from './trade-notice/trade-notice-list.component';
import {TradeSucRatioComponent} from './trade-ratio/suc-ratio/trade-suc-ratio.component';
import {TradeNoticeDetailComponent} from './trade-notice/detail/trade-notice-detail.component';

/**
 * 交易管理路由
 * @type {Array}
 */
export const TRADE_MANAGE_ROUTES = [
    {path:'tradequery',component:TradeQueryListComponent},
    {path:'tradequerydetail',component:TradeQueryDetailComponent},
    {path:'traderanking',component:TradeRankListComponent},
    {path:'traderefund',component:TradeRefundListComponent},
    {path:'traderefunddetail',component:TradeRefundDetailComponent},
    {path:'traderatio',component:TradeRatioListComponent},
    {path:'tradenotice',component:TradeNoticeListComponent},
    {path:'tradenoticedetail',component:TradeNoticeDetailComponent},
    {path:'tradesuccessratiochart', component:TradeSucRatioComponent}
];
