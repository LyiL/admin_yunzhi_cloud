import {BaseModel} from '../../base.model'

/**
 * 服务商账户信息表单模板
 */
export class SpAccountModel extends BaseModel {
    public name: string;                // 开户名称
    public type: string;                // 账户类型
    public bankCardno: string;          // 银行账号
    public bankName: string;            // 开户行
    public subbranchName: string;       // 开户支行
    public subbanrchCode: string;       // 联行号
    public transId: string;             // 支付类型
    public cardType: string;            // 行内账户
    public orgId: number;               // 账户id
    public acntId: number;              // 主键id
    public table_id: string;            // 临时表id
}
