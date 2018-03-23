import {Component} from "@angular/core";
import {I18NService} from "../../../common/i18n/i18n.service";
import {DynamicTabs, DynamicTabsService} from "@delon/abc";
import {AgencyInfoComponent} from "./detail/agency-info.component";
import {AgencyChannelComponent} from "./detail/agency-share-profit.component";
import {AgencyService} from "../../../common/services/request/user-file-manage/agency.service";

/**
 * 代理商详情页
 */
@Component({
    selector:'agency-detail',
    templateUrl:'./agency-detail.component.html',
    providers:[DynamicTabsService,AgencyService]
})
export class AgencyDetailComponent{

    public tabs:Array<DynamicTabs> = [{
        title:this.i18n.fanyi('Agency.detailPage.detail.title'),
        content:AgencyInfoComponent
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.title'),
        content:AgencyChannelComponent
    }];

    constructor(protected i18n:I18NService){}


}
