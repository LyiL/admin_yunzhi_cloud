import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {CommonEnum} from '../../../../../common/enum/common.enum';
import {HelperService} from '../../../../../common/services/helper.service';
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";
import {SpExamineModel} from "../../../../../common/model/user-file-manage/service-provide/sp-examine.model";

/**
 * 服务商审核配置弹窗
 */
@Component({
    selector:'sp-audit-win',
    templateUrl:'./sp-audit-win.component.html',
    providers:[CommonEnum, ServiceProviderService]
})
export class SpAuditWinComponent implements OnInit{
    public model: SpExamineModel = new SpExamineModel();
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
    isLoadingOne = false;

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public fb:FormBuilder,
        public modal: NzModalSubject,
        public CommonEnum:CommonEnum,
        public msg: NzMessageService,
        public ServiceProvideDB:ServiceProviderService
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
        this.isLoadingOne = true;
        this.ServiceProvideDB.examineService(this.model).subscribe(res =>{
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(res[CommonEnum.SERVER_MES_KEY]);
                this.modal.destroy('onOk');
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY])
            }
        })
    }


}
