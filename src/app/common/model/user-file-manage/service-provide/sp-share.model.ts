import {BaseModel} from "../../base.model";

/**
 * 服务商分润配置表单模板
 */

export class SpShareModel extends BaseModel {
    id: number; // 主键id*
    transId: string; // 支付类型编码 *
    transType: string;          // 支付类型
    bankNo: string; // 所属银行编码
    categoryType: string;       // 行业类别
    fixFloatRate: number;       // 费率类型
    chanRate: string;               // 渠道费率*(‰)
    settleCycle: number;     // 结算/分润周期
    state: number;               // 状态
    orgId: number;                  // 服务商机构id *
    chanNo: string; // 渠道编号
    chanShareRule: number;              // 分润规则
    limitDay: number; // 单日限额
    limitSingleMin: number;     // 最小限额
    limitSingleMax: number;     // 最大限额
    parentChanCode: string;
    categoryTypeGroup: string; // 新增页分润配置
}
