import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {SimpleTableComponent} from "@delon/abc";
import {HttpHeaders} from "@angular/common/http";
import {HelperService} from "../../../../../common/services/helper.service";
import {AgencyService} from "../../../../../common/services/request/user-file-manage/agency.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";

/**
 * 代理商列表下级代理、下属商户弹框
 */
@Component({
    selector: 'agency-list-childs-win',
    templateUrl: './agency-list-childs-win.component.html',
    providers: [AgencyService]
})
export class AgencyChildsWinComponent implements OnInit {
    _chanCode:string;
    _subAgentCount: string;
    _subMchCount: string;
    _selectedIndex: string;

    @Input()
    set chanCode(value: string) {
        this._chanCode = value;
    }

    @Input()
    set subAgentCount(value: string) {
        this._subAgentCount = value;
    }

    @Input()
    set subMchCount(value: string) {
        this._subMchCount = value;
    }

    @Input()
    set selectedIndex(value: string) {
        this._selectedIndex = value;
    }

    constructor(public subject: NzModalSubject,
                public i18n:I18NService,
                public helper:HelperService,
    ) {}

    ngOnInit() {
        this.tableCfg1.params = {chanCode:this._chanCode,chanType:0};
        this.tableCfg2.params = {chanCode:this._chanCode,chanType:0};
    }
    /**
     * 下级代理表格配置
     */
    @ViewChild('subAgencyTable') public subAgencyTable:SimpleTableComponent;
    public tableCfg1:any = {
        url:AgencyService.SUBAGENCY_INFO_URL,
        params:{chanCode:this._chanCode,chanType:0},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('Agency.listPage.tableCols.name'),
                index:'name'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.chanCode'),
                index:'chanCode'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.appCode'),
                render:'appCodeRender'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.agentRank'),
                index:'agentRank'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.parentAgentName'),
                render:'parentAgentNameRender'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.childAgentCount'),
                render:'childAgentCountRender'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.mchCount'),
                render:'mchCountRender'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.examState'),
                render:'examStateRender'
            }
        ]
    };

    /**
     * 下属商户表格配置
     */
    @ViewChild('subMchTable') public subMchTable:SimpleTableComponent;
    public tableCfg2:any = {
        url:AgencyService.SUBMCH_INFO_URL,
        params:{chanCode: this._chanCode,chanType:0},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('Agency.listPage.subMchTableCols.name'),
                index:'name'
            },{
                title:this.i18n.fanyi('Agency.listPage.subMchTableCols.merchantNo'),
                index:'merchantNo'
            },{
                title:this.i18n.fanyi('Agency.listPage.subMchTableCols.shortName'),
                index:'shortName'
            },{
                title:this.i18n.fanyi('Agency.listPage.subMchTableCols.examState'),
                render:'examStateRender'
            }
        ]
    };
}
