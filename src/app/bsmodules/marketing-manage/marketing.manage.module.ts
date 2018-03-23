import {NgModule} from "@angular/core";
import {LuoApplicationComponent} from "./luoluo-application-list/luoluo.application.list.component";
import {LuoApplicationAddComponent} from "./luoluo-application-list/luoluo.application.add.component";
import {LuoApplicationDetailComponent} from "./luoluo-application-list/luoluo.application.detail.component";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";
import {MARKETING_MANAGE_ROUTING} from "./marketing.manage.routing";

/**
 * 营销管理模块
 */

@NgModule({
    declarations: [
        LuoApplicationComponent,
        LuoApplicationAddComponent,
        LuoApplicationDetailComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(MARKETING_MANAGE_ROUTING)
    ],
    entryComponents: [

    ]
})
export class MarketingManageModule { }

