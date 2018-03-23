import {Component, ViewChild, OnInit} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {CommonService} from "../../../common/services/request/common.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {AccountTaskListEditbtnWinComponent} from "./win/account.task.list.editbtn.win.component";
import {AccountTaskForm} from "app/common/form/account-manage/account-task.form";
import {AccountTaskService} from "../../../common/services/request/account-manage/account-task.service";
import {ModalHelper} from "@delon/theme";
import {newClone} from "@delon/abc/utils/utils";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

/**
 * 对账任务列表页
 */

@Component({
  selector: 'account-task-list',
  templateUrl: "account.task.list.component.html",
  providers: [AccountTaskService]
})
export class AccountTaskComponent{

    public line = '-'; // 日期之间的横线

    public accountTaskForm:AccountTaskForm = new AccountTaskForm();
    @ViewChild('accountTaskTable') accountTaskTable: SimpleTableComponent;

    public treatState:Array<any> = []; // 对账状态

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public modalHelper:ModalHelper,
        public modal: NzModalService,
        public AccountTaskDB: AccountTaskService,
        public msg: NzMessageService
    ) {
        this.treatState = this.helper.getDictByKey('PROCS_STATUS'); // 获取对账状态
    }


    /**
     * 结算账户配置
     */
    public allyCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('AccTask.listPage.allyCfg.title'),
        url:CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'companion',
            label:this.i18n.fanyi('AccTask.listPage.allyCfg.ally')
        },{
            field:'name',
            label:this.i18n.fanyi('AccTask.listPage.allyCfg.allyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('AccTask.listPage.allyCfg.ally'),
            index:'companion'
        },{
            title:this.i18n.fanyi('AccTask.listPage.allyCfg.allyName'),
            index:'companionName'
        }]
    };


    /**
     * 对账任务表单配置
     * @type {{url: string; params: AccountErrorForm; total: number; isAjax: boolean;  resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url:AccountTaskService.ACCOUNT_TASK_LIST_URL,
        params:this.accountTaskForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('AccTask.listPage.tableCols.scheNo'),         // 任务编码
                index:'scheNo'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.reconDay'),       // 对账日期
                render:'reconDayRender'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.ally'),           // 结算账户
                index:'ally'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.treatQua'),       // 处理总数
                render:'treatQuaRender'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.errQua'),         // 差错总数
                render:'errQuaRender'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.reconType'),      // 对账类型(SHOW_CHECK_TYPE)
                render:'reconTypeRender'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.refundType'),     // 退款依据(REFUND_BASE)
                render:'refundTypeRender'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.treatState'),     // 对账状态(PROCS_STATUS)
                render:'treatStateRender'
            },{
                title:this.i18n.fanyi('AccTask.listPage.tableCols.beginTime'),      // 执行时间/结算时间
                render: 'beginTimeRender',
            },{
                title:this.i18n.fanyi('default.tableCol.action'),                   // 操作
                buttons:[
                    {
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide:((row) => {
                            if(this.helper.btnRole('TASKEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    },
                    {
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide:((row) => {
                            if(this.helper.btnRole('TASKINFO')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((row: any) =>{
                            this.helper.navigate('/admin/account/accounttaskdetail', this.i18n.fanyi('AccTask.detailPage.title'), {id: row['id']});
                        }).bind(this)
                    },
                    {
                        text: this.i18n.fanyi('AccTask.listPage.tableCols.resetBtn'),
                        hide:((row) => {
                            if (this.helper.btnRole('TASKRESET') && row['treatState'] == 3) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onReset.bind(this)
                    },
                    {
                        text: this.i18n.fanyi('AccTask.listPage.tableCols.executeBtn'),
                        hide:((row) => {
                            if (this.helper.btnRole('TASKRESET') && row['treatState'] == 0) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onGoForTask.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 查询
     */
    public onSearch(){
        this.accountTaskTable.doSearch();
    }

    /**
     * 编辑
     */
    onEdit(row: any) {
        const win = this.modalHelper.static(AccountTaskListEditbtnWinComponent, {
            model: newClone(row)
        }, 500, {title: this.i18n.fanyi('AccTask.win.editTask.title')});

        win.subscribe((res) => {
            this.accountTaskTable.doSearch(false);
        })
    }


    /**
     * 重置任务
     */
    onReset(row: any, e: MouseEvent) {
        const _confirm = this.modal.confirm({
            title: this.i18n.fanyi('AccTask.win.resetTask.title'),
            content: this.i18n.fanyi('AccTask.win.resetTask.content'),
            maskClosable: false,
        })

        _confirm.subscribe(res => {
            if (res && res == 'onOk') {
                this.AccountTaskDB.loadReset({ id: row['id'] }).subscribe((_res) => {
                    if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.doSuccess'));
                        this.accountTaskTable.doSearch(false);
                    } else {
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }


    /**
     * 执行任务
     */
    onGoForTask(row: any, e: MouseEvent){
        const _confirm = this.modal.confirm({
            title: this.i18n.fanyi('AccTask.win.implementTask.title'),
            content: this.i18n.fanyi('AccTask.win.implementTask.content'),
            maskClosable: false,
        })

        _confirm.subscribe(res => {
            if (res && res == 'onOk') {
                this.AccountTaskDB.loadProcess({ id: row['id'] }).subscribe((_res) => {
                    if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.doSuccess'));
                        this.accountTaskTable.doSearch(false);
                    } else {
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }


    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public finishAtDateDisabled(endValue:any){
        if(!endValue || !this.accountTaskForm.searchEndTime){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.accountTaskForm.searchStartTime) || endValue >= this.helper.modifyDateByDay(this.accountTaskForm.searchStartTime,30);
    }
}





