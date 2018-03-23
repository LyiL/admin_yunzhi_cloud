import {BaseModel} from "../../base.model";
/**
 * 商户新增或编辑渠道表单
 */
export class MchChannelModel extends BaseModel{
    public id:number;//主键编号（不可更改）编辑时必传    *
    public pcmPartkey: string;           //
    public transId:string;
    public agencyCode:string;
    public agencyName:string;
    public ptCenterId:number;
    public centerName:string;
    public providerNo:string;
    public applyState:number;
    public orgId:number;
    public ally:string;
    public thirdAppid:string;
    public transType:string;
    public merchantId:string;
    public settleCycle:number;
    public limitDay:number;
    public limitSingleMin:number;
    public limitSingle:number;
    public settleRate:number;
    public mchShareRule:number;
    public used:number;//状态  *
    public chanNo: string;
    public table_id:string;
}
