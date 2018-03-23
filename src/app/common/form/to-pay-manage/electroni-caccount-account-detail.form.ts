import {BaseForm} from "../base.form";

/**
 * 记账明细列表form
 */
export class ElectroniCaccountAccountDetailForm extends BaseForm{
    public accountNo: string;  //电子账户ID
    private _startDate:string;  //交易开始时间
    private _endDate:string;  //交易结束时间
    public mchNo: string;      //商户编号
    public incash: number;     //记账类型
    constructor(){
        super();
    }

    get startDate():string{
        return this.isEmpty(this._startDate) ? this.defTime(-6,'YYYY-MM-DD 00:00:00') : this.format(this._startDate);
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
