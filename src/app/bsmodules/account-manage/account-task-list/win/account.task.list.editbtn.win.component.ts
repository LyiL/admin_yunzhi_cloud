import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {accountTaskmodel} from "../../../../common/model/account-manage/account-task.model";
import {HelperService} from "../../../../common/services/helper.service";
import {AccountTaskService} from "../../../../common/services/request/account-manage/account-task.service";
import {CommonEnum} from "app/common/enum/common.enum";
import {I18NService} from "app/common/i18n/i18n.service";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";

/**
 * 对账任务编辑弹框
 */

@Component({
  selector: 'account-task-list-editbtn-win',
  templateUrl: './account.task.list.editbtn.win.component.html',
  providers: [AccountTaskService]
})
export class AccountTaskListEditbtnWinComponent implements OnInit{

    public model: accountTaskmodel = new accountTaskmodel();
    public accountTaskFormGroup: FormGroup;

    public reconTypes: Array<string> = [];        // 对账类型
    public refundTypes: Array<string> = [];       // 退款依据

    constructor(public fb: FormBuilder,
                public helper: HelperService,
                public accountTaskDB: AccountTaskService,
                public msg: NzMessageService,
                public i18n: I18NService,
                public subject: NzModalSubject,) {
        this.reconTypes = this.helper.getDictByKey('SHOW_CHECK_TYPE');        // 对账类型
        this.refundTypes = this.helper.getDictByKey('REFUND_BASE');           // 退款依据
    }

    ngOnInit() {
        this.accountTaskFormGroup = this.fb.group({
            reconPath: [this.model.reconPath],                              // 对账单文件路径
            reconType: [this.model.reconType, [Validators.required]],       // 对账类型
            refundType: [this.model.refundType, [Validators.required]],     // 退款依据
        })
    }

    /**
     * 保存
     */
    onSubmit() {
        this.accountTaskDB.loadEdit(this.model).subscribe((res) => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.subject.destroy('onOk');
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    getFormControl(name) {
        return this.accountTaskFormGroup.controls[name];
    }
}
