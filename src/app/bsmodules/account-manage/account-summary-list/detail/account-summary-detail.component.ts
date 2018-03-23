import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {AccountSummaryService} from "../../../../common/services/request/account-manage/account-summary.service";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

/**
 * 对账概要详情
 */

@Component({
    selector: 'account-summary-detail',
    templateUrl: './account-summary-detail.component.html',
    providers: [AccountSummaryService, CommonEnum]
})

export class AccountSummaryDetailComponent implements OnInit{
    public detailData = {}; // 对账总览详情页数据

    /**
     * 详情页配置
     * @type {[{title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string}]}
     */
    public detailFields: Array<any> = [
        {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.reconDay"),        // 对账日期
            field: 'reconDay',
            type:'datetime',
            format:'YYYY-MM-DD'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.ally"),            // 结算账户
            field: 'ally',
            type: 'translate'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.centerId"),        // 支付中心
            field: 'centerName',
            type: 'translate'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.transName"),       // 支付类型
            field: 'transName',
            type: 'translate'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.agencyName"),      // 受理机构
            field: 'agencyName',
            type: 'translate'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.totalFee"),        // 交易金额
            field: 'totalFee'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.refundFee"),       // 退款金额
            field: 'refundFee'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.totalQua"),        // 交易笔数
            field: 'totalQua'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.refundQua"),       // 退款笔数
            field: 'refundQua'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.errTotalQua"),     // 异常笔数
            field: 'errTotalQua'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.errTotalFee"),     // 异常金额
            field: 'errTotalFee'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.eqTotalFee"),      // 平账交易金额
            field: 'eqTotalFee'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.eqRefundFee"),     // 平账退款金额
            field: 'eqRefundFee'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.poundage2"),       // 手续费（四舍五入）
            field: 'poundage2'
        }, {
            title: this.i18n.fanyi("AccSummary.detailPage.detail.poundage6"),       // 手续费（6位小数）
            field: 'poundage6'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.refundPodg2"),     // 退款手续费（四舍五入）
            field: 'refundPodg2'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.refundPodg6"),     // 退款手续费（6位小数）
            field: 'refundPodg6'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdTotalFee"),     // 第三方交易金额
            field: 'trdTotalFee'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdRefundFee"),    // 第三方退款金额
            field: 'trdRefundFee'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdTotalQua"),     // 第三方成功笔数
            field: 'trdTotalQua'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdRefundQua"),    // 第三方退款笔数
            field: 'trdRefundQua'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdPodg"),         // 第三方手续费金额
            field: 'trdPodg'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdFavRefundFee"), // 第三方退款手续费
            field: 'trdFavRefundFee'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdRefundPodg"),   // 第三方优惠成功总金额
            field: 'trdRefundPodg'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.trdFavTotalFee"),  // 第三方优惠退款金额
            field: 'trdFavTotalFee'
        },{
            title: this.i18n.fanyi("AccSummary.detailPage.detail.reconState"),      // 对账状态
            field: 'reconState',
            type: 'dict',
            transKey: 'PARTNER_PRCSTATUS'
        }
    ]

    constructor(public msg: NzMessageService,
                public AccountSummaryDB: AccountSummaryService,
                public helper: HelperService,
                public i18n: I18NService,
                public menuService: MenuService,
                public router: Router) {

    }

    ngOnInit() {
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];

        this.AccountSummaryDB.getDetail(params).subscribe((res) => {
            this.detailData = res[CommonEnum.SERVER_DATA_KEY];
        })
    }

    onBack() {
        this.helper.navigate('/admin/account/accountsummary', this.i18n.fanyi("AccSummary.listPage.title"), {});
    }
}
