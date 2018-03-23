import {Component, Inject, Input} from "@angular/core";
import {BusinessListLoadService} from "../../../common/services/request/settlement-manage/businessday.list.db.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BusinessDayForm} from "../../../common/form/settlement-manage/businessday.form";
import {CommonEnum} from "../../../common/enum/common.enum";
import {NzMessageService, NzModalSubject, ObjectExtend} from "ng-zorro-antd";

/**
 * 结算打款的弹出层
 */
@Component({
  selector: 'business-day-list-settlebtn-win',
  templateUrl: 'business.day.list.settlebtn.win.component.html',
  providers: [BusinessListLoadService,CommonEnum]
})
export class BusinessDayListSettlebtnWinComponent {
  public formGroup: FormGroup;
    public isLoadingOne = false; // loading
  public BusinessDayForm: BusinessDayForm = new BusinessDayForm();
    public data = {}; // 接收传入的数据

    set model(value: any) {
        this.data = value;
    }
  constructor(public businessListDb:BusinessListLoadService,public objectExtend:ObjectExtend, public msg: NzMessageService,
    public modal: NzModalSubject,
  ) {

    this.formGroup = new FormGroup({
      settleTitle:new FormControl(this.BusinessDayForm.settleTitle, [Validators.required]),
      remark:new FormControl(this.BusinessDayForm.remark, []),
    });
  }

    /**
     * 结算打款提交
     */
  onSubmit() {
        this.isLoadingOne =true;
      this.businessListDb.loadSettle(this.objectExtend.extend(this.data,{settleTitle:this.BusinessDayForm.settleTitle,remark:this.BusinessDayForm.remark})).subscribe(res =>{
          if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
            this.msg.success(res[CommonEnum.SERVER_MES_KEY]);
            this.modal.destroy('onOk')
        }else {
            this.msg.error(res[CommonEnum.SERVER_MES_KEY])
        }
          this.isLoadingOne =false;
      })
  }

}
