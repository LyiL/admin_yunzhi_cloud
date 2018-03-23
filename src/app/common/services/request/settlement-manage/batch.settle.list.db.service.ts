import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpService} from "../../../net/http.service";
import {CommonEnum} from '../../../enum/common.enum';

/**
 * 结算打款请求数据源
 */
@Injectable()
export class HitMoneyDbService  {
  constructor(private http: HttpService) {

  }

    /**
     * 批量打款列表地址
     * @type {string}
     */
  public  static  BATCH_SETTLE_LIST_URL = "/paymentCheckTradeCash/searchForPage";

}
@Injectable()
export class hitMoneyLoad{
  constructor(private http: HttpService) {
  }
  /**
   * 结算打款导出报表
   * Date  createTime  创建日期
   Long  settleNo  打款批次号
   String  actType  账户类型
   String  merchantName  商户名称
   String  actId 结算账户ID
   Integer  cardType  导出方式(0:行外,1:行内)
   Integer  syncStatus  同步状态（0: 未同步 1: 已提交２: 交易成功3: 交易失败 4: 交易超时 5:转入人工）
   Integer  syncMode  操作类型 ０:自动　１:人工
   *
   *
   */
  loadExport(params:any):Observable<any>{
    return this.http.download('/paymentCheckTradeCash/export',params);
  }

  /**
   * 结算打款统计
   *Date  createTime  创建日期
   Long  settleNo  打款批次号
   String  actType  账户类型
   String  merchantName  商户名称
   String  actId 结算账户ID
   Integer  cardType  导出方式(0:行外,1:行内)
   Integer  syncStatus  同步状态（0: 未同步 1: 已提交２: 交易成功3: 交易失败 4: 交易超时 5:转入人工）
   Integer  syncMode  操作类型 ０:自动　１:人工
   *
   */
  loadSettleCount(params:any):Observable<any>{
    return this.http.post('/paymentCheckTradeCash/count',params);
  }


  /**
   * 修改是否需要人工
   *
   *   Int  id 用户状态 *
   Int  syncMode 是否需要人工 0：自动 1:人工 *
   * @param params
   * @returns {Observable<any>}
   */
  changeStatus(params:any):Observable<any>{
    return this.http.post('/paymentCheckTradeCashBank/editIsHuman',params);
  }

  /**修改結算狀態
   * Int  id 用户状态 *
   Int  syncMode 是否需要人工 0：自动 1:人工 *
   String modifyCause 备注 *
   * @param params
   * @returns {Observable<any>}
   */


  changeSettleStatus(params:any):Observable<any>{
    return this.http.post('/paymentCheckTradeCashBank/editSyncStatus',params);
  }
  /**上传
   *
   * @param params
   * @returns {Observable<any>}
   */


  upload(params:any):Observable<any>{
    return this.http.post('/cashUpload/uploadSingle',params);
  }
  /**同步
   *
   * @param params
   * @returns {Observable<any>}
   */


  sync(params:any):Observable<any>{
    return this.http.post('/cashUpload/checkSingle',params);
  }
  /**批量打款
   *
   * @param params
   * @returns {Observable<any>}
   */


  BatchesOfMoney(params:any):Observable<any>{
    return this.http.post('/hr/batch/agentpay',params);
  }
  /**
   *发起打款
   * @param params
   * @returns {Observable<any>}
   */


  settleMoney(params:any):Observable<any>{
    return this.http.post('/hr/agentpay',params);
  }
  /**发起查单
   *
   * @param params
   * @returns {Observable<any>}
   */


  queryBill(params:any):Observable<any>{
    return this.http.post('/hr/batchagentpay/searchorder',params);
  }
    /**
     * 获取打款批次号
     * @param params
     * acntId,name
     */
    loadSettleBatch(params:any): Observable<any> {
        return this.http.post('/paymentCheckTradeCashBank/listsettlebatch',params).map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            return [];
        });
    }
}
