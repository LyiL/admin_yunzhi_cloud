import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {ChannelDayListComponent} from "./channelday-list/channelday-list.component";
import {BusinessDayListComponent} from "./business-day-list/business-day-list.component";
import {batchSettleListComponent} from "./batch-settle-list/batch-settle-list.component";
import {settlePayWinComponent} from "./channelday-list/settlepay.win.component";
import {BusinessDayListSettlebtnWinComponent} from "./business-day-list/business.day.list.settlebtn.win.component";
import {SETTLE_MANAGE_ROUTES} from "./settlement-manage.routing";
import {RouterModule} from "@angular/router";

@NgModule({
    imports:[
        SharedModule,
        RouterModule.forChild(SETTLE_MANAGE_ROUTES)
    ],
    declarations:[
        BusinessDayListComponent,
        ChannelDayListComponent,
        batchSettleListComponent,
        settlePayWinComponent,
        BusinessDayListSettlebtnWinComponent
    ],
    entryComponents:[
        settlePayWinComponent,
        BusinessDayListSettlebtnWinComponent
    ]
})
/**
 * 清分结算管理模块
 */
export class SettlementManageModule{

}
