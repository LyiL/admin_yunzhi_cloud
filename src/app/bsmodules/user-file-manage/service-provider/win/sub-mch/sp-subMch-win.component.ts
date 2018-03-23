import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {SimpleTableComponent} from "@delon/abc";
import {HttpHeaders} from "@angular/common/http";
import {HelperService} from "../../../../../common/services/helper.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";

/**
 * 服务商子商户弹窗
 */
@Component({
    selector: 'sp-sub-mch-win',
    templateUrl: './sp-subMch-win.component.html',
    providers: [ServiceProviderService]
})
export class SpSubMchWinComponent implements OnInit {
    chanCode:string;
    _dealerInfoCount: string;

    @Input()
    set dealerInfoCount(value: string) {
        this._dealerInfoCount = value;
    }

    constructor(
        public subject: NzModalSubject,
        public i18n:I18NService,
        public helper:HelperService,
    ) {}

    ngOnInit() {
        this.tableCfg.params = {chanCode:this.chanCode,chanType:0};
    }

    /**
     * 下属商户表格配置
     */
    @ViewChild('subMchTable') public subMchTable:SimpleTableComponent;
    public tableCfg:any = {
        url:ServiceProviderService.SUBMCH_INFO_URL,
        params:{chanCode: this.chanCode,chanType:0},
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
