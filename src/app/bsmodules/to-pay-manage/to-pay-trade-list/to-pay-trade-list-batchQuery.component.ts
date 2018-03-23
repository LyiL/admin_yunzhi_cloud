import {AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {ToPayBatchqueryFom} from "../../../common/form/to-pay-manage/to-pay-batchquery.fom";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {CommonEnum} from "../../../common/enum/common.enum";
import {CommonService} from "../../../common/services/request/common.service";
import {TopayTradeListService} from "../../../common/services/request/to-pay-manage/topay-trade-list.service";
import {HttpHeaders} from "@angular/common/http";

/**
 * 批量查询
 */
@Component({
    selector: 'to-pay-trade-list-batchQuery',
    templateUrl: 'to-pay-trade-list-batchQuery.component.html',
    providers: [TopayTradeListService]
})
export class ToPayTradeListBatchQueryComponent implements OnInit, AfterContentChecked{
    public batchForm:ToPayBatchqueryFom = new ToPayBatchqueryFom()   //列表查询from
    public tradeStates:Array<any> = [];  // 交易状态

    public summaryCount: any = {}; //面板数据

    @ViewChild('BatchListTable') public BatchListTable:SimpleTableComponent;   //获取表格

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService: NzModalService,
                public _msg: NzMessageService,
                public topayTradeListService:TopayTradeListService,
                public objectExtend:ObjectExtend,
                public changeDetectorRef: ChangeDetectorRef,
    ){
        this.tradeStates = this.helper.getDictByKey('CASH_ORDER_STATUS');
    }


    ngOnInit() {
        let _form=this.objectExtend.clone(this.batchForm);
        this.loadSummary(_form);
    }



    /**
     * 商户名称配置
     * @type {{title: (string | any); url: string; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; searchFields: [{field: string; label: (string | any)} , {field: string; label: (string | any)}]; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string}]}}
     */
    public eleCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('eleAccount.listPage.search.organNoTitle'),
        url:CommonService.MCH_INFO_URL,
        // url:ElectronicAccountListSevice.QUERY_DEALERINFO_URL,
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


    /**
     * 列表数据源
     * @type {{url: string; params: ElectronicAccountListForm; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any}]}]}}
     */
    public batchTableCfg:any = {
        url:TopayTradeListService.CASHTRANS_SEARCH_URL,
        params:this.batchForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.tradeTime'),      //交易时间
                index:'tradeTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss',
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.outTradeNo'),  //商户单号/代付单号
                render:'outTradeNoRender'
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.mchName'),  //商户名
                index:'mchName'
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.payName'),  //银行账户
                index:'payName',

            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.payCardNo'),  //银行卡号
                index:'payCardNo',

            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.tradeState'),   //交易状态
                render:'tradeStateRender',
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.totalFee'),  //代付金额（元）
                render:'totalFeeRender',

            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.totalAmount'),  //总金额（元）
                render:'totalAmountRender',

            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 详情
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('PAYINFO')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/topay/topaytradedetail',this.i18n.fanyi('topayTrade.navigate.topaytradeDetail'),{transNo: record['transNo']});
                        }).bind(this)
                    },{ // 同步
                        text: this.i18n.fanyi('topayTrade.listPage.tableCfg.synchronization'),
                        hide: (() => {
                            if (this.helper.btnRole('PAYSYN')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onsynchronization.bind(this)
                    }]
            }
        ]
    };


    /**
     * 查询事件
     */
    public onSearch(){
        let _batchForm=this.objectExtend.clone(this.batchForm);
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
        this.BatchListTable.doSearch();
        this.summaryCount = {}; // 清空面板数据
        let _form=this.objectExtend.clone(this.batchForm);
        this.loadSummary(_form);
    }

    /**
     * 导出报表
     */
    onExport() {
        let params = this.objectExtend.clone(this.batchForm);
        this.topayTradeListService.loadExport(params).subscribe(res => {
            if(res instanceof FileReader){
                res.onloadend=(function(){
                    let _res = JSON.parse(res.result);
                    this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }).bind(this);
            }else{
                this.downloadFile(res.fileName, res.blob); //导出报表
            }
        });
    }
    downloadFile(fileName, content){
        var aLink = document.createElement('a');
        var blob = content;
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click()
    }
    /**
     * 统计面板数据查询
     */
    public loadSummary(form:any){
        this.topayTradeListService.loadCount(form).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.summaryCount = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }


    /**
     * 同步
     */
    onsynchronization(row:any){
        this.topayTradeListService.loadSynch({transNo: row['transNo']}).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this._msg.success(this.i18n.fanyi('topayTrade.alert.onsynch'));
                this.BatchListTable.doSearch();
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges()
    }


    /**
     * 结束时间控制
     */
    onTradeTimeEndDateDisabled(endValue:any) {
        if (!endValue || !this.batchForm.endDate) {
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.batchForm.startDate);
    }
}
