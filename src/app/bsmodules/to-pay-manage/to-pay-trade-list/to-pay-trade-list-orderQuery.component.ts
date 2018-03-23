import {Component, ViewChild} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {ToPayOrderqueryForm} from "../../../common/form/to-pay-manage/to-pay-orderquery.form";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService} from "ng-zorro-antd";
import {TopayTradeListService} from "../../../common/services/request/to-pay-manage/topay-trade-list.service";
import {HttpHeaders} from "@angular/common/http";
import {CommonEnum} from "../../../common/enum/common.enum";
import {SimpleTableComponent} from "@delon/abc";

/**
 * 订单号查询
 */
@Component({
    selector: 'to-pay-trade-list-orderQuery',
    templateUrl: 'to-pay-trade-list-orderQuery.component.html',
    providers: [TopayTradeListService]
})
export class ToPayTradeListOrderQueryComponent{

    public orderForm:ToPayOrderqueryForm = new ToPayOrderqueryForm()   //列表查询from

    @ViewChild('orderListTable') public orderListTable:SimpleTableComponent;  //获取table数据

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public _msg: NzMessageService,
                public topayTradeListService:TopayTradeListService,

    ){

    }

    /**
     * 订单号列表页数据设置
     * @type {{url: string; params: ToPayOrderqueryForm; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); buttons: [{text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any}]}]}}
     */
    public orderTableCfg:any = {
        url:TopayTradeListService.CASHTRANS_SEARCH_URL,
        params:this.orderForm,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.tradeTime'),      //交易时间
                index:'tradeTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss',
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.outTradeNo'),  //商户单号/代付单号
                render:'outTradeNoRender'
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.mchName'),  //商户名
                index:'mchName'
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.payName'),  //银行账户
                index:'payName',

            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.payCardNo'),  //银行卡号
                index:'payCardNo',

            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.tradeState'),   //交易状态
                render:'tradeStateRender',
            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.totalFee'),  //代付金额（元）
                render:'totalFeeRender',

            },{
                title:this.i18n.fanyi('topayTrade.listPage.tableCfg.totalAmount'),  //总金额（元）
                render:'totalAmountRender',

            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 详情
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('PAYINFO')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/topay/topaytradedetail',this.i18n.fanyi('topayTrade.navigate.topaytradeDetail'),{transNo: record['transNo']});
                        }).bind(this)
                    },{ // 同步
                        text: this.i18n.fanyi('topayTrade.listPage.tableCfg.synchronization'),
                        hide: (() => {
                            if (this.helper.btnRole('PAYSYN')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onsynchronization.bind(this)
                    }]
            }
        ]
    };

    /**
     * 同步
     */
    onsynchronization(row:any){
        this.topayTradeListService.loadSynch({transNo: row['transNo']}).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this._msg.success(this.i18n.fanyi('topayTrade.alert.onsynch'));
                this.orderListTable.doSearch();
            }else {
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 查询事件
     */
    public onSearch() {
        if (this.helper.isEmpty(this.orderForm.transNo) && this.helper.isEmpty(this.orderForm.outTradeNo)) {
            this._msg.error(this.i18n.fanyi('topayTrade.alert.number'))
        }else{
            this.orderListTable.doSearch();
        }
    }

}
