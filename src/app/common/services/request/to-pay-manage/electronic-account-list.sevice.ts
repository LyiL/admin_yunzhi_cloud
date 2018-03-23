import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";
import {Observable} from "rxjs/Observable";
import {CommonEnum} from "../../../enum/common.enum";

/**
 * 电子账户服务请求地址
 */
@Injectable()
export class ElectronicAccountListSevice {
    constructor(private http: HttpService) {
    }


    /**
     * 所属商户地址
     * @type {string}  /cashAccount/searchCashRecord
     */
    public  static QUERY_DEALERINFO_URL='/query/dealerInfo';


    /**
     * 电子账户列表地址
     * String  accountName  账户名称
     String  organNo      所属商户编号
     int     useState     启用状态
     * @type {string}
     */
    public  static CASHACCOUNT_SEARCH_URL='/cashAccount/search';

    /**
     * 记账明细列表地址
     *  String  accountNo   电子账户ID  *
     Date    startDate   交易开始时间  *
     Date    endDate     交易结束时间  *
     String  mchNo       商户编号
     int     incash      记账类型
     * @type {string}
     */
    public  static CASHACCOUNT_SEARCHCASHRECORD_URL="/cashAccount/searchCashRecord";



    /**
     * 修改状态
     *  String  accountNo      电子账户ID  *
        int     useState    启用状态  *
     */
    loadState(params): Observable<any> {
        return this.http.post('/cashAccount/changeState', params);
    }

    /**
     * 查询余额
     *  String  accountNo  电子账户ID  *
     */
    loadSearchMoney(params): Observable<any> {
        return this.http.post('/cashAccount/searchBalance', params);
    }


    /**
     * 提现
         * String  accountNo           电子账户ID  *
         String  accountId           账户信息  *
         String  organNo             商户编号  *
         BigDecimal  extractPrice    提现金额  *
         当资金池为“汇聚”时，以下字段为必填
         String bankCity             收款银行所在城市
         String productType          产品类型
     */
    loadTakeCash(params): Observable<any> {
        return this.http.post('/cashAccount/extractOperation', params);
    }


    /**
     * 分配
     *  String  accountNo           电子账户ID  *
         String  externalAccount     帐号  *
         String  externalPassword    密码  *
     */
    loadDistribution(params): Observable<any> {
        return this.http.post('/cashAccount/updataAccount', params);
    }


    /**
     * 新增
         * String      accountName     电子账户名称  *
         String      organNo         所属商户编号  *
         String      organName       所属商户名称  *
         int         accountId       账户信息
         String      cashpoolNo      所属资金池编号  *
         String      cashpoolName    归属资金池的账户名  *
         BigDecimal  singleProcsFee  对公手续费  *
         BigDecimal  privProcsFee    对私手续费  *
         String      outMchno        外部商户号  *
         String      signkey         签名密钥
         BigDecimal advanceProcsFee  垫资手续费  *
     */
    loadAdd(params): Observable<any> {
        return this.http.post('/cashAccount/add', params);
    }


    /**
     * 编辑
         *  String      accountNo       电子账户ID  *
         String      accountName     电子账户名称  *
         String      organNo         所属商户编号  *
         String      organName       所属商户名称  *
         int         accountId       账户信息
         String      cashpoolNo      所属资金池编号  *
         String      cashpoolName    归属资金池的账户名  *
         BigDecimal  singleProcsFee  对公手续费  *
         BigDecimal  privProcsFee    对私手续费  *
         BigDecimal advanceProcsFee  垫资手续费  *
     */
    loadEdit(params): Observable<any> {
        return this.http.post('/cashAccount/updata', params);
    }



    /**
     * 电子账户(单条查询) 编辑，详情
     *  String  accountNo  电子账户ID  *
     */
    loadAccountInfo(data): Observable<any> {
        return this.http.post('/cashAccount/detail', data);
    }



    /**
     * 获取资金池账户
     * @returns {Observable<any>}
     * String  accountName 账户名称
     * String  bankNo      受理机构编号
     * int  useState    启用状态
     */
    loadCashPoolAccount(params:any): Observable<any> {
        return this.http.post('/cashPool/search',params).map(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            return [];
        });
    }

    /**
     * 获取银行账户
     * @param params
     * acntId,name
     */
    loadCashPoolBank(params:any): Observable<any> {
        return this.http.post('/bankAccount/getAccount',params).map(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            return [];
        });
    }
}
