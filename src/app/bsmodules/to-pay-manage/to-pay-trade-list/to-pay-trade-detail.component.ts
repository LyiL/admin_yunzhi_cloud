import {Component} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonEnum} from "../../../common/enum/common.enum";
import {TopayTradeListService} from "../../../common/services/request/to-pay-manage/topay-trade-list.service";

/**
 * 代付交易详情
 */
@Component({
    selector: 'to-pay-trade-detail',
    templateUrl: "to-pay-trade-detail.component.html",
    providers: [TopayTradeListService]
})
export class ToPayTradeDetailComponent{

    public tradeInfoData:any = {}; // 代付交易情数据

    /**
     * 基础信息配置
     */
    public detailFields:Array<any> = [
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.transNo"),
            field:'transNo'
        },
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.outTradeNo"),
            field:'outTradeNo'
        },
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.mchNo"),
            field:'mchNo'
        }, {
            title:this.i18n.fanyi("topayTrade.tradeDetail.mchName"),
            field:'mchName'
        },
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.accountNo"),
            field:'accountNo',
        },{
            title:this.i18n.fanyi("topayTrade.tradeDetail.accountName"),
            field:'accountName'
        },
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.cashpoolNo"),
            field:'cashpoolNo',
        },
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.cashpollName"),
            field:'cashpollName'
        },
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.tradeState"),
            field:'tradeState',
            type:'dict',
            transKey:'CASH_ORDER_STATUS'
        },
        {
            title:this.i18n.fanyi("topayTrade.tradeDetail.tradeStateDesc"),
            field:'tradeStateDesc'
        }, {
            title:this.i18n.fanyi("topayTrade.tradeDetail.tradeTime"),
            field:'tradeTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        }, {
            title:this.i18n.fanyi("topayTrade.tradeDetail.totalFee"),
            field:'totalFee',
            type:'price'
        }, {
            title:this.i18n.fanyi("topayTrade.tradeDetail.procsFee"),
            field:'procsFee',
            type:'price'
        }, {
            title:this.i18n.fanyi("topayTrade.tradeDetail.totalAmount"),
            field:'totalAmount',
            type:'price'
        }, {
            title:this.i18n.fanyi("topayTrade.tradeDetail.transProcsFee"),
            field:'transProcsFee',
            type:'price'
        }, {
            title:this.i18n.fanyi("topayTrade.tradeDetail.transactionId"),
            field:'transactionId'
        },{
            title:this.i18n.fanyi("topayTrade.tradeDetail.payType"),
            field:'payType',
            type:'dict',
            transKey:'CASH_ACCOUNT_TYPE'
        },{
            title:this.i18n.fanyi("topayTrade.tradeDetail.payName"),
            field:'payName',
        },{
            title:this.i18n.fanyi("topayTrade.tradeDetail.payCardNo"),
            field:'payCardNo',
        },{
            title:this.i18n.fanyi("topayTrade.tradeDetail.bankUnionNo"),
            field:'bankUnionNo',
        },{
            title:this.i18n.fanyi("topayTrade.tradeDetail.body"),
            field:'body',
        }
    ];

    constructor(
        public topayTradeListService:TopayTradeListService,
        public helper:HelperService,
        public menuService:MenuService,
        public router:Router,
        public i18n:I18NService,
        public _msg: NzMessageService
    ){}

    ngOnInit(){
        /**
         * 获取路由参数，请求数据 transNo
         * @type {Menu}
         */
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let _params = menu['params'];
            this.loadDetail(_params);
        };
    }

    /**
     * 加载详情
     */
    public loadDetail(data){
        this.topayTradeListService.loadDetail(data).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tradeInfoData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 返回列表页
     */
    public onBack(){
        this.helper.navigate('admin/topay/topaytradelist',this.i18n.fanyi('topayTrade.navigate.topaytradeList'),{});
    }

}
