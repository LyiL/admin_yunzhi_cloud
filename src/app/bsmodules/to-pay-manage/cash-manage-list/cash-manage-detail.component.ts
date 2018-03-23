import {Component} from "@angular/core";
import {CashManageListService} from "../../../common/services/request/to-pay-manage/cash-manage-list.service";
import {Router} from "@angular/router";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService} from "ng-zorro-antd";
import {MenuService} from "@delon/theme";
import {HelperService} from "../../../common/services/helper.service";
import {CommonEnum} from "../../../common/enum/common.enum";

/**
 * 资金池详情
 */
@Component({
    selector: 'cash-manage-detail',
    templateUrl: "cash-manage-detail.component.html",
    providers: [CashManageListService]
})
export class CashManageDetailComponent{
    public cashInfoData:any = {}; // 资金池详情数据

    /**
     * 基础信息配置
     */
    public detailFields:Array<any> = [
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.poolNo"),
            field:'poolNo'
        },
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.accountName"),
            field:'accountName'
        },
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.bankName"),
            field:'bankName'
        },
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.useState"),
            field:'useState',
            type:'dict',
            transKey:'ACTV_STATUS'
        },{
            title:this.i18n.fanyi("cashManage.listPageDeteil.apiCode"),
            field:'apiCode'
        },
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.poolType"),
            field:'poolType',
            type:'dict',
            transKey:'CASH_POOL_TYPE'
        },
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.singleProcsFee"),
            field:'singleProcsFee'
        },
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.advanceProcsFee"),
            field:'advanceProcsFee',
            type:'money'

        },
        {
            title:this.i18n.fanyi("cashManage.listPageDeteil.currentAmount"),
            field:'currentAmount'
        }, {
            title:this.i18n.fanyi("cashManage.listPageDeteil.frozenAmount"),
            field:'frozenAmount'
        }, {
            title:this.i18n.fanyi("cashManage.listPageDeteil.totalAmount"),
            field:'totalAmount'
        }, {
            title:this.i18n.fanyi("cashManage.listPageDeteil.transAmount"),
            field:'transAmount'
        }, {
            title:this.i18n.fanyi("cashManage.listPageDeteil.balance"),
            field:'balance'
        },{
            title:this.i18n.fanyi("cashManage.listPageDeteil.updatedAt"),
            field:'updatedAt',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },{
            title:this.i18n.fanyi("cashManage.listPageDeteil.createdAt"),
            field:'createdAt',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        }
    ];

    constructor(
        public cashManageListService:CashManageListService,
        public helper:HelperService,
        public menuService:MenuService,
        public router:Router,
        public i18n:I18NService,
        public _msg: NzMessageService
    ){}

    ngOnInit(){
        /**
         * 获取路由参数，请求数据
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
        this.cashManageListService.loadCashPoolInfo(data).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.cashInfoData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 返回列表页
     */
    public onBack(){
        this.helper.navigate('admin/topay/cashmanagelist',this.i18n.fanyi('cashManage.listPage.navigate.cashmanagelist'),{});
    }
}
