import {Component, ViewChild, OnInit} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {CommonService} from "../../../common/services/request/common.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {checkAccountService} from "app/common/services/request/account-manage/check-account.service";
import {CheckAccountForm} from "app/common/form/account-manage/check-account.form";
import {ObjectExtend} from "ng-zorro-antd";

/**
 * 对账账户列表
 */

@Component({
  selector: "check-account-list",
  templateUrl: "check.account.list.component.html",
  providers: [checkAccountService]
})
export class CheckAccountComponent implements OnInit{

    public line = '-'; // 日期之间的横线

    public checkAccountForm:CheckAccountForm = new CheckAccountForm();
    @ViewChild('checkAccountTable') checkAccountTable: SimpleTableComponent;

    public reconState:Array<any> = []; // 对账状态

    public checkAccCount:any = {}; // 统计面板

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public checkAccountDB: checkAccountService,
        public objExtend:ObjectExtend
    ) {
        this.reconState = this.helper.getDictByKey('PARTNER_PRCSTATUS'); // 获取对账状态
    }


    /**
     * 结算账户配置
     */
    public allyCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('CheckAccount.listPage.allyCfg.title'),
        url:CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'companion',
            label:this.i18n.fanyi('CheckAccount.listPage.allyCfg.ally')
        },{
            field:'name',
            label:this.i18n.fanyi('CheckAccount.listPage.allyCfg.allyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('CheckAccount.listPage.allyCfg.ally'),
            index:'companion'
        },{
            title:this.i18n.fanyi('CheckAccount.listPage.allyCfg.allyName'),
            index:'companionName'
        }]
    };


    /**
     * 对账账户表单配置
     * @type {{url: string; params: AccountErrorForm; total: number; isAjax: boolean;  resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url:checkAccountService.CHECK_ACCOUINT_LIST_URL,
        params:this.checkAccountForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.reconDay'),      // 对账日期 <br/> 结算账户
                render:'reconDayRender'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.totalFee'),      // 交易金额（元）<br/>退款金额（元）
                render:'totalFeeRender'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.totalQua'),      // 交易笔数（笔）<br/>退款笔数（笔)
                render:'totalQuaRender'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.errTotalQua'),   // 异常笔数（笔）<br/>异常金额（元)
                render:'errTotalQuaRender'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.eqTotalFee'),    // 平账交易（元）<br/>平账退款（元）
                render:'eqTotalFeeRender'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.poundage2'),     // 手续费（元）<br/>退款手续费（元）
                render:'poundage2Render'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.trdTotalFee'),   // 第三方交易（元）<br/>第三方退款（元）
                render:'trdTotalFeeRender'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.trdPodg'),       // 第三方手续费（元）<br/>第三方退款手续费（元）
                render:'trdPodgRender'
            },{
                title:this.i18n.fanyi('CheckAccount.listPage.tableCols.reconState'),    // 对账状态
                render:'reconStateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'), // 操作
                buttons:[{
                    text: this.i18n.fanyi('default.btn.detailBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('CHECKACTINFO')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((row: any) =>{
                        this.helper.navigate('/admin/account/checkaccountdetail', this.i18n.fanyi('CheckAccount.detailPage.title'), {id: row['id']});
                    }).bind(this)
                }]
            }
        ]
    };

    ngOnInit() {
        this.loadCount();
    }

    /**
     * 统计面板数据
     */
    public loadCount() {
        this.checkAccountDB.loadCount(this.objExtend.clone(this.checkAccountForm)).subscribe((res) => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.checkAccCount = res[CommonEnum.SERVER_DATA_KEY];
            }
        })
    }

    /**
     * 查询事件
     */
    public onSearch(){
        this.checkAccCount = {};
        this.loadCount();
        this.checkAccountTable.doSearch();
    }


    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public endDateDisabled(endValue:any){
        if(!endValue || !this.checkAccountForm.searchEndTime){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.checkAccountForm.searchStartTime) || endValue >= this.helper.modifyDateByDay(this.checkAccountForm.searchStartTime,30);
    }
}
