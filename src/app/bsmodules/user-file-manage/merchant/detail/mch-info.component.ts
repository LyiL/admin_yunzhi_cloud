import {Component, OnInit, ViewChild} from '@angular/core';
import {I18NService} from "../../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService, ModalHelper} from '@delon/theme';
import {Router} from "@angular/router";
import {ImagePreviewService, SimpleTableComponent} from '@delon/abc';
import {mchService} from "../../../../common/services/request/user-file-manage/mch.service";
import {NzMessageService, NzModalService, ObjectExtend} from 'ng-zorro-antd';
import {MchAccountInfoWinComponent} from "../win/mch-account-info-win";
import {HelperService} from '../../../../common/services/helper.service';
import {MerchantExamstateWinComponent} from '../win/merchant-examstate.win.component';
import {Observable} from 'rxjs/Observable';
/**
 * 商户详情基础信息页面
 */
@Component({
    selector:'mch-info',
    templateUrl:'./mch-info.component.html'
})
export class MerchantInfoComponent implements OnInit{
    //连接符
    public connector:string = '-';
    public mchOperationLog:Observable<any>;//代理商操作日志
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

    public detailFields:Array<any> = [
        {
            title:this.i18n.fanyi("Mch.detailPage.detail.info.enterpriseInform"),
            children:[
                {
                    title:this.i18n.fanyi("Mch.detailPage.detail.info.bankName"),
                    field:'bankName'
                },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.chanName"),
                field:'chanName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.name"),
                field:'name'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.shortName"),
                field:'shortName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.merchantNo"),
                field:'merchantNo'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.orgEmail"),
                field:'orgEmail'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.provinceName"),
                field:'provinceName',
                group:['cityName','countyName']
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.address"),
                field:'address'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.certificateType"),
                field:'certificateType',
                type:'dict',
                transKey:'CERTIFICATE_TYPE'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.linenceNo"),
                field:'linenceNo',
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.linenceTermStart"),
                // field:'linenceTermStart',
                field:['linenceTermStart','linenceTermEnd'],
                type:'datetime',
                // group:['linenceTermEnd'],
                format:'YYYY-MM-DD'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.categoryType"),
                field:'categoryType',
                type:'dictMore',
                locationValue:[0,1],
                group:['mchRole','mchTypeName'],
                noTrans:'mchTypeName',
                transKey:['MCH_TYPE','PAY_MCH_ISBIGBUSI']
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.orgWebsite"),
                field:'orgWebsite'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.customerPhone"),
                field:'customerPhone'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.salesmanName"),
                field:'salesmanName'
            },{
                title: this.i18n.fanyi("Mch.detailPage.detail.info.createdTime"),
                field: 'createdTime',
                type:'datetime',
                format:'YYYY-MM-DD HH:mm:ss'
            },{
                title: this.i18n.fanyi("Mch.detailPage.detail.info.examTime"),
                field: 'examTime',
                type:'datetime',
                format:'YYYY-MM-DD HH:mm:ss'
            }
            ]
        },{
            title:this.i18n.fanyi("Mch.detailPage.detail.info.principalInfo"),
            children:[
                {
                title:this.i18n.fanyi("Mch.detailPage.detail.info.operator"),
                field:'operator'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.contactsType"),
                field:'contactsType',
                type:'dict',
                transKey:'CONTACTS_TYPE'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.operatorIdno"),
                field:'operatorIdno'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.operatorPhone"),
                field:'operatorPhone'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.operatorEmail"),
                field:'operatorEmail'
            }
            ]
        },{
            title:this.i18n.fanyi("Mch.detailPage.detail.info.contactInfo"),
            children:[
                {
                title:this.i18n.fanyi("Mch.detailPage.detail.info.linkman"),
                field:'linkman'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.email"),
                field:'email'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.phone"),
                field:'phone'
            }
            ]
        },{
            title:this.i18n.fanyi("Mch.detailPage.detail.info.accessoryInfo"),
            children:[
                {
                title:this.i18n.fanyi("Mch.detailPage.detail.info.linenceImg"),
                field:'linenceImg',
                type:'image'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.orgAccountImg"),
                field:'orgAccountImg',
                type:'image'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.indentityImg"),
                field:'indentityImg',
                type:'image',
                joinField:['operatorIdno']
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.indentityBackImg"),
                field:'indentityBackImg',
                type:'image'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.info.bankCardImg"),
                field:'bankCardImg',
                type:'image'
            }
            ]
        }
        ];

    /**
     * 商户基础信息
     * @type {{}}
     */
    public mchInfoData:any = {};
    /**
     * 帐户信息配置
     */
    public tableCfg:any;
    @ViewChild('mchAccountTable') public mchAccountTable:SimpleTableComponent;
    constructor(public i18n:I18NService,public mchService:mchService,
                public helper:HelperService, public objExtend:ObjectExtend,
                public modalHelper:ModalHelper,public modal: NzModalService,
                public menuService:MenuService, public msg: NzMessageService,
                public router:Router,public imageService:ImagePreviewService){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];
        let id = params['id'];
        let orgId = params['orgId'];
        this.tableCfg = {
            url:mchService.MCH_ACCOUNT_LIST_URL,
            params:{orgId:params['orgId']},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.name"),
                index:'name'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.type"),
                // index:'type',
                render:'typeRender',
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.bankCardno"),
                index:'bankCardno'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.bankName"),
                index:'bankName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.subbranchName"),
                // index:'subbranchName'
                render:'subbranchNameRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.subbanrchCode"),
                // index:'subbanrchCode'
                render:'subbanrchCodeRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.transId"),
                index:'transId',
                data: (function(value){
                    let _transIds = value.split(',');
                    let _transNames:Array<string> = [];
                    if(_transIds && _transIds.length > 0){
                        _transIds.forEach && _transIds.forEach((_transId:any)=>{
                            _transNames.push(this.helper.dictTrans('BANK_ACT_TRADE_TYPE',_transId));
                        });
                    }
                    return _transNames.join(',');
                }).bind(this)
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.cardType"),
                // index:'cardType'
                render:'cardTypeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('MCHACCOUNTEDIT')){
                            return true;
                        }
                    }),
                    click: this.onEdit.bind(this)
                }]
            }]
        };
        this.loadBasicInfo(id);  //初始化基本信息
        this.loadOparationLog(orgId) // 初始化操作日志
    }

    public loadBasicInfo(params:any){
        //初始化基本信息
        this.mchService.loadInfo({id:params}).subscribe((res)=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.mchInfoData = res[CommonEnum.SERVER_DATA_KEY];
                this.loadImageData(this.mchInfoData);
            }
        });

    }
    public loadOparationLog(params:any){
        //初始化操作日志
        this.mchService.loadExamLog({orgId:params}).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.mchOperationLog = Observable.of(res['data']);
            }
        });
    }

    /**
     * 图片预览
     */
    onImagePreview(field:string){
        this.imageService.showImageByFieldName(field);
        this.imageService.showImageViewer(true);
    }
    /**
     * 编辑账户信息
     */
    onEdit(row:any){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.mchAccountTable._data;
        let win = this.modalHelper.static(MchAccountInfoWinComponent,{
            orgId: menuParams['orgId'],
            acntId: row['acntId'],
            tableData:tableData
        },900,{title: this.i18n.fanyi('Mch.winTitle.accountEdit')});
        win.subscribe(res => {
            this.mchAccountTable.doSearch(false);//刷新表格
            this.loadBasicInfo(this.mchInfoData['id']);
            this.loadOparationLog(this.mchInfoData['orgId'])
        })

    }
    /**
     * 新增账户信息
     */
    addAccount(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.mchAccountTable._data;
        let win = this.modalHelper.static(MchAccountInfoWinComponent,{
            orgId: menuParams['orgId'],
            tableData:tableData
        },900,{title: this.i18n.fanyi('Mch.winTitle.accountAdd')});
        win.subscribe(res => {
            this.mchAccountTable.doSearch(false);//刷新表格
            this.loadBasicInfo(this.mchInfoData['id']);
            this.loadOparationLog(this.mchInfoData['orgId'])
        })
    }
    //初始化图片数据
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
    public onEditMch(){
        this.helper.navigate('/admin/user/merchantadd',this.i18n.fanyi('Mch.step.editTitle'),this.objExtend.extend(this.mchInfoData, {source:'detail'}));
    }
    /**
     * 审核服务
     */
    public onExamine(){
        let win = this.modalHelper.static(MerchantExamstateWinComponent,{
            id:this.mchInfoData['id'],
            examState:this.mchInfoData['examState']
        },580,{title: this.i18n.fanyi('Mch.detailPage.detail.ExamineTitle')});
        win.subscribe(res => {
            this.loadBasicInfo(this.mchInfoData['id']);
            this.loadOparationLog(this.mchInfoData['orgId'])
        })
    }
    /**
     * 发送邮件与短信
     */
    public onSendEmailAndSTM(){
        this.modal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('Mch.tips.SendEmailAndSTM'),
            okText: this.i18n.fanyi('Modal.okText'),
            maskClosable:false,
            onOk: () => {
                this.mchService.sendEmailAndSTM({id: this.mchInfoData['id']}).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('Mch.tips.SendEmailAndSTMSuccess'));
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY])
                    }
                })

            }
        });
    }
    /**
     * 判断用户审核状态
     * [{"id":0,"name":"待审核"},{"id":1,"name":"通过"},{"id":2,"name":"未通过"},{"id":3,"name":"冻结"},{"id":4,"name":"接口"}]
     */
    public userState():string{
        if(!this.mchInfoData){
            return '';
        }
        let _state = this.mchInfoData['examState'];
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
