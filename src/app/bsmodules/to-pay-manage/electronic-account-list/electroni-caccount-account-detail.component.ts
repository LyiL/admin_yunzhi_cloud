import {Component, ViewChild} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {ElectroniCaccountAccountDetailForm} from "../../../common/form/to-pay-manage/electroni-caccount-account-detail.form";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {HttpHeaders} from "@angular/common/http";
import {CommonEnum} from "../../../common/enum/common.enum";
import {CommonService} from "../../../common/services/request/common.service";
/**
 * 入账明细
 */
@Component({
    selector: 'electroni-caccount-account-detail',
    templateUrl: "electroni-caccount-account-detail.component.html",
    providers: [ElectronicAccountListSevice]
})
export class ElectroniCaccountAccountDetailComponent{

    public eleActDeailForm: ElectroniCaccountAccountDetailForm = new ElectroniCaccountAccountDetailForm(); //form 实例
    @ViewChild('eleCacAccoutdetailTable') public eleCacAccoutdetailTable:SimpleTableComponent;  //获取table

    public accountTypes: Array<any> = [];  //记账类型

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService: NzModalService,
                public _msg: NzMessageService,
                public menuService:MenuService,
                public router:Router,
                public objectExtend:ObjectExtend

    ){
        this.accountTypes = this.helper.getDictByKey('RECORD_IN_CASH');
    }

    /**
     * 商户名称配置
     * @type {{title: (string | any); url: string; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; searchFields: [{field: string; label: (string | any)} , {field: string; label: (string | any)}]; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string}]}}
     */
    public eleCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('eleAccount.listPage.search.organNoTitle'),
        // url:ElectronicAccountListSevice.QUERY_DEALERINFO_URL,
        url:CommonService.MCH_INFO_URL,
        params:{isStore:0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('eleAccount.listPage.search.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('eleAccount.listPage.search.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('eleAccount.listPage.search.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('eleAccount.listPage.search.name'),
            index:'name'
        }]
    }


    ngOnInit(){
        /**
         * 获取路由参数电子账户ID
         * @type {Menu}
         */
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let _params = menu['params'];
            this.eleActDeailForm.accountNo=_params.accountNo;
        };
    }
    /**
     * 列表页数据源配置
     * @type {{url: string; params: LoginLogForm; isAjax: boolean; : HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string; type: string; dateFormat: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string}]}}
     */
    public eleCacAccoutdetailCfg:any = {
        url:ElectronicAccountListSevice.CASHACCOUNT_SEARCHCASHRECORD_URL,
        params:this.eleActDeailForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('eleAccount.eleAccDetail.tableCfg.createdAt'),          //交易日期
                index:'createdAt',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss',
            },{
                title:this.i18n.fanyi('eleAccount.eleAccDetail.tableCfg.mchNo'),      //商户号
                index:'mchNo'
            },{
                title:this.i18n.fanyi('eleAccount.eleAccDetail.tableCfg.transNo'),   //代付编号
                index:'transNo'
            },{
                title:this.i18n.fanyi('eleAccount.eleAccDetail.tableCfg.totalFee'),    //代付金额（元）
                // index:'descript'
                index:'totalFee'
            },{
                title:this.i18n.fanyi('eleAccount.eleAccDetail.tableCfg.procsFee'),   //手续费（元）
                index:'procsFee'
            },{
                title:this.i18n.fanyi('eleAccount.eleAccDetail.tableCfg.totalAmount'),   //总金额（元）
                index:'totalAmount'
            },{
                title:this.i18n.fanyi('eleAccount.eleAccDetail.tableCfg.incash'),    //记账类型
                render:'incashRener',
            }
        ]
    };

    /**
     * 搜索
     */
    public onSearch(){
        let _batchForm=this.objectExtend.clone(this.eleActDeailForm);
        let startD=_batchForm['startDate'];
        let endD=_batchForm['startDate']
        if('_startDate' in _batchForm){
            startD=_batchForm['_startDate'];
        }
        if('_endDate' in _batchForm){
            endD=_batchForm['_endDate']
        }
        if(this.helper.isEmpty(startD)||this.helper.isEmpty(endD)){
            this._msg.warning(this.i18n.fanyi('topayTrade.alert.pltime'));
            return
        }
        this.eleCacAccoutdetailTable.doSearch();
    }


    /**
     * 结束时间控制
     */
    onTradeTimeEndDateDisabled(endValue:any) {
        if (!endValue || !this.eleActDeailForm.endDate) {
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.eleActDeailForm.startDate);
    }
}
