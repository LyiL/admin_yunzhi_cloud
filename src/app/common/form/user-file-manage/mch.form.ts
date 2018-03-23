import {BaseForm} from "../base.form";
/**
 * 商户列表查询form
 */
export class mchForm extends BaseForm{

    public name: string;  //商户名
    public merchantNo: string; //商户编号
    public examState: number; //状态
    public chanNo: string; //所属上级
    public chanName: string; //所属上级
    public centerId:number;//通道
    public centerName:string;// 通道名称
    public ally: string; //识别码
    public outerBatchId:string;//进件批次号
    public tradeAuth:number;//支付权限 0:无权限 1:正常
    public bankNo: string; //所属机构
    public bankName:string;//所属机构名称

}
