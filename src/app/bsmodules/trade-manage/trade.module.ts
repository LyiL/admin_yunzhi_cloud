import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {TradeQueryListComponent} from './trade-query/trade-query-list.component';
import {TradeRankListComponent} from './trade-rank/trade-rank-list.component';
import {TradeRefundListComponent} from './trade-refund/trade-refund-list.component';
import {TradeRefundWinComponent} from './trade-refund/win/trade-refund-win.component';
import {OrderNoQueryComponent} from "./trade-query/order-no-query.component";
import {BatchQueryComponent} from "./trade-query/batch-query.component";
import {TradeQueryDetailComponent} from './trade-query/detail/trade-query-detail.component';
import {TradeRefundDetailComponent} from './trade-refund/detail/trade-refund-detail.component';
import {RouterModule} from "@angular/router";
import {TRADE_MANAGE_ROUTES} from "./trade.routes";
import {TradeRatioListComponent} from './trade-ratio/trade-ratio-list.component';
import {TradeNoticeListComponent} from './trade-notice/trade-notice-list.component';
import {TradeSucRatioComponent} from "./trade-ratio/suc-ratio/trade-suc-ratio.component";
import {TradeSucRatioDayComponent} from "./trade-ratio/suc-ratio/suc-ratio-day/trade-suc-ratio-day.component";
import {TradeSucRatioHourComponent} from "./trade-ratio/suc-ratio/suc-ratio-hour/trade-suc-ratio-hour.component";
import {TradeBatchSyncWinComponent} from './trade-notice/batch-sync/batch-sync-win.component';
import {TradeBatchNoticeWinComponent} from './trade-notice/batch-notice/batch-notice-win.component';
import {TradeNoticeDetailComponent} from './trade-notice/detail/trade-notice-detail.component';

/**
 * 交易管理模块
 */
@NgModule({
    imports:[
        SharedModule,
        RouterModule.forChild(TRADE_MANAGE_ROUTES)
    ],
    declarations:[
        TradeQueryListComponent,
        TradeQueryDetailComponent,
        TradeRankListComponent,
        TradeRefundListComponent,
        TradeRefundWinComponent,
        TradeRefundDetailComponent,
        BatchQueryComponent,
        OrderNoQueryComponent,
        TradeRatioListComponent,
        TradeNoticeListComponent,
        TradeNoticeDetailComponent,
        TradeSucRatioComponent,
        TradeSucRatioDayComponent,
        TradeSucRatioHourComponent,
		TradeBatchSyncWinComponent,
        TradeBatchNoticeWinComponent
    ],
    entryComponents:[
        TradeRefundWinComponent,
        TradeSucRatioDayComponent,
        TradeSucRatioHourComponent,
		TradeBatchSyncWinComponent,
        TradeBatchNoticeWinComponent
    ]
})
export class TradeManageModule{

}
