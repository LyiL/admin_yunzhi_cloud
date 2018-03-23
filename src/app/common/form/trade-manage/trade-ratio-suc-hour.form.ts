import {BaseForm} from '../base.form';

/**
 * 每小时成功比率查询表单字段
 */
export class TradeRatioSucHourForm extends BaseForm{
    private  _tradeTime:string;       //统计时间    * 时间格式yyyy-MM-dd
    public merchantId:number;      //商户ID
    public merchantName:string;    //商户名称（添加）
    public bankNo:string;          //所属机构
    public agentno:string;         //所属渠道
    public agencyName:string;   //所属渠道名称（添加）
    get tradeTime():string{
        return this.isEmpty(this._tradeTime) ? this.defTime('YYYY-MM-DD') : this.format(this._tradeTime,'YYYY-MM-DD');
    }
    set tradeTime(_tradeTime:string){
        this._tradeTime = _tradeTime;
    }
}
