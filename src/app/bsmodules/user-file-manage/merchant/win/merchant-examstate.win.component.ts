import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {examstateModel} from '../../../../common/model/user-file-manage/merchant/merchant-examstate.model';
import {HelperService} from '../../../../common/services/helper.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
/**
 * 商户详情审核状态弹出框页面
 */
@Component({
    selector:'merchant-examstate-win',
    templateUrl:'./merchant-examstate.win.component.html',
    providers:[CommonEnum,mchService]
})
export class MerchantExamstateWinComponent implements OnInit{
    public model: examstateModel = new examstateModel();
    public StatusForm:FormGroup;
    public isLoadingOne = false; // loading
    /**
     *状态
     */
    public examStates: Array<any> = [];
    public id:any;
    public examState:any;

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public fb:FormBuilder,
        public modal: NzModalSubject,
        public CommonEnum:CommonEnum,
        public msg: NzMessageService,
        public mchService:mchService
    ){

    }

    ngOnInit(){
        this.model.id = this.id;
        this.model.examState =this.examState;
        this.examStates = this.helper.getDictByKey('EXAMINE_STATUS');
        this.StatusForm = this.fb.group({
            examState:[this.model['examState'],Validators.required],
            examIllu:[this.model['examIllu'],Validators.required]
        })
    }

    /**
     * 提交状态修改
     * @public
     */
    _submitForm(){
        this.isLoadingOne = true;
        this.mchService.examineSP(this.model).subscribe(res =>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(res[CommonEnum.SERVER_MES_KEY]);
                this.modal.destroy('onOk');
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY])
            }
            this.isLoadingOne = false;
        })
    }


}

