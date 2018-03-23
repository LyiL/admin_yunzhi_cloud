import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {CommonService} from '../../../../common/services/request/common.service';
import {MchWxconfigSetModel} from '../../../../common/model/user-file-manage/merchant/mch.weixinConfig.model';
import {FormControl, FormGroup} from '@angular/forms';
import {HelperService} from '../../../../common/services/helper.service';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {I18NService} from '../../../../common/i18n/i18n.service';
/**
 * 商户微信公众号配置弹窗
 */
@Component({
    selector:'mch-wxconfig--win',
    templateUrl:'./mch-wxconfig-win.html',
    providers:[mchService,CommonService]
})
export class MchWxconfigWinComponent implements OnInit{
    public model:MchWxconfigSetModel = new MchWxconfigSetModel();
    public formGroup: FormGroup;
    public mchId:any;
    public isLoadingOne = false; // loading
    constructor(public helper: HelperService,  public i18n:I18NService,public modal: NzModalSubject,public msg: NzMessageService,public mchDB: mchService){

    }
    ngOnInit(){
        this.formGroup = new FormGroup({
            'jsapiPath': new FormControl(this.model.jsapiPath),
            'subAppid': new FormControl(this.model.subAppid),
            'subscribeAppid': new FormControl(this.model.subscribeAppid)
        });
        this.model.mchId = this.mchId;
    }
    onSubmit() {
        if (this.formGroup.valid) {
            if ((this.helper.isEmpty(this.model.jsapiPath)) &&(this.helper.isEmpty(this.model.subAppid)) && (this.helper.isEmpty(this.model.subscribeAppid))) {
                this.msg.warning(this.i18n.fanyi('Mch.tips.onConfigTip'));
                return false;
            }
            this.isLoadingOne = true;
            this.mchDB.accountConfig(this.model).subscribe((res)=>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.modal.destroy('onOk');
                }else{
                    this.msg.warning(res[CommonEnum.SERVER_MES_KEY]);
                }
                this.isLoadingOne = false;
            })
        }
    }
}
