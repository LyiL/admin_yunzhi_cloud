import {BaseForm} from "../base.form";

/**
 * 代理商列表查询信息
 */
export class AgencyForm extends BaseForm{
    public name: string;           //代理商名称
    public chanCode: string;       //代理商编号
    public bankCode: string;       //代理商所属机构
    public examState: number;      //代理商审核状态
    public parentChanCode: string; //上级代理商编号
    public parentChanName: string;  //上级代理商名称（添加）
    public appCode: string;         //代理类型
}
