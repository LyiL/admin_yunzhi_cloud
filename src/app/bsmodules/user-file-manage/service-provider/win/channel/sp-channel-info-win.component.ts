import {Component} from "@angular/core";
import {NzModalSubject} from "ng-zorro-antd";
import {ServiceProviderService} from '../../../../../common/services/request/user-file-manage/service-provider.service';
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../../common/services/helper.service';

/**
 * 服务商详情页-渠道详情弹框
 */
@Component({
    selector:'sp-channel-info-win',
    templateUrl:'./sp-channel-info-win.component.html',
    providers:[ServiceProviderService]
})
export class SpChannelInfoWinComponent{
    /**
     * 服务商渠道信息
     */
    public channelInfoData:any = {};

    public detailFields:Array<any> = [
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.transType'),
            field:'transType'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.agencyName'),
            field:'agencyName'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.ptCenterName'),
            field:'ptCenterName'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.providerNo'),
            field:'providerNo'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.thirdMchId'),
            field:'thirdMchId'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.pcmPartkey'),
            field:'pcmPartkey'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.used'),
            field:'used',
            type:'i18n'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.limitDay'),
            field:'limitDay'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.limitSingle'),
            field:'limitSingle'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.limitSingleMin'),
            field:'limitSingleMin'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.thirdAppid'),
            field:'thirdAppid'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.settleCycle'),
            field:'settleCycle',
            type:'dict',
            transKey:'BALANCE_DATE'
        },
        {
            title:this.i18n.fanyi('SP.detailPage.channelCfg.channelInfo.settleRate'),
            field:'settleRate'
        }
    ];

    constructor(
        public subject: NzModalSubject,
        public i18n:I18NService,
        public helper:HelperService
    ){}

    public onCancelHandle(){
        this.subject.destroy();
    }
}
