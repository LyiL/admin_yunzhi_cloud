import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CashManageListComponent} from "./cash-manage-list/cash.manage.list.component";
import {TO_PAY_ROUTERS} from "./to-pay-manage.routing";
import {CashManageListAddbtnWinComponent} from "./cash-manage-list/add-cash-manage/cash-manage-list-addbtn-win.component";
import {CashManageDetailComponent} from "./cash-manage-list/cash-manage-detail.component";
import {CashManageAccountdetailComponent} from "./cash-manage-list/cash-manage-accountdetail.component";
import {ElectronicAccountListComponent} from "./electronic-account-list/electronic-account-list.component";
import {ElectronicAccountListDistributionWinComponent} from "./electronic-account-list/ectronic-account-list-distribution-win.component";
import {AddElectronicAccountWinComponent} from "./electronic-account-list/add-electronic-account/add-electronic-account-win.component";
import {ElectronicAccountDetailComponent} from "./electronic-account-list/electronic-account-detail.component";
import {ElectroniCaccountAccountDetailComponent} from "./electronic-account-list/electroni-caccount-account-detail.component";
import {ElectronicAccountIstTakecashbtnWinComponent} from "./electronic-account-list/electronic-account-ist-takecashbtn-win.component";
import {ToPayTradeListComponent} from "./to-pay-trade-list/to-pay-trade-list.component";
import {ToPayTradeListOrderQueryComponent} from "./to-pay-trade-list/to-pay-trade-list-orderQuery.component";
import {ToPayTradeListBatchQueryComponent} from "./to-pay-trade-list/to-pay-trade-list-batchQuery.component";
import {ToPayTradeDetailComponent} from "./to-pay-trade-list/to-pay-trade-detail.component";



@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(TO_PAY_ROUTERS)
    ],
    declarations: [
        CashManageListComponent,
        CashManageListAddbtnWinComponent,
        CashManageDetailComponent,
        CashManageAccountdetailComponent,
        ElectronicAccountListComponent,
        ElectronicAccountListDistributionWinComponent,
        AddElectronicAccountWinComponent,
        ElectronicAccountDetailComponent,
        ElectroniCaccountAccountDetailComponent,
        ElectronicAccountIstTakecashbtnWinComponent,
        ToPayTradeListComponent,
        ToPayTradeListOrderQueryComponent,
        ToPayTradeListBatchQueryComponent,
        ToPayTradeDetailComponent
    ],
    entryComponents: [
        CashManageListAddbtnWinComponent,
        ElectronicAccountListDistributionWinComponent,
        AddElectronicAccountWinComponent,
        ElectronicAccountDetailComponent,
        ElectronicAccountIstTakecashbtnWinComponent,
        ToPayTradeListComponent,
        ToPayTradeListOrderQueryComponent,
        ToPayTradeListBatchQueryComponent,
        ToPayTradeDetailComponent
    ]
})
export class ToPayManageModule { }
