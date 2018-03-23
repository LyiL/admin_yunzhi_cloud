import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {CommonEnum} from '../../../../../common/enum/common.enum';
import {HelperService} from '../../../../../common/services/helper.service';
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {AgencyExamineModel} from "../../../../../common/model/user-file-manage/agency/agency-examine.model";
import {AgencyService} from "../../../../../common/services/request/user-file-manage/agency.service";

/**
 * 代理商基本信息页审核代理商弹框
 */
@Component({
    selector:'agency-info-examine-win',
    templateUrl:'./agency-info-examine-win.component.html',
    providers:[CommonEnum,AgencyService]
})
export class AgencyExamstateWinComponent implements OnInit{
    public isLoading:boolean = false;//按钮加载效果
    public model: AgencyExamineModel = new AgencyExamineModel();
    public StatusForm:FormGroup;
    /**
     *状态
     */
    public examStates: Array<any> = [];
    /**
     *来源
     */
    public examState:number;
    public id:number;
    public chanCode:string;

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public fb:FormBuilder,
        public modal: NzModalSubject,
        public CommonEnum:CommonEnum,
        public msg: NzMessageService,
        public agencyService:AgencyService
    ){}

    ngOnInit(){
        this.model.id = this.id;
        this.model.chanCode = this.chanCode
        this.model.examState = this.examState;
        this.examStates = this.helper.getDictByKey('EXAMINE_STATUS');
        this.StatusForm = this.fb.group({
            examState:[this.model['examState'],Validators.required],
            examIllu:[this.model['examIllu'],Validators.required]
        })
    }

    /**
     *
     * @public
     */
    _submitForm(){
        this.isLoading = true;
        this.agencyService.examineAgency(this.model).subscribe(res =>{
            this.isLoading = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(res[CommonEnum.SERVER_MES_KEY]);
                this.modal.destroy('onOk');
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY])
            }
        })
    }


}
