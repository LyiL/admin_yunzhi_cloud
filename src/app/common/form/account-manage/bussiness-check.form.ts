import {BaseForm} from "../base.form";

export class BussinessCheckForm extends BaseForm {
    private _startAt: string;     //对账开始日期
    private _finishAt: string;    //对账结束日期
    public ally: string;        //结算账户
    public allyName: string;     // 结算账户名称
    public reconState: number;  //对账状态
    public merchantNo: string;  //商户编号
    public merchantName: string; // 商户名称
    public agencyCode: string;  //受理机构
    public agencyCodeName: string; // 受理机构名称
    public transId: string;     //支付类型
    public centerId: number;    //支付中心
    public centerName: string;   // 支付名称
    public secondMchNo: string; //下属门店
    public secondMchName: string; // 下属门店名称

    get startAt() {
        return this.isEmpty(this._startAt) ? this.defTime(-1, 'YYYY-MM-DD') : this.format(this._startAt,'YYYY-MM-DD');
    }
    set startAt(_startAt: any) {
        this._startAt = _startAt;
        this._finishAt = this.modifyDate(this._startAt,29);
    }

    get finishAt() {
        return this.isEmpty(this._finishAt) ? this.defTime(-1, 'YYYY-MM-DD') : this.format(this._finishAt,'YYYY-MM-DD');
    }
    set finishAt(_finishAt: any) {
        this._finishAt = _finishAt;
    }
}
