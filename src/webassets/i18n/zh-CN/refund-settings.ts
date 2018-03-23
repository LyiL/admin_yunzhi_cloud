/**
 * 退款设置模块的语言包
 */
export const REFUND_SETTINGS_LANG = {
    "RefundSets": {
        "listPage": {
            "title": "退款设置",
            "search": {
                "name": "商户名称",
                "merchantNo": "商户编号"
            },
            "tableCols": {
                "name": "商户名称",
                "merchantNo": "商户编号",
                "chanName": "所属渠道",
                "examState": "审核状态",
                "activeState": "激活状态"
            },
            "btn": {
                "refundStrategy": "退款策略",
                "refundAuthority": "退款权限"
            }
        },
        "refStrategyPage": {
            "title": "退款策略",
            "tableCols": {
                "merchantNo": "商户编号",
                "transType": "支付类型",
                "transId": "支付接口",
                "refundDayRange": "允许退款天数",
                "dayRefundCount": "当日退款笔数",
                "singleRefundFee": "单笔退款额（元）",
                "dayRefundFee": "当日退款额（元）",
                "useState": "启用状态",
                "createdTime": "开通时间"
            },
            "win": {
                "name": "商户名称",
                "transId": "支付类型",
                "useState": "启用状态",
                "refundDayRange": "允许退款天数",
                "dayRefundCount": "当日退款笔数",
                "singleRefundFee": "单笔退款金额",
                "dayRefundFee": "当日退款金额"
            },
            "btn": {
                "addBtn":"添加退款策略",
                "editBtn": "编辑退款策略"
            },
            "message":{
                "allType":"全部支付类型",
                "refundDayRangeMsg":"商户允许退款天数不能大于90天！",
                "dayRefundCountMsg":"商户当日退款笔数不能大于90笔！",
                "singleRefundFeeMsg":"单笔退款不能大于当日退款金额！",
                "saveOkMsg":"保存成功！"
            },
            "validationMessages":{
                "refundRequied":"不能为空!",
                "refundNumber":"请填写有效的数字!",
                "dayRefCountMaxLength":"输入长度不要超过五位！"
            }
        },
        "refAuthPage": {
            "title": "退款权限",
            "tableCols": {
                "merchantNo": "商户编号",
                "transType": "支付类型",
                "refundAuth": "退款权限",
                "examType": "审核类型",
                "addTime": "创建时间",
                "isEnabled": "使用状态"
            },
            "win": {
                "name": "商户名称",
                "transId": "支付类型",
                "refundAuth": "退款权限",
                "examType": "审核类型"
            },
            "btn": {
                "addBtn":"添加退款权限",
                "editBtn": "编辑退款权限"
            },
            "message":{
                "allType":"全部支付类型",
                "refundAuthMsg":"请选择退款权限！",
                "saveOkMsg":"保存成功！",
                "changeState1":"您确认要变更当前【",
                "changeState2":"】状态吗？",

            }
        }
    }
};
