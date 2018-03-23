import {BaseForm} from "../base.form";

/**
 * 进件列表表单
 */

export class IntoPiecesForm extends BaseForm{
    public name: string;            //商户名称(筛选条件)
    public merchantNo: string;      //商户编号(筛选条件)
    public bankNo: string;          // 所属机构
    public applyState: number;      //进件状态(筛选条件)0:待进件、1:处理中、2:进件成功、3:进件失败、 4:被风控
    public superior: string;        //所属上级 — 对应“代理商编号”或“服务商编号”(筛选条件)
    public superiorName: string;    // 所属上级名称
}
