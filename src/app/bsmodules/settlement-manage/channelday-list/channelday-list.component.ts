import {Component, ViewChild,OnInit} from '@angular/core';
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {channelDayForm} from "../../../common/form/settlement-manage/channelday.form";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {ChannelDayLoad} from "../../../common/services/request/settlement-manage/channelday.list.db.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {NzMessageService, NzModalService, ObjectExtend} from 'ng-zorro-antd';
import {settlePayWinComponent} from "./settlepay.win.component";
import {CommonService} from "../../../common/services/request/common.service";
import {channelDayDetailForm} from "../../../common/form/settlement-manage/channeldaydetail.form";


/**
 * 机构日结列表页面
 */
@Component({
  selector: 'channel-day',
  templateUrl: './channelday-list.component.html',
  providers: [ChannelDayLoad,CommonEnum]
})
export class ChannelDayListComponent implements OnInit{
    public channelDayForm:channelDayForm = new channelDayForm();
    public channelDayDetailForm:channelDayDetailForm = new channelDayDetailForm();
    @ViewChild('channelDayListTable') public channelDayListTable:SimpleTableComponent;
    @ViewChild('channelDayDetailListTable') public channelDayDetailListTable:SimpleTableComponent;

    /**
     * 受理机构配置
     */
    public agencyCodeCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.title'),
        url: CommonService.BANKINFO_URL,
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
     * 渠道控件配置
     */
    public CanalNoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Settle.listPage.agentnoCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        params:{chanType:0},
        isAjax:false,

        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('Settle.listPage.agentnoCfg.agentno')
        },{
            field:'name',
            label:this.i18n.fanyi('Settle.listPage.agentnoCfg.agentname')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Settle.listPage.agentnoCfg.agentno'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('Settle.listPage.agentnoCfg.agentname'),
            index:'name'
        }]
    };
    /**
     * 所属服务商控件配置
     */
    public ChanProNoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('channelDay.listPage.ChanProNoCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        params:{chanType:1},
        isAjax:false,

        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('channelDay.listPage.ChanProNoCfg.chanProNo')
        },{
            field:'name',
            label:this.i18n.fanyi('channelDay.listPage.ChanProNoCfg.chanProName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('channelDay.listPage.ChanProNoCfg.chanProNo'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('channelDay.listPage.ChanProNoCfg.chanProName'),
            index:'name'
        }]
    };
    /**
     * 所属商户控件配置
     */
    public mchTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('channelDay.listPage.MchCfg.title'),
        url:CommonService.MCH_INFO_URL,
        params:{isStore: 0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('channelDay.listPage.MchCfg.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('channelDay.listPage.MchCfg.merchantName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('channelDay.listPage.MchCfg.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('channelDay.listPage.MchCfg.merchantName'),
            index:'name'
        }]
    };
    /**
     * 结算账户控件配置
     */
    public allyTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('channelDay.listPage.AllyCfg.title'),
        url:CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'companion',
            label:this.i18n.fanyi('channelDay.listPage.AllyCfg.ally')
        },{
            field:'name',
            label:this.i18n.fanyi('channelDay.listPage.AllyCfg.allyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('channelDay.listPage.AllyCfg.ally'),
            index:'companion'
        },{
            title:this.i18n.fanyi('channelDay.listPage.AllyCfg.allyName'),
            index:'companionName'
        }]
    };
    /**
     * 款项类型数据
     */
    public cashType:Array<any> = [];
    /**
     * 付款状态数据
     */
    public cashState:Array<any> = [];
    /**
     * 支付类型配置
     */
    public tradeTypes:Array<string>= [];
    /**
     * 机构日结列表配置
     * @type {{url: string; params: channelDayForm; total: number; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: ({title: string | any; index: string; type: string; dateFormat: string} | {title: string | any; index: string} | {title: string | any; render: string})[]}}
     */
    public tableCfg:any = {
        url:ChannelDayLoad.CHANNEL_DAY_LIST_URL,
        params:this.channelDayForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('channelDay.listPage.tableCols.reconDay'),
                index:'reconDay',
                type:"date",
                dateFormat:"YYYY-MM-DD"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableCols.canalName'),
                index:'canalName',
                width:"300px"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableCols.transType'),
                // index:'transType',
                render:"transTypeRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableCols.totalQua'),
                // index:'totalQua'
                render:"totalQuaRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableCols.totalFee'),
                // index:'totalFee',
                render:"totalFeeRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableCols.cashTotalFee'),
                // index:'cashTotalFee',
                render:"cashTotalFeeRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableCols.cashType'),
                // index:'cashType',
                render:"cashTypeRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableCols.cashState'),
                // index:'cashState',
                render:"cashStateRender"
            }
        ]
    };
    /**
     * 日结详细列表配置
     * @type {{url: string; params: channelDayForm; total: number; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: ({title: string | any; index: string; type: string; dateFormat: string} | {title: string | any; render: string} | {title: string | any; index: string})[]}}
     */
    public tableDetailCfg:any = {
        url:ChannelDayLoad.CHANNEL_DAY_DETAIL_LIST_URL,
        params:this.channelDayDetailForm,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.tradeTime'),
                index:'tradeTime',
                type:"date",
                dateFormat:"YYYY-MM-DD"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.canalName'),
                // index:'canalName',
                render:"canalNameRender",
                width:"350px"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.transType'),
                // index:'transType',
                render:"transTypeRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.atRate'),
                // index:'atRate',
                render:"atRateRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.difRate'),
                // index:'difRate',
                render:"difRateRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.totalQua'),
                // index:'totalQua'
                render:"totalQuaRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.totalFee'),
                // index:'totalFee',
                render:"totalFeeRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.cashTotalFee'),
                // index:'cashTotalFee',
                render:"cashTotalFeeRender"
            },{
                title:this.i18n.fanyi('channelDay.listPage.tableDetailCols.cashType'),
                // index:'cashType',
                render:"cashTypeRender"
            }
        ]
    };
public count:any; //统计数据
public countDetail:any;//机构详情统计数据
public UloCode:any; //优络编码

  constructor (public helper:HelperService,  public msg: NzMessageService,
               public i18n:I18NService,public objectExtend:ObjectExtend,
               public channelDB:ChannelDayLoad,
               public commonDB:CommonService,
               public dialog:NzModalService) {
      this.commonDB.loadTransApi({transId:""}).subscribe(res =>{
          this.tradeTypes = res
      });//支付类型
      this.channelCount();
  }
  ngOnInit(){
      this.cashType = this.helper.getDictByKey('CASH_TYPE');
      this.cashState = this.helper.getDictByKey('CASH_STATUS');
      this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');
  }
    /**
     * 机构日结查询
     */
    public onSearch(){
        this.channelDayListTable.doSearch();
        this.channelCount();
    }

    /**
     * 渠道日结渠道选中事件
     * @param value
     * @constructor
     */

    CanalNoSelected(value){
        this.channelDayForm.canalNo = value.chanCode;
    }
    /**
     * 日结详细渠道选中事件
     * @param value
     * @constructor
     */
    CanalNoDetailSelected(value){
        this.channelDayDetailForm.canalNo = value.chanCode;
    }
    /**
     * 渠道日结服务商选中事件
     * @param value
     * @constructor
     */

    ChanProNoSelected(value){
        this.channelDayForm.chanProNo = value.chanCode;
    }
    /**
     * 日结详细服务商选中事件
     * @param value
     * @constructor
     */
    ChanProNoDetailSelected(value){
        this.channelDayDetailForm.chanProNo = value.chanCode;
    }
    /**
     * 渠道日结受理机构选中事件
     * @param value
     */
    agencyCodesearchSelected(value){
        this.channelDayForm.agencyCode = value.orgNo;
        this.channelDayForm.canalNo = null;
        this.channelDayForm.canalName = null;
        this.channelDayForm.chanProName = null;
        this.channelDayForm.chanProNo = null;
    }
    /**
     * 日结详细受理机构选中事件
     * @param value
     */
    agencyCodesearchDetailSelected(value){
        this.channelDayDetailForm.agencyCode = value.orgNo;
        this.channelDayDetailForm.canalNo = null;
        this.channelDayDetailForm.canalName = null;
        this.channelDayDetailForm.chanProNo = null;
        this.channelDayDetailForm.chanProName = null;
        this.channelDayDetailForm.merchantNo = null;
        this.channelDayDetailForm.merchantName =null;
    }
    merchantNoSelected(value){
        // if(this.BusinessDayForm.agencyCode){
        //     this.mchTableCfg.params = {isStore: 0,bankNo:this.BusinessDayForm.agencyCode};
        // }else {
        //     this.mchTableCfg.params = {isStore: 0,bankNo:this.UloCode};
        // }
    }

    /**
     * 渠道日结服务商搜索前事件
     */
    chanProNoSearchBefore(){
        if(this.channelDayForm.agencyCode){
            this.ChanProNoTableCfg.params = {chanType: 1,bankCode:this.channelDayForm.agencyCode};
        }else {
            this.ChanProNoTableCfg.params = {chanType: 1,bankCode:this.UloCode};
        }
    }
    /**
     * 日结详细服务商搜索前事件
     */
    chanProNoDetailSearchBefore(){
        if(this.channelDayDetailForm.agencyCode){
            this.ChanProNoTableCfg.params = {chanType: 1,bankCode:this.channelDayDetailForm.agencyCode};
        }else {
            this.ChanProNoTableCfg.params = {chanType: 1,bankCode:this.UloCode};
        }
    }
    /**
     * 渠道日结渠道搜索前事件
     */
    CanalNoSearchBefore(){
        if(this.channelDayForm.agencyCode){
            this.CanalNoTableCfg.params = {chanType: 0,bankCode:this.channelDayForm.agencyCode};
        }else {
            this.CanalNoTableCfg.params = {chanType: 0,bankCode:this.UloCode};
        }
    }
    /**
     * 日结详细渠道搜索前事件
     */
    CanalNoSearchDetailBefore(){
        if(this.channelDayDetailForm.agencyCode){
            this.CanalNoTableCfg.params = {chanType: 0,bankCode:this.channelDayDetailForm.agencyCode};
        }else {
            this.CanalNoTableCfg.params = {chanType: 0,bankCode:this.UloCode};
        }
    }
    /**
     * 日结详细商户搜索前事件
     */
    merchantNoSearchBefore(){
        if(this.channelDayDetailForm.agencyCode){
            this.mchTableCfg.params = {isStore: 0,bankNo:this.channelDayDetailForm.agencyCode};
        }else {
            this.mchTableCfg.params = {isStore: 0,bankNo:this.UloCode};
        }
}


    /**
     * 机构日结结算打款
     */
    public onSettlePayBtn(){
        if(!this.channelDayForm.agencyCode){
            this.msg.warning(this.i18n.fanyi('Settle.tips.SettleAgency'));
            return false;
        }
        if(!this.channelDayForm.ally){
            this.msg.warning(this.i18n.fanyi('channelDay.tips.SettlePay'));
            return false;
        }
        let win =   this.dialog.open({
            title: this.i18n.fanyi('channelDay.listPage.win.title'),
            content:settlePayWinComponent,
            footer:false,
            maskClosable:false,
            width:"600px",
            componentParams:{
                model:this.channelDayForm
        }
        });
      win.subscribe(result =>{
          if(result && result == 'onOk'){
              this.channelDayListTable.doSearch(false);
          }
      })
    }
    /**
     * 日结详细结算打款
     */
    public onSettleDetailPayBtn(){
        if(!this.channelDayDetailForm.agencyCode){
            this.msg.warning(this.i18n.fanyi('Settle.tips.SettleAgency'));
            return false;
        }
        if(!this.channelDayDetailForm.ally){
            this.msg.warning(this.i18n.fanyi('channelDay.tips.SettlePay'));
            return false;
        }
        let win =   this.dialog.open({
            title: this.i18n.fanyi('channelDay.listPage.win.title'),
            content:settlePayWinComponent,
            footer:false,
            maskClosable:false,
            width:"600px",
            componentParams:{
                model:this.channelDayDetailForm
            }
        });
        win.subscribe(result =>{
            if(result && result == 'onOk'){
                this.channelDayListTable.doSearch(false);
            }
        })
    }



    // //渠道日结时间---》当天，日结详情---》取渠道日结时间前一天
    onChangeTab(selectedIndex:any){

        if(selectedIndex == 1){
            this.channelDayDetailForm['billTimeStart'] = this.helper.dateFormat(this.onMinusDate(this.channelDayForm['billTimeStart']).toLocaleDateString(),"YYYY-MM-DD");
            this.channelDayDetailForm['billTimeEnd'] = this.helper.dateFormat(this.onMinusDate(this.channelDayForm['billTimeEnd']).toLocaleDateString(),"YYYY-MM-DD");
        this.onDetailSearch();
        }else if(selectedIndex == 0){
            this.channelDayForm['billTimeStart'] = this.helper.dateFormat(this.onPlusDate(this.channelDayDetailForm['billTimeStart']).toLocaleDateString(),"YYYY-MM-DD");
            this.channelDayForm['billTimeEnd'] = this.helper.dateFormat(this.onPlusDate(this.channelDayDetailForm['billTimeEnd']).toLocaleDateString(),"YYYY-MM-DD");
            this.onSearch();
        }
    }

    onMinusDate(theTime: any){
        // var date = this.form['billTimeStart'];
        var date = theTime;
        date = date.substring(0,19);
        date = date.replace(/-/g,'/');
        var timestamp = new Date(date).getTime();
        var yesterdsay = new Date(timestamp - 86400000);
        // this.form['billTimeStart'] = this.helper.format(yesterdsay);
        return yesterdsay;
    }
    onPlusDate(theTime: any){
        var date = theTime;
        date = date.substring(0,19);
        date = date.replace(/-/g,'/');
        var timestamp = new Date(date).getTime();
        var  tomorrow = new Date(timestamp + 86400000);
        return  tomorrow;
    }

    /**
     * 日结详细查询
     */
    public onDetailSearch(){
        this.channelDayDetailListTable.doSearch();
        this.channelDetailCount();
    }

    /**
     * 机构日结统计
     */
    public channelCount(){
        this.channelDB.loadChannelCount(this.objectExtend.clone(this.channelDayForm)).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.count =res[CommonEnum.SERVER_DATA_KEY];
            }
        });
    }

    /**
     * 日结详细统计
     */
    public channelDetailCount(){
        this.channelDB.loadChannelCountDetail(this.objectExtend.clone(this.channelDayDetailForm)).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.countDetail =res[CommonEnum.SERVER_DATA_KEY];
            }
        });
    }
    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    EndDateDisabled(endValue:any){
        if(!endValue || !this.channelDayForm.billTimeEnd){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.channelDayForm.billTimeStart) || endValue >= this.helper.modifyDateByDay(this.channelDayForm.billTimeStart,30);
    }
    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    detailEndDateDisabled(endValue:any){
        if(!endValue || !this.channelDayDetailForm.billTimeEnd){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.channelDayDetailForm.billTimeStart) || endValue >= this.helper.modifyDateByDay(this.channelDayDetailForm.billTimeStart,30);
    }
}
