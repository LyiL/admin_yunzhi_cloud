import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 对账任务请求服务
 */

@Injectable()
export class AccountTaskService{
    constructor(private http:HttpService){}

    // 列表数据查询
    public static ACCOUNT_TASK_LIST_URL = '/paymentCheckTradeTask/searchPage';

    /**
     * 详情
     * @param params
     * @returns {Observable<any>}
     */
    loadDetail(params: any): Observable<any> {
        return this.http.post('/paymentCheckTradeTask/searchDetail', params);
    }

    /**
     * 编辑
     */
    loadEdit(params): Observable<any> {
        return this.http.post('/paymentCheckTradeTask/update', params);
    }

    /**
     * 重置任务
     */
    loadReset(params): Observable<any> {
        return this.http.post('/paymentCheckTradeTask/reset', params);
    }

    /**
     * 执行任务
     */
    loadProcess(params): Observable<any> {
        return this.http.post('/paymentCheckTradeTask/process', params);
    }

}
