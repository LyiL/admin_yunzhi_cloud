import {AgencyListComponent} from "./agency/agency-list.component";
import {RefundSettingsListComponent} from "./refund-settings/refund-settings-list.component";
import {RefundStrategyListComponent} from "./refund-settings/refund-strategy/refund-strategy-list.component";
import {RefundAuthorityListComponent} from "./refund-settings/refund-authority/refund-authority-list.component";
import {IntoPiecesListComponent} from "./intopiece-list/intopieces-list.component";
import {MerchantListComponent} from "./merchant/merchant-list.component";
import {MerchantDetailComponent} from "./merchant/merchant-detail.component";
import {AgencyDetailComponent} from "./agency/agency-detail.component";
import {MerchantAddComponent} from "./merchant/merchant-add.component";
import {AgencyAddComponent} from "./agency/agency-add.component";
import {SpListComponent} from './service-provider/sp-list.component';
import {SpDetailComponent} from './service-provider/detail/sp-detail.component';
import {SpEditComponent} from './service-provider/edit/sp-edit.component';
import {merchantWeixinAccountSetDetailComponent} from './merchant/merchant.weixinAccountSet.detail.component';
/**
 * 用户管理路由
 * @type {Array}
 */
export const USER_FILE_MANAGE_ROUTES = [
    {path:'splist', component:SpListComponent},
	{path:'spdetail', component: SpDetailComponent},
	{path:'spedit', component: SpEditComponent},
    {path: 'agencylist', component: AgencyListComponent},
    {path: 'agencydetail', component: AgencyDetailComponent},
    {path: 'agencyedit', component: AgencyAddComponent},
    {path: 'refundset', component: RefundSettingsListComponent},
    {path: 'refundstrategy', component: RefundStrategyListComponent},
    {path: 'refundauthority', component: RefundAuthorityListComponent},
    {path:'intopieces', component:IntoPiecesListComponent},
 	{path:'mchlist', component:MerchantListComponent},
    {path:'mchdetail', component:MerchantDetailComponent},
    {path: 'merchantadd', component: MerchantAddComponent},
    {path: 'merchantweixincfgdetail', component:merchantWeixinAccountSetDetailComponent},
];


