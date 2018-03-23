/**
 * 入账明细列表查询form
 */

import {BaseForm} from "../base.form";

export class CashManageAccountdetailSearchForm extends BaseForm{

    public poolNo: string;     //资金池编号
    private _startDate:string;  //交易开始时间
    private _endDate:string;  //交易结束时间
    constructor(){
        super();
    }
    get startDate(){
        return this.isEmpty(this._startDate) ? this.defTime(0,'YYYY-MM-DD 00:00:00') : this.format(this._startDate);
    }
    set startDate(_startDate:string){
        this._startDate = _startDate;
    }
    get endDate(){
        if(this._endDate == ''){
            return '';
        }
        return this.isEmpty(this._endDate) ? this.defTime(0,'YYYY-MM-DD 23:59:59') : this.format(this._endDate,'YYYY-MM-DD 23:59:59');
    }
    set endDate(_endDate:string){
        this._endDate = _endDate;
    }

}

