import {BaseModel} from "../base.model";

/**
 * 批量同步表单字段模板
 * @author hsz
 * @date 2017-8-11
 */
export class TradeBatchSyncModel extends BaseModel{
    private _tradeTimeStart  :string; // 交易开始时间
    private _tradeTimeEnd  :string; // 交易结束时间
    public mchNo:string; // 商户编号
    public orderStatus:string; // 订单状态

    get tradeTimeStart(){
        return this.isEmpty(this._tradeTimeStart) ? this.defTime(0,'YYYY-MM-DD 00:00:00') : this.format(this._tradeTimeStart);
    }
    set tradeTimeStart(_tradeTimeStart:string){
        this._tradeTimeStart = _tradeTimeStart;
        // this._tradeTimeEnd = this.modifyDate(this.tradeTimeStart,6);
    }

    get tradeTimeEnd(){
        if(this._tradeTimeEnd == ''){
            return '';
        }
        return this.isEmpty(this._tradeTimeEnd) ? this.defTime(0,'YYYY-MM-DD 23:59:59') : this.format(this._tradeTimeEnd, 'YYYY-MM-DD 23:59:59');
    }
    set tradeTimeEnd(_tradeTimeEnd:string){
        this._tradeTimeEnd = _tradeTimeEnd;
    }





}
