import {BaseForm} from "../base.form";

/**
 * 订单号查询form
 */
export class ToPayOrderqueryForm extends BaseForm{
    public transNo: string;      //代付单号
    public outTradeNo: string;   //商户单号
    constructor() {
        super();
    }
}
