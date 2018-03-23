import {Component, ViewChild,OnInit} from "@angular/core";
import {SimpleTableComponent} from '@delon/abc';
import {HelperService} from '../../../common/services/helper.service';
import {I18NService} from '../../../common/i18n/i18n.service';
import {TradeNoticeForm} from '../../../common/form/trade-manage/trade-notice.form';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpHeaders} from '@angular/common/http';
import {CommonEnum} from '../../../common/enum/common.enum';
import {TradeNoticeService} from '../../../common/services/request/trade-manage/trade-notice.service';
import {ModalHelper} from '@delon/theme';
import {TradeBatchSyncWinComponent} from './batch-sync/batch-sync-win.component';
import {TradeBatchNoticeWinComponent} from './batch-notice/batch-notice-win.component';

/**
 * 交易通知列表页
 */
@Component({
    selector:"trade-notice-list",
    templateUrl:"trade-notice-list.component.html",
    providers:[TradeNoticeService]
})
export class TradeNoticeListComponent implements OnInit{

    public tradeNoticeListForm:TradeNoticeForm = new TradeNoticeForm();
    public noticeData:any; // 订单详情数据

    /**
     * 订单详情基础信息配置
     */
    public noticeFields:Array<any> = [
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.outTradeNo"),
            field:'outTradeNo'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.orderNo"),
            field:'orderNo'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.transactionId"),
            field:'transactionId'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.appid"),
            field:'appid'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.merchantName"),
            field:'merchantName'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.openid"),
            field:'openid'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.transType"),
            field:'transType'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.tradeTime"),
            field:'tradeTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.tradeState"),
            field:'tradeState',
            type:'dict',
            transKey:'TRADE_STATUS'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.tradeMoney"),
            field:'tradeMoney',
            type:'fee'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.refundMoney"),
            field:'refundMoney',
            type:'fee'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.termno"),
            field:'termno'
        },
        {
            title:this.i18n.fanyi("TradeNotice.listPage.detail.operno"),
            field:'operno'
        }
    ];

    @ViewChild('tradeNoticeListTable') public tradeNoticeListTable: SimpleTableComponent;

    /**
     * 交易通知列表基础信息配置
     */
    public tableCfg:any = {
        url:TradeNoticeService.NOTICE_LIST_URL,
        params:this.tradeNoticeListForm,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                // 平台单号
                title:this.i18n.fanyi('TradeNotice.listPage.tableCols.orderNo'),
                index:'orderNo',
                width:'220px'
            },
            {
                // 时间
                title:this.i18n.fanyi('TradeNotice.listPage.tableCols.createdTime'),
                index:'createdTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },
            {
                // 通知状态
                title:this.i18n.fanyi('TradeNotice.listPage.tableCols.notifyState'),
                // index:'notifyState',
                render:'notifyStateRender'
            },
            {
                // 请求类型
                title:this.i18n.fanyi('TradeNotice.listPage.tableCols.reqType'),
                // index:'reqType',
                render:'reqTypeRender'
            },
            {
                // 通知结果
                title:this.i18n.fanyi('TradeNotice.listPage.tableCols.outRspXml'),
                index:'outRspXml'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 详情
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('TRADENOTICEDETAIL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/trades/tradenoticedetail',this.i18n.fanyi('TradeNotice.detailPage.title'),{
                                id:record['id']
                            });
                        }).bind(this)
                    }
                ]
            }
        ]
    };

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public msg: NzMessageService,
        public noticeService:TradeNoticeService,
        public modalHelper:ModalHelper
    ){}

    ngOnInit(){}

    /**
     * 列表页查询
     */
    onSearch(){
        // 至少输入一个单号
        if(this.checkNo()){
            this.msg.warning(this.i18n.fanyi('TradeNotice.listPage.search.searchFormMessage'));
            return;
        }
        this.tradeNoticeListTable.doSearch();
        this.loadNoticeDetail(this.tradeNoticeListForm);
    }

    /**
     * 加载订单详情
     */
    loadNoticeDetail(data){
        this.noticeService.loadOrderInfo(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.noticeData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 批量同步
     */
    onBatchSync(){
        let win = this.modalHelper.static(TradeBatchSyncWinComponent,{},520,{
            title:this.i18n.fanyi('TradeNotice.listPage.btn.batchSyncBtn')
        });
        win.subscribe(res => {
            this.onSearch();
        })
    }

    /**
     * 批量通知
     */
    onBatchNotice(){
        let win = this.modalHelper.static(TradeBatchNoticeWinComponent,{},520,{
            title:this.i18n.fanyi('TradeNotice.listPage.btn.batchNoticeBtn')
        });
        win.subscribe(res => {
            this.onSearch();
        })
    }

    /**
     * 同步订单
     */
    onOrderSync(){
        if(this.checkNo()){
            this.msg.warning(this.i18n.fanyi('TradeNotice.listPage.search.searchFormMessage'));
            return;
        }
        this.noticeService.loadSync(this.tradeNoticeListForm).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('TradeNotice.listPage.detail.syncTip'));
            }else {
                this.msg.warning(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 补单订单
     */
    onOrderSupply(){
        if(this.checkNo()){
            this.msg.warning(this.i18n.fanyi('TradeNotice.listPage.search.searchFormMessage'));
            return;
        }
        this.noticeService.loadNotify(this.tradeNoticeListForm).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('TradeNotice.listPage.detail.supplyTip'));
            }else {
                this.msg.warning(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 检查单号是否有填
     */
    checkNo():boolean{
        if(this.helper.isEmpty(this.tradeNoticeListForm.orderNo) && this.helper.isEmpty(this.tradeNoticeListForm.outTradeNo) && this.helper.isEmpty(this.tradeNoticeListForm.transactionId)){
            return true; // 单号为空
        }
        return false; // 单号不为空
    }
}
