import {CashManageListService} from "../../../common/services/request/to-pay-manage/cash-manage-list.service";
import {Component, ViewChild} from "@angular/core";
import {CashManageAccountdetailSearchForm} from "../../../common/form/to-pay-manage/cash-manage-accountdetailSearch.form";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {HttpHeaders} from "@angular/common/http";
import {CommonEnum} from "../../../common/enum/common.enum";
import {SimpleTableComponent} from "@delon/abc";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

/**
 * 入账明细
 */
@Component({
    selector: 'cash-manage-accountdetail',
    templateUrl: "cash-manage-accountdetail.component.html",
    providers: [CashManageListService]
})
export class CashManageAccountdetailComponent{

    public accoutDeailForm: CashManageAccountdetailSearchForm = new CashManageAccountdetailSearchForm(); //form 实例
    @ViewChild('cashAccoutdetailTable') public cashAccoutdetailTable:SimpleTableComponent;  //获取table

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService: NzModalService,
                public _msg: NzMessageService,
                public menuService:MenuService,
                public router:Router,
                public objectExtend:ObjectExtend

    ){

    }

    ngOnInit(){
        /**
         * 获取路由参数
         * @type {Menu}
         */
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let _params = menu['params'];
            this.accoutDeailForm.poolNo=_params.poolNo;
        };
    }
    /**
     * 列表页数据源配置
     * @type {{url: string; params: LoginLogForm; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string; type: string; dateFormat: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string}]}}
     */
    public cashAccoutdetailCfg:any = {
        url:CashManageListService.CASHPOOL_SERCHCASHPOOLCHANGE_URL,
        params:this.accoutDeailForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('cashManage.cashAccoutDeteil.tableCfg.poolNo'),          //用户名
                index:'poolNo',
            },{
                title:this.i18n.fanyi('cashManage.cashAccoutDeteil.tableCfg.poolBalance'),     //真实姓名
                index:'poolBalance'
            },{
                title:this.i18n.fanyi('cashManage.cashAccoutDeteil.tableCfg.increase'),   //IP
                index:'increase'
            },{
                title:this.i18n.fanyi('cashManage.cashAccoutDeteil.tableCfg.chanBalance'),   //备注
                // index:'descript'
                index:'chanBalance'

            },{
                title:this.i18n.fanyi('cashManage.cashAccoutDeteil.tableCfg.createdAt'),   //入账日期
                index:'createdAt',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss',
            }
        ]
    };

    /**
     * 搜索
     */
    public onSearch(){
        let _batchForm=this.objectExtend.clone(this.accoutDeailForm);
        let startD=_batchForm['startDate'];
        let endD=_batchForm['startDate']
        if('_startDate' in _batchForm){
            startD=_batchForm['_startDate'];
        }
        if('_endDate' in _batchForm){
            endD=_batchForm['_endDate']
        }
        if(this.helper.isEmpty(startD)||this.helper.isEmpty(endD)){
            this._msg.warning(this.i18n.fanyi('topayTrade.alert.pltime'));
            return
        }
        this.cashAccoutdetailTable.doSearch();
    }

    /**
     * 结束时间控制
     */
    onTradeTimeEndDateDisabled(endValue:any) {
        if (!endValue || !this.accoutDeailForm.endDate) {
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.accoutDeailForm.startDate);
    }

}
