import {Component} from "@angular/core";
import {I18NService} from "../../../common/i18n/i18n.service";
import {TradeQueryService} from "../../../common/services/request/trade-manage/trade-query.service";
import {BatchQueryComponent} from "./batch-query.component";
import {OrderNoQueryComponent} from "./order-no-query.component";
import {DynamicTabsService} from "@delon/abc";

/**
 * 交易查询tab分页
 */
@Component({
    selector:'trade-query-list',
    templateUrl:'./trade-query-list.component.html',
    providers:[TradeQueryService,DynamicTabsService],
    entryComponents:[BatchQueryComponent,OrderNoQueryComponent]
})
export class TradeQueryListComponent{
    /**
     *  tab分页设置 [
     *  批量订单查询 BatchQueryComponent
     *  订单号查询 OrderNoQueryComponent
     *  ]
     */
    public tradeTabs:Array<any> = [{
        title:this.i18n.fanyi('TradeQuery.listPage.tabs.batch'),
        content:BatchQueryComponent
    },{
        title:this.i18n.fanyi('TradeQuery.listPage.tabs.order'),
        content:OrderNoQueryComponent
    }];

    constructor(public i18n:I18NService){}
}
