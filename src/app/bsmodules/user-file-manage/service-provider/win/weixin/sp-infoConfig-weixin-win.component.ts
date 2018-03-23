import {Component, Inject, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../../common/services/helper.service';
import {ServiceProviderService} from '../../../../../common/services/request/user-file-manage/service-provider.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SpWeixinModel} from '../../../../../common/model/user-file-manage/service-provide/sp-weixin.model';
import {CommonEnum} from '../../../../../common/enum/common.enum';

/**
 * 服务商公众号配置弹窗
 */
@Component({
    selector: 'sp-info-config-weixin-win',
    templateUrl: './sp-infoConfig-weixin-win.component.html',
    providers: [ServiceProviderService]
})

export class SpInfoConfigWeixinWinComponent implements OnInit {
    public weixinForm: FormGroup;
    public model: SpWeixinModel = new SpWeixinModel();
    public chanCode:any; // 面板传入服务商编号
    isLoadingOne = false;

    constructor(
        public helper: HelperService,
        public msg: NzMessageService,
        public spService: ServiceProviderService,
        public i18n:I18NService,
        public fb:FormBuilder,
        public subject: NzModalSubject,
    ) {}

    ngOnInit() {
        /**
         * 响应式表单配置
         * @type {FormGroup}
         */
        this.weixinForm = this.fb.group({
            subAppid: [this.model.subAppid, Validators.required],
            subscribeAppid: [this.model.subscribeAppid, Validators.required],
            jsapiPath: [this.model.jsapiPath, [Validators.required,this.jsapiPathValidator]]
        });

        if(!this.helper.isEmpty(this.chanCode)){
            this.model.chanCode = this.chanCode;
        }
    }


    /**
     * 表单提交
     */
    _submitForm() {
        this.isLoadingOne = true;
        if(this.weixinForm.valid){
                // 判断新增还是修改公众号配置
            let postData = this.model['id'] ? this.spService.updateSPWxConfig(this.model) : this.spService.addSPWxConfig(this.model);
            postData.subscribe(res => {
                this.isLoadingOne = true;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.subject.destroy('onOk');
                }else{
                    this.msg.warning(res[CommonEnum.SERVER_MES_KEY]); // 弹出后台错误信息
                }
            })
        };
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.weixinForm.controls[ name ];
    }

    /**
     * 验证支付授权目录
     */
    public jsapiPathValidator = (control: FormControl):{ [s: string]: boolean } => {
        if(control && control.value){
            let _val = control.value;
            let _arr:Array<any> = _val.split('|');
            if(_arr.length > 5){
                return { limitError:true,error:true };
            }
        }
    };

    /**
     * 关联公众号与推荐关联公众号联动事件
     */
    public onSubAppidBlur() {
        if(this.helper.isEmpty(this.model['subscribeAppid'])){
            this.model['subscribeAppid'] = this.model['subAppid'];
        }
    }
}
