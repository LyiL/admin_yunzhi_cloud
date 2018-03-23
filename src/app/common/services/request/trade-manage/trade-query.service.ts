import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from '../../../net/http.service';

/**
 * 交易查询数据源
 */
@Injectable()
export class TradeQueryService{
    constructor(private http:HttpService){}

    /**
     * 批量订单查询地址
     * @type {string}
     */
    public static BATCH_LIST_URL = '/tradeoffQuery/orderQueryByCloud';

    /**
     * 订单号查询地址
     */
    public static ORDER_LIST_URL = '/tradeoffQuery/orderNoQueryByCloud';

    /**
     * 统计面板数据查询
     * @param params
     * @returns {Observable<any>}
     */
    public loadSummary(params:any):Observable<any>{
        return this.http.post('/tradeoffQuery/summaryQueryByCloud', params);
    }

    /**
     * 订单详情查询
     * @param params
     * @returns {Observable<any>}
     */
    getTQ(params:any):Observable<any>{
        return this.http.post('/tradeoffQuery/orderInfo', params);
    }
}
