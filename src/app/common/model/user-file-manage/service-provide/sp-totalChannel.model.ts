import {BaseModel} from "../../base.model";

/**
 * 服务商总通道配置信息表单模板
 */

export class SpTotalChannelModel extends BaseModel {
    id: number;
    proNo:string; // 服务商编号 *
    bankNo:string; // 所属银行编号 *
    bankName:string; // 所属银行名称 *
    applyState:number; // 同步状态
    applyTime:string; // 同步时间
    bankProNo:string; // 银行服务商编号
}
