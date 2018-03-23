import {Component} from "@angular/core";
import {NzModalSubject} from "ng-zorro-antd";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
/**
 * 商户渠道信息详情弹出框
 */
@Component({
    selector:'mch-channel-detailInfo',
    templateUrl:'./mch-channel-detailInfo.win.html',
    providers:[mchService]
})
export class MchChannelDetailInfoWinComponent{
    /**
     * 商户渠道信息
     */
    public channelInfoData:any = {};

    public detailFields:Array<any> = [{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.transId'),
        field:'transType'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.bankNo'),
        field:'agencyName'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.ptCenterId'),
        field:'centerName'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.providerNo'),
        field:'providerNo'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.applyState'),
        field:'applyState',
        type:'i18n'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.ally'),
        field:'ally'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.thirdAppid'),
        field:'thirdAppid',
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.pcmPartkey'),
        field:'pcmPartkey'
    },
    //     {
    //     title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.categoryType'),
    //     field:'categoryType',
    //     type:'dict',
    //     transKey:'BALANCE_DATE'
    // },
        {
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.limitDay'),
        field:'limitDay',
            type:'moneyShow'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.limitSingleMin'),
        field:'limitSingleMin',
            type:'moneyShow'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.limitSingle'),
        field:'limitSingle',
            type:'moneyShow'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.settleRate'),
        field:'settleRate'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.settleCycle'),
        field:'settleCycle',
        type:'dict',
        transKey:'BALANCE_DATE'
        },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.shareRule'),
        field:'mchShareRule',
        type:'dict',
        transKey:'PAYCENTER_CH_TYPE'
    },{
        title:this.i18n.fanyi('Mch.detailPage.detail.channelTable.used'),
        field:'used',
        type:'used'
    }
    ];

    constructor(public subject: NzModalSubject,public i18n:I18NService){
    }

    public onCancelHandle(value){
        this.subject.destroy();
    }
}
