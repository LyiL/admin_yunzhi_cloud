import {Component, OnInit, ViewChild} from "@angular/core";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {MenuService, ModalHelper} from "@delon/theme";
import {Router} from "@angular/router";
import {ImagePreviewService, SimpleTableComponent, SimpleTableService} from "@delon/abc";
import {HelperService} from "../../../../../common/services/helper.service";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {Observable} from "rxjs/Observable";
import {ServiceProviderService} from '../../../../../common/services/request/user-file-manage/service-provider.service';
import {SpAccountWinComponent} from '../../win/account/sp-account-win.component';
import {SpAuditWinComponent} from '../../win/audit/sp-audit-win.component';

/**
 * 服务商详情页-基本页
 */
@Component({
    selector:'sp-detail-info',
    templateUrl:'./sp-detail-info.component.html',
    providers: [SimpleTableService,ServiceProviderService]
})
export class SpDetailInfoComponent implements OnInit{

    @ViewChild('spAccountTable') spAccountTable: SimpleTableComponent

    //连接符
    public connector:string = '-';

    public SpOperationLog:Observable<any>; //服务商操作日志

    /**
     * 服务商基础信息配置
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
    public detailFields:Array<any> = [
        {
            title:this.i18n.fanyi("SP.detailPage.detail.info.enterpriseInform"),
            children:[
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.bankName"),
                    field:'bankName'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.parentChanName"),
                    field:'parentChanName'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.name"),
                    field:'name'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.shortName"),
                    field:'shortName'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.chanCode"),
                    field:'chanCode'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.orgEmail"),
                    field:'orgEmail'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.provinceName"),
                    field:'provinceName',
                    group:['cityName','countyName']
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.address"),
                    field:'address'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.certificateType"),
                    field:'certificateType',
                    type:'dict',
                    transKey:'CERTIFICATE_TYPE'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.linenceNo"),
                    field:'linenceNo'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.linenceTermStart"),
                    // field:'linenceTermStart',
                    field:['linenceTermStart','linenceTermEnd'],
                    type:'datetime',
                    // group:['linenceTermEnd'],
                    format:'YYYY-MM-DD'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.categoryType"),
                    field:'categoryType',
                    type:'dict',
                    locationValue:[0,1],
                    group:['categoryName'],
                    transKey:'MCH_TYPE'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.orgWebsite"),
                    field:'orgWebsite'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.customerPhone"),
                    field:'customerPhone'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.salesmanName"),
                    field:'salesmanName'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.shareRule"),
                    field:'shareRule',
                    type:'dict',
                    transKey:'PAYCENTER_CH_TYPE'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.settleStyle"),
                    field:'settleStyle',
                    type:'dict',
                    transKey:'SETTLE_STYLE_CONFIG'
                },
                {
                    title: this.i18n.fanyi("SP.detailPage.detail.info.registerTime"),
                    field: 'registerTime',
                    type:'datetime',
                    format:'YYYY-MM-DD HH:mm:ss'
                },
                {
                    title: this.i18n.fanyi("SP.detailPage.detail.info.examTime"),
                    field: 'examTime',
                    type:'datetime',
                    format:'YYYY-MM-DD HH:mm:ss'
                }
            ]
        },
        {
            title:this.i18n.fanyi("SP.detailPage.detail.info.principalInfo"),
            children:[
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.operator"),
                    field:'operator'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.contactsType"),
                    field:'contactsType',
                    type:'dict',
                    transKey:'CONTACTS_TYPE'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.operatorIdno"),
                    field:'operatorIdno'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.operatorPhone"),
                    field:'operatorPhone'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.operatorEmail"),
                    field:'operatorEmail'
                }
            ]
        },
        {
            title:this.i18n.fanyi("SP.detailPage.detail.info.contactInfo"),
            children:[
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.linkman"),
                    field:'linkman'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.email"),
                    field:'email'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.phone"),
                    field:'phone'
                }
            ]
        },
        {
            title:this.i18n.fanyi("SP.detailPage.detail.info.accessoryInfo"),
            children:[
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.linenceImg"),
                    field:'linenceImg',
                    type:'image'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.orgAccountImg"),
                    field:'orgAccountImg',
                    type:'image'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.indentityImg"),
                    field:'indentityImg',
                    type:'image',
                    joinField:['operatorIdno']
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.indentityBackImg"),
                    field:'indentityBackImg',
                    type:'image'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.detail.info.bankCardImg"),
                    field:'bankCardImg',
                    type:'image'
                }
            ]
        }
    ];
    /**
     * 服务商基础信息数据
     * @type {{}}
     */
    public spInfoData:any = {};
    /**
     * 服务商帐户信息配置
     */
    public tableCfg:any;

    constructor(
        public i18n:I18NService,
        public spService:ServiceProviderService,
        public menuService:MenuService,
        public router:Router,
        public imageService:ImagePreviewService,
        public helper: HelperService,
        protected modalService: NzModalService,
        public modalHelper:ModalHelper,
        public objectExtend:ObjectExtend,
        public msg: NzMessageService,
        public simpleTableService:SimpleTableService
    ) {}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let params = menu['params'];
        let id = params['id'];

        // 账户信息表格配置
        this.tableCfg = {
            url:ServiceProviderService.SP_ACCOUNT_LIST_URL,
            params:{orgId:params['orgId']},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.name"),            // 开户名称
                index:'name'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.type"),            // 账户名称
                render:'typeRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.bankCardno"),      // 银行账号
                index:'bankCardno'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.bankName"),        // 开户行
                index:'bankName'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.subbranchName"),   // 开户支行
                render:'subbranchNameRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.subbanrchCode"),   // 联行号
                render:'subbanrchCodeRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.transId"),         // 支付类型
                index:'transId',
                data: (function(value){
                    if(value && typeof value == 'string') {
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
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.cardType"),        // 行内账户
                render:'cardTypeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    // 编辑
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide:((row:any)=>{
                        if(this.helper.btnRole('SPACCOUNTEDIT')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: this.editAccount.bind(this)
                }]
            }]
        };

        /**
         * 初始化服务商基础信息数据
         */
        this.loadBaseInfo(id);

        /**
         * 初始化服务商操作日志
         */
        this.loadExamLog(params);

    }


    /**
     * 请求服务商基础信息数据
     */
    public loadBaseInfo(id) {
        this.spService.loadInfo({id:id}).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.spInfoData = res[CommonEnum.SERVER_DATA_KEY];
                this.loadImageData(this.spInfoData);
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 请求服务商操作日志
     */
    public loadExamLog(params) {
        this.spService.loadExamLog({orgId:params['orgId']}).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.SpOperationLog = Observable.of(res[CommonEnum.SERVER_DATA_KEY]);
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 图片预览
     */
    public onImagePreview(field:string){
        this.imageService.showImageByFieldName(field);
        this.imageService.showImageViewer(true);
    }

    /**
     * 加载图片数据
     * @param data
     */
    public loadImageData(data:any){
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
     * 编辑服务商基本信息
     */
    public editBaseInfo() {
        this.helper.navigate('/admin/user/spedit',this.i18n.fanyi('SP.SPedit'), {
            source:'detail',
            id:this.spInfoData['id'],
            orgId:this.spInfoData['orgId'],
            name:this.spInfoData['name'],
            chanCode:this.spInfoData['chanCode'],
            parentChanCode:this.spInfoData['parentChanCode']
        });
    }

    /**
     * 新增账户信息
     */
    public addAccount() {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let params = menu['params'];
            let id = params['id'];
            let tableData = this.spAccountTable._data;
            let subscription = this.modalHelper.static(SpAccountWinComponent,{
                orgId: params['orgId'],
                tableData: tableData
            }, 1000 ,{title: this.i18n.fanyi('SP.win.account.newTitle')});
            subscription.subscribe(res => {
                this.loadBaseInfo(id); // 刷新基础信息
                this.spAccountTable.doSearch(false); // 刷新账户信息
                this.loadExamLog(params); // 刷新操作日志
            })
        }
    }

    /**
     * 编辑账户信息
     */
    public editAccount(row) {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let _acntId = row['acntId']; // 账户信息ID,编辑时必填
            let params = menu['params'];
            let id = params['id'];
            let tableData = this.spAccountTable._data;
            let subscription = this.modalHelper.static(SpAccountWinComponent,{
                orgId: params['orgId'],
                acntId: _acntId,
                tableData: tableData
            }, 1000 ,{title: this.i18n.fanyi('SP.win.account.editTitle')});
            subscription.subscribe((res) => {
                this.loadBaseInfo(id); // 刷新基础信息
                this.spAccountTable.doSearch(false); // 刷新账户信息
                this.loadExamLog(params); // 刷新操作日志
            })
        }
    }

    /**
     * 判断用户审核状态
     * [{"id":0,"name":"待审核"},{"id":1,"name":"通过"},{"id":2,"name":"未通过"},{"id":3,"name":"冻结"},{"id":4,"name":"接口"}]
     */
    public userState():string{
        if(!this.spInfoData){
            return '';
        }
        let _state = this.spInfoData['examState'];
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

    /**
     * 审核服务
     */
    public onExamine(){
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];
        let id = params['id'];

        let win = this.modalHelper.static(SpAuditWinComponent,{
            id:this.spInfoData['id'],
            examState:this.spInfoData['examState'],
            chanCode:this.spInfoData['chanCode'],
        },620,{title: this.i18n.fanyi('SP.detailPage.examine.title')});
        win.subscribe(res => {
            // 重新请求数据刷新页面
            this.loadBaseInfo(id); // 请求基础信息数据
            this.loadExamLog(params); // 请求服务商操作日志
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
                this.spService.sendEmailAndSTM({id: this.spInfoData['id']}).subscribe((res)=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('Agency.detailPage.detail.tips.sendSuccesTip'));
                        confirm.destroy();
                    }else{
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }
}
