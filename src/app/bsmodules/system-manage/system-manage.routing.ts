/**
 * 系统管理路由
 * @type {Array}
 */

import {RoleManageComponent} from "./role-manage/role-manage-list.component";
import {StaffManageComponent} from "./staff-manage/staff-manage-list.component";
import {RoleAddManageComponent} from "./role-manage/addrole-component/role-add-manage.component";
import {StaffManageAddStaffComponent} from "./staff-manage/addstaff.component/staff-manage-add.component";
import {LoginLogComponent} from "./loginlog-list/loginlog.list.component";

export const SYSTEM_MANAGE_ROUTES = [
    {path: 'rolemanage', component:RoleManageComponent},
    {path: 'staffmanage', component:StaffManageComponent},
    {path: 'roleaddmanage', component:RoleAddManageComponent},
    {path: 'staffmanageaddstaff', component:StaffManageAddStaffComponent},
    {path: 'loginlog', component: LoginLogComponent},
];
