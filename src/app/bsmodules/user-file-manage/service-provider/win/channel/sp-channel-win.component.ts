import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {SpChannelModel} from "../../../../../common/model/user-file-manage/service-provide/sp-channel.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {HelperService} from "../../../../../common/services/helper.service";
import {CommonService} from "../../../../../common/services/request/common.service";
import {SearchWindowConfig, SimpleTableService, DynamicStepsService} from "@delon/abc";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {NzMessageService, NzModalSubject, ObjectExtend} from "ng-zorro-antd";
import {MenuService} from "@delon/theme";
import {Observable} from "rxjs/Observable";

/**
 * 服务商渠道配置弹窗
 */
@Component({
    selector:'sp-channel-win',
    templateUrl:'./sp-channel-win.component.html',
    providers: [SimpleTableService, ServiceProviderService, DynamicStepsService]
})
export class SpChannelWinComponent implements OnInit, AfterContentChecked{
    public model: SpChannelModel = new SpChannelModel();
    public SpChannelFormGroup: FormGroup;
    public states: Array<any>; // 启用状态
    public cycles: Array<any>; // 结算周期
    public payType: Observable<any>; // 支付类型

    public chanCode: any; // 传入的服务商编号
    public bankCode: any; // 传入的银行编号
    public bankName:any; // 传入的银行名称
    public parentChanCode: any; // 传入的上级编号
    public categoryTypeGroup: any; // 传入的行业类别
    public tableData: any; // 传入的表格数据
    public step: any; // 新增服务商时必传入
    public id:any; // 详情页点击编辑必传

    public transFlag: boolean = false;
    isLoadingOne = false;
    isUloFlag = true; // 所属银行是否禁用标识

    constructor(
        public fb: FormBuilder,
        public i18n: I18NService,
        public helper: HelperService,
        public commonDB: CommonService,
        public ServiceProvideDB: ServiceProviderService,
        public subject: NzModalSubject,
        public msg: NzMessageService,
        public dynamicStepsService: DynamicStepsService,
        public menuService: MenuService,
        public objExtend:ObjectExtend,
        public changeDetectorRef: ChangeDetectorRef
    ) {
        this.states = this.helper.getDictByKey('ENABLE_STATUS');    // 启用状态
        this.cycles = this.helper.getDictByKey('BALANCE_DATE');     // 结算周期
        this.model.used = 1; // 默认启用状态为启用
        this.model.settleCycle = 1; // 默认结算周期为T+1
    }

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * 通道类型控件配置
     */
    public ptCenterCfg: SearchWindowConfig = {
        title:this.i18n.fanyi('SP.detailPage.channelCfg.channelWin.title'),
        url: CommonService.PAYCENTER_INFO_URL,
        isAjax:false,
        params:null,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'name',
            label: this.i18n.fanyi('SP.searchInput.ptCenterName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('SP.searchInput.ptCenterName'),
            index: 'name'
        }]
    };

    /**
     * 所属银行控件配置
     */
    public agencyCodeCfg:SearchWindowConfig = {
        title: this.i18n.fanyi('SP.detailPage.channelCfg.agencyCodeCfg.title'),
        url: CommonService.BANKINFO_URL,
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'orgNo',
            label: this.i18n.fanyi('SP.detailPage.channelCfg.agencyCodeCfg.agencyCode')
        }, {
            field: 'name',
            label: this.i18n.fanyi('SP.detailPage.channelCfg.agencyCodeCfg.agencyName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('SP.detailPage.channelCfg.agencyCodeCfg.agencyCode'),
            index: 'orgNo'
        }, {
            title: this.i18n.fanyi('SP.detailPage.channelCfg.agencyCodeCfg.agencyName'),
            index: 'name'
        }]
    };

    ngOnInit() {
        this.SpChannelFormGroup = this.fb.group({
            transId: [this.model.transId, [Validators.required]],                   // 支付类型
            agencyCode:[this.model.agencyCode,Validators.required],                 // 所属银行
            ptCenterId: [this.model.ptCenterId, [Validators.required]],             // 通道类型
            providerNo: [this.model.providerNo],                                    // 渠道编号
            ally: [this.model.ally],                                                // 第三方平台商户号
            pcmPartkey: [this.model.pcmPartkey],                                    // 第三方平台商户号密钥
            used: [this.model.used, [Validators.required]],                         // 启用状态
            limitDay: [this.model.limitDay, [this.numberValidator]],                // 单日限额(元)
            limitSingleMin: [this.model.limitSingleMin, [this.numberValidator]],    // 单笔限额最小值(元)
            thirdAppid: [this.model.thirdAppid],                                    // 商户APPID
            settleCycle: [this.model.settleCycle, [Validators.required]],           // 结算周期
            settleRate: [this.model.settleRate, [Validators.required, this.numberValidator]],             // 结算费率
            limitSingle: [this.model.limitSingle, [this.numberValidator]],          // 单笔限额最大值(元)
        });

        this.model.merchantId = this.chanCode; // 服务商编号
        this.model.categoryTypeGroup = this.categoryTypeGroup; // 行业类别
        this.model.parentChanCode = this.parentChanCode; // 上级编号
        this.payType = this.commonDB.loadTradeType({
            parentChanNo:this.parentChanCode,
            categoryType:this.categoryTypeGroup,
            userNo: this.chanCode
        }); // 支付类型

        /**
         * 所属银行禁用与否
         */
        if(this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.bankCode)){
            // 优络下面放开所属银行
            this.isUloFlag = false;
        }else{
            // 非优络所属银行禁用，银行编号，银行名称由列表页传入
            this.model.agencyCode = this.bankCode; // 所属银行编号
            this.model.agencyName = this.bankName; // 所属银行名称
        }

        /**
         * 详情页点编辑进来请求单条渠道信息数据
         */
        if(!this.step && this.id){
            this.ServiceProvideDB.loadChannelOne({id: this.id}).subscribe((res) => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                    this.transFlag = true;
                    // 单笔限额、单日限额除以100
                    this.model.limitDay = this.helper.isEmpty(this.model.limitDay) ? null : this.helper.numberTrans(this.model.limitDay,'division',100);
                    this.model.limitSingleMin = this.helper.isEmpty(this.model.limitSingleMin) ? null : this.helper.numberTrans(this.model.limitSingleMin,'division',100);
                    this.model.limitSingle = this.helper.isEmpty(this.model.limitSingle) ? null : this.helper.numberTrans(this.model.limitSingle,'division',100);
                }
            })
        }

        /**
         * 新增下一步页面中判断是新增还是编辑进来
         */
        if(this.model['table_id']){
            // 编辑
            this.transFlag = true;
        };
    }

    /**
     * 支付类型选择事件
     * @param params
     */
    onTransSelect(params: any) {
        let _ptCenterName = this.model.ptCenterName;
        this.model.transId = params['nzValue'];
        this.model.transType = params['nzLabel'];
        if(this.model['table_id']) {
            this.model.ptCenterName = _ptCenterName;
            return;
        }
        /**
         * 新增选择支付类型清空通道类型
         */
        if(params['nzOldValue'] && params['nzOldValue']['nzValue'] != this.model.transId) {
            // 清空通道类型
            this.model.ptCenterName = null;
            this.model.ptCenterId = null;
            if(!this.isUloFlag){
                // 清空所属银行
                this.model.agencyName = null;
                this.model.agencyCode = null;
            }
            // 清空渠道编号
            this.model.providerNo = null;
            // 清空第三方平台商户号
            this.model.ally = null;
            // 清空第三方平台商户号密钥
            this.model.pcmPartkey = null;
        }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.SpChannelFormGroup.controls[name];
    }


    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            // var req = /^[0-9]*$/;//整数
            var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }

    /**
     * 通道类型查询前事件
     * @param val
     * @returns {boolean}
     */
    onPtCenterIdBefore(val) {
        if(this.helper.isEmpty(this.model.transId)) {
            // 请先选择支付类型
            this.msg.warning(this.i18n.fanyi('SP.hint.isTransId'));
            return false;
        }
        if(this.helper.isEmpty(this.model.agencyCode)){
            // 请选择所属银行
            this.msg.warning(this.i18n.fanyi('SP.hint.isBank'));
            return false
        }
        this.ptCenterCfg.params = {
            transId:this.model.transId,
            parentChanCode:this.model.parentChanCode,
            bankNo:this.model.agencyCode,
            categoryType:this.categoryTypeGroup
        };
        this.ptCenterCfg.isAjax = true;
        return true;
    }

    /**
     * 通道类型选中事件
     */
    onPtCenterIdSelected(value:any){
        if(!this.helper.isEmpty(value.name)){
            this.model['ptCenterName'] = value.name;  // 通道名称
        }
        if(!this.helper.isEmpty(value.providerNo)){
            this.model['providerNo'] = value.providerNo; // 渠道编号
        }
        if(!this.helper.isEmpty(value.otherCenterId)){
            this.model['otherCenterId'] = value.otherCenterId; // 后台需要这个参数
        }
        if(!this.helper.isEmpty(value.otherCenterBank)){
            this.model['otherCenterBank'] = value.otherCenterBank; // 后台需要这个参数
        }
        if(!this.helper.isEmpty(value.ally)){
            this.model['ally'] = value.ally; // 第三方平台商户号
        }
        if(!this.helper.isEmpty(value.pcmPartkey)){
            this.model['pcmPartkey'] = value.pcmPartkey; // 第三方平台商户号密钥
        }
    }

    /**
     * 保存
     * @returns {boolean}
     */
    onSubmit() {
        // 单笔限额与单日限额的比较
        let _day = this.model['limitDay'], // 单日限额
            _min = this.model['limitSingleMin'], // 单笔限额最小
            _max = this.model['limitSingle'];// 单笔限额最大
        if ((_max !== null && _day !== null) && _max*1 > _day*1) {
            // '单日限额需大于单笔限额最大值！';
            this.msg.warning(this.i18n.fanyi('Agency.addPage.tips.limitDayAndMaxTip'));
            return false;
        }
        if ((_min !== null && _day !== null) && _min*1 > _day*1) {
            // '单日限额需大于单笔限额最小值！';
            this.msg.warning(this.i18n.fanyi('Agency.addPage.tips.limitDayAndMinTip'));
            return false;
        }
        if ((_min !== null && _max !== null) && _min*1 > _max*1) {
            // '单笔限额最大值需大于单笔限额最小值！';
            this.msg.warning(this.i18n.fanyi('Agency.addPage.tips.limitMinAndMaxTip'));
            return false;
        }

        // 单日限额的最大限制
        if(_day * 100 > 2147483647){
            this.msg.warning(this.i18n.fanyi('SP.win.channnel.limitDayTip'));
            return false;
        }

        // 单笔限额最小值的最大限制
        if(_min * 100 > 2147483647){
            this.msg.warning(this.i18n.fanyi('SP.win.channnel.limitMinTip'));
            return false;
        }

        // 单笔限额最大值的最大限制
        if(_max * 100 > 2147483647){
            this.msg.warning(this.i18n.fanyi('SP.win.channnel.limitMaxTip'));
            return false;
        }

        let condition = (this.step && this.step == 'channelStep') ? 'table_id' : 'id';
        //  判断支付类型、行业类别不能同时重复
        let hasDataSourceInTransId = this.tableData.find((item)=>{
            let flag = false;
            let _tmpTransId = this.objExtend.isArray(item['transId']) ? item['transId'].join(',') : item['transId'];
            // 如果表格中某条数据里的table_id和弹框里的table_id不相同，继续判断
            if((this.model[condition] != item[condition]) && !this.helper.isEmpty(this.model['transId']) && _tmpTransId.indexOf(this.model['transId']) != -1 && this.model['ptCenterId'] == item['ptCenterId']){
                flag = true;
            }
            return flag;
        });
        if(hasDataSourceInTransId){
            this.msg.warning(this.i18n.fanyi('SP.hint.transAndCenter'));
            return false;
        }

        if(this.step){
            // 新增页中保存临时渠道信息
            this.onSaveTmpChannel();
        }else{
            // 详情页提交渠道信息
            this.onPostChannel();
        }
    }

    /**
     * 保存临时渠道信息
     */
    onSaveTmpChannel(){
        this.isLoadingOne = true;
        if(this.SpChannelFormGroup.valid){
            this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
            this.isLoadingOne = false;
            this.subject.next(this.model);
            this.subject.destroy('onOk');
        }
    }

    /**
     * 发送渠道信息（单条）
     */
    onPostChannel(){
        this.isLoadingOne = true;
        this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'multiplication',100);
        this.model['limitSingle'] = this.helper.isEmpty(this.model['limitSingle']) ? null : this.helper.numberTrans(this.model['limitSingle'],'multiplication',100);
        this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'multiplication',100);
        if(this.SpChannelFormGroup.valid){
            this.ServiceProvideDB.addAndEditChannel(this.model).subscribe(res => {
                this.isLoadingOne = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.subject.destroy('onOk');
                }else{
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'division',100);
                    this.model['limitSingle'] = this.helper.isEmpty(this.model['limitSingle']) ? null : this.helper.numberTrans(this.model['limitSingle'],'division',100);
                    this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'division',100);
                }
            })
        }
    }

    /**
     * 所属银行选中事件
     */
    onAgencyCodeSelected(value:any){
        this.model.agencyCode = value['orgNo'];
        this.model.agencyName = value['name'];
        this.model.ptCenterId = null;
        this.model.ptCenterName = null;
        this.model.providerNo = null;
    }

    /**
     * 所属银行搜索前置条件
     */
    onAgencyCodeSearchBefore(){
        if(!this.model.transId){
            this.msg.warning(this.i18n.fanyi('SP.detailPage.channelCfg.channelWin.tip'));
            return false
        }
    }
}
