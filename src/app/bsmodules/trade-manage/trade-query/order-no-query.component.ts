import {Component, ViewChild} from "@angular/core";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HelperService} from "../../../common/services/helper.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {TradeQueryOrderForm} from '../../../common/form/trade-manage/trade-query-order.form';
import {NzMessageService, ObjectExtend} from 'ng-zorro-antd';
import {TradeQueryService} from '../../../common/services/request/trade-manage/trade-query.service';

/**
 * 订单号查询列表页
 */
@Component({
    selector:'trade-order-no',
    templateUrl:'./order-no-query.component.html',
    providers:[TradeQueryService]
})
export class OrderNoQueryComponent{
    public orderListForm:TradeQueryOrderForm = new TradeQueryOrderForm(); // 订单号查询表单
    @ViewChild('orderListTable') public orderListTable:SimpleTableComponent;

    // 订单号查询表格配置
    public orderTableCfg:any = {
        url:TradeQueryService.ORDER_LIST_URL,
        params:this.orderListForm,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('TradeQuery.listPage.tableCols.tradeTime'),
                index:'tradeTime',
                type:'date',
                width:'180px',
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

    constructor(
        public i18n:I18NService,
        public helper:HelperService,
        public _msg: NzMessageService,
        public objectExtend:ObjectExtend
    ){}

    /**
     * 订单号查询
     */
    public onSearchOrder(){
        if(this.helper.isEmpty(this.orderListForm.orderNo) && this.helper.isEmpty(this.orderListForm.outTradeNo) && this.helper.isEmpty(this.orderListForm.transactionId) && this.helper.isEmpty(this.orderListForm.bankTypeNo)){
            this._msg.warning(this.i18n.fanyi('TradeQuery.listPage.message.orderFormMessage'));
            return;
        };
        this.orderListTable.doSearch();
    }
}
