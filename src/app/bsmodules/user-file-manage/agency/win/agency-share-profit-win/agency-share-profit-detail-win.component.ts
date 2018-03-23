import {Component} from "@angular/core";
import {NzModalSubject} from "ng-zorro-antd";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {AgencyService} from "../../../../../common/services/request/user-file-manage/agency.service";
import {HelperService} from "../../../../../common/services/helper.service";

/**
 * 代理商分润配置详情弹框
 */
@Component({
    selector:'agency-channel-detail-win',
    templateUrl:'./agency-share-profit-detail-win.component.html',
    providers:[AgencyService]
})
export class AgencyChannelDetailWinComponent{
    /**
     * 代理商分润配置
     */
    public channelInfoData:any = {};

    public detailFields:Array<any> = [{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.transType'),
        field:'transType'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.categoryType'),
        field:'categoryType',
        type:'dict',
        transKey:'MCH_TYPE'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.limitDay'),
        field:'limitDay',
        type:'money'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.limitSMin'),
        field:'limitSingleMin',
        type:'money'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.limitSMax'),
        field:'limitSingleMax',
        type:'money'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.chanRate'),
        field:'chanRate'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.fixFloatRate'),
        field:'fixFloatRate',
        type:'dict',
        transKey:'RATE_TYPE'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.settleCycle'),
        field:'settleCycle',
        type:'dict',
        transKey:'BALANCE_DATE'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.chanShareRule'),
        field:'chanShareRule',
        type:'dict',
        transKey:'PAYCENTER_CH_TYPE'
    },{
        title:this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfo.state'),
        field:'state',
        type:'i18n'
    }];

    constructor(public subject: NzModalSubject,
                public i18n:I18NService,
                public helper:HelperService
    ){}

    public onCancelHandle(){
        this.subject.destroy();
    }
}
