import {Component} from "@angular/core";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonEnum} from "../../../common/enum/common.enum";

/**
 * 电子账户详情
 */
@Component({
    selector: 'electronic-account-detail',
    templateUrl: "electronic-account-detail.component.html",
    providers: [ElectronicAccountListSevice]
})
export class ElectronicAccountDetailComponent{

    public eleInfoData:any = {}; // 电子账户详情数据

    /**
     * 基础信息配置
     */
    public detailFields:Array<any> = [
        {
            title:this.i18n.fanyi("eleAccount.eledetail.accountNo"),
            field:'accountNo'
        },
        {
            title:this.i18n.fanyi("eleAccount.eledetail.accountName"),
            field:'accountName'
        },
        {
            title:this.i18n.fanyi("eleAccount.eledetail.organName"),
            field:'organName'
        },
        {
            title:this.i18n.fanyi("eleAccount.eledetail.outMchno"),
            field:'outMchno',
        },{
            title:this.i18n.fanyi("eleAccount.eledetail.signkey"),
            field:'signkey'
        },
        {
            title:this.i18n.fanyi("eleAccount.eledetail.useState"),
            field:'useState',
            type:'dict',
            transKey:'ACTV_STATUS'
        },
        {
            title:this.i18n.fanyi("eleAccount.eledetail.cashpoolName"),
            field:'cashpoolName'
        },
        {
            title:this.i18n.fanyi("eleAccount.eledetail.singleProcsFee"),
            field:'singleProcsFee'
        },
        {
            title:this.i18n.fanyi("eleAccount.eledetail.privProcsFee"),
            field:'privProcsFee'
        }, {
            title:this.i18n.fanyi("eleAccount.eledetail.advanceProcsFee"),
            field:'advanceProcsFee',
            type:'money'
        }, {
            title:this.i18n.fanyi("eleAccount.eledetail.currentAmount"),
            field:'currentAmount'
        }, {
            title:this.i18n.fanyi("eleAccount.eledetail.canSettleBalance"),
            field:'canSettleBalance'
        }, {
            title:this.i18n.fanyi("eleAccount.eledetail.frozenAmount"),
            field:'frozenAmount'
        }, {
            title:this.i18n.fanyi("eleAccount.eledetail.totalAmount"),
            field:'totalAmount'
        }, {
            title:this.i18n.fanyi("eleAccount.eledetail.transAmount"),
            field:'transAmount'
        },{
            title:this.i18n.fanyi("eleAccount.eledetail.updatedAt"),
            field:'updatedAt',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },{
            title:this.i18n.fanyi("eleAccount.eledetail.createdAt"),
            field:'createdAt',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        }
    ];

    constructor(
        public electronicAccountListSevice:ElectronicAccountListSevice,
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
        this.electronicAccountListSevice.loadAccountInfo(data).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.eleInfoData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 返回列表页
     */
    public onBack(){
        this.helper.navigate('admin/topay/electronicaccountlist',this.i18n.fanyi('eleAccount.listPage.navigate.electronicaccountlist'),{});
    }

}
