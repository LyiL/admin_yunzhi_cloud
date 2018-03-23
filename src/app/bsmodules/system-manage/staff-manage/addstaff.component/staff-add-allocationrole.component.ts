import {Component, OnInit} from "@angular/core";
import {StaffManageService} from "../../../../common/services/request/system-manage/staff-manage.sevice";
import {StaffAllocationRoleModel} from "../../../../common/model/system-manage/staff-manage/staff.allocation.role.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {NzMessageService} from "ng-zorro-antd";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {DynamicStepsService, StepDynamiComponent} from "@delon/abc";
import {AddStaffBaseinfoForm} from "../../../../common/form/stystem.manage/add-staff-manage/add-staff-baseinfo.form";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";


/**
 * 分配角色信息
 */
@Component({
    selector: 'staff-add-step2',
    templateUrl: 'staff-add-allocationrole.component.html',
    providers: [StaffManageService]
})
export class StaffAddAllocationroleComponent implements OnInit{
    public StatusForm:FormGroup;   //表单名
    public model:StaffAllocationRoleModel = new StaffAllocationRoleModel(); //实列表单
    public isLoading:boolean= false;  //按钮载入状态样式


    public roles:Array<any> = new Array<any>();  //角色组数据字段
    public disable:boolean;     //定按钮是否显示字段


    public  roleparamas:any; //接受基本信息所有信息值
    public paramas:any;     //接受基本信息参数值


    constructor(public fb: FormBuilder,
                public helper:HelperService,
                public staffSev:StaffManageService,
                public i18n:I18NService,
                public _msg: NzMessageService,
                protected dynamicStepsService:DynamicStepsService,
                public menuService:MenuService,
                public router:Router){

    }


    /**
     * 渲染数据
     */
    ngOnInit(){

        //表单基本模板设置
        this.StatusForm = this.fb.group({
            syncStatus:[this.model['syncStatus'],Validators.required],
        })
        let menu =this.menuService.getUrlByMenu(this.router.url); //路由参数

        if(menu&&menu['params']['isedit']){
            //let edit=menu['params'].isedit;  //是否编辑
            this.paramas=menu['params']
        }else {

            this.roleparamas=this.dynamicStepsService.getStepByInstance(0)
            this.paramas=this.roleparamas['params'];
        }


        this.staffSev.loadRoleList({id:this.paramas.id,username:this.paramas.userName,parentIds:99})

            .subscribe( _res =>{
                if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    // let _roles=_res['data'];
                    let _roles=_res[CommonEnum.SERVER_DATA_KEY];
                    _roles.forEach((_roles)=>{
                        _roles.label=_roles.value=_roles.roleName
                    });
                    this.roles=_roles;

                }else {
                    this._msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                }
            })
    }

    /**
     * checked
     * @param role
     * @constructor
     */
    public RoleChceck(role){
        this.disable = role.every(el => {   //判断按钮是否显示
            return !el.checked;
        });
        // this.model.roleIds = this.roleid.filter((element,index,self)=>{
        //     return self.indexOf(element) === index;
        // });
    }

    /**
     * ID选择添加
     */
    public chceckId(){
        this.roles.forEach((val)=>{
            if(val['checked']){
                this.model.roleIds.push(val['id']);
            }
        })
    }

    /**
     * 提交
     * @private
     */
    _submitForm(){
        this.isLoading=true;
        this.chceckId();
        if(this.model.roleIds.length > 0){
            this.staffSev.loadStaffAllot({id:this.paramas.id,roleIds:this.model.roleIds })
                .subscribe((_res)=>{
                    this.isLoading=false;
                    if(_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        // alert('角色分配成功');
                        this._msg.success(this.i18n.fanyi('StaffM.listPage.html.rolesuc'));
                        this.helper.navigate('/admin/systems/staffmanage',this.i18n.fanyi('StaffM.listPage.navigate.staffmanage'),{});
                    }else{
                        this._msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
        }else{
            // this._msg.info('至少需要分配一个角色');
        }

    }
    _cancel(){
        this.helper.navigate('/admin/systems/staffmanage',this.i18n.fanyi('StaffM.listPage.navigate.staffmanage'),{});
    }
}
