import {Component} from "@angular/core";
import {DynamicTabs, DynamicTabsService} from "@delon/abc";
import {mchService} from "../../../common/services/request/user-file-manage/mch.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {MerchantChannelComponent} from "./detail/mch-channel.component";
import {MerchantInfoComponent} from './detail/mch-info.component';
import {MchInfoConfigDetailComponent} from './detail/mch-infoConfigDetail.component';

/**
 * 商户详情页面配置
 */
@Component({
    selector:'mch-detail',
    templateUrl:'./merchant-detail.component.html',
    providers:[DynamicTabsService,mchService]
})
export class MerchantDetailComponent{
    public tabs:Array<DynamicTabs> = [{
        title:this.i18n.fanyi('Mch.detailPage.detail.title'),
        content:MerchantInfoComponent
    },{
        title:this.i18n.fanyi('Mch.detailPage.channelCfg.title'),
        content:MerchantChannelComponent
    },{
        title:this.i18n.fanyi('Mch.detailPage.infoCfg.title'),
        content:MchInfoConfigDetailComponent
    }
    ];
    constructor(public i18n:I18NService){}
}
