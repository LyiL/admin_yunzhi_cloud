import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';

/**
 * 进件列表请求服务
 */

@Injectable()
export class IntoPiecesService{
    constructor(private http:HttpService){}

    public static INTOPIECES_LIST_URL = '/apply/search/page'; // 进件列表数据接口

    /**
     * 新增进件
     * @param params {
     *   merchantId: number 商户id号
     *   merchantCode: string 商户编号
     *   transId: string 支付类型
     *   ptCenterId: number 支付接口主键
     *   providerNo: stirng 渠道商编号（上游分配的服务商编号）
     * }
     * @returns {Observable<any>}
     */
    add(params:any){
        return this.http.post('/apply/add',params);
    }

    /**
     * 编辑进件
     * @param params {
     *   id: number 商户支付类型id号
     *   ptCenterId: number 支付接口主键
     *   providerNo: string 渠道商编号（上游分配的服务商编号）
     * }
     * @returns {Observable<any>}
     */
    update(params: any): Observable<any> {
        return this.http.post('/apply/update', params);
    }


    /**
     * 进件
     * @param params {
     *   id: number 支付类型id号
     *   mechantId: number 商户id号
     * }
     * @returns {Observable<any>}
     */
    apply(params: any): Observable<any> {
        return this.http.post('/apply/mchApply', params);
    }

    /**
     * 查询单个进件
     * @param params {
     *   id: number 支付类型id号
     * }
     * @returns {Observable<any>}
     */
    query(params: any): Observable<any> {
        return this.http.post('/apply/findById', params);
    }

    /**
     * 批量进件
     * @param params {
     * name: string 商户名
     * merchantNo: string 商户号
     * superior: string 所属上级 *
     * applyState: number 进件状态 *
     * }
     * @returns {Observable<any>}
     * @constructor
     */
    BatchInto(params:any):  Observable<any>{
        return this.http.post('/cloud/batchMchApply', params);
    }
}
