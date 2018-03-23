import {BaseModel} from "../../base.model";

/**
 * 商户交易限额配置表单模板
 */
export class MchTradeFeeLimitModel extends BaseModel {
    public merchantNo: string; // 服务商编号 *
    public totalFeeLimit: number; // 交易限额值
}
