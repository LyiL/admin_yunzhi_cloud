import {BaseForm} from "../base.form";
import {ObjectExtend} from 'ng-zorro-antd';

/**
 * 商户排名查询表单
 */
export class TradeRankForm extends BaseForm{
    // public billTime = "2017-09-25"; // 日结时间
    private _billTime:string; // 日结时间

    get billTime():string{
        return this.isEmpty(this._billTime) ? this.defTime(-1,'YYYY-MM-DD') : this.format(this._billTime, 'YYYY-MM-DD');
    }
    set billTime(_billTime:string){
        this._billTime = _billTime;
    }
}
