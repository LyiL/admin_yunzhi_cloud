

import {LuoApplicationComponent} from "./luoluo-application-list/luoluo.application.list.component";
import {LuoApplicationAddComponent} from "./luoluo-application-list/luoluo.application.add.component";
import {LuoApplicationDetailComponent} from "./luoluo-application-list/luoluo.application.detail.component";

/**
 * 营销管理路由配置
 * @type {[{path: string; component: LuoApplicationComponent} , {path: string; component: LuoApplicationAddComponent} , {path: string; component: LuoApplicationDetailComponent}]}
 */

export const MARKETING_MANAGE_ROUTING = [
    {path: 'luoapplist', component: LuoApplicationComponent},
    {path: 'luoappadd', component: LuoApplicationAddComponent},
    {path: 'luoappdetail', component: LuoApplicationDetailComponent},
];
