import {BaseModel} from "../../base.model";
/**
 * 商户新增或编辑账户表单
 */
export class MchAccountModel extends BaseModel{
    public name: string;
    public type: string;
    public bankCardno: string;
    public bankName: string;
    public subbranchName: string;   //
    public subbanrchCode: string;   //
    public transId: string;   //
    public cardType: string;   //
    public acntId: number; //主键（不可更改）             *
    public orgId:number;
    public stepAccount:string;
}
