import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";
/**
 * 商户管理请求数据源
 */
@Injectable()
export class mchService{

    constructor(private http:HttpService ){}
    /**
     *商户列表数据地址
     */
    public static MCH_LIST_URL = '/mchManager/searchMchPager';
    /**
     *商户账户信息数据地址
     */
    public static MCH_ACCOUNT_LIST_URL = '/mchManager/search/bankAccount';
    /**
     *商户渠道信息数据地址
     */
    public static MCH_CHANNEL_LIST_URL = '/mchManager/search/payTypeList';
    /**
     *详情页查询产品信息
     */
    public static MCH_PRODUCT_LIST_URL = '/mchManager/searchProductList';
    /**
     * 详情页产品明细信息
     * Integer id 产品编号*
     Integer state 开通状态 *
     * @type {string}
     */
    public static MCH_PRODUCT_DETAIL_LIST_URL = '/mchManager/getTradeTypes';



    /**
     * 获取商户详情基础信息
     * @param param
     */
    loadInfo(param:any):any{
        return this.http.post('/mchManager/search/mchInfo',param);
    }

    /**
     * 单条账户信息
     * @param params {
   *   orgId: number 机构编号
   * }I
     * @returns {Observable<any>}
     */
    loadAccountDataById(params:any):Observable<any>{
        return this.http.post('/query/getBankAct',params);
    }

    /**
     * 单条渠道信息
     * @param params
     * merchantId:number 商户编号
     * @returns {Observable<any>}
     */
    loadChannelById(params:any):Observable<any>{
        return this.http.post('/mchManager/getCenterMchById',params);
    }


    /**
     * 查询审核日志
     * @param params
     * @returns {Observable<any>}
     */
    loadExamLog(params:any){
        return this.http.post('/mchManager/search/examineLog',params);
    }
    /**
     * 批量保存商户帐户信息
     * @param params [{以下参数均为必填
   *  BankActForm:array   数组
   *  acntId: number         账户信息ID
   *  orgId: number           机构ID        *
   *  name: string            开户名称    *
   *  type: string            账户类型    *
   *  bankCardno: string      银行帐号    *
   *  bankCode: string        开户行编号   *
   *  bankName: string        开户行名称   *
   *  subbranchName: string   开户支行    *
   *  subbanrchCode: string   联行号     *
   *  cardType: string       卡类型     *
   *  transId: string         支付类型（不可修改）*
   *
   * },...]
     * @returns {Observable<any>}
     */
    saveAccountInfos(params:any){
        return this.http.post('/mchManager/saveBankAccountBatch',params);
    }

    /**
     * 保存商户渠道信息
     * @param params [{
   *  chanNo : string 服务商编号
   *  merchantId : number 商户编号
   *  transId: string     支付类型编号      *
   *  transType: string   支付类型名称    *
   *  agencyCode: string    银行编号      *
   *  ptCenterId: number  通道类型编号    *
   *  providerNo: string  渠道编号
   * DefrCenterMchForm：array
   *
   * },...]
     * @returns {Observable<any>}
     */
    //批量新增
    saveChannelInfos(params:any):Observable<any>{
        return this.http.post('/mchManager/savePayTypeBatch',params);

    }
    //单个新增
    saveChannelSingle(params:any):any{
        return this.http.post('/mchManager/savePayType',params);
    }
    /**
     * 发送邮件与短信
     * @param params
     */
    sendEmailAndSTM(params:any){
        return this.http.post(' /mchManager/sendEmailAndSms',params);
    }

    /**
     * 审核商户
     * @param params {
   *  id: number        商户编号
   *  examState: number   审核状态
   *  examIllu: string    审核状态修改说明
   * }
     * @returns {Observable<any>}
     */
    examineSP(params:any){
        return this.http.post('/mchManager/examineMch',params);
    }






    /**
     * 加载商户基础信息
     * @param params {
   *  id:number 商户编号
   * }
     * @return {Observable<any>}
     */
    loadMchBaseInfoData(params:any):Observable<any>{
        return this.http.post('/mchManager/search/mchInfo',params);
    }



    /**
     * 保存商户基础信息
     * @param params ：MchBaseInfoModel
     * @returns {Observable<any>}
     */
    saveMchBaseInfo(params:any){
        let url = '/mchManager/saveMchInfo';


        // params = this.http.filterPrivateParam(params);
        return this.http.post(url,params);
    }
    /**
     * 查询这个商户的支付宝的等级
     *  String id 商户编号（主键）
     */
    aliPayMchLiveFind(params:any):Observable<any>{
        return this.http.post('/mchManager/getAlipayMchLive',params);
    }
    /**
     * 查询商户支付类型列表
     *      Int  merchantId     商户ID   *
     */
    centerMirJspFind(params:any):Observable<any>{
        return this.http.post(' /mchManager/search/centerMirJsp',params);
    }
    /**
     * 配置商户微信公众号
     *    String  mchId  商户ID         *
     String   jsapiPath   授权目录
     String   subAppid   关联APPID
     String   subscribeAppid   推荐关注APPID
     */
    accountConfig(params:any):Observable<any>{
        return this.http.post('/mchManager/accountConfig',params);
    }
    /**
     * 查询微信公众帐号配置
     * String  mchId  商户ID
     */
    accountConfigFind(params:any):Observable<any>{
        return this.http.post(' /mchManager/searchAccountConfig',params);
    }
    /**
     * 商户微信支付权限确认
     *  String id 商户编号（主键）
     */
    mchwxConfrim(params:any):Observable<any>{
        return this.http.post(' /mchManager/changeTradeAuth',params);
    }
    /**
     * 加载微信公众号配置详情查询
     * @param params
     * @returns {Observable<any>}
     */
    getWxConfig(params:any):Observable<any>{
        return this.http.post('/mchManager/searchAccountConfig', params);
    }





    /**
     * 批量认证商户
     *  String chanNo 所属上级 *
     int examState   用户状态 *
     String name 商户名称
     String merchantNo 商户编号
     String bankNo 所属机构
     String ally 商户识别码
     */
    batchAuthentication(params:any):Observable<any>{
        return this.http.post('/mchManager/batchApproveMchByCloud',params);
    }

    /**
     *  根据商家编号或主键查询交易路由配置
     * @param params{
   *    String parentNo;   //商户编号
   * }
     * @returns {Observable<any>}
     */

    tradeRuleConf(params:any):Observable<any>{
        return this.http.post('/tradeRuleConf/findUnique',params);
    }
    /**
     *  交易路由-保存
     * @param params{
   *   Integer id;   //主键
String parentNo;   //商户编号
Integer ruleState;   //启用状态：0=否 1:=是
String tradeId;   //支付类型编号
String tradeType;   //支付类型名称
Date updateTime;   //更新时间

   * }
     * @returns {Observable<any>}
     */
    tradeRuleSave(params:any):Observable<any> {
        return this.http.post('/tradeRuleConf/save', params);
    }
    /**
     *  交易限额查询
     * @param params{
   *
   * String  merchantNo   商户编号        *

   * }
     * @returns {Observable<any>}
     */
    queryMchLimit(params:any):Observable<any> {
        return this.http.post('/mchManager/queryMchLimit', params);
    }
    /**
     *  交易限额设置
     * @param params{
   *    String  merchantNo   商户编号        *
    Double totalFeeLimit 单日总限额(元) *

   * }
     * @returns {Observable<any>}
     */
    setMchLimit(params:any):Observable<any> {
        return this.http.post('/mchManager/setMchLimit', params);
    }
    /**
     * 查询机构rsa公钥
     * @param params
     * @returns {Observable<any>}
     */
    queryOrgRsakey(params:any):Observable<any> {
        return this.http.post("/cloud/queryrsaconfig", params);
    }

    /**
     * 添加机构rsa公钥
     * @param params
     * @returns {Observable<any>}
     */
    addOrgRsakey(params:any):Observable<any> {
        return this.http.post("/cloud/addrsaconfig", params);
    }


    /**
     * 进件
     *
     */
    loadOnInto(params:any):Observable<any>{
        return this.http.post('/mchManager/mchApply',params);
    }



}
