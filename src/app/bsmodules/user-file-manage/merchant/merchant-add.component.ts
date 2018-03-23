import {Component} from "@angular/core";
import {MchBaseInfoComponent} from "./add/mch-base-info.component";
import {MchAccountInfoComponent} from "./add/mch-account-info.component";
import {MchChannelInfoComponent} from "./add/mch-channel-info.component";
import {I18NService} from '../../../common/i18n/i18n.service';
import {mchService} from '../../../common/services/request/user-file-manage/mch.service';
import {DynamicStepsService} from '@delon/abc';
import {MchInfoConfigComponent} from './add/mch-infoConfig.component';
/**
 * 新增商户页面配置
 */
@Component({
    selector:'merchant-add',
    templateUrl:'./merchant-add.component.html',
    providers:[mchService,DynamicStepsService]
})
export class MerchantAddComponent{
    public current:number = 0;

    public steps:Array<any> = [{
        title:this.i18n.fanyi('Mch.step.baseInfo.title'),
        content:MchBaseInfoComponent
    },{
        title:this.i18n.fanyi('Mch.step.accountInfo.title'),
        content:MchAccountInfoComponent
    },{
        title:this.i18n.fanyi('Mch.step.channelInfo.title'),
        content:MchChannelInfoComponent
    },{
        title:this.i18n.fanyi('Mch.step.infoCfg.title'),
        content:MchInfoConfigComponent
    }
        ];
    constructor(public i18n:I18NService ,public step:DynamicStepsService){}
}
