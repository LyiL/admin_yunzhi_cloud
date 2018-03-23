import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {AccountSummaryListComponent} from "./account-summary-list/account-summary-list.component";
import {BussinessAccountCheckComponent} from "./bussiness-account-check-list/bussiness-account-check-list.component";
import {AccountErrorListComponent} from "./account-error-list/account-error-list.component";
import {AccountSummaryDetailComponent} from "./account-summary-list/detail/account-summary-detail.component";
import {AccountErrorDetailComponent} from "./account-error-list/detail/account-error-detail.component";
import {BussinessAccountCheckDetailComponent} from "./bussiness-account-check-list/detail/bussiness-account-check-detail.component";
import {RouterModule} from "@angular/router";
import {ACCOUNT_MANAGE_ROUTES} from "./account-manage.routing";
import {AccountDownloadComponent} from "./account-download-list/account.download.list.component";
import {CheckAccountDetailComponent} from "./check-account-list/detail/check.account.detail.component";
import {AccountTaskComponent} from "./account-task-list/account.task.list.component";
import {CheckAccountComponent} from "./check-account-list/check.account.list.component";
import {AccountTaskDetailComponent} from "./account-task-list/detail/account.task.detail.component";
import {AccountTaskListEditbtnWinComponent} from "./account-task-list/win/account.task.list.editbtn.win.component";

/**
 * 对账管理模块
 */

@NgModule({
    imports:[
        SharedModule,
        RouterModule.forChild(ACCOUNT_MANAGE_ROUTES)
    ],
    declarations:[
        AccountSummaryListComponent,
        AccountSummaryDetailComponent,
        BussinessAccountCheckComponent,
        BussinessAccountCheckDetailComponent,
        AccountErrorListComponent,
        AccountErrorDetailComponent,
        AccountDownloadComponent,
        AccountTaskComponent,
        AccountTaskDetailComponent,
        AccountTaskListEditbtnWinComponent,
        CheckAccountComponent,
        CheckAccountDetailComponent
    ],
    entryComponents: [
        AccountTaskListEditbtnWinComponent
    ]
})
export class AccountManageModule{

}
