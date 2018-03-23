import {BaseForm} from "../base.form";

/**
 * 账单下载表单
 */

export class AccountDownLoadForm extends BaseForm {
    private _searchStartTime: string; //页面查询开始时间
    private _searchEndTime: string;   // 页面查询结束时间
    public companion: string;         //第三方商户号

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
