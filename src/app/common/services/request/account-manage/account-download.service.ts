import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 对账下载请求服务
 */

@Injectable()
export class AccountDownloadService{
    constructor(private http:HttpService){}

    // 列表数据查询
    public static ACCOUNT_DOWNLOAD_LIST_URL = '/paymentBillRecord/searchPage';

    /**
     * 账单下载
     * @param params
     * @returns {Observable<any>}
     */
    loadDownload(params): Observable<any> {
        return this.http.post('/cashreqBillRecord/download', params);
    }
}
