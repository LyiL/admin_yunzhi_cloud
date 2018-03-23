import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {BusinessDayForm} from "../../../common/form/settlement-manage/businessday.form";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {HttpHeaders} from "@angular/common/http";
import {BusinessListLoadService} from "../../../common/services/request/settlement-manage/businessday.list.db.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {NzMessageService, NzModalService, ObjectExtend} from 'ng-zorro-antd';
import {BusinessDayListSettlebtnWinComponent} from "./business.day.list.settlebtn.win.component";
import {CommonService} from "../../../common/services/request/common.service";

/**
 * 商户日结列表页
 */
@Component({
  selector: 'business-day',
  templateUrl: './business-day-list.component.html',
  providers: [BusinessListLoadService,CommonEnum,CommonService]
})
export class BusinessDayListComponent implements OnInit {
    public BusinessDayForm: BusinessDayForm = new BusinessDayForm();
    /**
     * 查询类型
     */
    public queryTypes: Array<any> = [];
    /**
     * 付款状态
     */
    public cashState: Array<any> = [];
    /**
     * 结算周期
     */
    public cashCycle: Array<any> = [];
    /**
     * 支付类型配置
     */
    public payTypes: Array<string> = [];
    public UloCode:any; //优络编码
    /**
     * 所属服务商控件配置
     */
    public ChanProNoTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.ChanProNoCfg.title'),
        url: CommonService.PARENTCHAN_INFO_URL,
        params: {chanType: 1},
        isAjax: false,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'chanCode',
            label: this.i18n.fanyi('Settle.listPage.ChanProNoCfg.chanProNo')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Settle.listPage.ChanProNoCfg.chanProName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Settle.listPage.ChanProNoCfg.chanProNo'),
            index: 'chanCode'
        }, {
            title: this.i18n.fanyi('Settle.listPage.ChanProNoCfg.chanProName'),
            index: 'name'
        }]
    };
    /**
     * 受理机构配置
     */
    public agencyCodeCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.title'),
        url: CommonService.BANKINFO_URL,
        // params: {chanType: 0},
        isAjax: false,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'orgNo',
            label: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyCode')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyCode'),
            index: 'orgNo'
        }, {
            title: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyName'),
            index: 'name'
        }]
    };
    /**
     * 渠道配置
     */
    public agentnoCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.agentnoCfg.title'),
        url: CommonService.PARENTCHAN_INFO_URL,
        params: {chanType: 0},
        isAjax: false,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'chanCode',
            label: this.i18n.fanyi('Settle.listPage.agentnoCfg.agentno')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Settle.listPage.agentnoCfg.agentname')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Settle.listPage.agentnoCfg.agentno'),
            index: 'chanCode'
        }, {
            title: this.i18n.fanyi('Settle.listPage.agentnoCfg.agentname'),
            index: 'name'
        }]
    };
    /**
     * 所属商户控件配置
     */
    public mchTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.MchCfg.title'),
        url: CommonService.MCH_INFO_URL,
        params: {isStore: 0},
        isAjax: false,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'merchantNo',
            label: this.i18n.fanyi('Settle.listPage.MchCfg.merchantNo')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Settle.listPage.MchCfg.merchantName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Settle.listPage.MchCfg.merchantNo'),
            index: 'merchantNo'
        }, {
            title: this.i18n.fanyi('Settle.listPage.MchCfg.merchantName'),
            index: 'name'
        }]
    };
    /**
     * 结算账户控件配置
     */
    public allyTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.AllyCfg.title'),
        url: CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax: false,

        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'companion',
            label: this.i18n.fanyi('Settle.listPage.AllyCfg.ally')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Settle.listPage.AllyCfg.allyName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Settle.listPage.AllyCfg.ally'),
            index: 'companion'
        }, {
            title: this.i18n.fanyi('Settle.listPage.AllyCfg.allyName'),
            index: 'companionName'
        }]
    };
    /**
     * 支付中心控件配置
     */
    public centerIdTableCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.CenterCfg.title'),
        url: CommonService.PAYCENTER_INFO_URL,
        isAjax: false,

        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [
             {
            field: 'name',
            label: this.i18n.fanyi('Settle.listPage.CenterCfg.centerName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Settle.listPage.CenterCfg.centerName'),
            index: 'name'
        }]
    };
    public summaryCount: any = {}; ////统计数据

    /**
     * 商户日结列表配置
     */
    @ViewChild('SettleListTable') public SettleListTable: SimpleTableComponent;
    public tableCfg: any = {
        url: BusinessListLoadService.BUSINESS_DAY_LIST_URL,
        params: this.BusinessDayForm,
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title: this.i18n.fanyi('Settle.listPage.tableCols.reconDay'),
                index: 'reconDay',
                type: "date",
                dateFormat: "YYYY-MM-DD"
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.merchantNo'),
                index: 'merchantNo'
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.merchantName'),
                index: 'merchantName',
                width:"300px"
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.transName'),
                index: 'transName'
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.totalQua'),
                // index:'totalQua'
                render: "totalQuaRender"
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.totalFee'),
                // index:'totalFee',
                render: "totalFeeRender",
                // type: "currency"
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.price1'),
                render: "priceRender",
                // type: "currency"
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.trdSettleRate'),
                // index:'trdSettleRate',
                render: "trdSettleRateRender"
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.cashTotalFee'),
                // index:'cashTotalFee'
                render: 'cashTotalFeeRender'
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.settleCycle'),
                // index:'settleCycle',
                render: 'settleCycleRender'
            }, {
                title: this.i18n.fanyi('Settle.listPage.tableCols.cashState'),
                // index:'cashState',
                render: 'cashStateRender'
            }
        ]
    };

    constructor(public helper: HelperService, public i18n: I18NService,
                public commonDB: CommonService,public objectExtend:ObjectExtend,
                public businessListDB: BusinessListLoadService,
                public dialog: NzModalService, public msg: NzMessageService) {
        this.commonDB.loadTransApi({transId: ""}).subscribe(res => {
            this.payTypes = res //支付类型
        });

    }

    ngOnInit() {
        this.queryTypes = this.helper.getDictByKey('MCH_BILL_SEARCH_TYPE');  //查询类型
        this.cashState = this.helper.getDictByKey('CASH_STATUS');
        this.cashCycle = this.helper.getDictByKey('BALANCE_DATE');
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');
        this.loadCountData();
    }
    /**
     * 渠道选中事件
     * @param value
     */
    agentnosearchSelected(value){
        this.BusinessDayForm.agentno = value.agentno;
    }
    /**
     * 受理机构选中事件
     * @param value
     */
    agencyCodesearchSelected(value){
        this.BusinessDayForm.agencyCode = value.orgNo;
        this.BusinessDayForm.agentno = null;
        this.BusinessDayForm.agentName = null;
        this.BusinessDayForm.merchantNo = null;
        this.BusinessDayForm.merchantName = null;
        this.BusinessDayForm.chanProNo = null;
        this.BusinessDayForm.chanProName = null;
    }
    ChanProNoSelected(value){
        this.BusinessDayForm.chanProNo = value.agentno;
    }
    /**
     * 渠道搜索前事件
     */
    public agentnoSearchBefore(){
        if(this.BusinessDayForm.agencyCode){
            this.agentnoCfg.params = {chanType: 0,bankCode:this.BusinessDayForm.agencyCode};
        }else {
            this.agentnoCfg.params = {chanType: 0,bankCode:this.UloCode};
        }
}
    /**
     * 服务商搜索前事件
     */
    public chanProNoSearchBefore(){
        if(this.BusinessDayForm.agencyCode){
            this.ChanProNoTableCfg.params = {chanType: 1,bankCode:this.BusinessDayForm.agencyCode};
        }else {
            this.ChanProNoTableCfg.params = {chanType: 1,bankCode:this.UloCode};
        }
    }

    /**
     * 商户搜索前事件
     */
    public merchantNoSearchBefore(){
        if(this.BusinessDayForm.agencyCode){
            this.mchTableCfg.params = {isStore: 0,bankNo:this.BusinessDayForm.agencyCode};
        }else {
            this.mchTableCfg.params = {isStore: 0,bankNo:this.UloCode};
        }
    }
    //统计
    public loadCountData() {
        this.businessListDB.loadBusinessCount(this.objectExtend.clone(this.BusinessDayForm)).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.summaryCount = res[CommonEnum.SERVER_DATA_KEY];
            }
        });
    }

    /**
     * 查询
     */
    public onSearch() {
        this.SettleListTable.doSearch();
        this.loadCountData();
    }

    /**
     * 结算打款
     */
    public settlePayBtn() {
        if(!this.BusinessDayForm.agencyCode){
            this.msg.warning(this.i18n.fanyi('Settle.tips.SettleAgency'));
            return false;
        }
        if (!this.BusinessDayForm.ally) {
            this.msg.warning(this.i18n.fanyi('Settle.tips.SettlePay'));
            return false;
        }
        let win = this.dialog.open({
            title: this.i18n.fanyi('Settle.listPage.win.title'),
            content: BusinessDayListSettlebtnWinComponent,
            footer: false,
            maskClosable: false,
            width:"600px",
            componentParams: {
                model: this.BusinessDayForm
            }
        });
        win.subscribe(result => {
            if (result && result == 'onOk') {
                this.SettleListTable.doSearch();
            }
        })
    }

    /**
     * 导出报表
     */
    public onExportBtn() {
        this.businessListDB.loadExport(this.objectExtend.clone(this.BusinessDayForm)).subscribe(res => {
            // this.downloadFile(res.fileName, res.blob);
            if (res instanceof FileReader) {
                res.onloadend = (function () {
                    let _res = JSON.parse(res.result);
                    this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                }).bind(this);
            } else {
                this.msg.success(this.i18n.fanyi('Settle.exportInfo'));
                this.downloadFile(res.fileName, res.blob); //导出报表
            }
        });
    }

    downloadFile(fileName, content) {
        var aLink = document.createElement('a');
        var blob = content;
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click()
    }

    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    EndDateDisabled(endValue:any){
        if(!endValue || !this.BusinessDayForm.endTime){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.BusinessDayForm.beginTime) || endValue >= this.helper.modifyDateByDay(this.BusinessDayForm.beginTime,30);
    }


}
