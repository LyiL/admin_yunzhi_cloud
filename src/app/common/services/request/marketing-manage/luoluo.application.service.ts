import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 络络应用请求服务
 */

@Injectable()
export class LuoApplicationService{
    constructor(private http:HttpService){}

    // 查询列表数据
    public static LUO_APPLICATION_LIST_URL = '/otoAppRelease/search/page';

    /**
     * 删除络络应用
     * @param params
     * @returns {Observable<any>}
     */
    deleteApp (params: any): Observable<any> {
        return this.http.post('/otoAppRelease/delete', params);
    }

    /**
     * 新增/编辑
     */
    addOrUpdateApp(params: any): Observable<any> {
        let url = '/otoAppRelease/add';
        if(params && params['id']) {
            url = '/otoAppRelease/update';
        }
        return this.http.post(url, params);
    }

    /**
     * 获取络络应用详情数据
     * @param params
     * @returns {Observable<any>}
     */
    getAppDetail(params: any): Observable<any> {
        return this.http.post('/otoAppRelease/detail', params);
    }

}
