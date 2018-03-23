

import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../common/services/helper.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
/**
 * 商户配置公钥限额弹窗
 */
@Component({
    selector: 'mch-infoconfig-secretkey-win',
    templateUrl: './mch.infoconfig.secretkey.component.html',
    providers: [mchService]
})
export class MchInfoConfigSecretkeyComponent implements OnInit {
    public secretkeyForm: FormGroup;
    public _merchantNo:any; // 面板传入服务商编号
    // public _rsaPublicKey:any; // 面板传入交易限额
    public rsaPublicKey:any; // 公钥
    public merchantNo:any; // 商户号
    public isLoadingOne = false; // loading
    constructor( public helper: HelperService,
                 public msg: NzMessageService,
                 public mchDB: mchService,
                 public i18n:I18NService,
                 public fb:FormBuilder,
                 public subject: NzModalSubject){}
    ngOnInit(){
        this.secretkeyForm = this.fb.group({
            rsaPublicKey: [this.rsaPublicKey,Validators.required]
        });
        this.merchantNo = this._merchantNo;
    }
    _submitForm(){
        this.isLoadingOne = true;
        this.mchDB.addOrgRsakey({ orgNo:this.merchantNo ,rsaPublicKey:this.rsaPublicKey}).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.subject.destroy('onOk');
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoadingOne = false;
        })
    }
}
