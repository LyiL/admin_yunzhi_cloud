import {BaseModel} from "../../base.model";

/**
 * 代理商分润信息
 */
export class AgencyChannelInfoModel extends BaseModel{
    public id:number;//主键编号（不可更改）编辑时必传    *
    public transId: string; //支付类型编码，对应service的交易接口（不可更改） *
    public transType: string; //支付类型名称（不可更改）*
    public bankNo:string;//所属银行编码*
    public categoryType: number; //（行业类别）实体、虚拟 1,2（不可更改）  *
    public fixFloatRate:number;//费率类型，0固定费率，1浮动费率，默认都为固定费率 *
    public chanRate: number; //渠道费率,千分之X为单位*
    public settleCycle: number; //结算周期*
    public state:number;//状态  *
    public orgId: number; //渠道机构id（不可更改）  *
    public chanNo: string; //渠道编号（不可更改）   *
    public chanShareRule: number; //分润规则*
    public limitDay: number; //单日限额
    public limitSingleMin: number; //单笔限额-最小
    public limitSingleMax: number; //单笔限额-最大
    public descript:string;//状态说明

}

