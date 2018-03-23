import {AccountSummaryListComponent} from "./account-summary-list/account-summary-list.component";
import {BussinessAccountCheckComponent} from "./bussiness-account-check-list/bussiness-account-check-list.component";
import {AccountErrorListComponent} from "./account-error-list/account-error-list.component";
import {AccountSummaryDetailComponent} from "./account-summary-list/detail/account-summary-detail.component";
import {AccountErrorDetailComponent} from "./account-error-list/detail/account-error-detail.component";
import {BussinessAccountCheckDetailComponent} from "./bussiness-account-check-list/detail/bussiness-account-check-detail.component";
import {AccountDownloadComponent} from "./account-download-list/account.download.list.component";
import {AccountTaskComponent} from "./account-task-list/account.task.list.component";
import {CheckAccountComponent} from "./check-account-list/check.account.list.component";
import {CheckAccountDetailComponent} from "./check-account-list/detail/check.account.detail.component";
import {AccountTaskDetailComponent} from "./account-task-list/detail/account.task.detail.component";

/**
 * 对账管理路由配置
 * @type {Array}
 */

export const ACCOUNT_MANAGE_ROUTES = [
    {path:'accountsummary', component: AccountSummaryListComponent},
    {path:'accountsummarydetail', component: AccountSummaryDetailComponent},
    {path:'bussinessaccountcheck', component:BussinessAccountCheckComponent},
    {path:'bussinessaccountcheckdetail', component:BussinessAccountCheckDetailComponent},
    {path:'accounterror', component:AccountErrorListComponent},
    {path:'accounterrordetail', component:AccountErrorDetailComponent},
    {path:'accountdownload', component:AccountDownloadComponent},
    {path:'accounttask', component:AccountTaskComponent},
    {path:'accounttaskdetail', component:AccountTaskDetailComponent},
    {path:'checkaccount', component:CheckAccountComponent},
    {path:'checkaccountdetail', component:CheckAccountDetailComponent},
];
