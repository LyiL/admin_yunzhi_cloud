import {Component, Inject, Input} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChannelDayLoad} from "../../../common/services/request/settlement-manage/channelday.list.db.service";
import {channelDayForm} from "../../../common/form/settlement-manage/channelday.form";
import {CommonEnum} from "../../../common/enum/common.enum";
import {NzMessageService, NzModalSubject, ObjectExtend} from "ng-zorro-antd";

/**
 * 机构日结结算打款弹出框页面
 */
@Component({
  selector:"settlepay-win",
  templateUrl:"./settlepay.win.component.html",
  providers:[ChannelDayLoad,CommonEnum]
})
export class settlePayWinComponent{
    public data:any;//接收传入的数据
    public isLoadingOne = false; // loading
    public channelDayForm:channelDayForm = new channelDayForm();

    set model(value: any) {
        this.data = value;  //接收主页面传的数据
    }
  public myGroup: FormGroup;
  constructor( public channelDB:ChannelDayLoad,public objectExtend:ObjectExtend, public msg: NzMessageService,public modal: NzModalSubject
  ){}
  ngOnInit(){
      this.myGroup = new FormGroup({
          settleTitle:new FormControl(this.channelDayForm.settleTitle, [Validators.required]),
          remark:new FormControl(this.channelDayForm.remark, []),
      });
  }
    /**
     * 结算打款提交
     */
public onSubmit(){
      this.isLoadingOne = true;
    this.channelDB.loadSettle(this.objectExtend.extend(this.data,{agentno:this.data.canalNo, beginTime:this.data.billTimeStart,endTime:this.data.billTimeEnd,settleTitle:this.channelDayForm.settleTitle,remark:this.channelDayForm.remark})).subscribe(res =>{
        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
            this.msg.success(res[CommonEnum.SERVER_MES_KEY]);
            this.modal.destroy('onOk')
      }else {
            this.msg.error(res[CommonEnum.SERVER_MES_KEY])
      }
      this.isLoadingOne = false;
    })
}

}
