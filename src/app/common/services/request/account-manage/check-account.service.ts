import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 对账账户请求服务
 */

@Injectable()
export class checkAccountService{
    constructor(private http:HttpService){}

    // 列表数据查询
    public static CHECK_ACCOUINT_LIST_URL = '/paymentCheckTradePartner/searchPage';

    /**
     * 统计面板数据
     */
    loadCount(params): Observable<any> {
        return this.http.post('/paymentCheckTradePartner/searchCount', params);
    }

    /**
     * 详情
     * @param params
     * @returns {Observable<any>}
     */
    loadDetail(params: any): Observable<any> {
        return this.http.post('/paymentCheckTradePartner/searchDetail', params);
    }
}
