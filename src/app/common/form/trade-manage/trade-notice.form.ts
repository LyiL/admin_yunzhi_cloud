import {BaseForm} from '../base.form';

/**
 * 交易通知查询表单字段
 */
export class TradeNoticeForm extends BaseForm{
    public orderNo:string;//平台单号
    public outTradeNo:string;//商户单号
    public transactionId:string;//支付单号
}
