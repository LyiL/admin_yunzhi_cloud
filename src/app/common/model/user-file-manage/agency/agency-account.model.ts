import {BaseModel} from "../../base.model";

/**
 * 代理商账户信息
 */
export class AgencyAccountInfoModel extends BaseModel{
    public acntId: number; //主键（不可更改）             *
    public orgId: number; //机构ID（不可更改）            *
    public type: string; //账户类型 0个人  1企业
    public name: string; //账户名(开户名称)
    public bankCode: string; //银行代号
    public bankName: string; //银行名称(开户行)
    public subbanrchCode: number; //支行编码(联行号)
    public subbranchName: number; //开户支行名称       *
    public bankCardno: string; //银行卡号
    public province: string;//省份
    public provinceName: string;//省份名称
    public city: string;//城市
    public cityName: string;//城市名称
    // public settleType: number;
    // public status: number;
    public transId: string; //支付类型，接口代码（不可更改）
    public cardType: number;//卡类型，行内账户 1行内 0行外 *
}

