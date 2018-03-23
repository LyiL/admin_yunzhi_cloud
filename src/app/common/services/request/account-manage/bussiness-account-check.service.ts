import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 商户对账请求服务
 */

@Injectable()
export class BussinessAccountCheckService{
    constructor(private http:HttpService){}

    // 查询列表数据
    public static ACC_BUSSINESS_LIST_URL = '/pctsManager/seachMchAccountPage';

    /**
     * 商户清分详情页数据
     * @param params
     * @returns {Observable<any>}
     */
    getDetail(params: any): Observable<any> {
        return this.http.post("/pctsManager/seachMchAccountById", params);
    }
}
