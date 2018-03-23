import {Component} from "@angular/core";
import {DynamicTabsService} from "@delon/abc";
import {TradeSucRatioHourComponent} from './suc-ratio-hour/trade-suc-ratio-hour.component';
import {TradeSucRatioDayComponent} from './suc-ratio-day/trade-suc-ratio-day.component';
import {I18NService} from '../../../../common/i18n/i18n.service';

/**
 * 成功比例图
 */
@Component({
    selector:'trade-suc-ratio',
    templateUrl:'./trade-suc-ratio.component.html',
    providers:[DynamicTabsService],
    entryComponents:[TradeSucRatioDayComponent,TradeSucRatioHourComponent]
})
export class TradeSucRatioComponent{
    public sucRatioTabs:Array<any> = [
        {
            title:this.i18n.fanyi('TradeRatio.listPage.tabs.day'),
            content:TradeSucRatioDayComponent
        },
        {
            title:this.i18n.fanyi('TradeRatio.listPage.tabs.hour'),
            content:TradeSucRatioHourComponent
        }
    ];
    constructor(public i18n: I18NService){}
}
