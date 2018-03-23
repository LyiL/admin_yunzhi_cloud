import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";

/**
 * 登录日志服务请求地址
 */
@Injectable()
export class LoginlogListSevice{
    constructor(private http: HttpService) {
    }

    /**
     * 登录日志列表数据地址
     * @type {string}
     */
    public  static LOGING_LIST_URL='/SystemLoginLog/findByPage';
}
