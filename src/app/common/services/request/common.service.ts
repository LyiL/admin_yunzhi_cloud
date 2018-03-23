import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../net/http.service";
import {CommonEnum} from "../../enum/common.enum";

@Injectable()
export class CommonService{
    constructor(private http:HttpService){}
    /**
     *所属机构
     *String  name：受理机构名称
     *String  orgNo：受理机构编号
     */
    public  static BANKINFO_URL = '/query/bankOrg';
    /**
     *所属上级（服务商、代理商）
     *String  name：上级名称
     *String  chanCode：上级编号
     * Integer  examState：审核状态，默认已审核
     * Integer  activeState：激活状态，默认已激活
     * String  bankCode：所属受理机构编号
     * String  chanType：类型(0:代理商 1:服务商)
     */
    public static PARENTCHAN_INFO_URL = '/query/chanInfo';
    /**
     *商户/门店
     * String merchantNo 商户/门店编号
     * String name 商户/门店名称
     * String  chanNo：所属代理商编号
     * Integer  examState：审核状态
     * Integer  activeState：激活状态
     * String  bankNo：所属受理机构编号
     * Integer mchRole:商户类型(0:线上商户 1：线下商户 2：门店)
     * Integer isStore:是否门店(0：查询线上、线下商户 1：查询门店)
     * String appCode：代理商类型(bank_cloud:分支机构  pay_chan:代理商)
     */
    public static MCH_INFO_URL = '/query/dealerInfo';
    /**
     *支付中心
     * String  id：支付中心id
     * String  name：支付中心名称
     * String  settleParty：结算方
     * String  bankNo：所属受理机构
     * String  transId：支付类型编码
     * String  parentChanCode 上级机构
     */
    public static PAYCENTER_INFO_URL = '/query/getCenter';
    /**
     *结算账户
     * String  bankNo：所属代理商编号
     * String companion：结算账户
     * String  name：结算账户名称/父商户号（第三方商户号）
     */
    public static COMPANIONFORBANK_INFO_URL = '/query/getCompanionForBank';
    /**
     *业务员
     * String  realName：业务员名称
     * String salesmanId：业务员编号
     * String  bankNo: 机构编号
     * String channelId: 代理商编号/分支机构编号
     */
    public static SALESMAN_INFO_URL = '/query/getSalesman';
    /**
     *联行号
     * String  subBankName：支行名称
     * String linkNo:支行编号
     */
    public static BANKLINKNO_INFO_URL = '/query/searchBankLinkno';

    /**
     * 获取支付类型
     * @param params{
     *    bankNo：string 所属受理机构
     *    transId：string 支付类型编码
     *    transType：string 支付类型名称
     * }
     * @returns {Observable<any>}
     */
    loadTransApi(params:any):Observable<any>{
        return this.http.post('/query/getTransApi',params).map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            // return Observable.of(null);
            return [];
        });
    }

    /**
     * 渠道配置获取支付类型
     * @param params{
     * String	bankNo	所属机构编号
     * String	parentChanNo	所属上级编号
     * String	categoryType	行业类别*
     * String	transId	支付接口编码
     * }
     *
     * @returns {Observable<any>}
     */
    loadTradeType(params:any):Observable<any>{
        return this.http.post('/cloud/query/gettranstype',params).map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            // return Observable.of(null);
            return [];
        });
    }


    /**
     * 获取支付中心
     * @param params{
     *    name：string 支付中心名称
     *    settleParty：string 结算方
     *    bankNo：string 所属受理机构
     *    transId：string 支付类型编码
     *    categoryType 行业类别(1:实体 2:虚拟)
     * }
     * @returns {Observable<any>}
     */
    loadCenter(params:any){
        return this.http.post('/query/getCenter',params).map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY]['innerData'];
            }
            // return Observable.of(null);
            return [];
        });
    }
    /**
     * 加载行业类别
     * @param params {
     *  parent：number 父类(1：实体，2：虚拟)
     * }
     * @returns {Observable<any>}
     */
    loadIndustryData(params:any):Observable<any>{
        return this.http.post('/paymentMchType/findIndustry',params).map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            // return Observable.of(null);
            return [];
        });
    }

    /**
     * 获取省份列表
     * @returns {Observable<any>}
     */
    loadProvince():Observable<any>{
        return this.http.post('/query/getProvinceList').map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            // return Observable.of(null);
            return [];
        });
    }

    /**
     * 获取城市列表
     * @param proId：string 省份ID
     * @returns {Observable<any>}
     */
    loadCity(proId:string):Observable<any>{
        return this.http.post('/query/getCityList',{areaCode:proId}).map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            // return Observable.of(null);
            return [];
        });
    }

    /**
     * 获取区县列表
     * @param cityId：string 城市ID
     */
    loadCounty(cityId:string):Observable<any>{
        return this.http.post('/query/getCountyList',{areaCode:cityId}).map(res=>{
            if(res &&  res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                return res[CommonEnum.SERVER_DATA_KEY];
            }
            // return Observable.of(null);
            return [];
        });
    }

    /**
     * 登录请求方法
     * @param params 登录参数
     * @returns {Observable<any>}
     */
    public login(params:any):any{
        return this.http.post('/loginAuth/login',params);
    }

    /**
     * 退出请求方法
     * @returns {Observable<any>}
     */
    public quit():any{
        return this.http.post('/loginAuth/loginOut');
    }

    /**
     * 修改密码弹框
     * @param params 登录参数
     * String userPwd:旧密码  *
     * String newPassword: 新密码 *
     * String newpwd2: 确认新密码 *
     * @returns {Observable<any>}
     */
    public modifyPsw(params){
        return this.http.post('/loginAuth/changePwd',params);
    }

    /**
     * 加载菜单数据
     * @returns {Observable<any>}
     */
    public loadMenuData():any{
        return this.http.post('/loginAuth/getTree');
    }

    /**
     * 加载系统配置项
     * @returns {Observable<any>}
     */
    public loadSysCfg():any{
        return this.http.post('/sysConfig/finds');
    }

    /**
     * 加载领域信息
     * @param host 域名host
     * @returns {Observable<any>}
     */
    public loadDomainCfg(host:string){
        return this.http.post('/platDomainCfg/getContentByHost',{hosts:host});
    }

    public loadAuthCode(){
        let random = String(Math.random()).substring(2);
        return this.http.download('/captcha/getKaptchaImage'+'?'+random);
    }
}
