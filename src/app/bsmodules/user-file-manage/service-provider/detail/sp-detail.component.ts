import {Component} from "@angular/core";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {DynamicTabs, DynamicTabsService} from "@delon/abc";
import {SpDetailInfoComponent} from './info/sp-detail-info.component';
import {SpDetailShareProfitComponent} from './share-profit/sp-detail-shareProfit.component';
import {SpDetailChannelComponent} from './channel/sp-detail-channel.component';
import {SpDetailInfoConfigComponent} from './info-config/sp-detail-infoConfig.component';

/**
 * 服务商详情页
 */
@Component({
    selector:'sp-detail',
    templateUrl:'./sp-detail.component.html',
    providers:[DynamicTabsService]
})
export class SpDetailComponent{

    public tabs:Array<DynamicTabs> = [{
        title:this.i18n.fanyi('default.btn.detailBtn'),
        content:SpDetailInfoComponent
    },{
        title:this.i18n.fanyi('SP.detailPage.shareCfg.title'),
        content:SpDetailShareProfitComponent
    },{
        title:this.i18n.fanyi('SP.detailPage.channelCfg.title'),
        content:SpDetailChannelComponent
    },{
        title:this.i18n.fanyi('SP.detailPage.infoCfg.title'),
        content:SpDetailInfoConfigComponent
    }];

    constructor(public i18n:I18NService){}


}
