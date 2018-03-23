import {Component, OnInit, ViewChild} from '@angular/core';
import {SPForm} from "../../../common/form/user-file-manage/sp.form";
import {HelperService} from "../../../common/services/helper.service";
import {ReuseTabService, SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {NzModalService, ObjectExtend} from "ng-zorro-antd";
import {ServiceProviderService} from "../../../common/services/request/user-file-manage/service-provider.service";
import {CommonService} from "../../../common/services/request/common.service";
import {SpSubMchWinComponent} from './win/sub-mch/sp-subMch-win.component';

/**
 * 服务商列表
 */
@Component({
    selector:'sp-list',
    templateUrl:'./sp-list.component.html'
})
export class SpListComponent implements OnInit{
    public spListForm:SPForm = new SPForm();
    public examineStatus:Array<any> = [];
    public UloCode:any; //优络编码

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public objectExtend:ObjectExtend,
        public modalService: NzModalService,
        private reuseTabService:ReuseTabService
    ){
        this.examineStatus = this.helper.getDictByKey('EXAMINE_STATUS');
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');
    }

    ngOnInit(){
        this.reuseTabService.change.subscribe(res => {
            if(res && res['active'] == 'refresh' && res['pageName'] == 'user/splist'){
                this.onSearch(false);
            }
        })
    }

    /**
     * 所属机构控件配置
     */
    public chanCodeTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('SP.listPage.chanCodeTableCfg.title'),
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('SP.listPage.chanCodeTableCfg.chanCode')
        },{
            field:'name',
            label:this.i18n.fanyi('SP.listPage.chanCodeTableCfg.chanName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('SP.listPage.chanCodeTableCfg.chanCode'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('SP.listPage.chanCodeTableCfg.chanName'),
            index:'name'
        }]
    };

    /**
     * 所属上级控件配置
     */
    public parentChanCodeTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('SP.listPage.parentChanCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        isAjax:false,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanCode')
        },{
            field:'name',
            label:this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanCode'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('SP.listPage.parentChanCfg.parentChanName'),
            index:'name'
        }]
    };

    @ViewChild('spListTable') public spListTable:SimpleTableComponent;

    public spTableCfg:any = {
        url:ServiceProviderService.SP_LIST_URL,
        params:this.spListForm,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('SP.listPage.tableCols.name'),
                index:'name'
            },{
                title:this.i18n.fanyi('SP.listPage.tableCols.chanCode'),
                index:'chanCode'
            },{
                title:this.i18n.fanyi('SP.listPage.tableCols.dealerInfoCount'),
                // index:'dealerInfoCount',
                render:'dealerInfoCountRender'
            },{
                title:this.i18n.fanyi('SP.listPage.tableCols.bankName'),
                index:'bankName'
            },{
                title:this.i18n.fanyi('SP.listPage.tableCols.parentChanName'),
                render:'parentChanNameRender'
            },{
                title:this.i18n.fanyi('SP.listPage.tableCols.isConfigChanRate'),
                // index:'isConfigChanRate',
                render:'isConfigChanRateRender'
            },{
                title:this.i18n.fanyi('SP.listPage.tableCols.examState'),
                // index:'examState',
                render:'examStateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 详情
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('SPDETAIL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((row: any) =>{
                            this.helper.navigate('/admin/user/spdetail',this.i18n.fanyi('SP.detailPage.detail.title'),{
                                id:row['id'],
                                orgId:row['orgId'],
                                chanCode:row['chanCode'],
                                bankCode: row['bankCode'],
                                bankName:row['bankName'],
                                categoryTypeGroup: row['categoryTypeGroup'],
                                parentChanCode: row['parentChanCode'],
                            });
                        }).bind(this)
                    },
                    {
                        // 生成公众号授权地址
                        text:this.i18n.fanyi('SP.listPage.btn.authUrlBtn'),
                        hide:(() => {
                            if(this.helper.btnRole('ACTAUTHORIZED')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:this.onAuthUrl.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 查询方法
     */
    public onSearch(search:boolean = true){
        this.spListTable.doSearch(search);
    }

    /**
     * 查询下属商户
     * @param row
     */
    public onSearchSubMch(row:any){
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('Agency.listPage.win.title'),
            width:'1000px',
            content: SpSubMchWinComponent,
            maskClosable:false,// 点击蒙层不允许关闭;
            footer: false,
            componentParams: {
                chanCode:row['chanCode'],
                dealerInfoCount: this.i18n.fanyi('Agency.listPage.win.subMchCount') + row['dealerInfoCount']
            }
        });
        subscription.subscribe(result => {})
    }

    /**
     * 新增服务商
     */
    public addService() {
        this.helper.navigate('/admin/user/spedit', this.i18n.fanyi('SP.listPage.search.addService'),{});
    }

    /**
     * 所属机构选中事件
     */
    onBankCodeSelected(value){
        // 重新选择清空所属上级
        this.spListForm.parentChanCode = null;
        this.spListForm.parentChanName = null;
    }

    /**
     * 所属上级查询前事件
     */
    onParentChanSearchBefore(){
        if(this.spListForm.bankCode){
            this.parentChanCodeTableCfg.params = {bankCode:this.spListForm.bankCode,chanType:0};
        }else {
            this.parentChanCodeTableCfg.params = {bankCode:this.UloCode,chanType:0};
        }
    }
    /**
     * 所属上级选中事件
     */
    onParentChanSelected(value){
        this.spListForm.parentChanName = value.name;
    }

    /**
     * 生成公众号授权地址
     */
    onAuthUrl(row:any){
        let auth_url = this.helper.getDictByKey('JSAPIAUTHURL') + '/' + row['bankCode'] + '/' + row['chanCode'];
        let win = this.modalService.info({
            title:this.i18n.fanyi('SP.listPage.authUrlTitle'),
            content:auth_url,
            maskClosable:false,
            width:'500px'
        });
        win.subscribe(res => {});
    }
}
