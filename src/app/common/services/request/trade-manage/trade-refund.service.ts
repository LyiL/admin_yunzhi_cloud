import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from '../../../net/http.service';

/**
 * 退款审核数据源
 */
@Injectable()
export class TradeRefundService{
    constructor(private http:HttpService){}

    /**
     * 退款审核查询地址
     */
    public static REFUND_LIST_URL = '/refund/query';

    /**
     * 退款信息汇总
     * @param params {
     * }
     * @returns {Observable<any>}
     */
    loadCount(params: any): Observable<any> {
        return this.http.post('/refund/queryCount', params);
    }

    /**
     * 退款单号查询
     * @param params {
     *   refundNo: string 退款单号
     * }
     * @returns {Observable<any>}
     */
    queryNo(params: any): Observable<any> {
        return this.http.post('/refund/findById', params);
    }

    /**
     * 重新发起退款
     * @param params {
     * refundNo: string 退款单号
     * refundUser: string 退款操作人
     * mchRefuseReason: string 商户退款理由
     * }
     * @returns {Observable<any>}
     */
    renew(params: any): Observable<any> {
        return this.http.post('/refund/refundNotsure', params);
    }

    /**
     * 审核通过退款申请
     * @param params {
     * refundNo: string 退款单号
     * refuseReason: string 退款理由
     * }
     * @returns {Observable<any>}
     */
    pass(params: any): Observable<any> {
        return this.http.post('/refund/refundPass', params);
    }

    /**
     * 退回退款申请
     * @param params {
     * refundNo: string 退款单号
     * refuseReason: string 退款理由
     * }
     * @returns {Observable<any>}
     */
    back(params: any): Observable<any> {
        return this.http.post('/refund/refundBack', params);
    }

    /**
     * 发起订单退款申请
     * @param params {
     * orderNo: string 订单单号
     * merchantNo: string 商户银行编号
     * refundFee: number 退款总额
     * mchRefuseReason: string 商户退款理由
     * }
     * @returns {Observable<any>}
     */
    submit(params: any): Observable<any> {
        return this.http.post('/refund/reqRefund', params);
    }

    /**
     * 订单可退金额查询
     * @param params {
     * orderNo: string 订单单号
     * }
     * @returns {Observable<any>}
     */
    changeNo(params: any): Observable<any> {
        return this.http.post('/refund/queryRefundFee', params);
    }
}
