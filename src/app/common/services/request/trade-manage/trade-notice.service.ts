import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from '../../../net/http.service';

/**
 * 交易通知数据源
 */
@Injectable()
export class TradeNoticeService{
    constructor(private http:HttpService){
    }

    /**
     * 交易通知列表查询地址
     */
    public static NOTICE_LIST_URL = '/orderNotify/search/page';

    /**
     * 列表页加载订单详情
     * @param params {
     *   以下参数至少传一个
     *  orderNo:string平台单号
     *  outTradeNo:string 商户单号
     *   transactionId:string  支付单号
     * }
     * @return {Observable<any>}
     */
    loadOrderInfo(params:any):Observable<any>{
        return this.http.post('/tradeoffQuery/orderInfo',params);
    }

    /**
     * 同步
     * @param params {
     *   以下参数至少传一个
     *  orderNo:string平台单号
     *  outTradeNo:string 商户单号
     *   transactionId:string  支付单号
     * }
     * @return {Observable<any>}
     */
    loadSync(params:any):Observable<any>{
        return this.http.post(' /orderNotify/orderSyn',params);
    }

    /**
     * 补单
     * @param params {
     *   以下参数至少传一个
     *  orderNo:string平台单号
     *  outTradeNo:string 商户单号
     *   transactionId:string  支付单号
     * }
     * @return {Observable<any>}
     */
    loadNotify(params:any):Observable<any>{
        return this.http.post('/orderNotify/orderNotify',params);
    }

    /**
     * 批量同步
     * @param params {
     *  tradeTimeStart:string  交易开始时间    * 格式yyyy-MM-dd HH:mm:ss
     *  tradeTimeEnd:string  交易结束时间    * 格式yyyy-MM-dd HH:mm:ss
     *   mchNo:string  商户编号        *
     *  orderStatus：string 订单状态
     *
     * }
     * @return {Observable<any>}
     */
    loadBatchSync(params:any):Observable<any>{
        return this.http.post('/orderNotify/batchOrderSyn',params);
    }

    /**
     * 批量通知
     * @param params {
     *  tradeTimeStart:string  交易开始时间    * 格式yyyy-MM-dd HH:mm:ss
     *  tradeTimeEnd:string  交易结束时间    * 格式yyyy-MM-dd HH:mm:ss
     *   mchNo:string  商户编号        *
     *  notifyStatus ：string 订单状态
     *
     * }
     * @return {Observable<any>}
     */
    loadBatchNotify(params:any):Observable<any>{
        return this.http.post('/orderNotify/batchOrderNotify',params);
    }

    /**
     * 加载交易通知详情
     */
    loadNoticeDetail(params:any):Observable<any>{
        return this.http.post('/orderNotify/detailOrderNotify',params);
    }
}
