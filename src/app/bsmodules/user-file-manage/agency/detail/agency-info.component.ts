import {Component, OnInit, ViewChild} from "@angular/core";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService, ModalHelper} from "@delon/theme";
import {Router} from "@angular/router";
import {ImagePreviewService, SimpleTableComponent, SimpleTableService} from "@delon/abc";
import {AgencyService} from "../../../../common/services/request/user-file-manage/agency.service";
import {NzLocaleService, NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {AgencyAccountAddWinComponent} from "../win/agency-account-win/agency-account-add-win.component";
import {HelperService} from "../../../../common/services/helper.service";
import {Observable} from "rxjs/Observable";
import {AgencyExamstateWinComponent} from "../win/agency-info-examine-win/agency-info-examine-win.component";

/**
 * 代理商详情基本信息页
 */
@Component({
    selector:'agency-info',
    templateUrl:'./agency-info.component.html',
    providers:[SimpleTableService]
})
export class AgencyInfoComponent implements OnInit{

    public connector:string = '-';//连接符
    public agencyOperationLog:Observable<any>;//代理商操作日志
    /**
     * 基础信息配置
     * title:'分组标题',
     * children:[{ //分组元素
     *      title:'子元素标题',
     *      field:'子元素字段名',
     *      type:'子元素类型'，datatime,dict,image
     *      format:'YYYY-MM-DD HH:mms:ss',对应moment插件格式，当type为datetime时取用
     *      group:[子元素组合字段],
     *      transKey:'字典翻译key',当type为dict是取用
     * }]
     */
    public detailFields:Array<any> = [{
        title:this.i18n.fanyi("Agency.detailPage.detail.info.enterpriseInform"),
        children:[{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.bankName"),
            field:'bankName'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.parentChanName"),
            field:'parentChanName'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.appCode"),
            field:'appCode',
            type:'dict',
            transKey:'PROXY_TYPE'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.name"),
            field:'name'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.shortName"),
            field:'shortName'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.chanCode"),
            field:'chanCode'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.orgEmail"),
            field:'orgEmail'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.provinceName"),
            field:'provinceName',
            group:['cityName','countyName']
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.comAddress"),
            field:'comAddress'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.certificateType"),
            field:'certificateType',
            type:'dict',
            transKey:'CERTIFICATE_TYPE'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.linenceNo"),
            field:'linenceNo'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.linenceTermStart"),
            // field:'linenceTermStart',
            field:['linenceTermStart','linenceTermEnd'],
            type:'datetime',
            // group:['linenceTermEnd'],
            format:'YYYY-MM-DD'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.categoryType"),
            field:'categoryType',
            type:'dict',
            locationValue:[0,1],
            group:['categoryName'],
            transKey:'MCH_TYPE'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.orgWebsite"),
            field:'orgWebsite'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.customerPhone"),
            field:'customerPhone'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.salesmanName"),
            field:'salesmanName'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.shareRule"),
            field:'shareRule',
            type:'dict',
            transKey:'PAYCENTER_CH_TYPE'
        },{
            title: this.i18n.fanyi("Agency.detailPage.detail.info.registerTime"),
            field: 'registerTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },{
            title: this.i18n.fanyi("Agency.detailPage.detail.info.examTime"),
            field: 'examTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        }]},{
        title:this.i18n.fanyi("Agency.detailPage.detail.info.principalInfo"),
        children:[{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.operator"),
            field:'operator'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.contactsType"),
            field:'contactsType',
            type:'dict',
            transKey:'CONTACTS_TYPE'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.operatorIdno"),
            field:'operatorIdno'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.operatorPhone"),
            field:'operatorPhone'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.operatorEmail"),
            field:'operatorEmail'
        }]},{
        title:this.i18n.fanyi("Agency.detailPage.detail.info.contactInfo"),
        children:[{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.linkman"),
            field:'linkman'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.email"),
            field:'email'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.phone"),
            field:'phone'
        }]},{
        title:this.i18n.fanyi("Agency.detailPage.detail.info.accessoryInfo"),
        children:[{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.linenceImg"),
            field:'linenceImg',
            type:'image'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.orgAccountImg"),
            field:'orgAccountImg',
            type:'image'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.indentityImg"),
            field:'indentityImg',
            type:'image',
            joinField:['operatorIdno']
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.indentityBackImg"),
            field:'indentityBackImg',
            type:'image'
        },{
            title:this.i18n.fanyi("Agency.detailPage.detail.info.bankCardImg"),
            field:'bankCardImg',
            type:'image'
        }]
    }];
    /**
     * 代理商基础信息
     */
    public agencyInfoData:any = {};
    /**
     * 账户信息配置
     */
    public tableCfg:any;
    @ViewChild('agencyAccountTable') public agencyAccountTable:SimpleTableComponent;

    constructor(public i18n:I18NService,
                protected agencyService:AgencyService,
                public menuService:MenuService,
                public router:Router,
                public imageService:ImagePreviewService,
                protected modalService: NzModalService,
                public helper:HelperService,
                public modalHelper:ModalHelper,
                public objectExtend:ObjectExtend,
                public simpleTableService:SimpleTableService,
                public message: NzMessageService,
                public log:NzLocaleService,
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let params = menu['params'];
        let chanCode = params['chanCode'];
        let orgId = params['orgId'];
        this.tableCfg = {
            url:AgencyService.AGENCY_ACCOUNT_LIST_URL,
            params:{chanCode:chanCode},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.name"),
                index:'name'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.type"),
                render:'typeRender'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.bankCardno"),
                index:'bankCardno'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.bankName"),
                index:'bankName'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.subbranchName"),
                render:'subbranchNameRender'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.subbanrchCode"),
                render:'subbanrchCodeRender'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.transId"),
                index:'transId',
                data: (function(value){
                    if(value && typeof value == 'string'){
                        let _transIds = value.split(',');
                        let _transNames:Array<string> = [];
                        if(_transIds && _transIds.length > 0){
                            _transIds.forEach && _transIds.forEach((_transId:any)=>{
                                _transNames.push(this.helper.dictTrans('BANK_ACT_TRADE_TYPE',_transId));
                            });
                        }
                        return _transNames.join(',');
                    }
                }).bind(this)
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.cardType"),
                render:'cardTypeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide:((row:any)=>{
                        if(this.helper.btnRole('AGENTACCOUNTEDIT')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: this.onEditAccount.bind(this)
                }]
            }]
        };
        //初始化代理商基本信息
        this.loadBasicInfo(chanCode);

        //初始化代理商操作日志
        this.loadOparationLog(orgId);
    }
    //代理商基本信息
    public loadBasicInfo(params:any){
        this.agencyService.loadInfo({chanCode:params}).subscribe((res)=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.agencyInfoData = res[CommonEnum.SERVER_DATA_KEY];
                this.loadImageData(this.agencyInfoData);
            }
        });
    }
    //代理商操作日志
    public loadOparationLog(params:any){
        this.agencyService.loadExamLog({orgId:params}).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.agencyOperationLog = Observable.of(res[CommonEnum.SERVER_DATA_KEY]);
            }
        });
    }

    /**
     * 编辑代理商基本信息
     */
    public onEditBaseInfo(){
        this.helper.navigate('/admin/user/agencyedit',this.i18n.fanyi('Agency.detailPage.detail.AgencyEditTitle'),{
            source:'detail',id:this.agencyInfoData['id'],orgId:this.agencyInfoData['orgId'],name:this.agencyInfoData['name'],chanCode:this.agencyInfoData['chanCode'],parentChanCode:this.agencyInfoData['parentChanCode']
        });
    }

    /**
     * 新增账户信息
     */
    onAddAccount(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.agencyAccountTable._data;
        const subscription = this.modalHelper.static(AgencyAccountAddWinComponent,{
            orgId: menuParams['orgId'],
            tableData:tableData
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.detail.accountInfoAddTitle'),width:'1000px'});
        subscription.subscribe(res => {
            this.agencyAccountTable.doSearch(false);//刷新表格
            this.loadBasicInfo(this.agencyInfoData['chanCode']);//刷新基本信息
            this.loadOparationLog(this.agencyInfoData['orgId']);//刷新操作日志
        })
    }
    /**
     * 编辑账户信息
     */
    onEditAccount(row:any){
        // this.log.debug('表格data：：：',this.agencyAccountTable._data);
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.agencyAccountTable._data;
        const subscription = this.modalHelper.static(AgencyAccountAddWinComponent,{
            orgId: menuParams['orgId'],
            acntId: row['acntId'],
            tableData:tableData
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.detail.accountInfoEditTitle'),width:'1000px'});
        subscription.subscribe(res => {
            this.agencyAccountTable.doSearch(false);//刷新表格
            this.loadBasicInfo(this.agencyInfoData['chanCode']);//刷新基本信息
            this.loadOparationLog(this.agencyInfoData['orgId']);//刷新操作日志
        })
    }

    /**
     * 图片预览
     */
    onImagePreview(field:string){
        this.imageService.showImageByFieldName(field);
        this.imageService.showImageViewer(true);
    }

    private loadImageData(data:any){
        let imageData:Array<any> = [];
        this.detailFields.forEach((field:any)=>{
            field['children'] && field['children'].forEach((sField:any)=>{
                if(sField['type'] != 'image'){
                    return;
                }
                let _imgUrl:string = data && data[sField.field];
                imageData.push({fieldName:sField.field,imageUrl:'/assets/'+_imgUrl,describe:sField.title});
            });
        });
        this.imageService.loadImages(imageData);
    }

    /**
     * 审核服务
     */
    public onExamine(){
            let win = this.modalHelper.static(AgencyExamstateWinComponent,{
                id:this.agencyInfoData['id'],
                examState:this.agencyInfoData['examState'],
                chanCode:this.agencyInfoData['chanCode']
            },620,{title: this.i18n.fanyi('Agency.detailPage.detail.examineWinTitle')});
            win.subscribe(res => {
                this.loadBasicInfo(this.agencyInfoData['chanCode']);//刷新基本信息
                this.loadOparationLog(this.agencyInfoData['orgId']);//刷新操作日志
            })
    }

    /**
     * 发送邮件与短信
     */
    public onSendEmailAndSTM(){
        let confirm = this.modalService.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('Agency.detailPage.detail.tips.sendEmailTip')
        });
        confirm.subscribe(result=>{
            if(result && result == 'onOk'){
                this.agencyService.sendEmailAndSTM({chanCode:this.agencyInfoData['chanCode']}).subscribe((res)=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.message.success(this.i18n.fanyi('Agency.detailPage.detail.tips.sendSuccesTip'));
                        confirm.destroy();
                    }else{
                        this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }
    /**
     * 判断用户审核状态
     * [{"id":0,"name":"待审核"},{"id":1,"name":"通过"},{"id":2,"name":"未通过"},{"id":3,"name":"冻结"},{"id":4,"name":"接口"}]
     */
    public userState():string{
        if(!this.agencyInfoData){
            return '';
        }
        let _state = this.agencyInfoData['examState'];
        let _stateClass = 'normal';
        switch (_state){
            case 0://待审核
                _stateClass = 'pending';
                break;
            case 1://通过
                _stateClass = 'normal';
                break;
            case 2://未通过
            case 4://接口冻结
                _stateClass = 'fail-APIfreeze';
                break;
            case 3://冻结
                _stateClass = 'freeze';
                break;
        }
        return _stateClass;
    }
}
