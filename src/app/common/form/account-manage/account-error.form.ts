import {BaseForm} from "../base.form";

/**
 * 对账异常表单
 */

export class AccountErrorForm extends BaseForm {
    private _checkTimeStart: string;  //开始日期
    private _checkTimeEnd: string;    //结束日期
    public partner: string;         //结算账户
    public partnerName: string;      // 结算账户名称
    public handleState: number;     //处理状态
    public orderNo: string;         //平台单号
    public transactionId: string;   //第三方订单号
    public refundNo: string;        //退款单号
    public refundId: string;        //第三方退款单号

    get checkTimeStart() {
        return this.isEmpty(this._checkTimeStart) ? this.defTime(-1,'YYYY-MM-DD') : this.format(this._checkTimeStart, 'YYYY-MM-DD');
    }
    set checkTimeStart(_checkTimeStart: any) {
        this._checkTimeStart = _checkTimeStart;
        this._checkTimeEnd = this.modifyDate(this._checkTimeStart,29);
    }

    get checkTimeEnd() {
        return this.isEmpty(this._checkTimeEnd) ? this.defTime(-1,'YYYY-MM-DD') : this.format(this._checkTimeEnd, 'YYYY-MM-DD');
    }
    set checkTimeEnd(_checkTimeEnd: any) {
        this._checkTimeEnd = _checkTimeEnd;
    }
}
