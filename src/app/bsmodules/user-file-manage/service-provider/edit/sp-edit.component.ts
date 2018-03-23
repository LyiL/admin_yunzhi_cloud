import {Component} from "@angular/core";
import {DynamicStepsService} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {SpEditBaseComponent} from './base/sp-edit-base.component';
import {SpEditAccountComponent} from './account/sp-edit-account.component';
import {SpEditShareProfitComponent} from './share-profit/sp-edit-shareProfit.component';
import {SpEditChannelComponent} from './channel/sp-edit-channel.component';
import {SpEditInfoConfigComponent} from './info-config/sp-edit-infoConfig.component';

/**
 * 服务商新增页
 */
@Component({
    selector:'service-edit',
    templateUrl:'./sp-edit.component.html',
    providers:[DynamicStepsService]
})
export class SpEditComponent{

    constructor(public i18n:I18NService){}

    public current:number = 0;

    public steps:Array<any> = [
        {
            title: this.i18n.fanyi('SP.detailPage.detail.info.infoTitle'),
            content: SpEditBaseComponent
        },
        {
            title: this.i18n.fanyi('SP.detailPage.detail.accountInfo'),
            content: SpEditAccountComponent
        },
        {
            title: this.i18n.fanyi('SP.detailPage.shareCfg.title'),
            content: SpEditShareProfitComponent
        },
        {
            title: this.i18n.fanyi('SP.detailPage.channelCfg.title'),
            content: SpEditChannelComponent
        },
        {
            title: this.i18n.fanyi('SP.detailPage.infoCfg.title'),
            content: SpEditInfoConfigComponent
        }
    ];
}
