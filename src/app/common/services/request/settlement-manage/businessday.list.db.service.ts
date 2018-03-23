import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from "../../../net/http.service";
/**
 * 商户日结请求数据源
 */
@Injectable()
export class BusinessListLoadService{
  constructor(private http: HttpService) {
  }
    /**
     * 商户日结列表地址
     * @type {string}
     */
    public  static  BUSINESS_DAY_LIST_URL = "/paymentCheckTradeBigmch/searchForPage";

  /**
   * 商户日结统计
   *  String  searchType  查询类型
   Date  beginTime  开始时间
   Date  endTime  结束时间
   String  merchantName  商户名称
   String  ally  结算账户
   int  centerId  支付中心
   String  transId  支付类型
   String  cashState  付款状态
   String  cashCycle  结算周期
   *
   */
  loadBusinessCount(params:any):Observable<any>{
    return this.http.post('/paymentCheckTradeBigmch/count',params);
  }

  /**
   * 导出报表
   * String  searchType  查询类型
   Date  beginTime  开始时间
   Date  endTime  结束时间
   String  merchantName  商户名称
   String  ally  结算账户
   int  centerId  支付中心
   String  transId  支付类型
   String  cashState  付款状态
   String  cashCycle  结算周期
   *
   *
   */
  loadExport(params:any):Observable<any>{
    return this.http.download('/paymentCheckTradeBigmch/export',params);
  }

  /**
   * 结算打款
   *  String settleTitle  打款标题    *
   String  ally    结算账户    *
   String remark   总体备注
   Date beginTime  开始时间    *
   Date endTime    结束时间    *
   */
  loadSettle(params:any):Observable<any>{
    return this.http.post('/settle/mch',params);
  }



}
