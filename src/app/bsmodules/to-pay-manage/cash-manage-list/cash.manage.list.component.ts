import {Component, OnInit, ViewChild} from "@angular/core";
import {CashManageSearchForm} from "../../../common/form/to-pay-manage/cash-manage-search.form";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {CommonEnum} from "../../../common/enum/common.enum";
import {CashManageListService} from "../../../common/services/request/to-pay-manage/cash-manage-list.service";
import {HttpHeaders} from "@angular/common/http";
import {CashManageListAddbtnWinComponent} from "./add-cash-manage/cash-manage-list-addbtn-win.component";
import {CommonService} from "../../../common/services/request/common.service";


/**
 * 资金池管理
 */
@Component({
    selector: 'cash-manage-list',
    templateUrl: "cash.manage.list.component.html",
    providers: [CashManageListService]
})
export class CashManageListComponent implements OnInit {

    public cashForm:CashManageSearchForm = new CashManageSearchForm()   //列表查询from
    public startStates:Array<any> = [];  // 启用状态

    @ViewChild('CashListTable') public CashListTable:SimpleTableComponent;  //获取表格模块

    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService: NzModalService,
                public modal: NzModalService,
                public _msg: NzMessageService,
                public cashManageListService:CashManageListService
    ){
        this.startStates = this.helper.getDictByKey('ENABLE_STATUS');  //获取启用状态数据
    }

    ngOnInit(){

    }

    /**
     * 受理机构配置
     */
    public mechanismCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('cashManage.listPage.search.bankNoTitle'),
        // url:CashManageListService.QUERY_BANKORG_URL,
        url:CommonService.BANKINFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('cashManage.listPage.search.orgNo')
        },{
            field:'name',
            label:this.i18n.fanyi('cashManage.listPage.search.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('cashManage.listPage.search.orgNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('cashManage.listPage.search.name'),
            index:'name'
        }]
    }

    /**
     * 列表数据源
     * @type {{url: string; params: CashManageSearchForm; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); width: string; buttons: [{text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any}]}]}}
     */
    public cashTableCfg:any = {
        url:CashManageListService.CASHPOOL_PAGEER_URL,
        params:this.cashForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.poolNo'),      //编号
                index:'poolNo'
            },{
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.accountName'),   //账户名称
                index:'accountName'
            },{
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.bankName'),    //所属机构
                index:'bankName'
            },{
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.useState'),    //启用状态
                render:'useStateRender',

            },{
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.singleProcsFee'),    //手续费（元）
                index:'singleProcsFee',

            },{
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.advanceProcsFee'),    //垫资手续费（%）
                render:'advanceProcsFeeRender',
            },{
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.currentAmount'),    //余额（元）
                index:'currentAmount',

            },{
                title:this.i18n.fanyi('cashManage.listPage.tableCfg.c'),    //入账明细
                render:'cRender',

            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    { // 编辑
                        text: this.i18n.fanyi('RM.listPage.tableActionCfg.edit'),
                        hide: (() => {
                            if (this.helper.btnRole('MONEYPOOLEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    },{
                        // 详情
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('MONEYPOOLDETAIL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/topay/cashmanagedetail',this.i18n.fanyi('cashManage.listPage.navigate.cashmanagedetail'),{poolNo: record['poolNo']});
                        }).bind(this)
                    }]
            }
        ]
    };


    /**
     * 入账明细
     */
    onAccountDetails(record:any){
        this.helper.navigate('/admin/topay/cashmanageaccountdetail',this.i18n.fanyi('cashManage.listPage.navigate.cashmanageaccountdetail'),{poolNo: record['poolNo']})
    }
    /**
     * 变更状态
     */
    public onEnabled(row:any) {
        const statusWin = this.modal.confirm({
            title:this.i18n.fanyi('StaffM.listPage.alert.prompt'),
            content: this.i18n.fanyi('cashManage.listPage.alert.changeState')
            // content:this.i18n.fanyi('StaffM.listPage.alert.qusupdate')+
            // "【"+row['accountName']+ "】"
            // + (row['useState'] == 0 ? this.i18n.fanyi('StaffM.listPage.tableCols.enable')
            //     : this.i18n.fanyi('StaffM.listPage.tableCols.disable'))+this.i18n.fanyi('StaffM.listPage.alert.status')
        });

        statusWin.subscribe(result => {
            if(result && result == 'onOk'){
                let _useStatus = row['useState'];
                if (_useStatus == 0) {
                    row['useState'] = 1;
                } else {
                    row['useState'] = 0;
                }
                this.cashManageListService.loadUseState({poolNo: row['poolNo'], useState:row['useState']}).subscribe(_res => {
                    if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this._msg.success(this.i18n.fanyi('cashManage.listPage.alert.stateSuc'));
                        this.CashListTable.doSearch();
                    } else {
                        this._msg.error(_res.message);
                    }
                });


            }
        })
    }

    /**
     * 新增
     */
    public onNewAdd(){
        const newWin = this.modalService.open({
            title:this.i18n.fanyi('cashManage.cashAdd.title'),
            content:CashManageListAddbtnWinComponent,
            footer:false,
            maskClosable:false,
            width:550
        });
        newWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('eleAccount.listPage.alert.opsuc'));
                this.CashListTable.doSearch();
            }
        })
    }

    /**
     * 编辑
     * @param row
     */
    onEdit(row:any){
        if(row['poolNo']){
            const editWin = this.modalService.open({
                title:this.i18n.fanyi('cashManage.cashAdd.editTitle'),
                content:CashManageListAddbtnWinComponent,
                footer:false,
                maskClosable:false,
                width:550,
                componentParams: {
                    poolNo: row['poolNo'],
                    accountName: row['accountName'],
                }
            });
            editWin.subscribe(result => {
                if(result && result == 'onOk'){
                    this._msg.success(this.i18n.fanyi('eleAccount.listPage.alert.opsuc'));
                    this.CashListTable.doSearch(false);
                }
            })
        }
    }


    /**
     * 查询
     */
    onSearch(){
        this.CashListTable.doSearch();
    }


}
