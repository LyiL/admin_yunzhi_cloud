import {BaseModel} from "../../base.model";

export class IntoPiecesModel extends BaseModel{
    public merchantId: number;          // 商户id *        通过商户名称选择事件里的merchantNo赋值
    public merchantCode: string;        // 商户编号 *       通过商户名称选择事件里的id赋值
    public transId: string;             // 支付类型 *
    public ptCenterId: number;          // 支付接口主键/通道类型id *
    public ptCenterName: string;        // 通道类型名称
    public name: string;                // 商户名称(筛选条件)
    public chanName: string;            // 所属上级名称
    public agencyName: string;          // 所属银行
    public providerNo: string;          // 渠道商编号（上游分配的服务商编号）
    public applyState: number;          // 进件状态(筛选条件)0:待进件、1:处理中、2:进件成功、3:进件失败、 4:被风控
    public ally: string;                // 商户识别码
    public agencyCode: string;          // 银行编码
    public mchName: string;             // 商户名称
    public bankName: string;            // 所属机构名称
    public orgName: string;             // 所属机构名称
    constructor() {
        super();
    }
}
