import {Component, ViewChild} from "@angular/core";
import {SPForm} from "../../../common/form/user-file-manage/sp.form";
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {BussinessCheckForm} from "app/common/form/account-manage/bussiness-check.form";
import {CommonService} from "../../../common/services/request/common.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {BussinessAccountCheckService} from "../../../common/services/request/account-manage/bussiness-account-check.service";

/**
 * 商户对账列表
 */

@Component({
    selector:'bussiness-account-check',
    templateUrl:'./bussiness-account-check-list.component.html',
    providers: [BussinessAccountCheckService]
})
export class BussinessAccountCheckComponent{

    public bussinessForm:BussinessCheckForm = new BussinessCheckForm();

    public line: string = '-'; // 日期之间的横线
    public UloCode: any;

    public reconState:Array<any> = []; // 对账状态
    public payTypes:Array<string>= []; // 支付类型

    @ViewChild('bussinessTable') public bussinessTable:SimpleTableComponent;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public commonDB: CommonService){
        this.reconState = this.helper.getDictByKey('PARTNER_PRCSTATUS'); // 获取对账状态
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');

        this.commonDB.loadTransApi({transId:""}).subscribe(res =>{  // 获取支付类型
            this.payTypes = res;
        });
    }


    /**
     * 结算账户配置
     */
    public allyCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('BussinessCheck.listPage.allyCfg.title'),
        url:CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'companion',
            label:this.i18n.fanyi('BussinessCheck.listPage.allyCfg.ally')
        },{
            field:'name',
            label:this.i18n.fanyi('BussinessCheck.listPage.allyCfg.allyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('BussinessCheck.listPage.allyCfg.ally'),
            index:'companion'
        },{
            title:this.i18n.fanyi('BussinessCheck.listPage.allyCfg.allyName'),
            index:'companionName'
        }]
    };


    /**
     * 商户名称配置
     */
    public merchantCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('BussinessCheck.listPage.merchantCfg.title'),
        url:CommonService.MCH_INFO_URL,
        params: {isStore: 0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('BussinessCheck.listPage.merchantCfg.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('BussinessCheck.listPage.merchantCfg.merchantName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('BussinessCheck.listPage.merchantCfg.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('BussinessCheck.listPage.merchantCfg.merchantName'),
            index:'name'
        }]
    };


    /**
     * 受理机构配置
     */
    public agencyCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.title'),
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyNo')
        },{
            field:'name',
            label:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('BussinessCheck.listPage.agencyCfg.agencyName'),
            index:'name'
        }]
    };


    /**
     * 支付中心配置
     */
    public centerCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('BussinessCheck.listPage.centerCfg.title'),
        url: CommonService.PAYCENTER_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'name',
            label:this.i18n.fanyi('BussinessCheck.listPage.centerCfg.centerName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('BussinessCheck.listPage.centerCfg.centerName'),
            index:'name'
        }]
    };


    /**
     * 下属门店配置
     */
    // public secondMchCfg:SearchWindowConfig = {
    //     title:this.i18n.fanyi('BussinessCheck.listPage.secondMchCfg.title'),
    //     url: CommonService.MCH_INFO_URL,
    //     isAjax:false,
    //     resReName:CommonEnum.TABLE_RES_RE_NAME,
    //     reqReName:CommonEnum.TABLE_REQ_RE_NAME,
    //     searchFields:[{
    //         field:'mchRole',
    //         label:this.i18n.fanyi('BussinessCheck.listPage.secondMchCfg.secondMchNo')
    //     },{
    //         field:'name',
    //         label:this.i18n.fanyi('BussinessCheck.listPage.secondMchCfg.secondMchName')
    //     }],
    //     tableColumns:[{
    //         title:this.i18n.fanyi('BussinessCheck.listPage.secondMchCfg.secondMchNo'),
    //         index:'mchRole'
    //     },{
    //         title:this.i18n.fanyi('BussinessCheck.listPage.secondMchCfg.secondMchName'),
    //         index:'name'
    //     }]
    // };


    /**
     * 商户清分表单配置
     * @type {{url: string; params: AccountErrorForm; total: number; isAjax: boolean;  resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url:BussinessAccountCheckService.ACC_BUSSINESS_LIST_URL,
        params:this.bussinessForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.reconDay'),        // 对账日期/结算账户
                render:'reconDayRender'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.merchantNo'),      // 商户名称
                index:'merchantNo'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.merchantName'),    // 商户名称
                render:'merchantNameRender'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.transName'),       // 支付类型
                render:'transNameRender'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.totalFee'),        // 交易金额（元） 退款金额（元）
                render:'totalFeeRender'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.totalQua'),        // 交易笔数（笔） 退款笔数（笔）
                render:'totalQuaRender'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.eqTotalFee'),      // 平账交易金额（元） 平账退款金额（元）
                render:'eqTotalFeeRender'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.poundage2'),       // 手续费（元）退款手续费（元）
                render:'poundage2Render'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.trdPodg'),         // 第三方手续费（元） 第三方退款手续费（元）
                render:'trdPodgRender'
            },{
                title:this.i18n.fanyi('BussinessCheck.listPage.tableCols.reconState'),      // 对账状态
                render:'reconStateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'), // 操作
                buttons:[{
                    text: this.i18n.fanyi('default.btn.detailBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('CHECKMCHINFO')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((record: any) =>{
                        this.helper.navigate('/admin/account/bussinessaccountcheckdetail', this.i18n.fanyi('BussinessCheck.detailPage.title'), {id: record['id']});
                    }).bind(this)
                }]
            }
        ]
    };

    /**
     * 查询事件
     */
    public onSearch(){
        this.bussinessTable.doSearch();
    }

    /**
     * 受理机构选择事件
     * @param value
     */
    onAgencySelected(value) {
        this.bussinessForm.agencyCode = value.orgNo;

        // 清空商户名称
        this.bussinessForm.merchantNo = null;
        this.bussinessForm.merchantName = null;
    }

    /**
     * 商户名称选择前事件
     */
    onMerchantSearchBefore(value) {
        console.log(this.bussinessForm.agencyCode);
        if(this.bussinessForm.agencyCode){
            this.merchantCfg.params = {isStore: 0, bankCode:this.bussinessForm.agencyCode};
        }else {
            this.merchantCfg.params = {isStore: 0, bankCode:this.UloCode};
        }
    }

    /**
     * 商户名称选择事件
     * @param value
     */
    onMerchantSelected(value) {
        this.bussinessForm.merchantName = value.name;
    }

    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public finishAtDateDisabled(endValue:any){
        if(!endValue || !this.bussinessForm.finishAt){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.bussinessForm.startAt) || endValue >= this.helper.modifyDateByDay(this.bussinessForm.startAt,30);
    }
}
