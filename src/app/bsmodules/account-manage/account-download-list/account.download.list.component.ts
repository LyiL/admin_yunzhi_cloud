import { OnInit } from '@angular/core';
import {Component, ViewChild} from "@angular/core";
import {AccountDownLoadForm} from "../../../common/form/account-manage/account-download.form";
import {AccountDownloadService} from "../../../common/services/request/account-manage/account-download.service";
import {HttpHeaders} from "@angular/common/http";
import {CommonEnum} from "../../../common/enum/common.enum";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

/**
 * 账单下载列表
 */

@Component({
  selector: "account-download-list",
  templateUrl: "account.download.list.component.html",
  providers: [AccountDownloadService]
})
export class AccountDownloadComponent implements OnInit {

    public line = '-'; // 日期之间的横线

    public accountDownLoadForm: AccountDownLoadForm = new AccountDownLoadForm();
    @ViewChild('accountDownLoadTable') accountDownLoadTable: SimpleTableComponent;

    constructor(public i18n: I18NService,
                public helper: HelperService,
                public AccountDownloadDB: AccountDownloadService,
                public msg: NzMessageService,
                public modal: NzModalService,) {

    }

    ngOnInit() {}

    /**
     * 账单下载表单配置
     * @type {{url: string; params: AccountErrorForm; total: number; isAjax: boolean;  resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url:AccountDownloadService.ACCOUNT_DOWNLOAD_LIST_URL,
        params:this.accountDownLoadForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('AccDownLoad.listPage.tableCols.recordDate'),    // 对账日期
                render:'recordDateRender'
            },{
                title:this.i18n.fanyi('AccDownLoad.listPage.tableCols.companion'),     // 第三方支付号
                render:'companionRender'
            },{
                title:this.i18n.fanyi('AccDownLoad.listPage.tableCols.savePath'),      // 保存路径
                render:'savePathRender'
            },{
                title:this.i18n.fanyi('AccDownLoad.listPage.tableCols.parsePath'),     // 解析路径
                render:'parsePathRender'
            },{
                title:this.i18n.fanyi('AccDownLoad.listPage.tableCols.downState'),     // 下载状态(ORDER_API_STATUS)
                render:'downStateRender'
            },{
                title:this.i18n.fanyi('AccDownLoad.listPage.tableCols.errMsg'),        // 状态信息
                render:'errMsgRender'
            },{
                title:this.i18n.fanyi('AccDownLoad.listPage.tableCols.updatedTime'),   // 最近下载日期
                render:'updatedTimeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),                      // 操作
                buttons:[{
                    text: this.i18n.fanyi('AccDownLoad.listPage.tableCols.downloadBtn'),
                    hide:((row) => {
                        if(this.helper.btnRole('BILLDOWNLOAD') && row["downState"] == 0) {
                            return false;
                        }
                        return true;
                    }) ,
                    click: this.onDownload.bind(this)
                },{
                    text: this.i18n.fanyi('AccDownLoad.listPage.tableCols.reloadDownloadBtn'),
                    hide:((row) => {
                        if(this.helper.btnRole('BILLDOWNLOAD') && row["downState"] == 1) {
                            return false;
                        }
                        return true;
                    }) ,
                    click: this.onDownload.bind(this)
                }]
            }
        ]
    };


    /**
     * 查询事件
     */
    public onSearch(){
        this.accountDownLoadTable.doSearch();
    }

    /**
     * 下载事件
     * @author lyl
     */
    onDownload(row: any, e: MouseEvent){
        if(row && row["companion"] && row["recordDate"]) {
            let params = {
                date: this.getTheDate(row["recordDate"]),
                companion: row["companion"],
                force: row['downState'] == 0 ? 0 : 1
            }
            this.AccountDownloadDB.loadDownload(params).subscribe(res => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.msg.success(this.i18n.fanyi('AccountManage.common.successFully'));
                    this.accountDownLoadTable.doSearch(false);
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            });
        }
    }

    /**
     * 对账日期
     * 时间格式：yyyy-MM-dd
     */
    getTheDate(date) {
        let theDate;
        let _Date = new Date(parseInt(date));
        let _Year: any = _Date.getFullYear();
        let _Month: any = _Date.getMonth() + 1;
        _Month = _Month < 10 ? `0${_Month}` : _Month;
        let _Day: any = _Date.getDate();
        _Day = _Day < 10 ? `0${_Day}` : _Day;
        theDate = _Year + "-" + _Month + "-" + _Day;
        return theDate;
    };


    /**
     * 结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public endDateDisabled(endValue:any){
        if(!endValue || !this.accountDownLoadForm.searchEndTime){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.accountDownLoadForm.searchStartTime) || endValue >= this.helper.modifyDateByDay(this.accountDownLoadForm.searchStartTime,30);
    }



}
