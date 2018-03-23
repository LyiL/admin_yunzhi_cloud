

import {BaseForm} from "../base.form";

/**
 * 批量查询列表form
 */
export class ToPayBatchqueryFom extends BaseForm{
    // public startDate: string;    //交易开始时间
    // public endDate: string;      //交易结束时间
    private _startDate:string;  //交易开始时间
    private _endDate:string;  //交易结束时间
    public mchName: string;      //商户名称
    public tradeState: number;   //启用状态
    public payName: string;      //银行账户
    public payCardNo: string;    //银行卡号
    constructor() {
        super();
    }
    get startDate():string{
        return this.isEmpty(this._startDate) ? this.defTime(-6, 'YYYY-MM-DD 00:00:00') : this.format(this._startDate);
    }
    set startDate(_startDate:string){
        this._startDate = _startDate;
    }

    get endDate():string{
        if(this._endDate == ''){
            return '';
        }
        return this.isEmpty(this._endDate) ? this.defTime(0,'YYYY-MM-DD 23:59:59') : this.format(this._endDate,'YYYY-MM-DD 23:59:59');
    }
    set endDate(_endDate:string){
        this._endDate = _endDate;
    }


}
