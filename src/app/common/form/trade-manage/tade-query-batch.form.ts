import {BaseForm} from "../base.form";

/**
 * 批量订单查询表单
 */
export class TadeQueryBatchForm extends BaseForm{
    private _tradeTimeStart: string; // 交易开始时间
    private _tradeTimeEnd: string; // 交易结束时间
    // public tradeTimeStart = "2017-09-15 00:00:00";
    // public tradeTimeEnd = "2017-09-22 23:59:59";
    public bankNo:string; // 受理机构
    public agentno:string;// 所属渠道编号
    public agentName:string; // 所属渠道名称
    public merchantNo: string; // 商户编号
    public merchantName:string; // 商户名称
    public tradeState: number; // 交易状态
    // public secondMchNo: string; // 下属门店
    public centerId: string;//支付中心
    public transId: string; // 支付类型

    get tradeTimeStart(){
        return this.isEmpty(this._tradeTimeStart) ? this.defTime(0,'YYYY-MM-DD 00:00:00') : this.format(this._tradeTimeStart);
    }
    set tradeTimeStart(_tradeTimeStart:string){
        this._tradeTimeStart = _tradeTimeStart;
        this._tradeTimeEnd = this.modifyDate(this.tradeTimeStart,6);
    }

    get tradeTimeEnd(){
        if(this._tradeTimeEnd == ''){
            return '';
        }
        return this.isEmpty(this._tradeTimeEnd) ? this.defTime(0,'YYYY-MM-DD 23:59:59') : this.format(this._tradeTimeEnd, 'YYYY-MM-DD 23:59:59');
    }
    set tradeTimeEnd(_tradeTimeEnd:string){
        this._tradeTimeEnd = _tradeTimeEnd;
    }
}
