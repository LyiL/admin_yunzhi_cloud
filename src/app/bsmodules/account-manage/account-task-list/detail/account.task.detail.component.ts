import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService} from "@delon/theme";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {HelperService} from "../../../../common/services/helper.service";
import {NzMessageService} from "ng-zorro-antd";
import {AccountTaskService} from "../../../../common/services/request/account-manage/account-task.service";

/**
 * 对账任务详情页
 */

@Component({
  selector:"account-task-detail",
  templateUrl:"./account.task.detail.component.html",
  providers: [AccountTaskService]
})

export class AccountTaskDetailComponent{
    public detailData = {}; // 对账总览详情页数据

    /**
     * 详情页配置
     * @type {[{title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string}]}
     */
    public detailFields: Array<any> = [
        {
            title: this.i18n.fanyi("AccTask.detailPage.scheNo"),        // 任务编号
            field: 'scheNo',
            type: 'number'
        },
        {
            title: this.i18n.fanyi("AccTask.detailPage.reconDay"),      // 对账日期
            field: 'reconDay',
            type:'datetime',
            format:'YYYY-MM-DD'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.ally"),          // 对账账户
            field: 'ally',
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.treatQua"),      // 处理总数
            field: 'treatQua',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.errQua"),        // 差错总数
            field: 'errQua',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.treatSpeed"),    // 处理速度
            field: 'treatSpeed'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.treatState"),    // 对账状态
            field: 'treatState',
            type: 'dict',
            transKey: 'PROCS_STATUS'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.treatId"),       // 处理编号
            field: 'treatId',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.reconType"),     // 对账类型
            field: 'reconType',
            type: 'dict',
            transKey: 'SHOW_CHECK_TYPE'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.refundType"),    // 退款依据
            field: 'refundType',
            type: 'dict',
            transKey: 'REFUND_BASE'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.beginTime"),     // 执行时间
            field: 'beginTime',
            type:'datetime',
            format:'YYYY-MM-DD hh:mm:ss'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.endTime"),       // 结束时间
            field: 'endTime',
            type:'datetime',
            format:'YYYY-MM-DD hh:mm:ss'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.basicRate"),     // 成本费率
            field: 'basicRate',
            type: 'number'
        }, {
            title: this.i18n.fanyi("AccTask.detailPage.feeRuleType"),   // 手续费计算规则
            field: 'feeRuleType'
        }
    ]

    constructor(public msg: NzMessageService,
                public AccountTaskDB: AccountTaskService,
                public helper: HelperService,
                public i18n: I18NService,
                public menuService: MenuService,
                public router: Router) {

    }

    ngOnInit() {
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];

        this.AccountTaskDB.loadDetail(params).subscribe((res) => {
            this.detailData = res[CommonEnum.SERVER_DATA_KEY];
        })
    }

    onBack() {
        this.helper.navigate('/admin/account/accounttask', this.i18n.fanyi("AccTask.listPage.title"), {});
    }
}





