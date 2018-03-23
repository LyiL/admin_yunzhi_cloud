import { Component, Input, OnInit } from '@angular/core';
import {NzLocaleService, NzMessageService, NzModalSubject, ObjectExtend} from 'ng-zorro-antd';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RefundAuthorityModel} from "../../../../common/model/user-file-manage/refund-settings/refund-authority.model";
import {CommonService} from "../../../../common/services/request/common.service";
import {HelperService} from "../../../../common/services/helper.service";
import {RefundSetsService} from "../../../../common/services/request/user-file-manage/refund-setting.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'refund-authority-add-win',
    templateUrl: './refund-authority-add-win.component.html',
    providers: [RefundSetsService]
})
export class RefundAuthorityAddWinComponent implements OnInit {
    _paramsInfo:any;//来源
    @Input()
    set paramsInfo(value: string) {
        this._paramsInfo = value;
    }
    public isLoading:boolean = false;//按钮加载效果
    public payTypes:Observable<any>;//支付类型
    public approvalTypes:Array<any> = [];//审核类型
    public refundAuthAny:Array<any> = [];//退款权限
    public refundAuthForm: FormGroup;
    public model: RefundAuthorityModel = new RefundAuthorityModel();
    constructor(public subject: NzModalSubject,
                protected fb: FormBuilder,
                public commonDB:CommonService,
                private helper:HelperService,
                public message: NzMessageService,
                protected refundDBService: RefundSetsService,
                protected i18n:I18NService,
                public log:NzLocaleService,
                public objExtend:ObjectExtend
    ) {}

    ngOnInit() {
        this.refundAuthForm = this.fb.group({
            name:[this.model.name, [Validators.required]],
            transId:[this.model.transId, [Validators.required]],
            transType:[this.model.transType],
            refundAuth:[this.model.refundAuth, [Validators.required]],
            examType:[this.model.examType, [Validators.required]]
        });
        this.model.name = this._paramsInfo['name'];
        this.model.merchantNo = this._paramsInfo['merchantNo'];

        /**
         * 退款权限（复选框）
         */
        this.refundAuthAny.forEach((auth)=>{
            auth['checked'] = false;
        });
        /**
         * 根据id判断是进入新增还是编辑模式
         */
        if(this._paramsInfo && this._paramsInfo['authId']) {
            this.refundDBService.loadAuthInfo({ authId: this._paramsInfo['authId']})
                .subscribe( res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                        this.model.name = this._paramsInfo['name'];
                        this.model.authId = this._paramsInfo['authId'];

                        let _auth = res[CommonEnum.SERVER_DATA_KEY]['refundAuth'].split(',');
                        this.refundAuthAny.forEach((item,ind)=>{
                            if(_auth.find((sourceAuth)=>{return item.id == sourceAuth;}) != undefined){
                                this.refundAuthAny[ind]['checked'] = true;
                            }
                        });
                    }
                })
        }

        this.payTypes = this.commonDB.loadTransApi({transId:""});//支付类型
        this.approvalTypes = this.helper.getDictByKey('REFUND_EXAMINE_TYPE');//审核类型
        this.refundAuthAny = this.helper.getDictByKey('MCH_REFUND_AUTH_REFUND_AUTH'); //退款权限
        this.refundAuthAny.forEach((item)=>{
            item['label'] = item['name'];//给复选框的label赋值（两个键名分别为value和label）
        });
    }
    /**
     * 退款权限
     */
    onChecked(value) {
        // this.log.debug('authvalue::',value);
        let tempArr = [];
        value.find((item) => {
            if(item['checked']){
                tempArr.push(item['id']);
            }
        });
        this.model.refundAuth = tempArr.join(',');
    }
    getTransType(value){
        this.model.transType = value.nzLabel;
    }
    /**
     * 保存
     */
    onSave() {
        if(!this.model.refundAuth) {
            this.message.warning(this.i18n.fanyi('RefundSets.refAuthPage.message.refundAuthMsg'));
            return;
        }
        this.onUpdateAuthInfo();
    }
    onUpdateAuthInfo(){
        this.isLoading = true;
        if (this.refundAuthForm.valid) {
            this.refundDBService.changeAuthInfo(this.model)
                .subscribe((res) => {
                    this.isLoading = false;
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.message.success(this.i18n.fanyi('RefundSets.refAuthPage.message.saveOkMsg'));
                        this.subject.destroy('onOk');
                    }else {
                        this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
        }
    }
}
