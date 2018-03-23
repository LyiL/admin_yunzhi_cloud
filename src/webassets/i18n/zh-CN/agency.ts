/**
 * 代理商模块的语言包
 */
export const AGENCY_LANG = {
    "Agency": {
        "listPage": {
            "title": "代理商列表",
            "search": {
                "name": "代理商名称",
                "chanCode": "代理商编号",
                "bankCode": "所属机构",
                "parentChanCode": "上级代理",
                "examState": "用户状态",
                "appCode": "代理类型",
                "all":"全部"
            },
            "bankCodeCfg": {
                "title": "查询所属机构",
                "orgNo": "所属机构编号",
                "name": "所属机构名称"
            },
            "parentChanCfg": {
                "title": "查询上级代理",
                "parentChanCode": "上级代理编号",
                "parentChanName": "上级代理名称"
            },
            "salesManCfg": {
                "title": "查询所属业务员",
                "salesmanId": "所属业务员编号",
                "realName": "所属业务员名称"
            },
            "tableCols": {
                "name": "代理商名称",
                "chanCode": "代理商编号",
                "appCode": "代理类型",
                "agentRank": "级别",
                "parentAgentName": "上级代理",
                "childAgentCount": "下级代理",
                "mchCount": "下属商户",
                "bankName": "所属机构",
                "examState": "用户状态"
            },
            "win":{
                "title":"信息",
                "subAgentCount":"下级代理总计数：",
                "subMchCount":"下级商户总计数："
            },
            "subMchTableCols": {
                "name": "商户名称",
                "merchantNo": "商户编号",
                "shortName": "商户简称",
                "examState": "用户状态"
            },
            "btn": {
                "addBtn": "新增代理商"
            }
        },
        "detailPage":{
            "detail":{
                "title":"详情",
                "AgencyDetailTitle":"代理商详情",
                "AgencyEditTitle":"编辑代理商",
                "info":{
                    "infoTitle":"基础信息",
                    "enterpriseInform":"企业信息",
                    "bankName":"所属机构",
                    "parentChanName":"上级代理",
                    "appCode":"代理类型",
                    "name":"企业名称",
                    "shortName":"企业简称",
                    "chanCode":"代理商编号",
                    "orgEmail":"企业邮箱",
                    "provinceName":"所在地",
                    "province":"省",
                    "city":"市",
                    "county":"区",
                    "comAddress":"经营地址",
                    "certificateType":"商户证件类型",
                    "linenceNo":"商户证件编号",
                    "linenceTermStart":"证件有效期",
                    "startDate":"开始日期",
                    "endDate":"结束日期",
                    "categoryType":"所属行业",
                    "category":"类别",
                    "categoryName":"名称",
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
                    "imgInfo":"证件资料图片",
                    "linenceImg":"营业执照",
                    "orgAccountImg":"开户许可证",
                    "indentityImg":"法人身份证-正面",
                    "indentityBackImg":"法人身份证-反面",
                    "bankCardImg":"银行卡照"
                },
                "accountInfo":"账户信息",
                "accountInfoAddTitle":"新增账户信息",
                "accountInfoEditTitle":"编辑账户信息",
                "accountTable":{
                    "name":"开户名称",
                    "type":"账户类型",
                    "bankCardno":"银行账号",
                    "bankName":"开户行",
                    "subbranchName":"开户支行",
                    "subbanrchCode":"联行号",
                    "transId":"支付类型",
                    "cardType":"行内帐户",
                    "subbranchNameSearch":"查询开户支行"
                },
                "imagePreview":"图片预览",
                "operationInfo":"操作记录",
                "operator":"操作者：",
                "examineWinTitle":"审核代理商",
                "tips":{
                    "sendEmailTip":"您确定需要发送邮件与短信吗？",
                    "sendSuccesTip":"邮件与短信发送成功！",
                    "parentChanSearchBeforeTip":"请先选择所属机构！",
                    "salesmanSearchBeforeTip":"请先选择上级代理！"
                }
            },
            "shareProfitCfg":{
                "title":"分润配置",
                "shareProfitInfoAddTitle":"新增分润配置",
                "shareProfitInfoEditTitle":"编辑分润配置",
                "shareProfitDetailWinTitle":"分润配置详情",
                "usedOk":"启用",
                "usedNo":"停用",
                "changeUsed":"您确认要变更当前状态吗",
                "shareProfitInfo":{
                    "transType":"支付类型",
                    "categoryType":"行业类别",
                    "limitDay":"单日限额(元)",
                    "limitCount":"单笔限额(元)",
                    "limitSingleMin":"最小限额",
                    "limitSingleMax":"最大限额",
                    "limitSMin":"单笔最小限额(元)",
                    "limitSMax":"单笔最大限额(元)",
                    "chanRate":"费率(‰)",
                    "fixFloatRate":"费率类型",
                    "settleCycle":"结算/分润周期",
                    "chanShareRule":"分润规则",
                    "state":"状态",
                    "centerName":"通道类型",
                    "providerNo":"渠道编号"
                },
                "tips":{
                    "delTip1":"您确认要删除【",
                    "delTip2":"】的渠道信息配置吗？",
                    "delTip3":"您确认要删除本条未配置通道类型的渠道信息吗？"
                }
            }
        },
        "addPage":{
            "baseInfo":{
                "title":"基本信息"
            },
            "accountInfo":{
                "title":"账户信息"
            },
            "shareProfitCfgInfo":{
                "title":"分润配置"
            },
            "tips":{
                "AccCardNoTip":"【账户类型】为企业时，开户支行及联行号不能为空！",
                "AccPayTypeTip":"支付类型已经存在，请调整！",
                "sharePayTypeTip":"支付类型、行业类别不能同时重复，请调整！",
                "limitDayAndMaxTip":"单日限额需大于单笔限额最大值！",
                "limitDayAndMinTip":"单日限额需大于单笔限额最小值！",
                "limitMinAndMaxTip":"单笔限额最大值需大于单笔限额最小值！",
                "typeTip":"当账户类型为企业时，开户支行和联行号不能为空！"
            }
        }
    }
};
