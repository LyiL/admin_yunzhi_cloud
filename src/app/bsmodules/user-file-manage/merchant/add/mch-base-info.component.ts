import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MchBaseInfoModel} from "../../../../common/model/user-file-manage/merchant/mch.base.info.model";
import {mchService} from "../../../../common/services/request/user-file-manage/mch.service";
import {DynamicStepsService, SearchWindowConfig} from '@delon/abc';
import {CommonService} from '../../../../common/services/request/common.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {Observable} from 'rxjs/Observable';
import {HelperService} from '../../../../common/services/helper.service';
import {NzMessageService, ObjectExtend} from 'ng-zorro-antd';
import {MenuService, SettingsService} from '@delon/theme';
import {Router} from '@angular/router';
/**
 * 新增商户基本信息页面
 */
@Component({
    selector:'mch-base-info',
    templateUrl:'./mch-base-info.component.html',
    providers:[mchService,CommonService]
})
export class MchBaseInfoComponent implements OnInit{
    public model:MchBaseInfoModel = new MchBaseInfoModel();
    public modelGroup: FormGroup;
    public provinces:Observable<any>; //省份
    public citys:Observable<any>;//城市
    public areas:Observable<any>;//区县
    public cTypeGroups: Observable<any>;//所属行业 - 类别
    public categoryTypes: Observable<any>;//所属行业 - 名称
    public certificateTypes: Observable<any>;//证件类别
    public contactsTypes: Observable<any>;//负责人类型数据
    public stepData:any;//接收步骤跳转时传递的数据
    public _chanName:string;
    //文件上传控件配置
    public defFieldUploadSetting : any = {
        url:'/assets/upload',
        fileSuffix:'.jpg;.jpeg;.png;.gif;'
    };
    /**
     * 行业类别
     */
    public mchRole: Array<any> = [];
    public isLoadingOne = false; // loading
    /**
     * 所属机构配置
     */
    public agencyCodeCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Mch.listPage.BankCfg.title'),
        url: CommonService.BANKINFO_URL,
        // params: {chanType: 0},
        isAjax: false,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'orgNo',
            label: this.i18n.fanyi('Mch.listPage.BankCfg.BankNo')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Mch.listPage.BankCfg.BankName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Mch.listPage.BankCfg.BankNo'),
            index: 'orgNo'
        }, {
            title: this.i18n.fanyi('Mch.listPage.BankCfg.BankName'),
            index: 'name'
        }]
    };
    /**
     * 所属上级控件配置
     */
    public line: string = '-';
    public chanNoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Mch.listPage.ChanCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        params:{examState: 1},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('Mch.listPage.ChanCfg.chanNo')
        },{
            field:'name',
            label:this.i18n.fanyi('Mch.listPage.ChanCfg.chanName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Mch.listPage.ChanCfg.chanNo'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('Mch.listPage.ChanCfg.chanName'),
            index:'name'
        }]
    };
    /**
     * 所属业务员
     */
    public creatorTableCfg:SearchWindowConfig ={
        title:this.i18n.fanyi('Mch.listPage.creatorCfg.title'),
        url:CommonService.SALESMAN_INFO_URL,
        // params:_parmas,
        params:{channelId:this.model.chanNo},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'salesmanId',
            label:this.i18n.fanyi('Mch.listPage.creatorCfg.salesmanId')
        },{
            field:'realName',
            label:this.i18n.fanyi('Mch.listPage.creatorCfg.realName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Mch.listPage.creatorCfg.salesmanId'),
            index:'salesmanId'
        },{
            title:this.i18n.fanyi('Mch.listPage.creatorCfg.realName'),
            index:'realName'
        }]
    };
    public roleType:any;        //roleType-------->1：总行 99：员工 2：分支机构 7：业务员
    public orgNumber:any; //机构编码
    constructor(
        public mchDB:mchService,public i18n:I18NService,public helper:HelperService,public msg: NzMessageService,
        public dynamicStepsService:DynamicStepsService, public router:Router, public settingService:SettingsService,
        public commonDB:CommonService, public objExtend:ObjectExtend,   public menuService:MenuService,public changeDetectorRef: ChangeDetectorRef,
    ){
        let userInfo = this.settingService.user;
        this.roleType = userInfo && userInfo['roleType'];
        this.orgNumber = userInfo && userInfo['orgNo'];
    }

    ngOnInit(){
        this.modelGroup = new FormGroup({
            'bankNo': new FormControl(this.model.bankNo,[Validators.required]),
            'name': new FormControl(this.model.name, [Validators.required]),                                  //企业名称
            'chanNo': new FormControl(this.model.chanNo),                         //所属上级
            'agencyName': new FormControl(this.model.agencyName),
            'shortName': new FormControl(this.model.shortName, [Validators.required]),                      //企业简称
            'orgEmail': new FormControl(this.model.orgEmail, [Validators.required,Validators.email]),                        //企业邮箱
            'orgWebsite': new FormControl(this.model.orgWebsite, [Validators.required]),                   //企业网站
            'province': new FormControl(this.model.province, [Validators.required]),                        //省份编码
            'city': new FormControl(this.model.city, [Validators.required]),                                  //  城市编码
            'county': new FormControl(this.model.county, [Validators.required]),                              //区县编码
            'comAddress': new FormControl(this.model.comAddress, [Validators.required]),                            //经营地址
            'certificateType': new FormControl(this.model.certificateType, [Validators.required]),          //商户证件类型
            'linenceNo': new FormControl(this.model.linenceNo, [Validators.required]),                        //商户证件号码
            'linenceTermStart':new FormControl(this.model.linenceTermStart),        //证件有效期开始时间
            'linenceTermEnd':new FormControl(this.model.linenceTermEnd),            //证件有效期结束时间
            // 'shareRule':new FormControl(this.model.shareRule,[Validators.required]),                        //分润规则，0否1是
            'mchRole': new FormControl(this.model.mchRole, [Validators.required]),                            //行业类别
            'categoryTypeGroup': new FormControl(this.model.categoryTypeGroup),                           //所属行业 - 类别
            'categoryType': new FormControl(this.model.categoryType, [Validators.required]),                    //所属行业 - 名称
            'customerPhone': new FormControl(this.model.customerPhone, [Validators.required,this.fixPhoneValidator]),//客服电话
            'creator': new FormControl(this.model.creator),                                          //所属业务员
            'operator': new FormControl(this.model.operator, [Validators.required]),                          //  负责人姓名
            'operatorIdno': new FormControl(this.model.operatorIdno, [Validators.required,this.IDcardValidator]),                  //负责人身份证号码
            'operatorPhone': new FormControl(this.model.operatorPhone, [this.phoneValidator]),                //负责人手机
            'operatorEmail': new FormControl(this.model.operatorEmail, [this.emailValidator]),                //负责人邮箱
            'contactsType': new FormControl(this.model.contactsType, [Validators.required]),                  //负责人类型
            'linkman': new FormControl(this.model.linkman, [Validators.required]),                              //联系人姓名
            'phone': new FormControl(this.model.phone, [Validators.required,this.phoneValidator]),                                  //联系人手机
            'email': new FormControl(this.model.email, [Validators.required,Validators.email]),                                  //联系人邮箱
            'linenceImg': new FormControl(this.model.linenceImg, [Validators.required]),                      //营业执照
            'orgAccountImg': new FormControl(this.model.orgAccountImg, [Validators.required]),                //开户许可证
            'indentityImg': new FormControl(this.model.indentityImg, [Validators.required]),                  //身份证正面
            'indentityBackImg': new FormControl(this.model.indentityBackImg, [Validators.required]),        //身份证背面
            'bankCardImg': new FormControl(this.model.bankCardImg, [Validators.required])
        });
        this.mchRole = this.helper.getDictByKey('PAY_MCH_ISBIGBUSI');
        this.provinces = this.commonDB.loadProvince(); //省份
        this.cTypeGroups = Observable.of(this.helper.getDictByKey('MCH_TYPE'));//所属行业 - 类别
        this.contactsTypes = Observable.of(this.helper.getDictByKey('CONTACTS_TYPE'));//负责人类型数据
        this.certificateTypes = Observable.of(this.helper.getDictByKey('CERTIFICATE_TYPE'));//商户证件类型

        //详情页面点编辑进来
          let menu = this.menuService.getUrlByMenu(this.router.url);
              if(menu && menu['params']){
                  let params = menu['params'];
                  if(params['source']){
                      this.loadBasicInfo(params['id']);
                      this.creatorTableCfg.params = {bankNo:params['bankNo'],channelId:params['chanNo']};
                  }
              }
        //从账户信息页面跳过来
        let _stepData = this.dynamicStepsService.getStepByInstance(1);
        if(_stepData && _stepData.stepData){
            this.stepData = _stepData.stepData.model;
            this.loadBasicInfo(this.stepData['id']);
            this.creatorTableCfg.params = {bankNo:this.stepData['bankNo'],channelId:this.stepData['chanNo']};
        }
    }

    // ngAfterContentChecked() {
    //     this.changeDetectorRef.detectChanges();
    // }
    public loadBasicInfo(idParams:any){
        this.mchDB.loadMchBaseInfoData({id:idParams}).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                // this.model = res['data'];
                this.model =res[CommonEnum.SERVER_DATA_KEY];
                this.model.categoryTypeGroup = parseInt(this.model.categoryType[0]);
                this.categoryTypes = this.commonDB.loadIndustryData({ parent: this.model.categoryTypeGroup });
                this.model.chanName = res[CommonEnum.SERVER_DATA_KEY]['chanName'];
                this.model.bankName = res[CommonEnum.SERVER_DATA_KEY]['bankName'];
            }
        });
    }
    /**
     *所属行业选中事件
     */
    onCategoryTypeSelected(value){
        this.categoryTypes = this.commonDB.loadIndustryData({parent: value.nzValue});
        //清空所属行业名称;假如value['nzOldValue']有值才去做清空操作
        if(value['nzOldValue'] && value['nzOldValue']['nzValue'] != this.model.categoryTypeGroup){
            let _categoryType = this.modelGroup.controls['categoryType'];
            //清空所属行业名称
            _categoryType.reset(null);
            _categoryType.markAsDirty();
            _categoryType.updateValueAndValidity();
        }
        // this.log.debug("value.nzOldValue:::",value.nzOldValue);
    }
    onCreatorSelected(value){

    }
    /**
     * 所属上级选中事件
     * @param value
     */
    onChanNOSelected(value){
        this.creatorTableCfg.params =  {channelId:value.chanCode};
        this.model.chanName = value.name;
        this.model.salesmanName = null;
        this.model.creator = null;

    }
    /**
     * 所属上级查询前事件事件
     * @param value
     */
    ChanNosearchBefore(){
        if(!this.model.bankNo){
            this.msg.warning(this.i18n.fanyi('Mch.tips.bankNo'));
            return false;
        }else {
            this.chanNoTableCfg.params = {examState:1,bankCode:this.model.bankNo};
        }
    }
    /**
     * 受理机构选中事件
     * @param value
     */
    agencyCodesearchSelected(value){
        this.model.bankNo = value.orgNo;
        this.model.chanName =null;
        this.model.chanNo =null;
        this.model.salesmanName = null;
        this.model.creator = null;
    }


    /**
     * 省份内容变更事件
     * @param optionChange
     */
    onProvinceSelected(value){
        this.model.provinceName =value.nzLabel;
        this.model.provinceAdCode=value['nzData'];
        this.citys = this.commonDB.loadCity(value.nzValue);
        //清空市、区
        if(value['nzOldValue'] && value['nzOldValue']['nzValue'] != this.model.province){
            let _city = this.modelGroup.controls['city'];
            let _county = this.modelGroup.controls['county'];
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
        this.model.cityName =value.nzLabel;
        this.model.cityAdCode=value['nzData'];
        this.areas = this.commonDB.loadCounty(value.nzValue);
        //清空区
        if(value['nzOldValue'] && value['nzOldValue']['nzValue'] != this.model.city){
            let _county = this.modelGroup.controls['county'];
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
        this.model.countyName =value.nzLabel;
        this.model.countyAdCode=value['nzData'];
    }

    _submitForm() {
        if(this.hasSource()){
            this.onSaveToNext();//新增保存并下一步
        }else{
            this.onSaveToDetail();//保存跳回详情页面
        }
        // this.onSaveToNext();
    }
    /**
     * 所属业务员search款搜索前置条件
     */
    public searchBefore(){
        if(!this.model.bankNo){
            this.msg.warning(this.i18n.fanyi('Mch.tips.bankNo'));
            return false
        }
        if(!this.model.chanNo){
            this.msg.warning(this.i18n.fanyi('Mch.tips.chanNo'));
            return false
        }
        this.creatorTableCfg.params ={bankNo:this.model.bankNo,channelId:this.model.chanNo};
    }
    /**
     *保存并下一步
     */
    onSaveToNext() {
        if(this.modelGroup.valid){
            this.isLoadingOne = true;
            let model = this.model;
            // if(this.roleType == 2 || this.roleType == 7){
            //     model = this.objExtend.extend(this.model,{chanNo:this.orgNumber})
            // } else if(this.roleType == 1 || this.roleType == 99){
            //     model =this.model
            // }
            this.mchDB.saveMchBaseInfo(model).subscribe(res=>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.model =res[CommonEnum.SERVER_DATA_KEY];
                    this.dynamicStepsService.nextStep();//下一步
                }else{
                    if(res['errors']){
                        this.msg.warning(this.i18n.fanyi('Mch.step.baseInfo.tips.fail'));
                    }else{
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY])
                    }
                }
                this.isLoadingOne = false;
            });
        }
    }
    /**
     * 保存页面跳回详情
     */
    onSaveToDetail(){
        if(this.modelGroup.valid){
            this.isLoadingOne = true;
            this.mchDB.saveMchBaseInfo(this.model).subscribe(res=>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    let _data =res[CommonEnum.SERVER_DATA_KEY];
                    this.helper.navigate('/admin/user/mchdetail',this.i18n.fanyi('Mch.mchDetail'),{id:_data['id'],orgId : _data['orgId'],merchantNo:_data['merchantNo'],chanNo:_data['chanNo'] ,categoryType:_data['categoryType']});
                }else{
                    if(res['errors']){
                        this.msg.warning(this.i18n.fanyi('Mch.step.baseInfo.tips.fail'));
                    }else{
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY])
                    }
                }
                this.isLoadingOne = false;
            });
        }
    }


    /**
     * 返回详情
     */
    onGoBack(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
            if(menu && menu['params']){
            let params = this.objExtend.extend( menu['params'],{categoryType:this.model.categoryType});
                this.helper.navigate('/admin/user/mchdetail',this.i18n.fanyi('Mch.mchDetail'),{id:params['id'],orgId : params['orgId'], categoryType:params['categoryType'], merchantNo:params['merchantNo'],chanNo:params['chanNo']});
            }

    }
    // /**
    //  * 结束日期限制
    //  * @param endValue
    //  * @returns {boolean}
    //  */
    // EndDateDisabled(endValue:any){
    //     if(!endValue || !this.model.linenceTermEnd){
    //         return false;
    //     }
    //     return endValue < this.helper.modifyDateByDay(this.model.linenceTermStart) ;
    // }
    termStartChange(value){
        // this.model.linenceTermStart = new Date(value).getTime() +"";
    }
    TermEndChange(value){
        // this.model.linenceTermEnd = new Date(value).getTime() + "";
    }
    getFormControl(name) {
        return this.modelGroup.controls[ name ];
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
     * 文件上传错误信息
     * @param data
     */
    public onFileUploadError(data){
        if(data && data['message']){
            this.msg.warning(data['message']);
        }
    }
    public hasSource(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
           let params = menu['params'];
            if(!params || (params && this.helper.isEmpty(params['source'])) ){
                return true; //新增进来
            }else{
                return false;
            }
        }

    }
}
