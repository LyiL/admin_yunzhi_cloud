import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";
import {Observable} from "rxjs/Observable";

/**
 * 代付交易服务请求地址
 */
@Injectable()
export class TopayTradeListService{
    constructor(private http: HttpService) {
    }

    /**
     * 列表请求地址
     * @type {string}
         *  Date    startDate   交易开始时间  *
         Date    endDate     交易结束时间  *
         String  mchName     商户名称
         int     tradeState  启用状态
         String  payName     银行账户
         String  payCardNo   银行卡号
         String  transNo     代付单号
         String  outTradeNo  商户单号
     */
    public  static CASHTRANS_SEARCH_URL='/cashTrans/search';


    /**
     *代付交易统计
         * Date  startDate  交易开始时间
         Date  endDate  交易结束时间
         String  mchName 商户名称
         int  tradeState 启用状态
         String  payName 银行账户
         String  payCardNo 银行卡号
         String  transNo 代付单号
         String  outTradeNo  商户单号
     */
    loadCount(params):Observable<any>{
        return this.http.post("/cashTrans/queryCount",params);
    }


    /**
     *同步
     * String  transNo 代付单号  *
     */
    loadSynch(params):Observable<any>{
        return this.http.post("/cashTrans/synch",params);
    }


    /**
     *导出报表  /cashTrans/detail
         *  Date    startDate   交易开始时间
         Date    endDate     交易结束时间
         String  mchName     商户名称
         int     tradeState  启用状态
         String  payName     银行账户
         String  payCardNo   银行卡号
         String  transNo     代付单号
         String  outTradeNo  商户单号
     */
    loadExport(params):Observable<any>{
        return this.http.download("/cashTrans/export",params);
    }

    /**
     * 详情
     * @param params
     * @returns {Observable<any>}
     *   String  transNo 代付编号  *
     */
    loadDetail(params):Observable<any>{
        return this.http.post("/cashTrans/detail",params);
    }
}
