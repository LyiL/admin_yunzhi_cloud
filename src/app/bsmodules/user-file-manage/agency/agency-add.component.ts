import {Component} from "@angular/core";
import {AgencyBaseInfoComponent} from "./add/agency-base-info.component";
import {AgencyAccountInfoComponent} from "./add/agency-account-info.component";
import {AgencyChannelInfoComponent} from "./add/agency-share-profit-info.component";
import {DynamicStepsService} from "@delon/abc";
import {AgencyService} from "../../../common/services/request/user-file-manage/agency.service";
import {I18NService} from "../../../common/i18n/i18n.service";

/**
 * 代理商新增页
 */
@Component({
    selector:'agency-add',
    templateUrl:'./agency-add.component.html',
    providers:[DynamicStepsService,AgencyService]
})
export class AgencyAddComponent{
    public current:number = 0;

    public steps:Array<any> = [{
        title:this.i18n.fanyi('Agency.addPage.baseInfo.title'),
        content:AgencyBaseInfoComponent
    },{
        title:this.i18n.fanyi('Agency.addPage.accountInfo.title'),
        content:AgencyAccountInfoComponent
    },{
        title:this.i18n.fanyi('Agency.addPage.shareProfitCfgInfo.title'),
        content:AgencyChannelInfoComponent
    }];
    constructor(protected i18n:I18NService){}
}
