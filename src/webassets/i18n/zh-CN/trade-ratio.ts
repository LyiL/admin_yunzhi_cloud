/***
 * 交易比率语言包
 * @type {{TradeRatio: {listPage: {search: {statisticTime: string; agentno: string; merchantId: string; transId: string}; tableCols: {countTime: string; mchName: string; tradeType: string; allNum: string; sucNum: string; b: string; totalFee: string}; btn: {goChartBtn: string}}}}}
 */
export const TRADE_RATIO_LANG = {
    "TradeRatio": {
        "listPage": {
            "search": {
                "statisticTime":"结算日期",
                "agentno":"所属上级",
                "merchantId":"商户名称",
                "transId":"支付类型"
            },
            "tableCols": {
                "countTime":"统计时间",
                "mchName":"商户名称",
                "tradeType":"支付类型",
                "allNum":"订单总数",
                "sucNum":"成功订单总数",
                "b":"成功比率(%)",
                "totalFee":"交易总额(元)"
            },
            "btn":{
                "goChartBtn":"成功比例图",
                "goRatioBtn":"交易比率"
            },
            "agentnoTableCfg":{
                "title":"查询所属上级",
                "agentno":"所属上级编号",
                "name":"所属上级名称"
            },
            "merchantIdTableCfg":{
                "title":"查询商户",
                "merchantNo":"商户编号",
                "name":"商户名称"
            },
            "bankCodeCfg": {
                "title": "查询受理机构",
                "orgNo": "受理机构编号",
                "name": "受理机构名称"
            },
            "tabs":{
                "day":"日成功比例",
                "hour":"每小时成功比例"
            },
            "msg":{
                "statisticTimeMsg":"请选择结算日期"
            }
        },
        "dayRatioPage": {
            "search": {
                "tradeTime":"交易日期",
                "tradeTimeStart":"开始时间",
                "tradeTimeEnd":"结束时间",
                "bankNo":"受理机构",
                "agentno":"所属上级",
                "merchantId":"商户名称",
                "transId":"支付类型"
            }
        },
        "hourRatioPage": {
            "search": {
                "tradeTime":"交易日期",
                "bankNo":"受理机构",
                "agentno":"所属上级",
                "merchantId":"商户名称",
                "transId":"支付类型"
            }
        }
    }
};
