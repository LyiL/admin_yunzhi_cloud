import {Component, ViewChild,OnInit} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {CommonEnum} from '../../../common/enum/common.enum';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {NzMessageService, ObjectExtend} from 'ng-zorro-antd';
import {TradeRatioForm} from '../../../common/form/trade-manage/trade-ratio.form';
import {CommonService} from '../../../common/services/request/common.service';
import {Observable} from 'rxjs/Observable';
import {TradeRatioService} from "../../../common/services/request/trade-manage/trade-ratio.service";

/**
 * 交易比率列表页
 */
@Component({
    selector:"trade-ratio-list",
    templateUrl:"trade-ratio-list.component.html",
    providers:[TradeRatioService]
})
export class TradeRatioListComponent implements OnInit{
    public UloCode:any;//优络编码
    public ratioListForm:TradeRatioForm = new TradeRatioForm();

    @ViewChild('ratioListTable') public ratioListTable: SimpleTableComponent;

    /**
     * 交易通知列表基础信息配置
     */
    public tableCfg:any = {
        url:TradeRatioService.TRADERATIO_LIST_URL,
        params:this.ratioListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                // 统计时间
                title:this.i18n.fanyi('TradeRatio.listPage.tableCols.countTime'),
                index:'countTime',
                type:'date',
                dateFormat:'YYYY-MM-DD'
            },
            {
                // 商户名称
                title:this.i18n.fanyi('TradeRatio.listPage.tableCols.mchName'),
                index:'mchName'
            },
            {
                // 支付类型
                title:this.i18n.fanyi('TradeRatio.listPage.tableCols.tradeType'),
                index:'tradeName',
            },
            {
                // 订单总数
                title:this.i18n.fanyi('TradeRatio.listPage.tableCols.allNum'),
                index:'allNum'
            },
            {
                // 成功订单总数
                title:this.i18n.fanyi('TradeRatio.listPage.tableCols.sucNum'),
                index:'sucNum',
            },
            {
                // 成功比率
                title:this.i18n.fanyi('TradeRatio.listPage.tableCols.b'),
                render:'bRender'
            },
            {
                // 交易总额
                title:this.i18n.fanyi('TradeRatio.listPage.tableCols.totalFee'),
                render:'totalFeeRender'
            }
        ]
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
        title:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.title'),
        url:CommonService.MCH_INFO_URL,
        params:{
            isStore:0
        },
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('TradeQuery.listPage.merchantNoCfg.merchantName'),
            index:'name'
        }]
    };

    public transTypes:Observable<any>; // 支付类型

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public msg: NzMessageService,
        public cmService:CommonService,
        public objExtend:ObjectExtend
    ){
        // 获取支付类型
        this.transTypes = this.cmService.loadTransApi({});
    }
    ngOnInit(){
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');//优络编号
    }
    /**
     * 所属上级查询前事件
     */
    onAgentnoSearchBefore(){
        this.agentnoTableCfg.params = {bankCode:this.UloCode};
    }

    /**
     * 商户查询前事件
     */
    onMchSearchBefore(){
        this.merchantIdTableCfg.params = this.objExtend.extend(this.merchantIdTableCfg.params,{bankNo:this.UloCode});
    }
    /**
     * 列表页查询
     */
    onSearch(){
        this.ratioListTable.doSearch();
    }


    /**
     * 前往成功比例图
     */
    onGoChart(){
        this.helper.navigate('/admin/trades/tradesuccessratiochart',this.i18n.fanyi('TradeRatio.listPage.btn.goChartBtn'),{})
    }
}
