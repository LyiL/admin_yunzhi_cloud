/**
 * 资金池管理服务请求地址
 */
import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CashManageListService{
    constructor(private http: HttpService) {
    }

    /**
     * 受理机构地址
     * @type {string}
     */
    public  static QUERY_BANKORG_URL='/query/bankOrg';

    /**
     * 资金池列表页查询
     * @type {string}
     *  String  accountName 账户名称
     *   String  bankNo      受理机构编号
     *  int     useState    启用状态
     */
    public  static CASHPOOL_PAGEER_URL='/cashPool/pager';


    /**
     * 入账明细
     *   String  poolNo     资金池编号  *
         Date    startDate  交易开始时间  *
         Date    endDate    交易结束时间  *
     */
    public  static   CASHPOOL_SERCHCASHPOOLCHANGE_URL='/cashPool/searchCashPoolChange'


    /**
     * 修改状态
     * String  poolNo      资金池编号
     *int     useState    启用状态
     */
    loadUseState(params): Observable<any> {
        return this.http.post('/cashPool/updataUseState', params);
    }

    /**
     * 新增资金池
     *  String      accountName     账户名称 *
     String      bankNo          受理机构编号 *
     String      bankName        受理机构名称 *
     BigDecimal  singleProcsFee  代付手续费 *
     String      apiCode         接口编号 *
     Integer     poolType        资金池类型 *
     BigDecimal  advanceProcsFee  垫资手续费  *
     */
    loadAdd(params): Observable<any> {
        return this.http.post('/cashPool/add', params);
    }

    /**
     * 编辑资金池
     *  String      poolNo          资金池编号  *
     String      accountName     账户名称  *
     String      bankNo          受理机构编号  *
     String      bankName        受理机构名称  *
     BigDecimal  singleProcsFee  代付手续费  *
     String      apiCode         接口编号  *
     Integer     poolType        资金池类型 *
     BigDecimal  advanceProcsFee  垫资手续费 *
     */
    loadEdit(params): Observable<any> {
        return this.http.post('/cashPool/updata', params);
    }

    /**
     * 资金池(单条查询获取数据) 详情
     *  String  poolNo  资金池编号  *
     */
    loadCashPoolInfo(data): Observable<any> {
        return this.http.post('/cashPool/detail', data);
    }

    // loadCashPoolInfo(data): Observable<any> {
    //     return this.http.post('/cashPool/detail', data);
    // }
}
