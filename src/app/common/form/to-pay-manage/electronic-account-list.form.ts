import {BaseForm} from "../base.form";

/**
 *店址账户列表查询字段
 */
export class ElectronicAccountListForm extends BaseForm{
    public accountName: string; //账户名称
    public useState: number;    //启用状态：0未启用,1启用
    public organNo: string;     //所属商户编号
}
