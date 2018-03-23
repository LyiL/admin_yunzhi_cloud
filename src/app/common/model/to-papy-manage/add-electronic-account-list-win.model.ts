import {BaseForm} from "../../form/base.form";

/**
 * 新增电子账户form
 */
export class AddElectronicAccountListWinModel extends BaseForm{
    public accountNo:string; //电子账户ID
    public accountName:string; //电子账户名称
    public organNo:string; //所属商户编号
    public organName:string; //所属商户名称
    public accountId:string; //银行账户(acntId,name)
    public cashpoolNo:string; //所属资金池编号
    public cashpoolName:string; //归属资金池的账户名
    public outMchno:string; //外部商户号
    public signkey:string; //签名密钥
    public singleProcsFee:string; //对公手续费
    public privProcsFee:string; //对私手续费
    public advanceProcsFee:number; //垫资手续费
}
