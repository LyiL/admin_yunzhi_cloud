import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {RouterInterceptService} from "./common/services/router.intercept.service";
import {LockScreenComponent} from "./lock-screen/lock-screen.component";

const APP_ROUTES:Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'admin', component:LayoutComponent,
        children:[{path:'user',loadChildren:'./bsmodules/user-file-manage/user-file.module#UserFileManageModule'},
                    {path:'trades',loadChildren:'./bsmodules/trade-manage/trade.module#TradeManageModule'},
                    {path:'account',loadChildren:'./bsmodules/account-manage/account-manage.module#AccountManageModule'},
                    {path:'settlement',loadChildren:'./bsmodules/settlement-manage/settlement-manage.module#SettlementManageModule'},
                    {path:'marketing',loadChildren:'./bsmodules/marketing-manage/marketing.manage.module#MarketingManageModule'},
                    {path:'systems',loadChildren:'./bsmodules/system-manage/system-manage.module#SystemManageModule'},
                    {path:'topay',loadChildren:'./bsmodules/to-pay-manage/to-pay-manage.module#ToPayManageModule'}],
        canActivate:[RouterInterceptService],
        canActivateChild:[RouterInterceptService]
    },
    {path:'login', component:LoginComponent},
    {path:'lock', component:LockScreenComponent},
    {path:'**', redirectTo:'/login'}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(APP_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutesModule {}
