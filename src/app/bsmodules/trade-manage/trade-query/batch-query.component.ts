import {Component, ViewChild} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HelperService} from "../../../common/services/helper.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {TadeQueryBatchForm} from '../../../common/form/trade-manage/tade-query-batch.form';
import {TradeQueryService} from '../../../common/services/request/trade-manage/trade-query.service';
import {NzMessageService, ObjectExtend} from 'ng-zorro-antd';
import {CommonService} from '../../../common/services/request/common.service';

/**
 * 批量订单查询列表页
 */
@Component({
    selector:'batch-query',
    templateUrl:'./batch-query.component.html',
    providers:[TradeQueryService]
})
export class BatchQueryComponent{
    public batchListForm:TadeQueryBatchForm = new TadeQueryBatchForm(); // 批量查询表单
    public counts = {}; // 统计面板参数
    public expandForm = false; // 是否显示高级选项
    public UloCode:any; // 优络编码

    @ViewChild('batchListTable') public batchListTable:SimpleTableComponent;

    /**
     * 受理机构控件配置
     */
    public bankNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeQuery.listPage.bankNoCfg.title'),
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('TradeQuery.listPage.bankNoCfg.bankNo')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeQuery.listPage.bankNoCfg.bankName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeQuery.listPage.bankNoCfg.bankNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('TradeQuery.listPage.bankNoCfg.bankName'),
            index:'name'
        }]
    };

    /**
     * 所属渠道控件配置
     */
    public agentnoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeQuery.listPage.agentnoCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('TradeQuery.listPage.agentnoCfg.agentno')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeQuery.listPage.agentnoCfg.agentname')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeQuery.listPage.agentnoCfg.agentno'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('TradeQuery.listPage.agentnoCfg.agentname'),
            index:'name'
        }]
    };

    /**
     * 商户控件配置
     */
    public merchantNoCfg:SearchWindowConfig = {
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

    /**
     * 下属门店控件配置
     */
    // public secondMchNoCfg:SearchWindowConfig = {
    //     title:this.i18n.fanyi('TradeQuery.listPage.secondMchNoCfg.title'),
    //     url:CommonService.MCH_INFO_URL,
    //     params:{
    //         mchRole:2
    //     },
    //     isAjax:false,
    //     resReName:CommonEnum.TABLE_RES_RE_NAME,
    //     reqReName:CommonEnum.TABLE_REQ_RE_NAME,
    //     searchFields:[{
    //         field:'merchantNo',
    //         label:this.i18n.fanyi('TradeQuery.listPage.secondMchNoCfg.secondMchNo')
    //     },{
    //         field:'name',
    //         label:this.i18n.fanyi('TradeQuery.listPage.secondMchNoCfg.secondMchName')
    //     }],
    //     tableColumns:[{
    //         title:this.i18n.fanyi('TradeQuery.listPage.secondMchNoCfg.secondMchNo'),
    //         index:'merchantNo'
    //     },{
    //         title:this.i18n.fanyi('TradeQuery.listPage.secondMchNoCfg.secondMchName'),
    //         index:'name'
    //     }]
    // };

    /**
     * 支付中心控件配置
     */
    public centerIdCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeQuery.listPage.centerIdCfg.title'),
        url:CommonService.PAYCENTER_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'name',
            label:this.i18n.fanyi('TradeQuery.listPage.centerIdCfg.centerName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeQuery.listPage.centerIdCfg.centerName'),
            index:'name'
        }]
    };

    /**
     * 批量查询表格配置
     */
    public batchTableCfg:any = {
        url:TradeQueryService.BATCH_LIST_URL,
        params:this.batchListForm,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.tradeTime'),
                index:'tradeTime',
                width:'180px',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },{
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.outTradeNo') + '/' + this.i18n.fanyi('TradeQuery.listPage.tableCols.orderNo'),
                render:'outTradeNoRender',
                width:'260px'
            },
            {
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.merchantName'),
                index:'merchantName'
            },{
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.transType'),
                index:'transType'
            },{
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.tradeState'),
                render:'tradeStateRender'
            },{
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.tradeMoney'),
                render:'tradeMoneyRender'
            },{
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.refundMoney'),
                render:'refundMoneyRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    // 详情
                    text: this.i18n.fanyi('default.btn.detailBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('TRADEQUERYDETAIL')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((record: any) =>{
                        this.helper.navigate('/admin/trades/tradequerydetail',this.i18n.fanyi('default.btn.detailBtn'),{
                            orderNo: record['orderNo']
                        });
                    }).bind(this)
                }]
            }
        ]
    };
    public tradeStates:Array<any> = []; // 支付类型
    public transTypes:Array<any> = []; // 交易状态

    constructor(
        public i18n:I18NService,
        public helper:HelperService,
        public tradeQueryService:TradeQueryService,
        public _msg: NzMessageService,
        public cmService:CommonService,
        public objectExtend:ObjectExtend
    ){
        this.tradeStates = this.helper.getDictByKey('TRADE_STATUS'); // 获取支付类型
        // 获取交易状态
        this.cmService.loadTransApi({transId:''}).subscribe(res => {
            this.transTypes = res;
        });

        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO'); // 优络编号
    }

    /**
     * 批量查询
     */
    public onSearchBatch(){
        let _form = this.objectExtend.clone(this.batchListForm);
        this.loadSummary(_form);
        this.batchListTable.doSearch();
    }

    /**
     * 统计面板数据查询
     */
    public loadSummary(form){
        this.tradeQueryService.loadSummary(form).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.counts = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 交易结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public queryTradeEndDateDisabled(endValue:any){
        if(!endValue || !this.batchListForm.tradeTimeEnd){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.batchListForm.tradeTimeStart) || endValue >= this.helper.modifyDateByDay(this.batchListForm.tradeTimeStart,7);
    }

    /**
     * 受理机构选中事件
     */
    onBankNoSelected(value:any){
        this.batchListForm.bankNo = value['orgNo'];
        // 清空所属渠道
        this.batchListForm.agentno = null;
        this.batchListForm.agentName = null;
        // 清空商户
        this.batchListForm.merchantNo = null;
        this.batchListForm.merchantName = null;
    }

    /**
     * 所属渠道选中事件
     * @param value
     */
    onSelectAgentno(value: any){
        this.batchListForm.agentno = value['agentno'];
        this.batchListForm.agentName = value['name'];
        // 清空商户
        this.batchListForm.merchantNo = null;
        this.batchListForm.merchantName = null;
    }

    /**
     * 所属渠道查询前事件
     */
    onAgentnoSearchBefore(){
        if(this.batchListForm.bankNo){
            this.agentnoCfg.params = {bankCode:this.batchListForm.bankNo};
        }else{
            this.agentnoCfg.params = {bankCode:this.UloCode};
        }
    }

    /**
     * 商户名称查询前事件
     */
    onMchSearchBefore(){
        if(this.batchListForm.bankNo){
            this.merchantNoCfg.params = this.objectExtend.extend(this.merchantNoCfg.params,{bankNo:this.batchListForm.bankNo});
        }else{
            this.merchantNoCfg.params = this.objectExtend.extend(this.merchantNoCfg.params,{bankNo:this.UloCode});
        }
    }

    /**
     * 商户名称选中事件
     */
    onMerchantNoSelect(value:any){
        this.batchListForm.merchantName = value['name'];
        this.batchListForm.merchantNo = value['merchantNo'];
    }
}
