/**
 * 服务商语言包
 * @type {{SP: {SPedit: string; listPage: {title: string; search: {name: string; chanCode: string; parentChanCode: string; examState: string; addService: string}; parentChanCfg: {title: string; parentChanCode: string; parentChanName: string}; salesmanCfh: {title: string; salesmanId: string; realName: string}; tableCols: {name: string; chanCode: string; dealerInfoCount: string; bankName: string; parentChanName: string; isConfigChanRate: string; examState: string; cfgInfo: string}}; detailPage: {prevBtn: string; saveAndnextBtn: string; submitBtn: string; detail: {title: string; info: {infoTitle: string; enterpriseInform: string; parentChanName: string; name: string; shortName: string; chanCode: string; orgEmail: string; provinceName: string; address: string; certificateType: string; linenceNo: string; linenceTermStart: string; categoryType: string; category: string; categoryName: string; orgWebsite: string; customerPhone: string; salesmanName: string; shareRule: string; settleStyle: string; registerTime: string; examTime: string; principalInfo: string; operator: string; contactsType: string; operatorIdno: string; operatorPhone: string; operatorEmail: string; contactInfo: string; linkman: string; email: string; phone: string; accessoryInfo: string; dataImage: string; linenceImg: string; orgAccountImg: string; indentityImg: string; indentityBackImg: string; bankCardImg: string; province: string; city: string; county: string; parentHint: string}; accountInfo: string; accountTable: {name: string; type: string; bankCardno: string; bankName: string; subbranchName: string; subbanrchCode: string; transId: string; cardType: string}; accountWin: {title: string; subbanrchCode: string; subbranchName: string; requiredInfoA: string; requiredInfoB: string}; operationInfo: string; operator: string; examineWinTitle: string; tips: {sendEmailTip: string; sendSuccesTip: string}}; openProduct: {title: string; sTitle: string; prodDetailTitle: string; prodTable: {combName: string; combNo: string; state: string}; prodDetail: {transId: string; categoryType: string; limitDay: string; limitSingleTitle: string; limitSingleMin: string; limitSingle: string; settleRate: string; fixFloatRate: string; settleCycle: string; shareRule: string; used: string; editCommitBtn: string; closeProdBtn: string; openProdBtn: string; passBtn: string; rejectBtn: string; anewOpen: string}; hint: {editProdHint: string; closeProdSuccess: string; openProdSuccess: string; anewOpenProdSuccess: string; examineProdSuccess: string; examineProdFail: string}}; channelCfg: {title: string; sTitle: string; channelInfoTitle: string; usedOk: string; usedNo: string; channelTable: {transId: string; ptCenterId: string; providerNo: string; used: string; settleCycle: string; settleRate: string}; changeUsed: string; delChannelInfo: string; channelInfo: {transType: string; ptCenterName: string; providerNo: string; thirdMchId: string; pcmPartkey: string; used: string; limitDay: string; limitSingle: string; limitSingleMin: string; thirdAppid: string; settleCycle: string; settleRate: string}; channelWin: {title: string; transType: string; ptCenterId: string; providerNo: string; thirdMchId: string; pcmPartkey: string; used: string; limitDay: string; limitSingle: string; limitSingleMin: string; thirdAppid: string; settleCycle: string; settleRate: string}}; infoCfg: {title: string; sTitle: string; auditWay: string; hint: {auditWay: string}}; shareCfg: {title: string; sTitle: string; shareCfgTable: {transType: string; categoryType: string; limitDay: string; limitCount: string; limitSingle: string; limitSingleMin: string; chanRate: string; fixFloatRate: string; settleCycle: string; chanShareRule: string; state: string}; shareCfgWin: {transType: string; categoryType: string; limitDay: string; limit: string; limitSingleMax: string; limitSingleMin: string; rate: string; fixFloatRate: string; settleAndshare: string; share: string; used: string}}; examine: {title: string}}; searchInput: {ptCenterId: string; ptCenterName: string}; hint: {all: string; transAndCenter: string; isNumber: string; isTransId: string}}}}
 */
export const SERVICE_PROVIDER_LANG = {
    "SP": {
        "SPedit": "编辑服务商",
        "listPage": {
            "title":"服务商列表",
            "search": {
                "name": "服务商名称",
                "chanCode": "服务商编号",
                "bankCode":"所属机构",
                "parentChanCode": "所属上级",
                "examState": "用户状态",
                "addService": "新增服务商"
            },
            "parentChanCfg": {
                "title": "查询所属上级",
                "parentChanCode": "所属上级编号",
                "parentChanName": "所属上级名称"
            },
            "salesmanCfh": {
                "title": "查询所属业务员",
                "salesmanId": "所属业务员编号",
                "realName": "所属业务员名称",
            },
            "chanCodeTableCfg":{
                "title":"查询所属机构",
                "chanCode":"所属机构编号",
                "chanName":"所属机构名称"
            },
            "tableCols": {
                "name": "服务商名称",
                "chanCode": "服务商编号",
                "dealerInfoCount": "下属商户",
                "bankName": "所属机构",
                "parentChanName": "所属上级",
                "isConfigChanRate": "渠道信息",
                "examState": "用户状态",
                "cfgInfo": "已配置"
            },
            "btn":{
                "authUrlBtn":"生成公众号授权地址"
            },
            "authUrlTitle":"授权地址"
        },
        "detailPage":{
            "prevBtn":"返回上一步",
            "saveAndnextBtn":"保存并下一步",
            "submitBtn":"保存并提交",
            "detail":{
                "title":"服务商详情",
                "info":{
                    "bankName":"所属机构",
                    "infoTitle":"基础信息",
                    "enterpriseInform":"企业信息",
                    "parentChanName":"所属上级",
                    "name":"企业名称",
                    "shortName":"企业简称",
                    "chanCode":"服务商编号",
                    "orgEmail":"企业邮箱",
                    "provinceName":"所在地",
                    "address":"经营地址",
                    "certificateType":"商户证件类型",
                    "linenceNo": "商户证件编号",
                    "linenceTermStart":"证件有效期",
                    "categoryType":"所属行业",
                    "category" : "类别",
                    "categoryName" : "名称",
                    "orgWebsite":"企业网站",
                    "customerPhone":"客服电话",
                    "salesmanName":"所属业务员",
                    "shareRule":"分润规则",
                    "settleStyle":"结算方式",
                    "registerTime":"创建时间",
                    "examTime":"审核时间",
                    "principalInfo":"负责人信息",
                    "operator":"负责人姓名",
                    "contactsType":"负责人类型",
                    "operatorIdno":"身份证号",
                    "operatorPhone":"负责人手机",
                    "operatorEmail":"负责人邮箱",
                    "contactInfo":"联系人信息",
                    "linkman":"联系人姓名",
                    "email":"联系人邮箱",
                    "phone":"联系人手机",
                    "accessoryInfo":"附件信息",
                    "dataImage": "证件资料图片",
                    "linenceImg":"营业执照",
                    "orgAccountImg":"开户许可证",
                    "indentityImg":"法人身份证-正面",
                    "indentityBackImg":"法人身份证-反面",
                    "bankCardImg":"银行卡照",
                    "province": "省",
                    "city": "市",
                    "county": "区",
                    "parentHint": "请先选择所属上级",
                },
                "accountInfo":"账户信息",
                "accountTable":{
                    "name":"开户名称",
                    "type":"账户类型",
                    "bankCardno":"银行账号",
                    "bankName":"开户行",
                    "subbranchName":"开户支行",
                    "subbanrchCode":"联行号",
                    "transId":"支付类型",
                    "cardType":"行内帐户"
                },
                "accountWin": {
                    "title": "查询开户支行",
                    "subbanrchCode":"联行号",
                    "subbranchName":"开户支行",
                    "requiredInfoA":"账户类型为企业时，必须填写开户支行",
                    "requiredInfoB":"账户类型为企业时，必须填写联行号"
                },
                "operationInfo":"操作记录",
                "operator":"操作者：",
                "examineWinTitle":"审核代理商",
                "tips":{
                    "sendEmailTip":"您确定需要发送邮件与短信吗？",
                    "sendSuccesTip":"邮件与短信发送成功！",
                    "parentChanCodeTip":"请先选择所属机构！"
                }
            },
            "openProduct":{
                "title":"开通产品",
                "sTitle":"产品信息",
                "prodDetailTitle":"产品明细",
                "prodTable":{
                    "combName":"产品名称",
                    "combNo":"产品代码",
                    "state":"开通状态"
                },
                "prodDetail":{
                    "transId":"支付类型",
                    "categoryType":"行业类别",
                    "limitDay":"单日限额（元）",
                    "limitSingleTitle":"单笔限额（元）",
                    "limitSingleMin":"单笔最小",
                    "limitSingle":"单笔最大",
                    "settleRate":"费率(‰)",
                    "fixFloatRate":"费率类型",
                    "settleCycle":"结算/分润周期",
                    "shareRule":"分润规则",
                    "used":"状态",
                    "editCommitBtn":"编辑提交",
                    "closeProdBtn":"关闭产品",
                    "openProdBtn":"开通产品",
                    "passBtn":"通过",
                    "rejectBtn":"拒绝",
                    "anewOpen":"重新开通"
                },
                "hint":{
                    "editProdHint":"您有编辑过的数据，是否需要先提交",
                    "closeProdSuccess":"产品关闭成功！",
                    "openProdSuccess":"开通产品成功！",
                    "anewOpenProdSuccess":"重新开通成功！",
                    "examineProdSuccess":"审核通过！",
                    "examineProdFail":"审核拒绝！"
                }
            },
            "totalChannelCfg":{
                "title":"总通道配置",
                "table":{
                    "bankNo":"银行",
                    "bankProNo":"银行服务商编号",
                    "applyState":"同步状态",
                    "applyTime":"最近同步时间",
                    "syncConfirmBefore":"您确定需要同步【",
                    "syncConfirmAfter":"】吗？"
                },
                "btn":{
                    "syncBtn":"同步"
                }
            },
            "channelCfg":{
                "title":"渠道配置",
                "sTitle":"渠道信息",
                "channelInfoTitle":"渠道详情",
                "usedOk":"启用",
                "usedNo":"停用",
                "channelTable":{
                    "transId":"支付类型",
                    "agencyCode":"所属银行",
                    "ptCenterId":"通道类型",
                    "providerNo":"渠道编号",
                    "used":"启用状态",
                    "settleCycle":"结算周期",
                    "settleRate":"结算费率(‰)"
                },
                "changeUsed":"您确认要变更当前状态吗",
                "delChannelInfo":"您确认要删除本条未配置通道类型的渠道信息吗？",
                "channelInfo":{
                    "transType":"支付类型",
                    "agencyName":"所属银行",
                    "ptCenterName":"通道类型",
                    "providerNo":"渠道编号",
                    "thirdMchId":"第三方平台商户号",
                    "pcmPartkey":"第三方平台商户号密钥",
                    "used":"启用状态",
                    "limitDay":"单日限额(元)",
                    "limitSingle":"单笔最大限额(元)",
                    "limitSingleMin":"单笔最小限额(元)",
                    "thirdAppid":"商户APPID",
                    "settleCycle":"结算周期",
                    "settleRate":"结算费率(‰)"
                },
                "channelWin": {
                    'title': "通道类型",
                    "transType":"支付类型",
                    "ptCenterId":"通道类型",
                    "providerNo":"渠道编号",
                    "thirdMchId":"第三方平台商户号",
                    "pcmPartkey":"第三方平台商户号密钥",
                    "used":"启用状态",
                    "limitDay":"单日限额(元)",
                    "limitSingle":"最大限额",
                    "limitSingleMin":"最小限额",
                    "thirdAppid":"商户APPID",
                    "settleCycle":"结算周期",
                    "settleRate":"结算费率(‰)",
                    "tip":"请先选择支付类型！"
                },
                "agencyCodeCfg":{
                    "title":"查询所属银行",
                    "agencyCode":"所属银行编号",
                    "agencyName":"所属银行名称",
                }
            },
            "poilCfg":{
                "title":"轮循配置",
                "totalPoil":"总资源池轮循",
                "enablePoilMsg":"是否启用轮循",
                "disablePoilMsg":"是否禁用轮循"
            },
            "tradeRuleCfg":{
                "title":"路由配置",
                "detail":{
                    "ruleState":"业务路由",
                    "tradeType":"业务配置"
                },
                "enableMsg":"是否启用路由",
                "disableMsg":"正在操作停用业务路由，请选择一种支付类型进行交易！"
            },
            "infoCfg":{
                "title":"信息配置",
                "weixin":{
                    "title":"公众号配置",
                    "newTitle":"新增公众号配置",
                    "editTitle":"编辑公众号配置",
                    "detail":{
                        "subAppid":"关联公众号APPID",
                        "subscribeAppid":"推荐关联公众号APPID",
                        "jsapiPath":"支付授权目录"
                    }
                },
                "subMchPattern":{
                    "title":"子商户模式配置",
                    "detail":{
                        "examStyle":"当前模式"
                    }
                },
                "tradeLimit":{
                    "title":"交易限额配置",
                    "detail":{
                        "totalFeeLimit":"交易当日总限额(元)"
                    }
                }
            },
            "shareCfg": {
                "title": "分润配置",
                "sTitle": "分润信息",
                "shareCfgTable": {
                    "transType" : "支付类型",
                    "categoryType" :"行业类别",
                    "limitDay" : "单日限额(元)",
                    "limitCount": "单笔限额(元)",
                    "limitSingle":"单笔最大限额(元)",
                    "limitSingleMin":"单笔最小限额(元)",
                    "chanRate" : "费率(‰)",
                    "fixFloatRate" : "费率类型",
                    "settleCycle" : "结算/分润周期",
                    "chanShareRule" : "分润规则",
                    "state": "状态"
                },
                "shareCfgWin": {
                    "newTitle":"新增分润信息",
                    "editTitle":"编辑分润信息",
                    "transType" : "支付类型",
                    "categoryType" :"行业类别",
                    "limitDay" : "单日限额(元)",
                    "limit" : "单笔限额(元)",
                    "limitSingleMax":"最大限额",
                    "limitSingleMin":"最小限额",
                    "rate" : "费率(‰)",
                    "fixFloatRate" : "费率类型",
                    "settleAndshare" : "结算/分润周期",
                    "share" : "分润规则",
                    "used": "状态",
                }
            },
            "examine": {
                "title": "审核服务商"
            }
        },
        "searchInput": {
            "ptCenterId": "通道类型编号",
            "ptCenterName": "通道类型名称"
        },
        "hint": {
            "all": "全部",
            "transAndCenter": "支付类型和通道类型不能同时重复，请调整！",
            "isNumber": "请输入有效数字!",
            "isTransId": "请先选择支付类型!",
            "isBank":"请选择所属银行!"
        },
        "win":{
            "account":{
                "newTitle":"新增账户信息",
                "editTitle":"编辑账户信息"
            },
            "totalChannel":{
                "newTitle":"新增总通道配置",
                "editTitle":"编辑总通道配置",
                "bankLabel":"银行",
                "bankTip":"银行不能重复，请调整！",
                "bankNoCfg":{
                    "title":"查询银行",
                    "bankNo":"银行编号",
                    "bankName":"银行名称"
                }
            },
            "channnel":{
                "newTitle":"新增渠道信息",
                "editTitle":"编辑渠道信息",
                "limitDayTip":"您输入的【单日限额】超出最大值",
                "limitMinTip":"您输入的【单笔限额最小值】超出最大值",
                "limitMaxTip":"您输入的【单笔限额最大值】超出最大值"
            },
            "weixin":{
                "subAppid":"关联公众号APPID",
                "subscribeAppid":"推荐关注公众号APPID",
                "jsapiPath":"支付授权目录",
                "jsapiPathTip":"请用【|】号分隔目录",
                "jsapiPathLimit":"授权目录不能超过5个！"
            },
            "tradeFeeLimit":{
                "minMsg":"不能为负数！",
                "deciMsg":"不能超过2位小数！"
            }
        }
    }
};
