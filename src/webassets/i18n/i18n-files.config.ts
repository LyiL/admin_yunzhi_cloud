import {LOGIN_LANG} from "./zh-CN/login";
import {DEFAULT_LANG} from "./zh-CN/zh-CN";
import {MERCHANT_LANG} from './zh-CN/merchant';
import {SETTLEMENT_MANAGE} from './zh-CN/settlement-manage';
import {TRADE_QUERY_LANG} from './zh-CN/trade-query';
import {TRADE_RANK_LANG} from './zh-CN/trade-rank';
import {TRADE_REFUND_LANG} from './zh-CN/trade-refund';
import {MCHENTRY_LIST_LANG} from "./zh-CN/intopiece-list";
import {SYSTEME_STAT_ANLYZE_PROVIDE} from "./zh-CN/systeme-stat-anlyze-manag";
import {AGENCY_LANG} from "./zh-CN/agency";
import {REFUND_SETTINGS_LANG} from "./zh-CN/refund-settings";
import {ACCOUNT_MANAGE_LANG} from "./zh-CN/account.manage";
import {LOGINGLOG_LIST} from "./zh-CN/loginLog-list";
import {TO_PAY_MANAGE} from "./zh-CN/to-pay-manage";
import {SERVICE_PROVIDER_LANG} from './zh-CN/service-provide';
import {TRADE_NOTICE_LANG} from './zh-CN/trade-notice';
import {TRADE_RATIO_LANG} from './zh-CN/trade-ratio';
import {MARKETING_MANAGE} from "./zh-CN/marketing-manage";

export const I18N_FILES = {"zh-CN":[
    DEFAULT_LANG,
    LOGIN_LANG,
    /**
     * add by hux
     * --SERVICE_PROVIDER_LANG 服务商列表
     * --TRADE_QUERY_LANG 交易查询
     * --TRADE_NOTICE_LANG 交易通知
     * --TRADE_RATIO_LANG 交易比率
     * --TRADE_RANK_LANG 商户排名
     * --TRADE_REFUND_LANG 退款审核
     */
    SERVICE_PROVIDER_LANG,
    TRADE_QUERY_LANG,
    TRADE_NOTICE_LANG,
    TRADE_RATIO_LANG,
    TRADE_RANK_LANG,
    TRADE_REFUND_LANG,
	MERCHANT_LANG,
    SETTLEMENT_MANAGE,
	MCHENTRY_LIST_LANG,
	SYSTEME_STAT_ANLYZE_PROVIDE,
    AGENCY_LANG,
    REFUND_SETTINGS_LANG,
    ACCOUNT_MANAGE_LANG,
    LOGINGLOG_LIST,
    TO_PAY_MANAGE,
    MARKETING_MANAGE
]};
