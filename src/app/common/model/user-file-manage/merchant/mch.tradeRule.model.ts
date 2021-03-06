import {BaseModel} from "../../base.model";

/**
 * 商户路由配置信息表单模板
 */

export class MchTradeRuleModel extends BaseModel {
    parentNo: string; // 商户编号 *
    ruleState: number;   // 启用状态：0=否 1:=是 *
    tradeId: string; // 支付类型编号（启用切换成禁用状态必传）
    tradeType: string; // 支付类型名称 （启用切换成禁用状态必传）
}
