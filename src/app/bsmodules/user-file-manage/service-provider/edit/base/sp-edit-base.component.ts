import {Component, OnInit} from "@angular/core";
import {DynamicStepsService, SearchWindowConfig, SimpleTableComponent, ImagePreviewService} from "@delon/abc";
import {NzMessageService, ObjectExtend} from "ng-zorro-antd";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {CommonService} from "../../../../../common/services/request/common.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {SpBaseInfoModel} from "../../../../../common/model/user-file-manage/service-provide/sp-info.model";
import {HelperService} from "../../../../../common/services/helper.service";
import {MenuService, SettingsService} from "@delon/theme";
import {Router} from "@angular/router";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";

/**
 * 服务商新增页-基本信息页
 */
@Component({
    selector: 'sp-edit-base',
    templateUrl: './sp-edit-base.component.html',
    providers: [ServiceProviderService]
})
export class SpEditBaseComponent implements OnInit {

    public provinces: Observable<any>;              //省份
    public citys: Observable<any>;                  //城市
    public areas: Observable<any>;                  //区县
    public cTypeGroups: Observable<any>;            //所属行业 - 类别
    public contactsTypes: Observable<any>;          //负责人类型数据
    public agencyTypes: Observable<any>;            //代理类型
    public shareRules: Observable<any>;             //分润规则
    public certificateTypes: Observable<any>;       //商户证件类别
    public settleStyles: Observable<any>;           //商户证件类别

    public line: string = '-'; // 连接符
    public stepData: any;//接收步骤跳转时传递的数据
    public categoryTypes: any;
    public salesmanName: any;

    public spInfoFormGroup: FormGroup;
    public model: SpBaseInfoModel = new SpBaseInfoModel();
    isLoadingOne = false;


    //文件上传控件配置
    public defFieldUploadSetting : any = {
        url:'/assets/upload',
        fileSuffix:'.jpg;.jpeg;.png;.gif;'
    };

    /**
     * 文件上传错误信息
     * @param data
     */
    public onFileUploadError(data){
        if(data && data['msg']){
            this.msg.warning(data['msg']);
        }
    }


    constructor(
        protected fb: FormBuilder,
                protected dynamicStepsService:DynamicStepsService,
                public i18n:I18NService,
                public helper:HelperService,
                protected commonDB:CommonService,
                public msg: NzMessageService,
                public menuService:MenuService,
                public router:Router,
                public imageService:ImagePreviewService,
                public spService: ServiceProviderService,
                public settingService:SettingsService,
                public objectExtend:ObjectExtend
    ) {
        this.settleStyles = Observable.of(this.helper.getDictByKey('SETTLE_STYLE_CONFIG'));
        this.agencyTypes = Observable.of(this.helper.getDictByKey('PROXY_TYPE'));               //代理类型
        this.shareRules = Observable.of(this.helper.getDictByKey('PAYCENTER_CH_TYPE'));         //分润规则
        this.certificateTypes = Observable.of(this.helper.getDictByKey('CERTIFICATE_TYPE'));    //商户证件类型
        this.cTypeGroups = Observable.of(this.helper.getDictByKey('MCH_TYPE'));
        this.contactsTypes = Observable.of(this.helper.getDictByKey('CONTACTS_TYPE'));          //负责人类型数据
        this.provinces = this.commonDB.loadProvince();                                          //省份
    }

    /**
     * 所属机构控件配置
     */
    public bankCodeTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Agency.listPage.bankCodeCfg.title'),
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('Agency.listPage.bankCodeCfg.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('Agency.listPage.bankCodeCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Agency.listPage.bankCodeCfg.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('Agency.listPage.bankCodeCfg.name'),
            index:'name'
        }]
    };

    /**
     * 所属上级控件配置
     */
    public parentChanCodeTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('SP.listPage.parentChanCfg.title'),
        url: CommonService.PARENTCHAN_INFO_URL,
        params: {examState: 1, chanType: 0},
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'chanCode',
            label: this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanCode')
        }, {
            field: 'name',
            label: this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanCode'),
            index: 'chanCode'
        }, {
            title: this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanName'),
            index: 'name'
        }]
    };

    /**
     * 所属业务员控件配置
     */
    public salesmanNoTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('SP.listPage.salesmanCfh.title'),
        url: CommonService.SALESMAN_INFO_URL,
        params: null,
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'salesmanId',
            label: this.i18n.fanyi('SP.listPage.salesmanCfh.salesmanId'),
        }, {
            field: 'realName',
            label: this.i18n.fanyi('SP.listPage.salesmanCfh.realName'),
        }],
        tableColumns: [{
            title: this.i18n.fanyi('SP.listPage.salesmanCfh.salesmanId'),
            index: 'salesmanId'
        }, {
            title: this.i18n.fanyi('SP.listPage.salesmanCfh.realName'),
            index: 'realName'
        }]
    };

    ngOnInit() {
        this.spInfoFormGroup = this.fb.group({
            bankCode:[this.model.bankCode, [Validators.required]],                                                                      //所属机构(修改时为只读)
            parentChanCode: [this.model.parentChanCode],                                                                                //所属上级
            name: [this.model.name, [Validators.required]],                                                                             //企业名称
            shortName: [this.model.shortName, [Validators.required]],                                                                   //企业简称
            orgEmail: [this.model.orgEmail, [Validators.required, Validators.email]],                                                   //企业邮箱
            orgWebsite: [this.model.orgWebsite, [Validators.required]],                                                                 //企业网站
            province: [this.model.province, [Validators.required]],                                                                     //省份编码
            city: [this.model.city, [Validators.required]],                                                                             //城市编码
            county: [this.model.county, [Validators.required]],                                                                         //区县编码
            address: [this.model.address, [Validators.required]],                                                                       //经营地址
            certificateType: [this.model.certificateType, [Validators.required]],                                                       //商户证件类型
            linenceNo: [this.model.linenceNo, [Validators.required]],                                                                   //商户证件编号
            linenceTermStart:[this.model.linenceTermStart],                                                                             //证件有效期开始日期
            linenceTermEnd:[this.model.linenceTermEnd],                                                                                 //证件有效期结束日期
            shareRule: [this.model.shareRule, [Validators.required]],                                                                   //分润规则，0否1是
            settleStyle: [this.model.settleStyle, [Validators.required]],                                                               //结算方式
            categoryTypeGroup: [this.model.categoryTypeGroup, [Validators.required]],                                                   //所属行业 - 类别
            categoryType: [this.model.categoryType, [Validators.required]],                                                             //所属行业 - 名称
            customerPhone: [this.model.customerPhone, [Validators.required, this.fixPhoneValidator]],                                   //客服电话
            salesmanNo: [this.model.salesmanNo],                                                                                        //所属业务员
            operator: [this.model.operator, [Validators.required]],                                                                     //负责人姓名
            operatorIdno: [this.model.operatorIdno, [Validators.required, this.IDcardValidator]],                                       //负责人身份证号码
            operatorPhone: [this.model.operatorPhone, [this.phoneValidator]],                                                           //负责人手机
            operatorEmail: [this.model.operatorEmail, [this.emailValidator]],                                                           //负责人邮箱
            contactsType: [this.model.contactsType, [Validators.required]],                                                             //负责人姓名
            linkman: [this.model.linkman, [Validators.required]],                                                                       //联系人名称
            phone: [this.model.phone, [Validators.required,this.phoneValidator]],                                                       //联系人手机
            email: [this.model.email, [Validators.required, Validators.email]],                                                         //联系人邮箱
            linenceImg: [this.model.linenceImg, [Validators.required]],                                                                 //营业执照
            orgAccountImg: [this.model.orgAccountImg, [Validators.required]],                                                           //开户许可证
            indentityImg: [this.model.indentityImg, [Validators.required]],                                                             //身份证正面
            indentityBackImg: [this.model.indentityBackImg, [Validators.required]],                                                     //身份证背面
            bankCardImg: [this.model.bankCardImg, [Validators.required]],
        });

        /**
         * 从账户信息页面跳过来
         */
        let _stepData = this.dynamicStepsService.getStepByInstance(1);
        if(_stepData && _stepData.stepData){
            this.stepData = _stepData.stepData.model;
            this.loadBasicInfo(this.stepData['id'],this.stepData['chanCode']);
            this.salesmanNoTableCfg.params = {channelId:this.stepData['parentChanCode']};
        }

        /**
         * 从详情页面点编辑进来
         * @type {Menu}
         */
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let params = menu['params'];
            if(params['source']){
                this.loadBasicInfo(params['id'],params['chanCode']);
                this.salesmanNoTableCfg.params = {channelId:params['parentChanCode']};
            }
        }
    }

    /**
     * 加载基本信息
     */
    public loadBasicInfo(idParams:any,chanParams:any){
        this.spService.loadInfo({id: idParams,chanCode: chanParams}).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.model = res[CommonEnum.SERVER_DATA_KEY];
                this.model.categoryTypeGroup = parseInt(this.model.categoryType == null? '1' :this.model.categoryType[0]);
                this.categoryTypes = this.commonDB.loadIndustryData({ parent: this.model.categoryTypeGroup });
            }
        });
    }

    /**
     *所属机构选中事件
     */
    public onSelectBankCode(value) {
        this.model.bankName = value['name'];
        //给上级代理添加过滤字段;重新选择后清空上级代理
        this.parentChanCodeTableCfg.params = this.objectExtend.extend(this.parentChanCodeTableCfg.params,{bankCode:value['orgNo']});
        this.model.parentChanCode = null;
        this.model.parentChanName = null;
    }

    /**
     * 上级代理查询前事件
     */
    onParentChanCodeBefore(){
        if(this.helper.isEmpty(this.model.bankCode)){
            this.msg.warning(this.i18n.fanyi('SP.detailPage.detail.tips.parentChanCodeTip'));
            return false; // 不打开弹框
        }
        return true; // 打开弹框
    }

    /**
     * 省份内容变更事件
     */
    onProvinceSelected(value){
        let _val = value['nzValue'];
        let _lab = value['nzLabel'];
        let _data = value['nzData'];
        this.model.provinceName = _lab;
        this.model.provinceAdCode = _data;
        this.citys = this.commonDB.loadCity(_val);

        //清空市、区
        if(value['nzOldValue'] && value['nzOldValue']['nzValue'] != this.model.province){
            let _city = this.spInfoFormGroup.controls['city'];
            let _county = this.spInfoFormGroup.controls['county'];
            _city.reset(null);
            _city.markAsDirty();
            _city.updateValueAndValidity();
            _county.reset(null);
            _county.markAsDirty();
            _county.updateValueAndValidity();
        }
    }

    /**
     * 城市内容变更事件
     */
    onCitySelected(value){
        let _val = value['nzValue'];
        let _lab = value['nzLabel'];
        let _data = value['nzData'];
        this.model.cityName = _lab;
        this.model.cityAdCode = _data;
        this.areas = this.commonDB.loadCounty(_val);
    }

    /**
     * 区县内容变更事件
     */
    onAreasSelected(value){
        let _lab = value['nzLabel'];
        let _data = value['nzData'];
        this.model.countyName = _lab;
        this.model.countyAdCode = _data;
    }

    /**
     * 所属行业类别内容变更事件
     */
    onCategoryTypeSelected(value){
        let _val = value['nzValue'];
        this.categoryTypes = this.commonDB.loadIndustryData({parent:_val});
        //清空所属行业名称;假如value['nzOldValue']有值才去做清空操作
        if(value['nzOldValue'] && value['nzOldValue']['nzValue'] != this.model.categoryTypeGroup){
            let _categoryType = this.spInfoFormGroup.controls['categoryType'];
            //清空所属行业名称
            _categoryType.reset(null);
            _categoryType.markAsDirty();
            _categoryType.updateValueAndValidity();
        }
    }

    /**
     *上级代理选中事件
     */
    public onSelectParent(value){
        this.model.parentChanName = value['name'];
        this.salesmanNoTableCfg.params = {channelId:value['chanCode']};
        // 清空业务员
        this.model.salesmanNo = null;
        this.model.salesmanName = null;
    }

    /**
     *所属业务员选中事件
     */
    public onSelectSalesman(value){
        this.model.salesmanName = value['realName'];
    }

    /**
     * 获取表单项
     * @param name
     * @returns {AbstractControl}
     */
    getFormControl(name) {
        return this.spInfoFormGroup.controls[ name ];
    }

    /**
     * 手机号码的校验器
     */
    phoneValidator(control: FormControl): any{
        if(control.value){
            var req = /^1[0-9]{10}$/;//验证手机号码为11位，且以1开头
            let valid = req.test(control.value);
            if(!valid){
                return {phoneError:true,error:true};
            }
        }
    }

    /**
     * 客服电话的校验器
     * 验证规则：区号+号码，区号以0开头，3位或4位,号码由7位或8位数字组成,如：000-88888888 、0000-7777777
     * 区号与号码之间可以无连接符，也可以“-”连接
     */
    fixPhoneValidator(control: FormControl){
        if(control.value){
            // var req = /^0\d{2,3}-?\d{7,8}$/;//验证规则：区号+号码，区号以0开头，3位或4位,号码由7位或8位数字组成,如：000-88888888 、0000-7777777
            var req = /^\d{3,4}-?\d{7,8}$/;//验证规则：区号+号码，3位或4位,号码由7位或8位数字组成,如：000-88888888 、0000-7777777
            // var req = /^\d{3}-\d{8}|\d{4}-\d{7}$/;//区号-本地号，如：000-88888888 、0000-7777777
            let valid = req.test(control.value);
            if(!valid){
                return {fixPhoneError:true,error:true};
            }
        }
    }

    /**
     * 身份证的校验器
     */
    IDcardValidator(control: FormControl){
        if(control.value){
            var req = /^\d{17}(\d|X)$/;//身份证号码（18位）
            let valid = req.test(control.value);
            if(!valid){
                return {IDcardError:true,error:true};
            }
        }
    }

    /**
     * 邮箱的校验器
     * “第一部分@第二部分”
     * 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
     * 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
     */
    emailValidator(control: FormControl){
        if(control.value){
            var req = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            let valid = req.test(control.value);
            if(!valid){
                return {emailError:true,error:true};
            }
        }
    }

    /**
     * 判断是新增还是编辑
     * @returns {boolean}
     */
    public hasSource(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let params = menu['params'];
            // 如果没有source，就是新增
            if(this.helper.isEmpty(params['source'])){
                return false;
            }else{
                return true;
            }
        }
    }

    /**
     * 开始时间事件
     * @param values
     */
    public onLinenceTermStartModelChange(values:any){
        this.model.linenceTermStart = values;
    }

    /**
     * 结束时间事件
     * @param values
     */
    public onLinenceTermEndModelChange(values:any){
        this.model.linenceTermEnd = values;
    }

    /**
     * 判断是点击新增服务商进来还是详情页点击编辑进来
     */
    onSaveBaseInfo() {
        if(this.hasSource()) {
            this.onSave();
        }else{
            this.onSaveAndNext();
        }
        // this.onSaveAndNext();
    }

    /**
     *  新增保存并下一步
     */
    onSaveAndNext() {
        this.isLoadingOne = true;
        this.spService.addOrModifyBaseInfo(this.model).subscribe(res => {
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.model = res[CommonEnum.SERVER_DATA_KEY];
                this.dynamicStepsService.nextStep();
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 编辑保存
     */
    onSave() {
        this.isLoadingOne = true;
        this.spService.addOrModifyBaseInfo(this.model).subscribe(res => {
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                let _data = res[CommonEnum.SERVER_DATA_KEY];
                this.helper.navigate('/admin/user/spdetail', this.i18n.fanyi('SP.listPage.title'), {
                    id:_data['id'],
                    orgId:_data['orgId'],
                    chanCode:_data['chanCode'],
                    bankCode: _data['bankCode'],
                    bankName:_data['bankName'],
                    categoryTypeGroup: _data['categoryTypeGroup'],
                    parentChanCode: _data['parentChanCode']
                });
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 所属业务上查询前提是有所属上级
     * @param val
     * @returns {boolean}
     */
    onSearchBefore(val) {
        if(!this.model.parentChanCode) {
            // 请先选择所属上级
            this.msg.warning(this.i18n.fanyi('SP.detailPage.detail.info.parentHint'));
            return false;
        }
        return true;
    }

    /**
     * 返回详情
     */
    onBack(){
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];
        this.helper.navigate('/admin/user/spdetail',this.i18n.fanyi('SP.detailPage.detail.title'),{id:params['id'],chanCode:params['chanCode'],name:params['name'],orgId: params['orgId']});
    }
}
