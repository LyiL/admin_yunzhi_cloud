/**
 * 代付管理路由配置
 * @type {Array}
 * cashmanagelist：资金池管理
 * cashmanagedetail:资金池管理详情
 * cashmanageaccountdetail：入账明细
 * electronicaccountlist:电子账户，
 * electronicaccountdetail：电子账户详情
 */
import {CashManageListComponent} from "./cash-manage-list/cash.manage.list.component";
import {CashManageDetailComponent} from "./cash-manage-list/cash-manage-detail.component";
import {CashManageAccountdetailComponent} from "./cash-manage-list/cash-manage-accountdetail.component";
import {ElectronicAccountListComponent} from "./electronic-account-list/electronic-account-list.component";
import {ElectronicAccountDetailComponent} from "./electronic-account-list/electronic-account-detail.component";
import {ElectroniCaccountAccountDetailComponent} from "./electronic-account-list/electroni-caccount-account-detail.component";
import {ToPayTradeListComponent} from "./to-pay-trade-list/to-pay-trade-list.component";
import {ToPayTradeDetailComponent} from "./to-pay-trade-list/to-pay-trade-detail.component";


export const  TO_PAY_ROUTERS = [
    {path: 'cashmanagelist', component: CashManageListComponent},
    {path: 'cashmanagedetail', component: CashManageDetailComponent},
    {path: 'cashmanageaccountdetail', component: CashManageAccountdetailComponent},
    {path: 'electronicaccountlist', component: ElectronicAccountListComponent},
    {path: 'electronicaccountdetail', component: ElectronicAccountDetailComponent},
    {path: 'electronicaccountaccountdetail', component: ElectroniCaccountAccountDetailComponent},
    {path: 'topaytradelist', component: ToPayTradeListComponent},
    {path: 'topaytradedetail', component: ToPayTradeDetailComponent},

];
