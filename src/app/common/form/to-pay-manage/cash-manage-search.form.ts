/**
 * Created by lenovo on 2017/8/8.
 */

import {BaseForm} from "../base.form";

/**
 *资金池列表查询字段
 */
export class CashManageSearchForm extends BaseForm{
    public accountName: string;  //账户名称
    public useState: number;     //启用状态
    public bankNo: string;       //受理机构编号
}
