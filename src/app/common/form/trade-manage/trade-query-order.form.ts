import {BaseForm} from "../base.form";

/**
 * 订单号查询表单
 */
export class TradeQueryOrderForm extends BaseForm{
    public orderNo:string; // 平台单号
    public outTradeNo:string; // 商户订单号
    public transactionId:string; // 支付单号
    public bankTypeNo:string; // 付款单号
}
