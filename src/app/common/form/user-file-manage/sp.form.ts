import {BaseForm} from "../base.form";

/**
 * 服务商列表查询表单
 */
export class SPForm extends BaseForm{
    public bankCode: string;       //受理机构编号
    public bankName:string;
    public name:string //服务商名称
    public chanCode:string; //服务商编号
    public examState:number; //用户状态
    public parentChanCode:string;//所属上级编号
    public parentChanName:string;//所属上级
}
