import {AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {CommonService} from "../../../common/services/request/common.service";
import {AccountSummaryForm} from "../../../common/form/account-manage/account-summary.form";
import {AccountSummaryService} from "../../../common/services/request/account-manage/account-summary.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {ObjectExtend} from "ng-zorro-antd";

/**
 * 对账概要列表
 */

@Component({
    selector:'account-summary-list',
    templateUrl:'./account-summary-list.component.html',
    providers: [AccountSummaryService]
})
export class AccountSummaryListComponent implements OnInit, AfterContentChecked{

    @ViewChild('summaryTable') public summaryTable:SimpleTableComponent;

    public summaryForm: AccountSummaryForm = new AccountSummaryForm();
    public line: string = '-'; // 日期之间的横线

    public reconState:Array<any> = []; // 对账状态
    public payTypes:Array<string>= []; // 支付类型
    public summaryCount: any = {}; // 统计面板数据

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public CommonDB: CommonService,
                public accountSummaryDB: AccountSummaryService,
                public changeDetectorRef: ChangeDetectorRef,
                public objExtend:ObjectExtend
    ){
        this.reconState = this.helper.getDictByKey('PARTNER_PRCSTATUS'); // 获取对账状态
        this.CommonDB.loadTransApi({transType:""}).subscribe(res =>{ // 获取支付类型
            this.payTypes = res;
        })
    }

    ngOnInit() {
        this.loadPanelData();
    }

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges()
    }


    /**
     * 结算账户配置
     */
    public allyCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('AccSummary.listPage.allyCfg.title'),
        url:CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'companion',
            label:this.i18n.fanyi('AccSummary.listPage.allyCfg.ally')
        },{
            field:'name',
            label:this.i18n.fanyi('AccSummary.listPage.allyCfg.allyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('AccSummary.listPage.allyCfg.ally'),
            index:'companion'
        },{
            title:this.i18n.fanyi('AccSummary.listPage.allyCfg.allyName'),
            index:'companionName'
        }]
    };


    /**
     * 支付中心配置
     */
    public centerCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('AccSummary.listPage.centerCfg.title'),
        url:CommonService.PAYCENTER_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'name',
            label:this.i18n.fanyi('AccSummary.listPage.centerCfg.centerName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('AccSummary.listPage.centerCfg.centerName'),
            index:'name'
        }]
    };


    /**
     * 受理机构配置
     */
    public agencyCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.title'),
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyNo')
        },{
            field:'name',
            label:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyName'),
            index:'name'
        }]
    };


    /**
     * 对账总览表单配置
     * @type {{url: string; params: AccountSummaryForm; total: number; isAjax: boolean; resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url: AccountSummaryService.ACC_SUMMARY_LIST_URL,
        params:this.summaryForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('AccSummary.listPage.tableCols.reconDay'),        // 对账日期/结算账户
                render:'reconDayRender'
            },{
                title:this.i18n.fanyi('AccSummary.listPage.tableCols.totalFee'),        // 交易金额（元） 退款金额（元）
                render:'totalFeeRender'
            },{
                title:this.i18n.fanyi('AccSummary.listPage.tableCols.eqTotalFee'),      // 平账交易金额（元） 平账退款金额（元）
                render:'eqTotalFeeRender'
            },{
                title:this.i18n.fanyi('AccSummary.listPage.tableCols.totalQua'),        // 交易笔数（笔） 退款笔数（笔）
                render:'totalQuaRender'
            },{
                title:this.i18n.fanyi('AccSummary.listPage.tableCols.errTotalQua'),     // 异常笔数（笔） 异常金额（元）
                render:'errTotalQuaRender'
            },{
                title:this.i18n.fanyi('AccSummary.listPage.tableCols.transName'),       // 支付类型
                render:'transNameRender'
            },{
                title:this.i18n.fanyi('AccSummary.listPage.tableCols.reconState'),      // 对账状态
                render:'reconStateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'), // 操作
                buttons:[{
                    text: this.i18n.fanyi('default.btn.detailBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('CHECKOUTLINEINFO')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((record: any) =>{
                        this.helper.navigate('/admin/account/accountsummarydetail', this.i18n.fanyi('AccSummary.detailPage.title'), {id: record['id']});
                    }).bind(this)
                }]
            }
        ]
    };


    /**
     * 查询事件
     */
    public onSearch(){
        this.summaryTable.doSearch();
        this.summaryCount = {}; // 清空面板数据
        this.loadPanelData();
    }


    /**
     * 统计面板数据
     */
    public loadPanelData() {
        this.accountSummaryDB.getSummary(this.objExtend.clone(this.summaryForm)).subscribe(res=>{
            if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.summaryCount = res[CommonEnum.SERVER_DATA_KEY];
            }
        });
    }

    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public billTimeEndDateDisabled(endValue:any){
        if(!endValue || !this.summaryForm.billTimeEnd){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.summaryForm.billTimeStart) || endValue >= this.helper.modifyDateByDay(this.summaryForm.billTimeStart,30);
    }
}
