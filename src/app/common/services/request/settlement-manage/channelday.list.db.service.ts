import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from "../../../net/http.service";


/**
 * 机构日结请求数据源
 */


@Injectable()
export class ChannelDayLoad{
  constructor(private http: HttpService) {
  }
    /**
     * 机构日结列表地址
     * @type {string}
     */
    public  static  CHANNEL_DAY_LIST_URL = "/paymentCheckTradeChan/searchForPage";
    /**
     * 机构日结详细列表地址
     * @type {string}
     */
    public  static  CHANNEL_DAY_DETAIL_LIST_URL = "/paymentCheckTradeChan/searchForPage/detail";

  /**
   * 机构日结统计
   * Date  billTimeStart  清算开始时间
   Date  billTimeEnd  清算结束时间
   String  agencyName  机构名称
   String  transId  支付类型
   Integer  cashType  款项类型
   Integer  actId  结算账户ID
   *
   */
  loadChannelCount(params:any):Observable<any>{
    return this.http.post('/paymentCheckTradeChan/count',params);
  }

  /**
   * 机构日结导出报表
   *  Date  billTimeStart  清算开始时间
   Date  billTimeEnd  清算结束时间
   String  agencyName  机构名称
   String  transId  支付类型
   Integer  cashType  款项类型
   Integer  actId  结算账户ID
   *
   *
   */
  loadExport(params:any):Observable<any>{
    return this.http.download('/paymentCheckTradeChanBank/export',params);
  }

  /**
   * 日结详细导出报表
   *  Date  billTimeStart  清算开始时间
   Date  billTimeEnd  清算结束时间
   String  agencyName  机构名称
   String  transId  支付类型
   Integer  cashType  款项类型
   Integer  actId  结算账户ID
   String  merchantNo  商户编号
   */
  loadExportDetail(params:any):Observable<any>{
    return this.http.download('/paymentCheckTradeChanBank/export/detail',params);
  }
  /**
   * 机构日结详情统计
   *  Date  billTimeStart  清算开始时间
   Date  billTimeEnd  清算结束时间
   String  agencyName  机构名称
   String  transId  支付类型
   Integer  cashType  款项类型
   String  merchantNo  商户编号
   Integer  actId  结算账户ID
   */
  loadChannelCountDetail(params:any):Observable<any>{
    return this.http.post('/paymentCheckTradeChan/count/detail',params);
  }

  /**
   * 结算打款
   *String  settleTitle 打款标题*
   String  remark  总体备注
   */
  loadSettle(params:any):Observable<any>{
    return this.http.post('/settle/cha',params);
  }


}

