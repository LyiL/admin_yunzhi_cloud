import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {ReuseTabService, SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {AgencyForm} from "../../../common/form/user-file-manage/agengcy.form";
import {NzModalService} from "ng-zorro-antd";
import {AgencyChildsWinComponent} from "./win/agency-list-childs-win/agency-list-childs-win.component";
import {AgencyService} from "../../../common/services/request/user-file-manage/agency.service";
import {CommonService} from "../../../common/services/request/common.service";
import {CommonEnum} from "../../../common/enum/common.enum";

/**
 * 代理商列表页
 */
@Component({
    selector:'agency-list',
    templateUrl:'./agency-list.component.html',
    providers: [AgencyService,CommonService]
})
export class AgencyListComponent implements OnInit{
    public agencyListForm:AgencyForm = new AgencyForm();
    public examineStatus:Array<any> = [];//用户状态
    public agencyTypes:Array<any> = [];//代理类型
    public UloCode:any;//优络编码

    /**
     * 所属机构控件配置
     */
    public bankCodeTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Agency.listPage.bankCodeCfg.title'),
        url:CommonService.BANKINFO_URL,
        params:{},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('Agency.listPage.bankCodeCfg.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('Agency.listPage.bankCodeCfg.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Agency.listPage.bankCodeCfg.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('Agency.listPage.bankCodeCfg.name'),
            index:'name'
        }]
    };
    /**
     * 上级代理控件配置
     */
    public parentChanCodeTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Agency.listPage.parentChanCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        params:{},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanCode')
        },{
            field:'name',
            label:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanCode'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('Agency.listPage.parentChanCfg.parentChanName'),
            index:'name'
        }]
    };
    @ViewChild('agencyListTable') public agencyListTable:SimpleTableComponent;
    /**
     * 表格配置
     */
    public tableCfg:any = {
        url:AgencyService.AGENCY_LIST_URL,
        params:this.agencyListForm,
        isAjax:false,
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
                render:'appCodeRender',
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
                title:this.i18n.fanyi('Agency.listPage.tableCols.bankName'),
                index:'bankName'
            },{
                title:this.i18n.fanyi('Agency.listPage.tableCols.examState'),
                render:'examStateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.detailBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('AGENTDETAIL')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((row: any) =>{
                        this.helper.navigate('/admin/user/agencydetail',this.i18n.fanyi('Agency.detailPage.detail.AgencyDetailTitle'),{
                            chanCode:row['chanCode'],name:row['name'],orgId: row['orgId'],parentChanCode:row['parentChanCode'],categoryTypeGroup:row['categoryTypeGroup'],bankCode: row['bankCode']
                        });
                        // this.helper.navigate('/admin/user/agencydetail',this.i18n.fanyi('Agency.detailPage.detail.title'),{chanCode:row['chanCode'],name:row['name'],orgId: row['orgId']});
                    }).bind(this)
                }]
            }
        ]
    };
    constructor(public helper:HelperService,
                public i18n:I18NService,
                protected modalService: NzModalService,
                protected agencyService: AgencyService,
                public reuseTabService:ReuseTabService
    ){
        this.examineStatus = this.helper.getDictByKey('EXAMINE_STATUS');//用户状态
        this.agencyTypes = this.helper.getDictByKey('PROXY_TYPE');//代理类型
    }
    ngOnInit(){
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');
        //监听页签变化刷新
        this.reuseTabService.change.subscribe((res) => {
            if(res && res['active'] == 'refresh' && res['pageName'] == 'user/agencylist'){
                //满足以上条件才做刷新
                this.onSearch(false);
            }
        });
    }
    /**
     * 受理机构选中事件
     */
    onBankCodeSelected(value){
        //重新选择清空所属上级
        this.agencyListForm.parentChanCode = '';
        this.agencyListForm.parentChanName = '';
    }

    /**
     * 所属上级查询前事件
     */
    onParentChanSearchBefore(){
        if(this.agencyListForm.bankCode){
            this.parentChanCodeTableCfg.params = {chanType: 0,bankCode:this.agencyListForm.bankCode};
        }else {
            this.parentChanCodeTableCfg.params = {chanType: 0,bankCode:this.UloCode};
        }
    }
    /**
     * 所属上级选中事件
     */
    onParentChanSelected(value){
        this.agencyListForm.parentChanName = value.name;
    }



    /**
     * 查询下级代理
     * @param item
     */
    public onSubAgent(item) {
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('Agency.listPage.win.title'),
            width:'1000px',
            content: AgencyChildsWinComponent,
            maskClosable:false,// 点击蒙层不允许关闭;
            footer: false,
            componentParams: {
                chanCode:item['chanCode'],
                subAgentCount:this.i18n.fanyi('Agency.listPage.win.subAgentCount') + item['childAgentCount'],
                subMchCount: this.i18n.fanyi('Agency.listPage.win.subMchCount') + item['mchCount'],
                selectedIndex: 0
            }
        });
        subscription.subscribe(result => {})
    }


    /**
     * 查询下属商户
     * @param item
     */
    public onSubMch(item) {
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('Agency.listPage.win.title'),
            width:'1000px',
            content: AgencyChildsWinComponent,
            maskClosable:false,// 点击蒙层不允许关闭;
            footer: false,
            componentParams: {
                chanCode:item['chanCode'],
                subAgentCount: this.i18n.fanyi('Agency.listPage.win.subAgentCount') + item['childAgentCount'],
                subMchCount: this.i18n.fanyi('Agency.listPage.win.subMchCount') + item['mchCount'],
                selectedIndex: 1
            }
        });
        subscription.subscribe(result => {})
    }

    /**
     * 新增代理商
     */
    public onAddAgency() {
        this.helper.navigate('/admin/user/agencyedit',this.i18n.fanyi('Agency.listPage.btn.addBtn'),{});
    }
    /**
     * 查询
     */
    public onSearch(search:boolean = true) {
        this.agencyListTable.doSearch(search);
    }
}
