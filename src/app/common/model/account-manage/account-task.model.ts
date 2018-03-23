import {BaseModel} from "../base.model";

/**
 * 账单任务
 */

export class accountTaskmodel extends BaseModel{

    public id:number;               //对账任务唯一标识id（不可修改）*
    public reconPath:string;        //对账单文件路径
    public reconType:string;        //对账类型 *
    public reconTypeName:string;    //对账类型名称
    public refundType:string;       //退款依据 *
    public refundTypeName:string;   //退款依据名称
}
