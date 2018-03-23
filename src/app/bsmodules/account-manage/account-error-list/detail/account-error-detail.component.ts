import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {AccountErrorService} from "../../../../common/services/request/account-manage/account-error.service";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

/**
 * 对账异常详情
 */

@Component({
    selector:'account-error-detail',
    templateUrl:'./account-error-detail.component.html',
    providers: [AccountErrorService, CommonEnum]
})

export class AccountErrorDetailComponent implements OnInit{
    public detailData = {};  // 详情页数据

    /**
     * 详情页配置
     * @type {[{title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string}]}
     */
    public detailFields: Array<any> = [
        {
            title: this.i18n.fanyi("AccError.detailPage.detail.id"),            // 差错编号
            field: 'id',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.reconDay"),      // 对账日期
            field: 'reconDay',
            type: 'datetime',
            format: 'YYYY-HH-DD'
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.partner"),       // 结算账户
            field: 'partner',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.agencyName"),    // 受理机构
            field: 'agencyName',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.orderNo"),       // 平台单号
            field: 'orderNo',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.transactionId"), // 第三方订单号
            field: 'transactionId',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.refundNo"),      // 退款单号
            field: 'refundNo',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.refundId"),      // 第三方退款单号
            field: 'refundId',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.totalFee"),      // 交易金额
            field: 'totalFee',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.refundFee"),     // 退款金额
            field: 'refundFee',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.trdTotalFee"),   // 第三方交易金额
            field: 'trdTotalFee',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.trdRefundFee"),  // 第三方退款金额
            field: 'trdRefundFee',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.trdBillRate"),   // 第三方记录的商户费率
            field: 'trdBillRate',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.trdPodg"),       // 第三方手续费金额
            field: 'trdPodg',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.errMsg"),        // 差错信息
            field: 'errMsg',
        }, {
            title: this.i18n.fanyi("AccError.detailPage.detail.handleDay"),     // 处理日期
            field: 'handleDay'
        },{
            title: this.i18n.fanyi("AccError.detailPage.detail.handleDesc"),    // 处理备注
            field: 'handleDesc',
        },{
            title: this.i18n.fanyi("AccError.detailPage.detail.handleState"),   // 处理状态
            field: 'handleState',
            type: 'dict',
            transKey: 'CHECKERROR_PRCSTATUS'
        }
    ]

    constructor(public msg: NzMessageService,
                public AccountErrorDB: AccountErrorService,
                public helper:HelperService,
                public i18n: I18NService,
                public menuService: MenuService,
                public router: Router) {
    }

    ngOnInit() {
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];

        this.AccountErrorDB.getDetail(params).subscribe((res) => {
            this.detailData = res[CommonEnum.SERVER_DATA_KEY];
        })
    }

    onBack() {
        this.helper.navigate('/admin/account/accounterror', this.i18n.fanyi("AccError.listPage.title") ,{});
    }
}
