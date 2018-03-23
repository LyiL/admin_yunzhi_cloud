import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 退款设置请求服务类
 */
@Injectable()
export class RefundSetsService{
    constructor(private http:HttpService){}
    /**
     *退款设置列表数据地址
     * String name         商户名
     * String merchantNo   商户编号
     */
    public static REFUNDSETS_LIST_URL = '/mchRefundSetting/findUsableMch';
    /**
     *退款策略列表数据地址
     * String merchantNo 商户编号 *
     */
    public static REFUNDSTRATEGY_LIST_URL = '/mchRefundSetting/limitFindPage';
    /**
     *退款权限列表数据地址
     * String merchantNo 商户编号 *
     */
    public static REFUNDAUTH_LIST_URL = '/mchRefundSetting/authFindPage';

    /**
     * 新增或编辑退款策略
     * String      id              主键          编辑时必传
     以下字段均为必填
     String      merchantNo      商户编号
     String      transId         支付类型，对应service的交易接口
     String      transType       支付类型名称
     int     refundDayRange  支持退款天数范围,0表示当天退款
     int     dayRefundCount  当日退款笔数限制
     int     singleRefundFee 单笔退款金额限制
     int     dayRefundFee    当日退款金额限制
     int     useState        启用状态，0未启用，1启用
     */
    changeStrategyInfo(data): Observable<any> {
        return this.http.post('/mchRefundSetting/saveLimit', data);
    }
    /**
     * 退款策略信息(单条查询)
     * int  id  退款策略ID*
     */
    loadStrategyInfo(data): Observable<any> {
        return this.http.post('/mchRefundSetting/findLimitById', data);
    }

    /**
     * 修改退款权限的使用状态
     * String  authId      退款权限编号     *
     * Int     isEnabled   是否禁用         *
     */
    updateStatus(data): Observable<any> {
        return this.http.post('/mchRefundSetting/updateAuthStatus', data);
    }
    /**
     * 新增或编辑退款权限
     * String authId           退款权限主键   修改时必传
     以下字段均为必填
     String merchantNo      商户编号
     String transId         支付类型,对应service的交易接口
     String transType       支付类型名称
     String refundAuth      退款权限 使用’,’分割
     String examType        审核类型,大概值为：商户审核，平台审核
     */
    changeAuthInfo(data): Observable<any> {
        return this.http.post('/mchRefundSetting/saveAuth', data);
    }
    /**
     * 退款权限信息(单条查询)
     * int  authId   退款策略ID*
     */
    loadAuthInfo(data): Observable<any> {
        return this.http.post('/mchRefundSetting/findAuthById', data);
    }
}
