import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 对账概要请求服务
 */

@Injectable()
export class AccountSummaryService{
    constructor(private http:HttpService){}

    // 列表数据查询
    public static ACC_SUMMARY_LIST_URL = '/pctsManager/seachByPage';

    /**
     * 统计面板数据
     * @param params
     * @returns {Observable<any>}
     */
    getSummary(params: any): Observable<any> {
        return this.http.post("/pctsManager/seachCount", params);
    }

    /**
     * 详情页数据
     * @param params
     * @returns {Observable<any>}
     */
    getDetail(params: any): Observable<any> {
        return this.http.post("/pctsManager/seachPctsById", params);
    }
}
