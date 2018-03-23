import {BaseForm} from "../base.form";

/**
 * 退款设置列表查询信息
 */
export class RefundSettingsForm extends BaseForm{
    public name: string;       //商户名称
    public merchantNo: string; //商户编号
}
