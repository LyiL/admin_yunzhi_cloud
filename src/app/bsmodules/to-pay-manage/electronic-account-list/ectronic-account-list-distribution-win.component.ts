import {Component, OnInit} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ElectronicAccountListDistributionWinForm} from "../../../common/form/to-pay-manage/electronic-account-list-distribution-win.form";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {CommonEnum} from "../../../common/enum/common.enum";

/**
 * 外部账户
 */
@Component({
    selector:'ectronic-account-list-distribution-win',
    templateUrl:'ectronic-account-list-distribution-win.component.html',
    providers:[ElectronicAccountListSevice]
})
export class ElectronicAccountListDistributionWinComponent implements OnInit{

    public eleAccountformGroup: FormGroup;
    public model: ElectronicAccountListDistributionWinForm = new ElectronicAccountListDistributionWinForm();
    public _accountNo:any;
    public isLoading = false;  //按钮载入状态样式

    set accountNo(value: any) {
        this._accountNo = value;
    }
    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public _msg:NzMessageService,
        public electronicAccountListSevice:ElectronicAccountListSevice,
        public _modal: NzModalSubject,
    ){
        this.eleAccountformGroup = new FormGroup({
            'externalAccount':new FormControl(this.model.externalAccount, Validators.required),
            'externalPassword':new FormControl(this.model.externalPassword,[Validators.required,Validators.minLength(6)] ),
        });
    }
    ngOnInit(){}



    submitForm(){
        this.isLoading=true;
        this.model.accountNo=this._accountNo;
        this.electronicAccountListSevice.loadDistribution(this.model)
            .subscribe((_res) => {
                this.isLoading=false;
                if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.isLoading=false;
                    this._modal.destroy('onOk');
                }else {
                    this._msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                }
            });

    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.eleAccountformGroup.controls[name];
    }
}
