import {BaseForm} from "../base.form";

/**
 * 对账概要表单
 */

export class AccountSummaryForm extends BaseForm {
    private _billTimeStart: string; //开始日期
    private _billTimeEnd: string;   //结束日期
    public ally: string;          //结算账户
    public allyName: string;       // 结算账户名称
    public reconState: number;    //对账状态
    public transId: string;       //支付类型
    public centerId: number;      //支付中心
    public centerName: string;     // 支付名称
    public agencyCode: string;    //银行编码
    public agencyCodeName: string;  // 银行名称

    get billTimeStart() {
        return this.isEmpty(this._billTimeStart) ? this.defTime(-1,'YYYY-MM-DD') : this.format(this._billTimeStart,'YYYY-MM-DD');
    }
    set billTimeStart(_billTimeStart: any) {
        this._billTimeStart = _billTimeStart;
        this._billTimeEnd = this.modifyDate(this._billTimeStart,29);
    }


    get billTimeEnd() {
        return this.isEmpty(this._billTimeEnd) ? this.defTime(-1, 'YYYY-MM-DD') : this.format(this._billTimeEnd,'YYYY-MM-DD');
    }
    set billTimeEnd(_billTimeEnd: any) {
        this._billTimeEnd = _billTimeEnd;
    }
}
