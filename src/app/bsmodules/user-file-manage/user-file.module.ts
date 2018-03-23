import {NgModule} from "@angular/core";
import {SharedModule} from "@shared/shared.module";
import {MerchantListComponent} from "./merchant/merchant-list.component";
import {AgencyListComponent} from "./agency/agency-list.component";
import {RefundSettingsListComponent} from "./refund-settings/refund-settings-list.component";
import {RefundStrategyListComponent} from "./refund-settings/refund-strategy/refund-strategy-list.component";
import {RefundAuthorityListComponent} from "./refund-settings/refund-authority/refund-authority-list.component";
import {AgencyChildsWinComponent} from "./agency/win/agency-list-childs-win/agency-list-childs-win.component";
import {IntoPiecesListComponent} from "./intopiece-list/intopieces-list.component";
import {IntoPiecesAddWinComponent} from "./intopiece-list/intopieces-add-win.component";
import {IntoPiecesEditWinComponent} from "./intopiece-list/intopieces-edit-win.component";

import {RefundAuthorityAddWinComponent} from "./refund-settings/refund-authority/refund-authority-add-win.component";
import {RefundStrategyAddWinComponent} from "./refund-settings/refund-strategy/refund-strategy-add-win.component";
import {MerchantDetailComponent} from "./merchant/merchant-detail.component";
import {MerchantChannelComponent} from "./merchant/detail/mch-channel.component";
import {MerchantInfoComponent} from "./merchant/detail/mch-info.component";
import {AgencyDetailComponent} from "./agency/agency-detail.component";
import {AgencyInfoComponent} from "./agency/detail/agency-info.component";
import {AgencyChannelComponent} from "./agency/detail/agency-share-profit.component";
import {AgencyAccountAddWinComponent} from "./agency/win/agency-account-win/agency-account-add-win.component";
import {AgencyChannelAddWinComponent} from "./agency/win/agency-share-profit-win/agency-share-profit-add-win.component";
import {AgencyAddComponent} from "./agency/agency-add.component";
import {MerchantAddComponent} from "./merchant/merchant-add.component";
import {MchChannelInfoComponent} from "./merchant/add/mch-channel-info.component";
import {MchAccountInfoComponent} from "./merchant/add/mch-account-info.component";
import {MchBaseInfoComponent} from "./merchant/add/mch-base-info.component";
import {MchAccountInfoWinComponent} from "./merchant/win/mch-account-info-win";
import {MchChannelInfoWinComponent} from "./merchant/win/mch-channel-info-win";
import {AgencyBaseInfoComponent} from "./agency/add/agency-base-info.component";
import {AgencyAccountInfoComponent} from "./agency/add/agency-account-info.component";
import {AgencyChannelInfoComponent} from "./agency/add/agency-share-profit-info.component";
import {AgencyChannelDetailWinComponent} from "./agency/win/agency-share-profit-win/agency-share-profit-detail-win.component";
import {MchChannelDetailInfoWinComponent} from './merchant/win/mch-channel-detailInfo.win';

import {RouterModule} from "@angular/router";
import {USER_FILE_MANAGE_ROUTES} from "./user-file.routes";
import {MerchantExamstateWinComponent} from './merchant/win/merchant-examstate.win.component';
import {AgencyExamstateWinComponent} from "./agency/win/agency-info-examine-win/agency-info-examine-win.component";
import {SpListComponent} from './service-provider/sp-list.component';
import {SpDetailComponent} from './service-provider/detail/sp-detail.component';
import {SpDetailInfoComponent} from './service-provider/detail/info/sp-detail-info.component';
import {SpDetailShareProfitComponent} from './service-provider/detail/share-profit/sp-detail-shareProfit.component';
import {SpDetailChannelComponent} from './service-provider/detail/channel/sp-detail-channel.component';
import {SpDetailInfoConfigComponent} from './service-provider/detail/info-config/sp-detail-infoConfig.component';
import {SpEditComponent} from './service-provider/edit/sp-edit.component';
import {SpEditBaseComponent} from './service-provider/edit/base/sp-edit-base.component';
import {SpEditAccountComponent} from './service-provider/edit/account/sp-edit-account.component';
import {SpEditShareProfitComponent} from './service-provider/edit/share-profit/sp-edit-shareProfit.component';
import {SpEditChannelComponent} from './service-provider/edit/channel/sp-edit-channel.component';
import {SpEditInfoConfigComponent} from './service-provider/edit/info-config/sp-edit-infoConfig.component';
import {SpSubMchWinComponent} from './service-provider/win/sub-mch/sp-subMch-win.component';
import {SpAuditWinComponent} from './service-provider/win/audit/sp-audit-win.component';
import {SpAccountWinComponent} from './service-provider/win/account/sp-account-win.component';
import {SpShareProfitWinComponent} from './service-provider/win/share-profit/sp-shareProfit-win.component';
import {SpChannelWinComponent} from './service-provider/win/channel/sp-channel-win.component';
import {SpTotalChannelWinComponent} from './service-provider/win/total-channel/sp-totalChannel-win.component';
import {SpTradeRuleWinComponent} from './service-provider/win/trade-rule/sp-tradeRule-win.component';
import {SpInfoConfigWeixinWinComponent} from './service-provider/win/weixin/sp-infoConfig-weixin-win.component';
import {SpChannelInfoWinComponent} from './service-provider/win/channel/sp-channel-info-win.component';
import {SpTradeFeeLimitWinComponent} from './service-provider/win/trade-fee-limit/sp-tradeFeeLimit-win.component';
import {MchWxconfigWinComponent} from './merchant/win/mch-wxconfig-win';
import {merchantWeixinAccountSetDetailComponent} from './merchant/merchant.weixinAccountSet.detail.component';
import {MchTradeRuleWinComponent} from './merchant/win/mch-tradeRule-win.component';
import {MchTradeFeeLimitWinComponent} from './merchant/win/mch-tradeFeeLimit-win.component';
import {MchInfoConfigComponent} from './merchant/add/mch-infoConfig.component';
import {MchInfoConfigDetailComponent} from './merchant/detail/mch-infoConfigDetail.component';
import {MchInfoConfigSecretkeyComponent} from './merchant/win/mch.infoconfig.secretkey.component';

/**
 * 用户档案管理模块
 */
@NgModule({
    imports:[
        SharedModule,
        RouterModule.forChild(USER_FILE_MANAGE_ROUTES)
    ],
    declarations:[

		SpListComponent,
        SpDetailComponent,
        SpDetailInfoComponent,
        SpDetailShareProfitComponent,
        SpDetailChannelComponent,
        SpDetailInfoConfigComponent,
        SpEditComponent,
        SpEditBaseComponent,
        SpEditAccountComponent,
        SpEditShareProfitComponent,
        SpEditChannelComponent,
        SpEditInfoConfigComponent,
        SpSubMchWinComponent,
        SpAuditWinComponent,
        SpAccountWinComponent,
        SpShareProfitWinComponent,
        SpTotalChannelWinComponent,
        SpChannelWinComponent,
        SpChannelInfoWinComponent,
        SpTradeRuleWinComponent,
        SpInfoConfigWeixinWinComponent,
        SpTradeFeeLimitWinComponent,
        AgencyListComponent,
        AgencyDetailComponent,
        AgencyInfoComponent,
        AgencyChannelComponent,
        AgencyAccountAddWinComponent,
        AgencyChannelAddWinComponent,
        AgencyChannelDetailWinComponent,
        AgencyExamstateWinComponent,
        AgencyAddComponent,
        AgencyBaseInfoComponent,
        AgencyAccountInfoComponent,
        AgencyChannelInfoComponent,
        RefundSettingsListComponent,
        RefundStrategyListComponent,
        RefundAuthorityListComponent,
        RefundAuthorityAddWinComponent,
        RefundStrategyAddWinComponent,
        AgencyChildsWinComponent,
        IntoPiecesListComponent,
        IntoPiecesAddWinComponent,
        IntoPiecesEditWinComponent,
	   	MerchantListComponent,
        MerchantDetailComponent,
        MerchantInfoComponent,
        MerchantChannelComponent,
   	    MerchantAddComponent,
        MchBaseInfoComponent,
        MchAccountInfoComponent,
        MchChannelInfoComponent,
        MchAccountInfoWinComponent,
        MchChannelInfoWinComponent,
        MchChannelDetailInfoWinComponent,
		MerchantExamstateWinComponent,
		MchWxconfigWinComponent,
        merchantWeixinAccountSetDetailComponent,
        MchTradeRuleWinComponent,
        MchInfoConfigComponent,
        MchInfoConfigDetailComponent,
        MchTradeFeeLimitWinComponent,
        MchInfoConfigSecretkeyComponent

    ],
    entryComponents: [
        AgencyChildsWinComponent,
        AgencyInfoComponent,
        AgencyChannelComponent,
        AgencyAccountAddWinComponent,
        AgencyChannelAddWinComponent,
        AgencyChannelDetailWinComponent,
        AgencyExamstateWinComponent,
        AgencyBaseInfoComponent,
        AgencyAccountInfoComponent,
        AgencyChannelInfoComponent,
        RefundAuthorityAddWinComponent,
        RefundStrategyAddWinComponent,
        IntoPiecesAddWinComponent,
        IntoPiecesEditWinComponent,

        MerchantInfoComponent,
        MerchantChannelComponent,
        MchBaseInfoComponent,
        MchAccountInfoComponent,
        MchChannelInfoComponent,
        MchAccountInfoWinComponent,
        MchChannelInfoWinComponent,
        MchChannelDetailInfoWinComponent,
		MerchantExamstateWinComponent,
		MchWxconfigWinComponent,
        MchTradeRuleWinComponent,
        MchTradeFeeLimitWinComponent,
        MchInfoConfigComponent,
        MchInfoConfigDetailComponent,
        MchInfoConfigSecretkeyComponent,
		SpDetailInfoComponent,
        SpDetailShareProfitComponent,
        SpDetailChannelComponent,
        SpDetailInfoConfigComponent,
        SpEditBaseComponent,
        SpEditAccountComponent,
        SpEditShareProfitComponent,
        SpEditChannelComponent,
        SpEditInfoConfigComponent,
        SpSubMchWinComponent,
        SpAuditWinComponent,
        SpAccountWinComponent,
        SpShareProfitWinComponent,
        SpTotalChannelWinComponent,
        SpChannelWinComponent,
        SpChannelInfoWinComponent,
        SpTradeRuleWinComponent,
        SpInfoConfigWeixinWinComponent,
        SpTradeFeeLimitWinComponent
    ]
})
export class UserFileManageModule{

}
