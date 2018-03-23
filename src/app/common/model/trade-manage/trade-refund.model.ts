import {BaseModel} from "../base.model";

/**
 * 退款审核申请表单模板
 */
export class TradeRefundApplyModel extends BaseModel{
    public orderNo:string;// 订单单号
    public merchantNo:string; // 商户编号
    public refundFee:number;// 退款总额
    public mchRefuseReason:string; // 商户退款理由
}
