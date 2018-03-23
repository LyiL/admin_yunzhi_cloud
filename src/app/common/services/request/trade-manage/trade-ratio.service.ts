import {Injectable} from "@angular/core";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 交易比率数据源
 */
@Injectable()
export class TradeRatioService{
    constructor(private http:HttpService){}
    /**
     *交易比率列表数据地址
     */
    public static TRADERATIO_LIST_URL = '/paymentOrderSuccessRatio/search/page';
    /**
     * 获取日成功比例图数据
     * @param params {
     * tradeTimeStart:string  统计开始时间    * 时间格式yyyy-MM-dd
     * tradeTimeEnd:string    统计结束时间    * 时间格式yyyy-MM-dd
     * 受理结构
     * 所属上级
     * merchantId:number     商户ID
     * }
     * @returns {Observable<any>}
     */
    loadChartsData(params:any){
        return this.http.post('/paymentOrderSuccessRatio/getSuccessRatioMap',params);
    }

    /**
     * 获取每小时成功比例图数据
     * @param params {
     * tradeTimeStart:string  统计开始时间    * 时间格式yyyy-MM-dd
     * tradeTimeEnd:string    统计结束时间    * 时间格式yyyy-MM-dd
     * merchantId:number     商户ID
     * }
     * @returns {Observable<any>}
     */
    loadChartsDataHour(params:any){
        return this.http.post('/paymentOrderSuccessRatio/getSuccessRatioMapByHour',params);
    }

}
