import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 对账异常请求服务
 */

@Injectable()
export class AccountErrorService{
    constructor(private http:HttpService){}

    // 查询列表数据
    public static ACC_ERROR_LIST_URL = "/pctsManager/seachPctErrorPage";

    /**
     * 差错异常详情页数据
     * @param params
     * @returns {Observable<any>}
     */
    getDetail(params: any): Observable<any> {
        return this.http.post('/pctsManager/seachPctErrorById', params);
    }
}
