import {Component, ViewChild,OnInit} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {HttpHeaders} from '@angular/common/http';
import {NzMessageService, ObjectExtend} from 'ng-zorro-antd';
import {Observable} from 'rxjs/Observable';
import {TradeRatioSucDayForm} from '../../../../../common/form/trade-manage/trade-ratio-suc-day.form';
import {CommonEnum} from '../../../../../common/enum/common.enum';
import {CommonService} from '../../../../../common/services/request/common.service';
import {HelperService} from '../../../../../common/services/helper.service';
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {TradeRatioService} from "../../../../../common/services/request/trade-manage/trade-ratio.service";

/**
 * 日成功比例图
 */
@Component({
    selector:"trade-suc-ratio-day",
    templateUrl:"trade-suc-ratio-day.component.html",
    providers:[TradeRatioService]
})
export class TradeSucRatioDayComponent implements OnInit{
    public UloCode:any;//优络编码
    public dayForm:TradeRatioSucDayForm = new TradeRatioSucDayForm();

    /**
     * 受理机构控件配置
     */
    public bankCodeCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeRatio.listPage.bankCodeCfg.title'),
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('TradeRatio.listPage.bankCodeCfg.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeRatio.listPage.bankCodeCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeRatio.listPage.bankCodeCfg.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('TradeRatio.listPage.bankCodeCfg.name'),
            index:'name'
        }]
    };

    /**
     * 所属上级控件配置
     */
    public agentnoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeRatio.listPage.agentnoTableCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('TradeRatio.listPage.agentnoTableCfg.agentno')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeRatio.listPage.agentnoTableCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeRatio.listPage.agentnoTableCfg.agentno'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('TradeRatio.listPage.agentnoTableCfg.name'),
            index:'name'
        }]
    };

    /**
     * 商户控件配置
     */
    public merchantIdTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeRatio.listPage.merchantIdTableCfg.title'),
        url:CommonService.MCH_INFO_URL,
        params:{isStore:0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('TradeRatio.listPage.merchantIdTableCfg.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeRatio.listPage.merchantIdTableCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeRatio.listPage.merchantIdTableCfg.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('TradeRatio.listPage.merchantIdTableCfg.name'),
            index:'name'
        }]
    };

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public msg: NzMessageService,
        public cmService:CommonService,
        public objExtend:ObjectExtend,
        public tradeRatioService:TradeRatioService
    ){
    }
    ngOnInit(){
        this.loadChartsData();
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');//优络编号
    }
    loadChartsData(){
        this.tradeRatioService.loadChartsData(this.objExtend.clone(this.dayForm)).subscribe( res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){

            }
        })
    }
    /**
     * 受理机构选中事件
     */
    onBankNoSelected(value){
        //重新选择清空所属上级层级编号及商户ID
        this.dayForm.merchantId = null;
        this.dayForm.agentno = '';
        this.dayForm.agencyName = '';
        this.dayForm.merchantName = '';
    }

    /**
     * 所属上级查询前事件
     */
    onAgentnoSearchBefore(){
        if(this.dayForm.bankNo){
            this.agentnoTableCfg.params = {bankCode:this.dayForm.bankNo};
        }else {
            this.agentnoTableCfg.params = {bankCode:this.UloCode};
        }
    }
    /**
     * 所属上级选中事件
     */
    onAgentnoSelected(value){
        this.dayForm.agencyName = value.name;
    }
    /**
     * 商户查询前事件
     */
    onMchSearchBefore(){
        if(this.dayForm.bankNo){
            this.merchantIdTableCfg.params = this.objExtend.extend(this.merchantIdTableCfg.params,{bankNo:this.dayForm.bankNo});
        }else {
            this.merchantIdTableCfg.params = this.objExtend.extend(this.merchantIdTableCfg.params,{bankNo:this.UloCode});
        }
    }
    /**
     * 商户选中事件
     */
    onMchSelected(value){
        this.dayForm.agencyName = value.name;
    }

    /**
     * 列表页查询
     */
    onSearch(){
        this.loadChartsData();
        // this.ratioListTable.doSearch();
    }


    /**
     * 前往交易比率
     */
    onGoRatio(){
        this.helper.navigate('/admin/trades/traderatio',this.i18n.fanyi('TradeRatio.listPage.btn.goRatioBtn'),{})
    }

    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public tradeTimeEndDateDisabled(endValue:any){
        if(!endValue || !this.dayForm.tradeTimeEnd){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.dayForm.tradeTimeStart) || endValue >= this.helper.modifyDateByDay(this.dayForm.tradeTimeStart,7);
    }
}
