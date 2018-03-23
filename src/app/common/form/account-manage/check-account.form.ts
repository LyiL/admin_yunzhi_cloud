import {BaseForm} from "../base.form";

/**
 * 对账账户表单
 */

export class CheckAccountForm extends BaseForm {
    private _searchStartTime: string;   // 开始日期
    private _searchEndTime: string;     // 结束日期
    public reconState: number;          // 对账状态
    public ally: string;                // 结算账户编号

    get searchStartTime() {
        return this.isEmpty(this._searchStartTime) ? this.defTime(-1,'YYYY-MM-DD') : this.format(this._searchStartTime,'YYYY-MM-DD');
    }
    set searchStartTime(_billTimeStart: any) {
        this._searchStartTime = _billTimeStart;
        this._searchEndTime = this.modifyDate(this._searchStartTime,29);
    }


    get searchEndTime() {
        return this.isEmpty(this._searchEndTime) ? this.defTime(-1, 'YYYY-MM-DD') : this.format(this._searchEndTime,'YYYY-MM-DD');
    }
    set searchEndTime(_billTimeEnd: any) {
        this._searchEndTime = _billTimeEnd;
    }
}
