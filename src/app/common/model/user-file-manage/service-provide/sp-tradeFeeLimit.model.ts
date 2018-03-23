import {BaseModel} from "../../base.model";

/**
 * 服务商交易限额配置表单模板
 */
export class SpTradeFeeLimitModel extends BaseModel {
    public chanCode: string; // 服务商编号 *
    public totalFeeLimit: number; // 交易限额值
}
