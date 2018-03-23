import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {StaffManageService} from "../../../../common/services/request/system-manage/staff-manage.sevice";
import {AddStaffBaseinfoForm} from "../../../../common/form/stystem.manage/add-staff-manage/add-staff-baseinfo.form";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {DynamicStepsService} from "@delon/abc";
import {NzMessageService} from "ng-zorro-antd";
import {Observable} from "rxjs/Observable";

/**
 * 新增员工基本信息
 */
@Component({
    selector: 'staff-add-step1',
    templateUrl: 'staff-baseinfo.component.html',
    providers: [StaffManageService]
})
export class StaffBaseinfoComponent implements OnInit{
    public model:AddStaffBaseinfoForm = new AddStaffBaseinfoForm();  //form实例
    public showPwd = true;  //显示密码字段
    public staffAdd: FormGroup;  //表单名
    public params:any;     //接受新增员工管理基本信息保存后台返回数据
    public id:any;        //路由传递id
    public disebed:boolean=false  //是否编辑
    public isLoading:boolean = false;  //按钮载入状态样式

    constructor(public fb: FormBuilder,
                public helper:HelperService,
                public staffSev:StaffManageService,
                public menuService:MenuService,
                public router:Router,
                public i18n:I18NService,
                public dynamicStepsService:DynamicStepsService,
                public _msg: NzMessageService){
      }

    ngOnInit() {


        /**
         * 是否ID加载员工基础信息
         */
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu&&menu['params']['id']){
               this.id = menu['params']['id'];
              this.showPwd = false;
              this.disebed=true;
              this.staffSev.loadStaff({id:this.id}).subscribe((res)=>{
                  if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                      // this.model = res['data'];
                      this.model = res[CommonEnum.SERVER_DATA_KEY];
                  }else {
                      this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                  }
              });
          }

        /**
         * 表单基本配置
         * @type {FormGroup}
         */
        this.staffAdd = this.fb.group({
            userName: [this.model.userName,[Validators.required,this.userNamelValidator]],
            userPwd: [this.model.userPwd, !!this.id ? null :  [Validators.minLength(6)]],   //是否校验字段
            realName: [this.model.realName, [Validators.required]],
            phone: [this.model.phone, [Validators.required,Validators.minLength(7), Validators.maxLength(11),Validators.pattern(/^\d+$/)]]
        });
        this.staffAdd.patchValue(this.staffSev);
    }

    /**
     * 表单格式验证
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.staffAdd.controls[ name ];
    }

    /**
     * 只能输入英文及数字
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    userNamelValidator = (control: FormControl): { [s: string]: boolean } => {
        const EMAIL_REGEXP =/^[A-Za-z0-9]+/;
        if (!control.value) {
            return { required: true }
        } else if (!EMAIL_REGEXP.test(control.value)) {
            return { confirm: true, error: true};
        }
    };

    /**
     * 保存
     */
    onSubmit() {
        this.isLoading=true;
        this.staffSev.saveStaffInfo(this.model).subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this._msg.success(this.i18n.fanyi('StaffM.listPage.alert.opsuc'));
                this.helper.navigate('/admin/systems/staffmanage',this.i18n.fanyi('StaffM.listPage.navigate.staffmanage'),{});
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }
    /**
     * 保存并下一步
     */
    onNextSetp(){
        this.isLoading=true;
        this.staffSev.saveStaffInfo(this.model).subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.params=res.data;
                this.staffSev = Object['assign'](this.staffSev,this.params);
                // ++this.staffSev.step;
                this.dynamicStepsService.nextStep();//下一步
                // this.dynamicStepsService.nextStep();
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 取消，返回
     */
    back(){
        this.helper.navigate('/admin/systems/staffmanage',this.i18n.fanyi('StaffM.listPage.navigate.staffmanage'),{});
    }
}
