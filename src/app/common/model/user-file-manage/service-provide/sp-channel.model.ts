import {BaseModel} from "../../base.model";

/**
 * 服务商渠道配置信息表单模板
 */

export class SpChannelModel extends BaseModel {
    id: number;
    transId: string;        // 支付类型 *
    transType: string;
    merchantId:number;      // 服务商编号 *
    agencyCode: string;     // 所属银行编号*
    agencyName:string;      // 所属银行名称
    ptCenterId:number;      // 通道类型编号
    ptCenterName: string;   // 通道类型名称
    providerNo:string;      // 渠道编号 *
    ally:string;            // 第三方平台商户号
    pcmPartkey:string;      // 第三方平台商户号密钥
    used:number;            // 启用状态
    limitDay:number;        // 单日限额
    limitSingle:number;     //  单笔限额最大值
    limitSingleMax: number; //  单笔限额最大值(自己另外加的)
    limitSingleMin:number;  // 单笔限额最小值
    thirdAppid:string;      //  商户APPID
    settleCycle:number;     //  结算周期 *
    settleRate:number;      // 结算费率
    categoryTypeGroup: string; // 行业类别
    parentChanCode: string; // 上级编号
    table_id: string;
}
