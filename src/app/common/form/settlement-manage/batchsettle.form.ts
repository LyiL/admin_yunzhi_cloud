import {BaseForm} from "../base.form";
/**
 * 结算打款列表查询form
 */
export class BatchSettleForm extends BaseForm{

    // public createTime: string;    //创建日期
    public _createTime: string;    //创建日期
    public settleNo: number;      //打款批次号
    public actType: string;       //账户类型
    public agencyCode: string;    //受理机构编号
    public specNo:number;//商户编号
    public specName: string;  //商户名称
    public ally: string;          //结算商户号
    public allyName: string; // 结算商户名称
    public cardType:number;  //导出方式(0:行外,1:行内)
    public syncStatus:number;  // 同步状态（0: 未同步 1: 已提交２: 交易成功3: 交易失败 4: 交易超时 5:转入人工）
    // public  syncMode:number; //操作类型 ０:自动　１:人工
    // public  finalState:number; //最终状态
    // public outTradeNo:string; //商户代付单号
    constructor(){
        super();
    }
    get createTime():string{
        return this.isEmpty(this._createTime) ? this.defTime('YYYY-MM-DD') : this.format(this._createTime,'YYYY-MM-DD');
    }
    set createTime(_createTime:string){
        this._createTime = _createTime;
    }

}
