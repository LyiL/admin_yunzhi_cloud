/**
 * 对账管理
 * @type {{AccountManage: {common: {all: string; successFully: string}}; AccError: {listPage: {title: string; search: {dateTitle: string; checkTimeStart: string; checkTimeEnd: string; partner: string; handleState: string; orderNo: string; transactionId: string; refundNo: string; refundId: string; hideBtn: string; showBtn: string}; partnerCfg: {title: string; partner: string; partnerName: string}; tableCols: {reconDay: string; merchantName: string; totalFee: string; orderNo: string; transactionId: string; handleState: string}}; detailPage: {title: string; detail: {id: string; reconDay: string; partner: string; agencyName: string; orderNo: string; transactionId: string; refundNo: string; refundId: string; totalFee: string; refundFee: string; trdTotalFee: string; trdRefundFee: string; trdBillRate: string; trdPodg: string; errMsg: string; handleDay: string; handleDesc: string; handleState: string}}}; AccSummary: {listPage: {title: string; search: {dateTitle: string; billTimeStart: string; billTimeEnd: string; ally: string; reconState: string; transId: string; centerId: string; bankName: string}; allyCfg: {title: string; ally: string; allyName: string}; centerCfg: {title: string; centerId: string; centerName: string}; agencyCfg: {title: string; agencyNo: string; agencyName: string}; tableCols: {reconDay: string; totalFee: string; eqTotalFee: string; totalQua: string; errTotalQua: string; transName: string; reconState: string}; panelCfg: {totalQua: string; totalFee: string; refundQua: string; refundFee: string; errTotalQua: string; errTotalFee: string; tradeFee: string; procsFeeEx: string; arriveFee: string}}; detailPage: {title: string; detail: {reconDay: string; ally: string; centerId: string; transName: string; agencyName: string; totalFee: string; refundFee: string; totalQua: string; refundQua: string; errTotalQua: string; errTotalFee: string; eqTotalFee: string; eqRefundFee: string; poundage2: string; poundage6: string; refundPodg2: string; refundPodg6: string; trdTotalFee: string; trdRefundFee: string; trdTotalQua: string; trdRefundQua: string; trdPodg: string; trdFavRefundFee: string; trdRefundPodg: string; trdFavTotalFee: string; reconState: string}}}; BussinessCheck: {listPage: {title: string; search: {dateTitle: string; startAt: string; finishAt: string; ally: string; reconState: string; merchantNo: string; bankName: string; transId: string; centerId: string; secondMchNo: string}; allyCfg: {title: string; ally: string; allyName: string}; merchantCfg: {title: string; merchantNo: string; merchantName: string}; agencyCfg: {title: string; agencyNo: string; agencyName: string}; centerCfg: {title: string; centerId: string; centerName: string}; secondMchCfg: {title: string; secondMchNo: string; secondMchName: string}; tableCols: {reconDay: string; merchantName: string; transName: string; totalFee: string; totalQua: string; eqTotalFee: string; poundage2: string; trdPodg: string; reconState: string}}; detailPage: {title: string; detail: {reconDay: string; ally: string; agencyName: string; totalFee: string; refundFee: string; totalQua: string; refundQua: string; errTotalQua: string; errTotalFee: string; eqTotalFee: string; eqRefundFee: string; poundage2: string; poundage6: string; refundPodg2: string; refundPodg6: string; trdTotalFee: string; trdRefundFee: string; trdTotalQua: string; trdRefundQua: string; trdPodg: string; trdRefundPodg: string; trdFavTotalFee: string; trdFavRefundFee: string; reconState: string}}}; CheckAccount: {listPage: {title: string; search: {searchStartTime: string; searchEndTime: string; ally: string; reconState: string}; allyCfg: {title: string; ally: string; allyName: string}; count: {totalQua: string; totalFee: string; refundQua: string; refundFee: string; errTotalQua: string; errTotalFee: string}; tableCols: {reconDay: string; totalFee: string; totalQua: string; errTotalQua: string; eqTotalFee: string; poundage2: string; trdTotalFee: string; trdPodg: string; reconState: string}}; detailPage: {title: string; reconDay: string; ally: string; agencyName: string; totalFee: string; refundFee: string; totalQua: string; refundQua: string; errTotalQua: string; errTotalFee: string; eqTotalFee: string; eqRefundFee: string; poundage2: string; poundage6: string; refundPodg2: string; refundPodg6: string; trdTotalFee: string; trdRefundFee: string; trdTotalQua: string; trdRefundQua: string; trdPodg: string; trdFavRefundFee: string; trdRefundPodg: string; trdFavTotalFee: string; reconState: string}}; AccTask: {listPage: {title: string; search: {dateTitle: string; searchStartTime: string; searchEndTime: string; ally: string; treatState: string}; allyCfg: {title: string; ally: string; allyName: string}; tableCols: {scheNo: string; reconDay: string; ally: string; treatQua: string; errQua: string; reconType: string; refundType: string; treatState: string; beginTime: string; resetBtn: string; executeBtn: string}}; detailPage: {scheNo: string; reconDay: string; ally: string; treatQua: string; errQua: string; treatSpeed: string; treatState: string; treatId: string; reconType: string; refundType: string; beginTime: string; endTime: string; basicRate: string; feeRuleType: string}; win: {editTask: {title: string; reconPath: string; reconType: string; refundType: string}; resetTask: {title: string; content: string}; implementTask: {title: string; content: string}}}; AccDownLoad: {listPage: {title: string; search: {dateTitle: string; searchStartTime: string; searchEndTime: string; companion: string}; tableCols: {recordDate: string; companion: string; savePath: string; parsePath: string; downState: string; errMsg: string; updatedTime: string; downloadBtn: string; reloadDownloadBtn: string}}}}}
 */

export const ACCOUNT_MANAGE_LANG = {
    "AccountManage": {
        "common": {
            "all": "全部",
            "successFully": "操作成功"
        }
    },
    "AccError": {
        "listPage": {
            "title": "对账异常",
            "search": {
                "dateTitle": "对账日期",
                "checkTimeStart": "开始时间",
                "checkTimeEnd": "结束时间",
                "partner": "结算账户",
                "handleState": "处理状态",
                "orderNo": "平台单号",
                "transactionId": "第三方订单号",
                "refundNo": "退款单号",
                "refundId": "第三方退款单号",
                "hideBtn": "隐藏高级查询",
                "showBtn": "显示高级查询"
            },
            "partnerCfg": {
                "title": "结算账户",
                "partner": "结算账户编号",
                "partnerName": "结算账户名称"
            },
            "tableCols": {
                "reconDay": "对账日期<br/>结算账户",
                "merchantName": "商户名称",
                "totalFee": "交易金额（元）<br/>退款金额（元）",
                "orderNo": "平台单号<br/>退款单号",
                "transactionId": "第三方订单号<br/>第三方退款单号",
                "handleState": "处理状态"
            }
        },
        "detailPage": {
            "title": "对账异常详情",
            "detail": {
                "id": "差错编号",
                "reconDay": "对账日期",
                "partner": "结算账户",
                "agencyName": "受理机构",
                "orderNo": "平台单号",
                "transactionId": "第三方订单号",
                "refundNo": "退款单号",
                "refundId": "第三方退款单号",
                "totalFee": "交易金额",
                "refundFee": "退款金额",
                "trdTotalFee": "第三方交易金额",
                "trdRefundFee": "第三方退款金额",
                "trdBillRate": "第三方记录的商户费率",
                "trdPodg": "第三方手续费金额",
                "errMsg": "差错信息",
                "handleDay": "处理日期",
                "handleDesc": "处理备注",
                "handleState": "处理状态"
            }
        }
    },
    "AccSummary": {
        "listPage": {
            "title": "对账概要",
            "search": {
                "dateTitle": "对账日期",
                "billTimeStart": "开始时间",
                "billTimeEnd": "结束时间",
                "ally": "结算账户",
                "reconState": "对账状态",
                "transId": "支付类型",
                "centerId": "支付中心",
                "bankName": "受理机构"
            },
            "allyCfg": {
                "title": "结算账户",
                "ally": "结算账户编号",
                "allyName": "结算账户名称"
            },
            "centerCfg": {
                "title": "支付中心",
                "centerId": "支付中心编号",
                "centerName": "支付中心名称"
            },
            "agencyCfg": {
                "title": "受理机构",
                "agencyNo": "受理机构编号",
                "agencyName": "受理机构名称"
            },
            "tableCols": {
                "reconDay": "对账日期<br/>结算账户",
                "totalFee": "交易金额（元）<br/>退款金额（元）",
                "eqTotalFee": "平账交易金额（元）<br/>平账退款金额（元）",
                "totalQua": "交易笔数（笔）<br/>退款笔数（笔）",
                "errTotalQua": "异常笔数（笔）<br/>异常金额（元）",
                "transName": "支付类型",
                "reconState": "对账状态"
            },
            "panelCfg": {
                "totalQua": "交易总数(笔)",
                "totalFee": "交易金额(元)",
                "refundQua": "退款总数(笔)",
                "refundFee": "退款金额(元)",
                "errTotalQua": "异常总数(笔)",
                "errTotalFee": "异常金额(元)",
                "tradeFee": "交易净额(元)",
                "procsFeeEx": "手续费支出(元)",
                "arriveFee": "到账金额(元)"
            }
        },
        "detailPage": {
            "title": "对账概要详情",
            "detail": {
                "reconDay": "对账日期",
                "ally": "结算账户",
                "centerId": "支付中心",
                "transName": "支付类型",
                "agencyName": "受理机构",
                "totalFee": "交易金额",
                "refundFee": "退款金额",
                "totalQua": "交易笔数",
                "refundQua": "退款笔数",
                "errTotalQua": "异常笔数",
                "errTotalFee": "异常金额",
                "eqTotalFee": "平账交易金额",
                "eqRefundFee": "平账退款金额",
                "poundage2": "手续费（四舍五入）",
                "poundage6": "手续费（6位小数）",
                "refundPodg2": "退款手续费（四舍五入）",
                "refundPodg6": "退款手续费（6位小数）",
                "trdTotalFee": "第三方交易金额",
                "trdRefundFee": "第三方退款金额",
                "trdTotalQua": "第三方成功笔数",
                "trdRefundQua": "第三方退款笔数",
                "trdPodg": "第三方手续费金额",
                "trdFavRefundFee": "第三方退款手续费",
                "trdRefundPodg": "第三方优惠成功总金额",
                "trdFavTotalFee": "第三方优惠退款金额",
                "reconState": "对账状态"
            }
        }
    },
    "BussinessCheck": {
        "listPage": {
            "title": "商户对账",
            "search": {
                "dateTitle": "对账日期",
                "startAt": "开始时间",
                "finishAt": "结束时间",
                "ally": "结算账户",
                "reconState": "对账状态",
                "merchantNo": "商户名称",
                "bankName": "受理机构",
                "transId": "支付类型",
                "centerId": "支付中心",
                "secondMchNo": "下属门店"
            },
            "allyCfg": {
                "title": "结算账户",
                "ally": "结算账户编号",
                "allyName": "结算账户名称"
            },
            "merchantCfg": {
                "title": "商户名称",
                "merchantNo": "商户编号",
                "merchantName": "商户名称"
            },
            "agencyCfg": {
                "title": "受理机构",
                "agencyNo": "受理机构编号",
                "agencyName": "受理机构名称"
            },
            "centerCfg": {
                "title": "支付中心",
                "centerId": "支付中心编号",
                "centerName": "支付中心名称"
            },
            "secondMchCfg": {
                "title": "下属门店",
                "secondMchNo": "下属门店编号",
                "secondMchName": "下属门店名称"
            },
            "tableCols": {
                "reconDay": "对账日期<br/>结算账户",
                "merchantNo": "商户编号",
                "merchantName": "商户名称",
                "transName": "支付类型",
                "totalFee": "交易金额（元）<br/>退款金额（元）",
                "totalQua": "交易笔数（笔）<br/>退款笔数（笔）",
                "eqTotalFee": "平账交易金额（元）<br/>平账退款金额（元）",
                "poundage2": "手续费（元）<br/>退款手续费（元）",
                "trdPodg": "第三方手续费（元）<br/>第三方退款手续费（元）",
                "reconState": "对账状态"
            }
        },
        "detailPage": {
            "title": "商户对账详情",
            "detail": {
                "reconDay": "对账日期",
                "ally": "结算账户",
                "agencyName": "受理机构",
                "totalFee": "交易金额",
                "refundFee": "退款金额",
                "totalQua": "交易笔数",
                "refundQua": "退款笔数",
                "errTotalQua": "异常笔数",
                "errTotalFee": "异常金额",
                "eqTotalFee": "平账交易金额",
                "eqRefundFee": "平账退款金额",
                "poundage2": "手续费（四舍五入）",
                "poundage6": "手续费（6位小数）",
                "refundPodg2": "退款手续费（四舍五入）",
                "refundPodg6": "退款手续费（6位小数）",
                "trdTotalFee": "第三方交易金额",
                "trdRefundFee": "第三方退款金额",
                "trdTotalQua": "第三方成功笔数",
                "trdRefundQua": "第三方退款笔数",
                "trdPodg": "第三方手续费金额",
                "trdRefundPodg": "第三方退款手续费",
                "trdFavTotalFee": "第三方优惠成功总金额",
                "trdFavRefundFee": "第三方优惠退款金额",
                "reconState": "对账状态"
            }
        }
    },
    "CheckAccount" : {
        "listPage": {
            "title": "对账账户",
            "search": {
                "searchStartTime" : "开始时间",
                "searchEndTime" : "结束时间",
                "ally": "结算账户",
                "reconState": "对账状态",
            },
            "allyCfg": {
                "title": "结算账户",
                "ally": "结算账户编号",
                "allyName": "结算账户名称"
            },
            "count": {
              "totalQua": "交易总数（笔）",
              "totalFee": "交易金额（元）",
              "refundQua": "退款总数（笔）",
              "refundFee": "退款金额（元）",
              "errTotalQua": "异常总数（笔）",
              "errTotalFee": "异常金额（元）",
            },
            "tableCols": {
                "reconDay": "对账日期<br/>结算账户",
                "totalFee": "交易金额（元）<br/>退款金额（元）",
                "totalQua": "交易笔数（笔）<br/>退款笔数（笔）",
                "errTotalQua": "异常笔数（笔）<br/>异常金额（元）",
                "eqTotalFee": "平账交易（元）<br/>平账退款（元）",
                "poundage2": "手续费（元）<br/>退款手续费（元）",
                "trdTotalFee": "第三方交易（元）<br/>第三方退款（元）",
                "trdPodg": "第三方手续费（元）<br/>第三方退款手续费（元）",
                "reconState": "对账状态"
            }
        },
        "detailPage": {
            "title": "对账账户详情",
            "reconDay": "对账日期",
            "ally": "结算账户",
            "agencyName": "受理机构",
            "totalFee": "交易金额",
            "refundFee": "退款金额",
            "totalQua": "交易金额",
            "refundQua": "退款笔数",
            "errTotalQua": "异常笔数",
            "errTotalFee": "异常金额",
            "eqTotalFee": "平账交易金额",
            "eqRefundFee": "平账退款金额",
            "poundage2": "手续费（四舍五入）",
            "poundage6": "手续费（6位小数）",
            "refundPodg2": "退款手续费（四舍五入）",
            "refundPodg6": "退款手续费（6位小数）",
            "trdTotalFee": "第三方交易金额",
            "trdRefundFee": "第三方退款金额",
            "trdTotalQua": "第三方成功笔数",
            "trdRefundQua": "第三方退款笔数",
            "trdPodg": "第三方手续费金额",
            "trdFavRefundFee": "第三方退款手续费",
            "trdRefundPodg": "第三方优惠成功总金额",
            "trdFavTotalFee": "第三方优惠退款金额",
            "reconState": "对账状态",

        }
    },
    "AccTask": {
        "listPage": {
            "title": "对账任务",
            "search": {
                "dateTitle": "对账日期",
                "searchStartTime": "开始时间",
                "searchEndTime": "结束时间",
                "ally": "结算账户",
                "treatState": "对账状态",
            },
            "allyCfg": {
                "title": "结算账户",
                "ally": "结算账户编号",
                "allyName": "结算账户名称"
            },
            "tableCols": {
                "scheNo": "任务编码",
                "reconDay": "对账日期",
                "ally": "结算账户",
                "treatQua": "处理总数",
                "errQua": "差错总数",
                "reconType": "对账类型",
                "refundType": "退款依据",
                "treatState": "对账状态",
                "beginTime": "执行时间/结算时间",
                "resetBtn": "重置任务",
                "executeBtn": "执行任务"
            }

        },
        "detailPage": {
            "title": "对账任务详情",
            "scheNo": "任务编号",
            "reconDay": "对账日期",
            "ally": "对账账户",
            "treatQua": "处理总数",
            "errQua": "差错总数",
            "treatSpeed": "处理速度",
            "treatState": "对账状态",
            "treatId": "处理编号",
            "reconType": "对账类型",
            "refundType": "退款依据",
            "beginTime": "执行时间",
            "endTime": "结束时间",
            "basicRate": "成本费率",
            "feeRuleType": "手续费计算规则"
        },
        "win": {
            "editTask": {
                "title": "编辑对账任务",
                "reconPath": "对账文件路径",
                "reconType": "对账类型",
                "refundType": "退款依据"
            },
            "resetTask": {
                "title": "重置任务",
                "content": "您确认要重置任务吗？"
            },
            "implementTask": {
                "title": "执行任务",
                "content": "您确认要执行任务吗？"
            },
        }
    },
    "AccDownLoad": {
        "listPage": {
            "title": "账单下载",
            "search": {
                "dateTitle": "对账日期",
                "searchStartTime": "开始时间",
                "searchEndTime": "结束时间",
                "companion": "第三方商户号"
            },
            "tableCols": {
                "recordDate": "对账日期",
                "companion": "第三方支付号",
                "savePath": "保存路径",
                "parsePath": "解析路径",
                "downState": "下载状态",
                "errMsg": "状态信息",
                "updatedTime": "最近下载日期",
                "downloadBtn": "下载",
                "reloadDownloadBtn": "重新下载"
            }
        }
    }
}
