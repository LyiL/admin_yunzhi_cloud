


import {Component} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {ToPayTradeListBatchQueryComponent} from "./to-pay-trade-list-batchQuery.component";
import {ToPayTradeListOrderQueryComponent} from "./to-pay-trade-list-orderQuery.component";
import {I18NService} from "../../../common/i18n/i18n.service";
import {TopayTradeListService} from "../../../common/services/request/to-pay-manage/topay-trade-list.service";

/**
 * 代付交易
 */
@Component({
    selector: 'to-pay-trade-list',
    templateUrl: 'to-pay-trade-list.component.html',
    providers: [TopayTradeListService],
    entryComponents:[ToPayTradeListBatchQueryComponent,ToPayTradeListOrderQueryComponent]
})
export class ToPayTradeListComponent{
    /**
     * * tab分页设置[
     * 批量订单查询 ToPayTradeListBatchQueryComponent
     * 订单号查询 ToPayTradeListOrderQueryComponent
     * ]
     * @type {[{title: (string | any); content: ToPayTradeListBatchQueryComponent} , {title: (string | any); content: ToPayTradeListOrderQueryComponent}]}
     */


    public tradeTabs:Array<any> = [{
        title:this.i18n.fanyi('topayTrade.trade.BatchQuery'),
        content:ToPayTradeListBatchQueryComponent
    },{
        title:this.i18n.fanyi('topayTrade.trade.OrderQuery'),
        content:ToPayTradeListOrderQueryComponent
    }];

    constructor(public i18n:I18NService){}
}
