import {BaseForm} from '../base.form';

/**
 * 交易比率查询表单字段
 */
export class TradeRatioForm extends BaseForm{
    private _statisticTime:string;// 结算日期    * 时间格式yyyy-MM-dd
    public agentno:string; // 所属上级
    public merchantId:string; // 商户名称
    public transId:string; // 支付类型

    get statisticTime():string{
        return this.isEmpty(this._statisticTime) ? this.defTime(-1,'YYYY-MM-DD') : this.format(this._statisticTime, 'YYYY-MM-DD');
    }
    set statisticTime(_statisticTime:string){
        this._statisticTime = _statisticTime;
    }
}
