import {Component, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {AccountErrorForm} from "../../../common/form/account-manage/account-error.form";
import {CommonEnum} from "../../../common/enum/common.enum";
import {AccountErrorService} from "../../../common/services/request/account-manage/account-error.service";
import {CommonService} from "../../../common/services/request/common.service";

/**
 * 对账异常列表
 */

@Component({
    selector:'account-error-list',
    templateUrl:'./account-error-list.component.html',
    providers: [AccountErrorService]
})
export class AccountErrorListComponent{

    public errorForm:AccountErrorForm = new AccountErrorForm();

    public flag: boolean = false; // 显示高级查询or隐藏高级查询
    public line: string = '-';   // 日期之间的横线

    public handleState:Array<any> = []; // 处理状态

    @ViewChild('errorTable') public errorTable:SimpleTableComponent;

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public AccountErrorDB: AccountErrorService){

        this.handleState = this.helper.getDictByKey('CHECKERROR_PRCSTATUS'); // 处理状态
    }

    /**
     * 结算账户配置
     */
    public partnerTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('AccError.listPage.partnerCfg.title'),
        url:CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'companion',
            label:this.i18n.fanyi('AccError.listPage.partnerCfg.partner')
        },{
            field:'name',
            label:this.i18n.fanyi('AccError.listPage.partnerCfg.partnerName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('AccError.listPage.partnerCfg.partner'),
            index:'companion'
        },{
            title:this.i18n.fanyi('AccError.listPage.partnerCfg.partnerName'),
            index:'companionName'
        }]
    };

    /**
     * 差错异常表格配置
     * @type {{url: string; params: AccountErrorForm; total: number; isAjax: boolean;  resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url:AccountErrorService.ACC_ERROR_LIST_URL,
        params:this.errorForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('AccError.listPage.tableCols.reconDay'),          // 对账日期/结算账户
                render: 'reconDayRender'
            },{
                title:this.i18n.fanyi('AccError.listPage.tableCols.merchantName'),      // 商户名称
                render: 'merchantNameRender'
            },{
                title:this.i18n.fanyi('AccError.listPage.tableCols.totalFee'),          // 交易金额（元）/退款金额（元）
                render:'totalFeeRender'
            },{
                title:this.i18n.fanyi('AccError.listPage.tableCols.orderNo'),           // 平台单号/退款单号
                render:'orderNoRender'
            },{
                title:this.i18n.fanyi('AccError.listPage.tableCols.transactionId'),     // 第三方订单号/第三方退款单号
                render:'transactionIdRender'
            },{
                title:this.i18n.fanyi('AccError.listPage.tableCols.handleState'),       // 处理状态
                render:'handleStateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),                       // 操作
                buttons:[{
                    text: this.i18n.fanyi('default.btn.detailBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('CHECKERRORINFO')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((record: any) =>{
                        this.helper.navigate('/admin/account/accounterrordetail', this.i18n.fanyi('AccError.detailPage.title'), {id: record['id']});
                    }).bind(this)
                }]
            }
        ]
    };

    /**
     * 查询事件
     */
    public onSearch(){
        this.errorTable.doSearch();
    }

    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public checkTimeEndDateDisabled(endValue:any){
        if(!endValue || !this.errorForm.checkTimeEnd){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.errorForm.checkTimeStart) || endValue >= this.helper.modifyDateByDay(this.errorForm.checkTimeStart,30);
    }
}
