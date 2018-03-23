import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";
import {ObjectExtend} from "ng-zorro-antd";

/**
 * 代理商请求服务类
 */
@Injectable()
export class AgencyService{
    constructor(private http:HttpService,private objectExtend:ObjectExtend){}
    /**
     *代理商列表数据地址
     * String name             代理商名称
     String chanCode         代理商编号
     String bankCode         代理商所属机构
     Int    examState        代理商审核状态
     String parentChanCode   上级代理商编号
     String appCode 代理类型（获取数据字典：PROXY_TYPE）
     */
    public static AGENCY_LIST_URL = '/agentInfo/searchPage';
    /**
     *下级代理数据地址
     * String chanCode 代理商编号  *
     */
    public static SUBAGENCY_INFO_URL = '/agentInfo/childAgent';
    /**
     *下属商户数据地址
     * String   chanCode 代理商编号 *
     Integer  chanType 渠道类型（0为代理商，1为服务商） *
     */
    public static SUBMCH_INFO_URL = '/agentInfo/childMch';


    /**
     * 详情页查询账户信息
     * String chanCode 代理商编号  *
     */
    public static AGENCY_ACCOUNT_LIST_URL = '/agentInfo/getAgentAct';



    /**
     * 详情页查询分润配置信息
     * String chanNo	代理商编号
     */
    // public static AGENCY_CHANNEL_LIST_URL = '/agentInfo/getAgentRate';
    public static AGENCY_CHANNEL_LIST_URL = '/common/org/rateinfo/search'

    /**
     * 获取代理商详情基础信息
     *  * @param params {
     *  id:number 代理商信息主键ID
     *  chanCode: string 代理商编号
     * }
     * @return {Observable<any>}
     */
    loadInfo(param:any):any{
        return this.http.post('/agentInfo/getAgentDetail',param);
    }
    /**
     * 查询审核日志
     * @param params
     * Integer  orgId  组织机构ID  *
     * @returns {Observable<any>}
     */
    loadExamLog(params:any){
        return this.http.post('/agentInfo/getExamLogList',params);
    }
    /**
     * 审核代理商
     *  id: number        主键ID
     *  chanCode :string  代理商编号
     *  examState: number   审核状态
     *  examIllu: string    审核状态修改说明
     */
    examineAgency(params:any){
        return this.http.post('/agentManager/auditAgent',params);
    }

    /**
     * 发送邮件与短信
     * String chanCode代理商编号   *
     */
    sendEmailAndSTM(params:any){
        return this.http.post('/agentManager/sendMsgAndEmail',params);
    }

    /**
     * 查询单条账户信息
     * Integer acntId 主键id *
     */
    loadAgencyAccount(param:any):any{
        return this.http.post('/query/getBankAct',param);
    }

    /**
     * 查询单条分润配置信息
     */
    loadAgencyChannel(param:any):any{
        return this.http.post('/common/org/rateinfo/searchOne',param);
        // return this.http.post('/agentinfo/getchanratedetail',param);
    }

    /**
     * 批量保存代理商账户信息
     * @param params [{
     *  name             账户名(开户名称)        *
     *  type             账户类型 0个人  1企业
     *  bankCode         银行代号                *
     *  bankName         银行名称(开户行)        *
     *  subbanrchCode    支行编码(联行号)        *
     *  subbranchName    开户支行名称            *
     *  bankCardno       银行卡号
     *  province         省份
     *  provinceName     省份名称
     *  city             城市
     *  cityName         城市名称
     *  transId          支付类型，接口代码      *
     * },...]
     * @returns {Observable<any>}
     */
    saveAccountInfos(params:any){
        return this.http.post('/agentInfo/agentAccountManager',params);
    }

    /**
     * 保存代理商分润配置信息------------单条
     String  transId 支付类型编码 *
     String  transType       支付类型*
     String  bankNo  所属银行编码*
     String  categoryType    行业类别*
     Int fixFloatRate    费率类型*
     BigDecimal chanRate 渠道费率*
     Integer settleCycle 结算周期*
     int state       状态*
     Integer orgId   代理商机构id *
     String  chanNo  渠道编号*
     Integer chanShareRule   分润规则*
     Integer limitDay        单日限额
     Integer limitSingleMin  单笔限额-最小
     Integer limitSingleMax  单笔限额-最大
     String  descript        状态说明
     */
    saveChannelInfos(params:any){
        // return this.http.post('/bankAgentInfo/addAgentRate',params);
        let url = '/cloud/org/rateinfo/add';//新增
        if(params && params['id']){
            url = '/cloud/org/rateinfo/update';//修改
        }
        params = this.filterPrivateParam(params);
        return this.http.post(url,params);
    }
    /**
     * 保存代理商分润配置信息---------》批量保存
     List<Form>  form参数字段如下：
     String  transId 支付类型编码 *
     String  transType       支付类型*
     String  bankNo  所属银行编码*
     String  categoryType    行业类别*
     Int fixFloatRate    费率类型*
     BigDecimal chanRate 渠道费率*
     Integer settleCycle 结算周期*
     int state       状态*
     Integer orgId   代理商机构id *
     String  chanNo  渠道编号*
     Integer chanShareRule   分润规则*
     nteger  limitDay        单日限额
     Integer limitSingleMin  单笔限额-最小
     Integer limitSingleMax  单笔限额-最大
     String  descript        状态说明
     */
    saveBatchChannelInfos(params:any){
        // return this.http.post('/bankAgentInfo/addBatchAgentRate',params);
        return this.http.post('/common/org/rateinfo/addbatchforagent',params);
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
     * 删除渠道信息
     * @param params {
     * Integer id: number      主键编号*
     * }
     * @return {Observable<any>}
     */
    deleteChannelInfos(params:any){
        return this.http.post('/agentManager/deleteAgentRate',params);
    }


    /**
     * 保存代理商基本信息
     * @param params ：AgencyBaseInfoModel
     * @returns {Observable<any>}
     */
    saveAgencyBaseInfo(params:any){
        let url = '/agentInfo/addAgentDetail';
        if(params && params['id']){
            url = '/agentManager/updateAgentDetail';
        }
        params = this.filterPrivateParam(params);
        return this.http.post(url,params);
    }
    private filterPrivateParam(data:any){
        if(!data){
            return data;
        }
        if(data instanceof Array){
            data.forEach((_data,ind)=>{
                if(this.objectExtend.size(_data) > 0) {
                    data[ind] = this.filterPrivateParam(_data);
                }
            });
            return data;
        }else{
            let newData:any = {};
            for(let key in data){
                if(key.indexOf('_') == -1){
                    newData[key] = data[key];
                }
            }
            return newData;
        }
    }
}
