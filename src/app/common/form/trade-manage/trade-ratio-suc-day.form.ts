import {BaseForm} from '../base.form';

/**
 * 日成功比率查询表单字段
 */
export class TradeRatioSucDayForm extends BaseForm{
    private _tradeTimeStart:string;  //统计开始时间    * 时间格式yyyy-MM-dd
    private _tradeTimeEnd:string;    //统计结束时间    * 时间格式yyyy-MM-dd
    public merchantId:number;      //商户编号
    public merchantName:string;    //商户名称（添加）
    public transId:string;         //支付类型
    public bankNo:string;//所属机构
    public agentno:string;//所属渠道层级编号
    public agencyName:string;   //所属渠道名称（添加）

    get tradeTimeStart():string{
        return this.isEmpty(this._tradeTimeStart) ? this.defTime(-7,'YYYY-MM-DD') : this.format(this._tradeTimeStart,'YYYY-MM-DD');
    }
    set tradeTimeStart(_tradeTimeStart:string){
        this._tradeTimeStart = _tradeTimeStart;
        this.tradeTimeEnd = this.modifyDate(this.tradeTimeStart,7);
    }

    get tradeTimeEnd():string{
        if(this._tradeTimeEnd == ''){
            return '';
        }
        return this.isEmpty(this._tradeTimeEnd) ? this.defTime(0,'YYYY-MM-DD') : this.format(this._tradeTimeEnd,'YYYY-MM-DD');
    }
    set tradeTimeEnd(_tradeTimeEnd:string){
        this._tradeTimeEnd = _tradeTimeEnd;
    }

}
