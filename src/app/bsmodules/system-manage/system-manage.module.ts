import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {RoleManageComponent} from "./role-manage/role-manage-list.component";
import {StaffManageComponent} from "./staff-manage/staff-manage-list.component";
import {psdModifyComponent} from "./staff-manage/psdModify/psdModify.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoleAddManageComponent} from "./role-manage/addrole-component/role-add-manage.component";
import {RoleAddBaseinfoComponent} from "./role-manage/addrole-component/role-add-baseinfo.component";
import {StaffManageAddStaffComponent} from "./staff-manage/addstaff.component/staff-manage-add.component";
import {StaffBaseinfoComponent} from "./staff-manage/addstaff.component/staff-baseinfo.component";
import {StaffAddAllocationroleComponent} from "./staff-manage/addstaff.component/staff-add-allocationrole.component";
import {RoleAddFuncpermissionComponent} from "./role-manage/addrole-component/role-add-funcpermission.component";
import {NzTreeModule} from "ng-tree-antd";
import {RoleAddMenuComponent} from "./role-manage/addrole-component/role-add-rolemenupermission.component";
import {StaffAddSucComponenent} from "./staff-manage/addstaff.component/staff-add-suc.componenent";
import {SYSTEM_MANAGE_ROUTES} from "./system-manage.routing";
import {RouterModule} from "@angular/router";
import {LoginLogComponent} from "./loginlog-list/loginlog.list.component";

@NgModule({
    imports:[
        SharedModule,
        FormsModule,
        NzTreeModule,
        ReactiveFormsModule,
        RouterModule.forChild(SYSTEM_MANAGE_ROUTES)
    ],
    declarations:[
        RoleManageComponent,
        StaffManageComponent,
        psdModifyComponent,
        RoleAddManageComponent,
        RoleAddBaseinfoComponent,
        StaffManageAddStaffComponent,
        StaffBaseinfoComponent,
        StaffAddAllocationroleComponent,
        RoleAddFuncpermissionComponent,
        RoleAddMenuComponent,
        StaffAddSucComponenent,
        LoginLogComponent



    ],
    entryComponents:[
        psdModifyComponent,
        RoleAddBaseinfoComponent,
        StaffBaseinfoComponent,
        StaffAddAllocationroleComponent,
        RoleAddFuncpermissionComponent,
        RoleAddMenuComponent,
        StaffAddSucComponenent
    ]
})
export class SystemManageModule{

}
