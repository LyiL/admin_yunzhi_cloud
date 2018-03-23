import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {ServiceProviderService} from '../../../../../common/services/request/user-file-manage/service-provider.service';
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../../common/services/helper.service';
import {SearchWindowConfig} from '@delon/abc';
import {CommonEnum} from '../../../../../common/enum/common.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../../common/services/request/common.service';
import {SpTotalChannelModel} from '../../../../../common/model/user-file-manage/service-provide/sp-totalChannel.model';

/**
 * 服务商总通道配置弹窗
 */
@Component({
    selector: 'sp-total-channel-win',
    templateUrl: './sp-totalChannel-win.component.html',
    providers: [ServiceProviderService]
})
export class SpTotalChannelWinComponent implements OnInit {
    public totalChannelForm:FormGroup;
    public model:SpTotalChannelModel = new SpTotalChannelModel();
    public proNo:any; // 传入服务商编号
    public tableData:any;// 传入总通道表单数据
    public step:string; // 新增页传入，详情页则不传入
    isLoadingOne = false;

    /**
     * 银行控件配置
     */
    public bankNoCfg: SearchWindowConfig = {
        title:this.i18n.fanyi('SP.win.totalChannel.bankNoCfg.title'),
        url:CommonService.BANKINFO_URL,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field: 'orgNo',
            label:this.i18n.fanyi('SP.win.totalChannel.bankNoCfg.bankNo')
        },{
            field: 'name',
            label:this.i18n.fanyi('SP.win.totalChannel.bankNoCfg.bankName')
        }],
        tableColumns:[{
            title: this.i18n.fanyi('SP.win.totalChannel.bankNoCfg.bankNo'),
            index: 'orgNo'
        },{
            title: this.i18n.fanyi('SP.win.totalChannel.bankNoCfg.bankName'),
            index: 'name'
        }]
    };

    constructor(
        public subject: NzModalSubject,
        public i18n:I18NService,
        public helper:HelperService,
        protected fb:FormBuilder,
        public spService:ServiceProviderService,
        public msg:NzMessageService
    ) {
        this.model.applyState = 0; // 默认同步状态为初始
    }

    ngOnInit(){
        this.totalChannelForm = this.fb.group({
            bankNo:[this.model.bankNo,Validators.required]
        });

        if(!this.helper.isEmpty(this.proNo)){
            this.model['proNo'] = this.proNo; // 新增时把服务商编号赋值给模板
        }
    }

    /**
     * 银行选中事件
     */
    onBankNoSelected(value:any){
        this.model['bankName'] = value['name'];
    }

    /**
     * 提交表单
     * @private
     */
    _submitForm(){
        // 新增下一步中对比条件是this.model['table_id']，详情中是this.model['acntId']
        let condition = (this.step && this.step == 'channelStep')?'table_id':'id';
        let hasBank = this.tableData.find((item)=>{
            let flag = false;
            if (!(this.model[condition] == item[condition]) && (this.model['bankName'] == item['bankName'] || this.model['bankNo'] == item['bankNo'])) {
                flag = true;
            }
            return flag;
        });
        if(hasBank){
            this.msg.warning(this.i18n.fanyi('SP.win.totalChannel.bankTip'));
            return false;
        }

        if(this.step){
            // 新增下一步中打开弹框
            this.saveTmpTotalChannel();
        }else{
            // 详情中打开弹框
            this.saveTotalChannel();
        }
    }

    /**
     * 详情页保存单条总通道配置信息
     */
    saveTotalChannel(){
        this.isLoadingOne = true;
        if(this.totalChannelForm.valid){
            this.spService.editTotalChannel(this.model).subscribe(res => {
                this.isLoadingOne = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.subject.destroy('onOk'); //传'onOk'为了做刷新
                } else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }
    }

    /**
     * 新增页保存单条总通道配置信息
     */
    saveTmpTotalChannel(){
        this.isLoadingOne = true;
        if (this.totalChannelForm.valid) {
            this.isLoadingOne = false;
            this.subject.next(this.model);
            this.subject.destroy();
        }
    }

    /**
     * 获取表单项
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.totalChannelForm.controls[name];
    }
}
