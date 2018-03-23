import {ChannelDayListComponent} from "./channelday-list/channelday-list.component";
import {batchSettleListComponent} from "./batch-settle-list/batch-settle-list.component";
import {BusinessDayListComponent} from "./business-day-list/business-day-list.component";


/**
 * 清分结算管理路由
 * @type {Array}
 */
export const SETTLE_MANAGE_ROUTES = [
    {path:'businessday',component:BusinessDayListComponent},
    {path:'channelday', component:ChannelDayListComponent},
    {path:'hitmoney', component:batchSettleListComponent}
];
