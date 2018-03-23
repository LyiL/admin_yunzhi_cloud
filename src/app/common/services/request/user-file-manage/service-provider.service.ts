import {Injectable} from "@angular/core";
import {HttpService} from "../../../net/http.service";
import {Observable} from "rxjs/Observable";
import {CommonEnum} from '../../../enum/common.enum';
import {HelperService} from '../../helper.service';
/**
 * 服务商数据源
 */
@Injectable()
export class ServiceProviderService{
    constructor(private http:HttpService,private helper:HelperService){}

    /**
     * 列表查询请求地址
     * @type {string}
     */
    public static SP_LIST_URL = '/servicepro/search/page';

    /**
     * 详情页查询账户信息
     * @type {string}
     */
    public static SP_ACCOUNT_LIST_URL = '/servicepro/getBankActList';

    /**
     * 详情页获取分润配置
     * @type {string}
     */
    public static SP_SHARE_LIST_URL = '/common/org/rateinfo/search';

    /**
     * 详情页获取总通道信息
     */
    public static SP_TOTAL_CHANNEL_LIST_URL = '/cloud/chanproapply/searchlist';

    /**
     * 详情页获取渠道信息
     * @type {string}
     */
    public static SP_CHANNEL_LIST_URL = '/cloud/procentermch/search';

    /**
     * 详情页获取轮循配置
     */
    public static SP_POIL_URL = '/cloud/servicepro/getusepolling';

    /**
     * 详情页获取路由配置
     */
    public static SP_TRADE_RULE_URL = '/tradeRuleConf/findUnique';

    /**
     * 详情页获取公众号配置
     */
    public static SP_WEIXIN_URL = '/servicepro/queryWxConfig';

    /**
     * 详情页获取子商户模式配置
     */
    public static SP_SUB_MCH_TYPE_URL = 'servicepro/getChanProExamStyle';

    /**
     * 详情页获取交易限额配置
     */
    public static SP_TOTAL_FEE_LIMIT_URL = '/cloud/servicepro/searchTotalFeeLimit';

    /**
     *下属商户数据地址
     */
    public static SUBMCH_INFO_URL = '/agentInfo/childMch';

    /**
     * 获取服务商基础信息
     * @param param
     */
    loadInfo(param:any):any{
        return this.http.post('/servicepro/detailServiceProvider',param);
    }

    /**
     * 获取分润配置信息
     * @returns {Observable<any>}
     */
    loadShareInfo(params: any) {
        return this.http.post('/common/org/rateinfo/search', params);
    }

    /**
     * 新增/编辑 服务商基本信息
     * @param params
     * @returns {any}
     */
    addOrModifyBaseInfo(params: any):any {
        let url = '/servicepro/addServiceProvider';
        if(params && params['id']) {
            url = '/servicepro/updateServiceProvider';
        }
        return this.http.post(url, params);
    }


    /**
     * 查询账户信息(单条)
     * @param params
     * @returns {any}
     */
    loadAccount(params: any):any {
        return this.http.post('/query/getBankAct', params);
    }

    /**
     * 新增/编辑账户信息
     * @param params
     * @returns {any}
     */
    addAccount(params: any): any {
        return this.http.post('/servicepro/addBankActList', params);
    }


    /**
     * .获取分润配置单条数据
     * @param params
     * @returns {Observable<any>}
     */
    loadlShareOne(params: any) {
        return this.http.post('/common/org/rateinfo/searchOne', params);
    }

    /**
     * 新增/编辑 分润配置
     * @param params
     * @returns {any}
     */
    addOrEditShare(params: any): any {
        let url = '/cloud/org/rateinfo/add';
        if(params && params['id']) {
            url = '/cloud/org/rateinfo/update'
        }
        return this.http.post(url, params);
    }

    /**
     * 新增分润配置(多条)
     */
    addShareS(params: any) {
        return this.http.post('/common/org/rateinfo/addbatchforchanpro', params);
    }


    /**
     * 变更服务商渠道信息启用状态
     * @param params：{
     * id: Integer 主键 *
     * used: Integer 启用状态 *
     * }
     * @returns {Observable<any>}
     */
    saveState(params: any): any {
        return this.http.post('/cloud/procentermch/updatestate', params);
    }

    /**
     * 获取渠道信息单条数据
     * @returns {Observable<any>}
     */
    loadChannelOne(params: any) {
        return this.http.post('/org/rateinfo/detail', params);
    }

    /**
     * 新增/编辑 渠道信息
     * @returns {Observable<any>}
     */
    addAndEditChannel(params: any) {
        let url = '/cloud/procentermch/addcentermch';
        if(params && params['id']) {
            url = '/cloud/procentermch/updatecentermch';
        }
        return this.http.post(url, params);
    }

    /**
     * 新增渠道信息(多条)
     */
    addChannelbatch(params: any) {
        return this.http.post('/cloud/procentermch/addcentermchbatch', params);
    }


    /**
     * 修改启用状态
     * Integer	id	主键id*
     * int	state		启用状态
     * @param params
     * @return {Observable<any>}
     */
    updataStateInfo(params:any){
        return this.http.post('/cloud/org/rateinfo/changestate',params);
    }


    /**
     * 发送邮件与短信
     * @param params
     */
    sendEmailAndSTM(params:any){
        return this.http.post('/servicepro/sendMsgAndEmail',params);
    }


    /**
     * 查询服务商审核日志
     * @param params
     * @returns {Observable<any>}
     */
    loadExamLog(params:any){
        return this.http.post('/servicepro/getExamLogList',params);
    }


    /**
     * 审核服务商
     * @param params {
     *  id: number        主键ID
     *  chanCode :string  代理商编号
     *  examState: number   审核状态
     *  examIllu: string    审核状态修改说明
     * }
     * @returns {Observable<any>}
     */
    examineService(params:any){
        return this.http.post('/servicepro/examine',params);
    }

    /**
     * 添加服务商总通道信息配置(多条)
     * @param params [{
     *  proNo: string 服务商编号 *
     *  bankNo: string 所属银行编号 *
     *  bankName: string 所属银行名称 *
     * },...]
     * @returns {Observable<any>}
     */
    saveTotalChannels(params: any): Observable<any> {
        return this.http.post('/cloud/chanproapply/addlinkbatch', params);
    }

    /**
     * 新增或修改服务商总通道信息（单条）
     * @param params [{
     *  proNo: string 服务商编号 *
     *  bankNo: string 所属银行编号 *
     *  bankName: string 所属银行名称 *
     * },...]
     * @returns {Observable<any>}
     */
    editTotalChannel(params: any): Observable<any> {
        return this.http.post('/cloud/chanproapply/editlink', params);
    }

    /**
     * 同步服务商总通道信息
     * @param params [{
     *  proNo: string 服务商编号 *
     *  bankNo: string 所属银行编号 *
     * },...]
     * @returns {Observable<any>}
     */
    syncTotalChannel(params: any): Observable<any> {
        return this.http.post('/cloud/chanproapply/proapplybank', params);
    }


    /**
     * 添加服务商微信公众号配置
     * @param params ：{
     *  chanCode: string 服务商编号
     *  subAppid: string 公众号对应的appid
     *  jsapiPath: string 商户公众号api支付授权目录
     *  subscribeAppid: string 微信分配的服务商公众号APPID
     * }
     * @returns {Observable<any>}
     */
    addSPWxConfig(params: any): Observable<any> {
        return this.http.post('/servicepro/addWxConfig', params);
    }

    /**
     * 查询服务商微信公众号配置
     * @param params ：{
     *  chanCode: string 服务商编号
     * }
     * @returns {Observable<any>}
     */
    querySPWxConfig(params: any): Observable<any> {
        return this.http.post('/servicepro/queryWxConfig', params);
    }

    /**
     * 修改服务商微信公众号配置信息
     * @param params ：{
     *  id: Integer 服务商公众号信息id
     *  chanCode: string 服务商编号
     *  subAppid: string 公众号对应的appid
     *  jsapiPath: string 商户公众号api支付授权目录
     *  subscribeAppid: string 微信分配的服务商公众号APPID
     * }
     * @returns {Observable<any>}
     */
    updateSPWxConfig(params: any): Observable<any> {
        return this.http.post('/servicepro/updateWxConfig', params);
    }

    /**
     * 查询服务商子商户模式配置
     * @param params ：{
     * chanCode: string 服务商编号 *
     * }
     * @returns {Observable<any>}
     */
    loadSubMchType(params: any): Observable<any> {
        return this.http.post('servicepro/getChanProExamStyle', params);
    }

    /**
     * 新增或修改服务商子商户模式配置信息
     * @param params ：{
     * chanCode: string 服务商编号 *
     * examStyle: string 审核状态 *
     * }
     * @returns {Observable<any>}
     */
    editSubMchType(params: any): Observable<any> {
        return this.http.post('servicepro/editChanProExamStyle', params);
    }

    /**
     * 获取服务商交易路由
     * @param params ：{
     * parentNo: string 服务商编号 *
     * }
     * @returns {Observable<any>}
     */
    loadTradeRule(params: any): Observable<any> {
        return this.http.post('/tradeRuleConf/findUnique', params);
    }

    /**
     * 变更启用服务商交易路由启用状态
     * @param params ：{
     * parentNo: string 服务商编号 *
     * ruleState: integer   启用状态：0=否 1:=是 *
     * tradeId: string 支付类型编号（启用切换成禁用状态必传）
     * tradeType: string 支付类型名称 （启用切换成禁用状态必传）
     * }
     * @returns {Observable<any>}
     */
    saveTradeRule(params: any): Observable<any> {
        return this.http.post('/tradeRuleConf/save', params);
    }

    /**
     * 变更服务商轮询配置
     * @param params ：{
     * chanCode: string 服务商编号 *
     * }
     * @returns {Observable<any>}
     */
    loadpoil(params: any): Observable<any> {
        return this.http.post('/cloud/servicepro/getusepolling', params);
    }

    /**
     * 变更服务商轮询配置
     * @param params ：{
     * chanCode: string 服务商编号 *
     * usePolling: integer   启用状态：0=否 1:=是 *
     * }
     * @returns {Observable<any>}
     */
    updatepoil(params: any): Observable<any> {
        return this.http.post('/cloud/servicepro/updateusepolling', params);
    }

    /**
     * 获取服务商交易限额
     * @param params: {
     * chanCode: string 服务商编号 *
     * }
     * @returns {Observable<any>}
     */
    loadTradeLimit(params: any): Observable<any> {
        return this.http.post('/cloud/servicepro/searchTotalFeeLimit', params);
    }

    /**
     * 保存服务商交易限额
     * @param params: {
     * chanCode: string 服务商编号 *
     * totalFeeLimit:
     * }
     * @returns {Observable<any>}
     */
    saveTradeLimit(params: any): Observable<any> {
        return this.http.post('/cloud/servicepro/updateTotalFeeLimit', params);
    }
}
