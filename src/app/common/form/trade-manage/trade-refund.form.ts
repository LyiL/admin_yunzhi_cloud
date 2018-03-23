import {BaseForm} from "../base.form";

/**
 * 退款审核查询表单
 */
export class TradeRefundForm extends BaseForm{
    private _tradeTimeStart:string; // 申请开始时间
    private _tradeTimeEnd:string; // 申请结束时间
    public refundTimeStart:string = null; // 退款开始时间
    public refundTimeEnd:string = null; // 退款结束时间
    public merchantExam:number; // 商户审核
    public daemonAudit:number; // 平台审核
    public refundState:number; // 退款状态
    public refundSource:number; // 退款来源
    public transactionId:string; // 第三方单号
    public refundNo:string; // 退款单号
    public orderNo:string; // 平台单号
    public transId:string; // 支付类型
    public merchantNo:string; // 商户名称

    get tradeTimeStart(){
        return this.isEmpty(this._tradeTimeStart) ? this.defTime(-7,'YYYY-MM-DD 00:00:00') : this.format(this._tradeTimeStart);
    }
    set tradeTimeStart(_tradeTimeStart:string){
        this._tradeTimeStart = _tradeTimeStart;
        this._tradeTimeEnd = this.modifyDate(this.tradeTimeStart,29);
    }

    get tradeTimeEnd(){
        if(this._tradeTimeEnd == '') {
            return ''
        }
        return this.isEmpty(this._tradeTimeEnd) ? this.defTime(0,'YYYY-MM-DD 23:59:59') : this.format(this._tradeTimeEnd, 'YYYY-MM-DD 23:59:59');
    }
    set tradeTimeEnd(_tradeTimeEnd:string){
        this._tradeTimeEnd = _tradeTimeEnd;
    }
}
