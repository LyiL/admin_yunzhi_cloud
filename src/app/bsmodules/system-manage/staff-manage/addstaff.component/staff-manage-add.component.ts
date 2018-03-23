import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {StaffManageService} from "../../../../common/services/request/system-manage/staff-manage.sevice";
import {StaffBaseinfoComponent} from "./staff-baseinfo.component";
import {StaffAddAllocationroleComponent} from "./staff-add-allocationrole.component";
import {StaffAddSucComponenent} from "./staff-add-suc.componenent";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {DynamicStepsService} from "@delon/abc";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";


/**
 *新增员工
 */
@Component({
    selector: 'staff-add-manage',
    templateUrl: 'staff-manage-add.component.html',
    // styleUrls:['staff-add-style.component.less'],
    providers: [StaffManageService,DynamicStepsService]
})
export class StaffManageAddStaffComponent implements OnInit{


    constructor(public staffSev: StaffManageService,
                public i18n:I18NService,
                public dynamicStepsService:DynamicStepsService,
                public menuService:MenuService,
                public router:Router) {}

    // public step=this.staffSev.step;
   // public current:number = 0;
    /**
     * 新增员工子组件配置
     * StaffBaseinfoComponent：基本信息
     * StaffAddAllocationroleComponent：分配角色
     * StaffAddSucComponenent成功
     * @type {[{title: (string | any); content: StaffBaseinfoComponent} , {title: (string | any); content: StaffAddAllocationroleComponent} , {title: (string | any); content: StaffAddSucComponenent}]}
     */
    public steps:Array<any> = [{
        title:this.i18n.fanyi('StaffM.nzTitle.step1Title'),
        content:StaffBaseinfoComponent
    },{
        title:this.i18n.fanyi('StaffM.nzTitle.step2Title'),
        content:StaffAddAllocationroleComponent
    },{
        title:this.i18n.fanyi('StaffM.nzTitle.step3Title'),
        content:StaffAddSucComponenent
    }];

    // ngAfterViewInit() {
    // }

    /**
     * step设置
     */
    ngOnInit():void{
        setTimeout(()=>{
            let params =this.menuService.getUrlByMenu(this.router.url);
            let _params = params['params'];
            if(_params && _params['step']){
                this.dynamicStepsService.goStep(_params['step']);
            }
        },0);
    }

}
