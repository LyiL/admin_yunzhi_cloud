import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {StaffPwdModifyModel} from "../../../../common/form/stystem.manage/staffPsdModify";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StaffManageService} from "../../../../common/services/request/system-manage/staff-manage.sevice";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {CommonEnum} from "../../../../common/enum/common.enum";


/**
 * 密码修改页
 */
@Component({
    selector: 'psdModifyModel',
    templateUrl: 'psdModify.component.html',
    providers: [StaffManageService]
})
export class psdModifyComponent {
    public psdmodel:StaffPwdModifyModel=new StaffPwdModifyModel;
    public modifypwd: FormGroup;
    public isLoading:boolean = false;  //按钮载入状态样式

    constructor(public fb: FormBuilder,
                public staffDB:StaffManageService,
                public confirmServ: NzModalService,
                public _modal: NzModalSubject,
                public _msg: NzMessageService
                ){
      }


    /**
     * 接受ID
      */
    _id:number;
      // @Input()
      set id(val){
          this._id = val;
      }


    /**
     * 密码是否一致
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.modifypwd.controls['userPwd'].value) {
            return { confirm: true, error: true };
        }
    }


    ngOnInit() {
        this.modifypwd = this.fb.group({
            userPwd: [this.psdmodel.userPwd,[Validators.required,Validators.minLength(6)]],
            userPwdc: [this.psdmodel.userPwdc,[Validators.required,this.confirmationValidator]]
        });

    }

    /**
     * 表单提交
     */
    submitForm() {
        this.psdmodel.id=this._id;
        this.isLoading=true;  //按钮载入状态样式

        this.staffDB.loadUserModifyPwd(this.psdmodel).subscribe(res=>{
            this.isLoading=false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.isLoading=false;
                this._modal.destroy('onOk');
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });

    }

    /**
     * 关闭弹窗
     */
    // cancel(){
    //     this._modal.destroy('onCancel');
    // }

    /**
     *  获取响应式表单项
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.modifypwd.controls[ name ];
    }

}
