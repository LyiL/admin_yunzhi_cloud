import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {DynamicStepsService, SearchWindowConfig} from "@delon/abc";
import {AgencyBaseInfoModel} from "../../../../common/model/user-file-manage/agency/agency-base-info.model";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {CommonService} from "../../../../common/services/request/common.service";
import {HelperService} from "../../../../common/services/helper.service";
import {Observable} from "rxjs/Observable";
import {AgencyService} from "../../../../common/services/request/user-file-manage/agency.service";
import {NzLocaleService, NzMessageService, ObjectExtend} from "ng-zorro-antd";
import {MenuService, SettingsService} from "@delon/theme";
import {Router} from "@angular/router";
import * as moment from 'moment';

/**
 * 代理商新增基本信息（step1）
 */
@Component({
    selector:'agency-base-info',
    templateUrl:'./agency-base-info.component.html'
})
export class AgencyBaseInfoComponent implements OnInit,AfterContentChecked{
    public provinces:Observable<any>; //省份
    public citys:Observable<any>;//城市
    public areas:Observable<any>;//区县
    public cTypeGroups:Observable<any>;//所属行业 - 类别
    public categoryTypes:Observable<any>;//所属行业 - 名称
    public contactsTypes:Observable<any>;//负责人类型数据

    public agencyTypes:Observable<any>;//代理类型
    public shareRules:Observable<any>; //分润规则
    public certificateTypes:Observable<any>;//商户证件类别
    public line: string = '-';
    public stepData:any;//接收步骤跳转时传递的数据
    public agencyBaseInfoFormGroup: FormGroup;
    public model:AgencyBaseInfoModel = new AgencyBaseInfoModel();
    public isLoading:boolean = false;//按钮加载效果

    //文件上传控件配置
    public defFieldUploadSetting : any = {
        url:'/assets/upload',
        fileSuffix:'.jpg;.jpeg;.png;.gif;'
    };

    /**
     * 所属机构控件配置
     */
    public bankCodeTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Agency.listPage.bankCodeCfg.title'),
        url:CommonService.BANKINFO_URL,
        params:{},
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
     * 上级代理控件配置
     */
    public parentChanCodeTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Agency.listPage.parentChanCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        params:{examState:1,chanType:0},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanCode')
        },{
            field:'name',
            label:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanCode'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanName'),
            index:'name'
        }]
    };

    /**
     * 所属业务员控件配置
     */
    public salesmanNoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Agency.listPage.salesManCfg.title'),
        url:CommonService.SALESMAN_INFO_URL,
        params:{},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'salesmanId',
            label:this.i18n.fanyi('Agency.listPage.salesManCfg.salesmanId')
        },{
            field:'realName',
            label:this.i18n.fanyi('Agency.listPage.salesManCfg.realName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Agency.listPage.salesManCfg.salesmanId'),
            index:'salesmanId'
        },{
            title:this.i18n.fanyi('Agency.listPage.salesManCfg.realName'),
            index:'realName'
        }]
    };
    constructor(protected fb: FormBuilder,
                protected dynamicStepsService:DynamicStepsService,
                public i18n:I18NService,
                public helper:HelperService,
                protected commonDB:CommonService,
                protected agencyService:AgencyService,
                public message: NzMessageService,
                public menuService:MenuService,
                public router:Router,
                public objExtend:ObjectExtend,
                public changeDetectorRef: ChangeDetectorRef,
                public settingService:SettingsService,
                public log:NzLocaleService,
    ) {}

    ngOnInit() {
        this.agencyBaseInfoFormGroup = this.fb.group({
            bankCode:[this.model.bankCode, [Validators.required]],                                                      //所属机构(修改时为只读)
            parentChanCode:[this.model.parentChanCode],                                                                 //上级代理(修改时为只读)
            appCode:[this.model.appCode, [Validators.required]],                                                        //代理类型
            name:[this.model.name, [Validators.required]],                                                              //企业名称
            shortName:[this.model.shortName, [Validators.required]],                                                    //企业简称
            orgEmail:[this.model.orgEmail, [Validators.required,Validators.email]],                                     //企业邮箱
            orgWebsite:[this.model.orgWebsite, [Validators.required]],                                                  //企业网站
            province:[this.model.province, [Validators.required]],                                                      //省份编码
            city:[this.model.city, [Validators.required]],                                                              //城市编码
            county:[this.model.county, [Validators.required]],                                                          //区县编码
            comAddress:[this.model.comAddress, [Validators.required]],                                                  //经营地址
            certificateType:[this.model.certificateType, [Validators.required]],                                        //商户证件类型
            linenceNo:[this.model.linenceNo, [Validators.required]],                                                    //商户证件编号
            linenceTermStart:[this.model.linenceTermStart],                                                             //证件有效期开始日期
            linenceTermEnd:[this.model.linenceTermEnd],                                                                 //证件有效期结束日期
            shareRule:[this.model.shareRule, [Validators.required]],                                                    //分润规则，0否1是
            categoryTypeGroup:[this.model.categoryTypeGroup],                                                           //所属行业 - 类别
            categoryType:[this.model.categoryType, [Validators.required]],                                              //所属行业 - 名称
            customerPhone:[this.model.customerPhone, [Validators.required,this.fixPhoneValidator]],  //客服电话
            salesmanNo:[this.model.salesmanNo],                                                                         //所属业务员
            operator:[this.model.operator, [Validators.required]],                                                      //负责人姓名
            operatorIdno:[this.model.operatorIdno, [Validators.required,this.IDcardValidator]],                         //负责人身份证号码
            operatorPhone:[this.model.operatorPhone, [this.phoneValidator]],                                            //负责人手机
            operatorEmail:[this.model.operatorEmail,[this.emailValidator]],                                             //负责人邮箱
            contactsType:[this.model.contactsType, [Validators.required]],                                              //负责人类型
            linkman:[this.model.linkman, [Validators.required]],                                                        //联系人姓名
            phone:[this.model.phone, [Validators.required,this.phoneValidator]],                                        //联系人手机
            email:[this.model.email, [Validators.required,Validators.email]],                                           //联系人邮箱
            linenceImg:[this.model.linenceImg, [Validators.required]],                                                  //营业执照
            orgAccountImg:[this.model.orgAccountImg, [Validators.required]],                                            //开户许可证
            indentityImg:[this.model.indentityImg, [Validators.required]],                                              //身份证正面
            indentityBackImg:[this.model.indentityBackImg, [Validators.required]],                                      //身份证背面
            bankCardImg:[this.model.bankCardImg, [Validators.required]],                                                //银行卡照片
        });
        this.agencyTypes = Observable.of(this.helper.getDictByKey('PROXY_TYPE'));//代理类型
        this.shareRules = Observable.of(this.helper.getDictByKey('PAYCENTER_CH_TYPE'));//分润规则
        this.certificateTypes = Observable.of(this.helper.getDictByKey('CERTIFICATE_TYPE'));//商户证件类型
        this.cTypeGroups = Observable.of(this.helper.getDictByKey('MCH_TYPE'));//所属行业 - 类别
        this.contactsTypes = Observable.of(this.helper.getDictByKey('CONTACTS_TYPE'));//负责人类型数据
        this.provinces = this.commonDB.loadProvince(); //省份

        //从账户信息页面跳过来
        let _stepData = this.dynamicStepsService.getStepByInstance(1);
        if(_stepData && _stepData.stepData){
            this.stepData = _stepData.stepData.model;
            this.loadBasicInfo(this.stepData['id'],this.stepData['chanCode']);
            this.salesmanNoTableCfg.params = {channelId:this.stepData['parentChanCode']};
        }
        this.log.debug('this.stepData:::;',this.stepData);

        //详情页面点编辑进来
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let params = menu['params'];
            this.loadBasicInfo(params['id'],params['chanCode']);
            this.salesmanNoTableCfg.params = {channelId:params['parentChanCode']};
        }

    }
    //加载基本信息
    public loadBasicInfo(idParams:any,chanParams:any){
        this.agencyService.loadInfo({id: idParams,chanCode: chanParams}).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.model = res[CommonEnum.SERVER_DATA_KEY];
                this.model.categoryTypeGroup = parseInt(this.model.categoryType == null?'1':this.model.categoryType[0]);
                this.categoryTypes = this.commonDB.loadIndustryData({ parent: this.model.categoryTypeGroup });
            }
        });
    }

    ngAfterContentChecked(){
        this.changeDetectorRef.detectChanges();
    }

    /**
     * 证件有效期结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public agencyLicenceEndDateDisabled(endValue:any){
        if(this.model.linenceTermStart){
            if(!endValue || !this.model.linenceTermEnd){
                return false;
            }
            return endValue < this.helper.modifyDateByDay(this.model.linenceTermStart);
        }
    }
    // public onLinenceTermStartModelChange(values:any){
    // this.log.debug('values::',values);
    // this.model.linenceTermStart = Date.parse(values);
    // this.model.linenceTermStart = new Date(values).getTime();
    // this.log.debug('shijian',this.model.linenceTermStart)
    // }

    /**
     * 省份内容变更事件
     * @param optionChange
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
            let _city = this.agencyBaseInfoFormGroup.controls['city'];
            let _county = this.agencyBaseInfoFormGroup.controls['county'];
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
     * @param optionChange
     */
    onCitySelected(value){
        let _val = value['nzValue'];
        let _lab = value['nzLabel'];
        let _data = value['nzData'];
        this.model.cityName = _lab;
        this.model.cityAdCode = _data;
        this.areas = this.commonDB.loadCounty(_val);
        //清空区
        if(value['nzOldValue'] && value['nzOldValue']['nzValue'] != this.model.city){
            let _county = this.agencyBaseInfoFormGroup.controls['county'];
            _county.reset(null);
            _county.markAsDirty();
            _county.updateValueAndValidity();
        }

    }

    /**
     * 区县内容变更事件
     * @param optionChange
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
            let _categoryType = this.agencyBaseInfoFormGroup.controls['categoryType'];
            //清空所属行业名称
            _categoryType.reset(null);
            _categoryType.markAsDirty();
            _categoryType.updateValueAndValidity();
        }
        // this.log.debug("value.nzOldValue:::",value.nzOldValue);
    }
    /**
     *所属机构选中事件
     */
    public onSelectBankCode(value) {
        this.model.bankName = value['name'];
        //给上级代理添加过滤字段;重新选择后清空上级代理
        this.parentChanCodeTableCfg.params = this.objExtend.extend(this.parentChanCodeTableCfg.params,{bankCode:value['orgNo']});
        this.model.parentChanCode = '';
        this.model.parentChanName = '';
    }
    /**
     *上级代理查询前事件
     */
    public onSearchParentChanBefore(){
        if(!this.model.bankCode){
            //请先选择所属机构！
            this.message.warning(this.i18n.fanyi('Agency.detailPage.detail.tips.parentChanSearchBeforeTip'));
            return false;//不打开弹框
        }
        return true;//打开弹框
    }
    /**
     *上级代理选中事件
     */
    public onSelectParent(value){
        this.model.parentChanName = value['name'];
        //给所属业务员添加过滤字段;重新选择后清空业务员
        this.salesmanNoTableCfg.params = {channelId:value['chanCode']};
        this.model.salesmanNo = '';
        this.model.salesmanName = '';
    }
    /**
     *所属业务员查询前事件
     */
    public onSearchSalesmanBefore(val){
        if(!this.model.parentChanCode){
            //请先选择上级代理！
            this.message.warning(this.i18n.fanyi('Agency.detailPage.detail.tips.salesmanSearchBeforeTip'));
            return false;//不打开弹框
        }
        return true;//打开弹框
    }
    /**
     *所属业务员选中事件
     */
    public onSelectSalesman(value){
        this.model.salesmanName = value['realName'];
        // this.model.salesmanNo = value.salesmanId;
    }


    //判断保存事件
    onSaveBaseInfo(){
        if(this.hasSource()){
            this.onSaveToNext();//新增保存并下一步
        }else{
            this.onSaveToDetail();//保存跳回详情页面
        }
        // this.onSaveToNext();
    }

    /**
     *保存并下一步
     */
    onSaveToNext() {
        this.isLoading = true;
        if(this.agencyBaseInfoFormGroup.valid){
            this.agencyService.saveAgencyBaseInfo(this.model).subscribe(res=>{
                this.isLoading = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                    this.dynamicStepsService.nextStep();//下一步
                }else{
                    if(res['errors']){
                        this.message.warning(this.i18n.fanyi('default.hint.saveFail'));
                    }else{
                        this.message.error(res['message']);
                    }
                }
            });
        }
    }

    /**
     * 保存页面跳回详情
     */
    onSaveToDetail(){
        this.isLoading = true;
        if(this.agencyBaseInfoFormGroup.valid){
            this.agencyService.saveAgencyBaseInfo(this.model).subscribe(res=>{
                this.isLoading = false;
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    let _data = res[CommonEnum.SERVER_DATA_KEY];
                    this.helper.navigate('/admin/user/agencydetail',this.i18n.fanyi('Agency.detailPage.detail.AgencyDetailTitle'),{id:_data['id'],chanCode:_data['chanCode'],name:_data['name'],orgId: _data['orgId'],categoryTypeGroup:_data['categoryTypeGroup'],bankCode: _data['bankCode']});//后面的参数必须传，否则保存基本信息后，去添加分润配置会有参数丢失，支付类型加载不出数据
                }else{
                    if(res[CommonEnum.SERVER_ERROR_KEY]){
                        this.message.warning(this.i18n.fanyi('default.hint.saveFail'));
                    }else{
                        this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                }
            });
        }
    }


    /**
     * 返回详情
     */
    onGoBack(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){//有值才进行赋值操作，否则会因为参数丢失导致报错
            let params = menu['params'];
            this.helper.navigate('/admin/user/agencydetail',this.i18n.fanyi('Agency.detailPage.detail.AgencyDetailTitle'),{id:params['id'],chanCode:params['chanCode'],name:params['name'],orgId: params['orgId']});
        }
    }

    getFormControl(name) {
        return this.agencyBaseInfoFormGroup.controls[name];
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
            var req = /^\d{3,4}-?\d{7,8}$/;//验证规则：区号+号码，3位或4位,号码由7位或8位数字组成,如：000-88888888 、0000-7777777（中间“-”可不填）
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
     * 文件上传错误信息
     * @param data
     */
    public onFileUploadError(data){
        if(data && data[CommonEnum.SERVER_MES_KEY]){
            this.message.warning(data[CommonEnum.SERVER_MES_KEY]);
        }
    }
    /**
     * 判断是新增还是详情页点编辑进来
     */
    public hasSource(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){//有menu['params']才进行赋值操作 不然刷新后会因参数丢失导致报错
            let params = menu['params'];
            if(!params || (params && this.helper.isEmpty(params['source'])) ){
                return true; //新增进来
            }else{
                return false;
            }
        };
    }
}
