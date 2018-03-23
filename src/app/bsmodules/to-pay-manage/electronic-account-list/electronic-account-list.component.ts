import {Component, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ElectronicAccountListForm} from "../../../common/form/to-pay-manage/electronic-account-list.form";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {ElectronicAccountListSevice} from "../../../common/services/request/to-pay-manage/electronic-account-list.sevice";
import {CommonEnum} from "../../../common/enum/common.enum";
import {HttpHeaders} from "@angular/common/http";
import {ElectronicAccountListDistributionWinComponent} from "./ectronic-account-list-distribution-win.component";
import {AddElectronicAccountWinComponent} from "./add-electronic-account/add-electronic-account-win.component";
import {ElectronicAccountIstTakecashbtnWinComponent} from "./electronic-account-ist-takecashbtn-win.component";
import {CommonService} from "../../../common/services/request/common.service";
import {ModalHelper} from "@delon/theme";

/**
 * 电子账户
 */
@Component({
    selector: 'electronic-account-list',
    templateUrl: "electronic-account-list.component.html",
    providers: [ElectronicAccountListSevice]
})
export class ElectronicAccountListComponent{
    public eleForm:ElectronicAccountListForm = new ElectronicAccountListForm()   //列表查询from
    public startStates:Array<any> = [];  // 启用状态

    @ViewChild('eletronicAccountTable') public eletronicAccountTable:SimpleTableComponent;  //获取表格模块
    constructor(public helper: HelperService,
                public i18n: I18NService,
                public modalService: NzModalService,
                public _msg: NzMessageService,
                public modal: NzModalService,
                public modalHelper:ModalHelper,
                public electronicAccountListSevice:ElectronicAccountListSevice
                ) {
        this.startStates = this.helper.getDictByKey('ENABLE_STATUS');  //获取启用状态数据
    }


    /**
     * 所属商户配置
     * @type {{title: (string | any); url: string; isAjax: boolean; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; searchFields: [{field: string; label: (string | any)} , {field: string; label: (string | any)}]; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string}]}}
     */
    public eleCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('eleAccount.listPage.search.organNoTitle'),
        // url:ElectronicAccountListSevice.QUERY_DEALERINFO_URL,
        url:CommonService.MCH_INFO_URL,
        params:{isStore:0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('eleAccount.listPage.search.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('eleAccount.listPage.search.name')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('eleAccount.listPage.search.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('eleAccount.listPage.search.name'),
            index:'name'
        }]
    }


    /**
     * 列表数据源
     * @type {{url: string; params: ElectronicAccountListForm; isAjax: boolean; reqHeaders: HttpHeaders; resReName: {list: string; total: string; pi: string; ps: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); render: string} , {title: (string | any); buttons: [{text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any} , {text: (string | any); hide: any; click: any}]}]}}
     */
    public electronicAccTableCfg:any = {
        url:ElectronicAccountListSevice.CASHACCOUNT_SEARCH_URL,
        params:this.eleForm,
        isAjax:true,
        reqHeaders :new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' }),
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.accountNo'),      //账户编号
                index:'accountNo'
            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.accountName'),  //账户名称
                index:'accountName'
            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.organName'),   //所属商户
                index:'organName'
            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.outMchno'), //外部商户号
                render:'outMchnoRender',

            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.cashpoolName'),   //归属资金池
                render:'cashpoolNameRender',

            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.useState'),   //启用状态
                render:'useStateRender',
            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.a'),  //记账明细
                render:'aRender',

            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.singleProcsFee'), //对公手续费（元）<br/>对私手续费（元）<br/>垫资手续费（%）
                render:'singleProcsFeeRender',

            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.currentAmount'),  //可用余额（元）
                index:'currentAmount',

            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.canSettleBalance'),  //可结算余额（元）
                render:'canSettleBalanceRender',

            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.f'),  //分配账号
                render:'fRender',

            },{
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.b'),  //余额查询
                render:'bRender',

            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    { // 编辑
                        text: this.i18n.fanyi('RM.listPage.tableActionCfg.edit'),
                        hide: (() => {
                            if (this.helper.btnRole('EACCOUNTEDIT')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onEdit.bind(this)
                    },{
                        // 详情
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('EACCOUNTINFO')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((record: any) =>{
                            this.helper.navigate('/admin/topay/electronicaccountdetail',this.i18n.fanyi('eleAccount.listPage.navigate.eledetail'),{accountNo: record['accountNo']});
                        }).bind(this)
                    },{ // 提现
                        text: this.i18n.fanyi('eleAccount.listPage.tableCfg.cash'),
                        hide: (() => {
                            if (this.helper.btnRole('EACCOUNTWITHDRAW')) {
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onTakeCash.bind(this)
                    }]
            }
        ]
    };



    /**
     * 查询
     */
    onSearch(){
        this.eletronicAccountTable.doSearch();
    }

    /**
     * 记账明细
     */
    onAccountDetails(record:any){
        this.helper.navigate('/admin/topay/electronicaccountaccountdetail',this.i18n.fanyi('eleAccount.listPage.navigate.elecaccountdetail'),{accountNo: record['accountNo']})
    }
    /**
     * 新增
     */
    public onNewAdd(){
        // const newWin = this.modalService.open({
        //     title:this.i18n.fanyi('eleAccount.addeleAct.html.title'),
        //     content:AddElectronicAccountWinComponent,
        //     footer:false,
        //     maskClosable:false,
        //     width:900
        // });
        const newWin = this.modalHelper.static(AddElectronicAccountWinComponent,{

        },950,{title:this.i18n.fanyi('eleAccount.addeleAct.html.title')});
        newWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('eleAccount.listPage.alert.opsuc'));
                this.eletronicAccountTable.doSearch();
            }
        })
    }

    /**
     * 编辑
     */
    onEdit(row:any){
        // const newWin = this.modalService.open({
        //     title:this.i18n.fanyi('eleAccount.addeleAct.html.title'),
        //     content:AddElectronicAccountWinComponent,
        //     footer:false,
        //     maskClosable:false,
        //     width:900,
        //     componentParams: {
        //         accountNo: row['accountNo'],
        //     }
        // });
        const newWin = this.modalHelper.static(AddElectronicAccountWinComponent,{
            accountNo: row['accountNo'],
        },'lg',{title:this.i18n.fanyi('eleAccount.addeleAct.html.title'),width:950});
        newWin.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('eleAccount.listPage.alert.opsuc'));
                this.eletronicAccountTable.doSearch();
            }
        })
    }

    /**
     * 余额查询
     */
    onSearchMoney(row:any){
        this.electronicAccountListSevice.loadSearchMoney({accountNo: row['accountNo']})
            .subscribe((_res) => {
                if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this._msg.success(this.i18n.fanyi('eleAccount.listPage.alert.moneySuc'));
                    this.eletronicAccountTable.doSearch();
                }else {
                    this._msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                }
            });
    }

    /**
     * 变更状态
     */
    public onEnabled(row:any) {
        const statusWin = this.modal.confirm({
            title:this.i18n.fanyi('StaffM.listPage.alert.prompt'),
            content: this.i18n.fanyi('cashManage.listPage.alert.changeState')
        });

        statusWin.subscribe(result => {
            if(result && result == 'onOk'){
                let _useStatus = row['useState'];
                if (_useStatus == 0) {
                    row['useState'] = 1;
                } else {
                    row['useState'] = 0;
                }
                this.electronicAccountListSevice.loadState({accountNo: row['accountNo'], useState:row['useState']}).subscribe(_res => {
                    if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this._msg.success(this.i18n.fanyi('cashManage.listPage.alert.stateSuc'));
                        this.eletronicAccountTable.doSearch();
                    } else {
                        this._msg.error(_res.message);
                    }
                });


            }
        })
    }


    /**
     * 提现
     */
    onTakeCash(row:any){
        if(row['useState'] == 0){
            this._msg.info(this.i18n.fanyi('eleAccount.listPage.alert.istascash'));
        }else if(this.helper.isEmpty(row['currentAmount']) || row['currentAmount'] == 0) {
            this._msg.info(this.i18n.fanyi('eleAccount.listPage.alert.nomoney'));
        }else{
            const onCash = this.modalService.open({
                title:this.i18n.fanyi('eleAccount.listPage.tableCfg.cash'),
                content:ElectronicAccountIstTakecashbtnWinComponent,
                footer:false,
                maskClosable:false,
                componentParams: {
                    accountNo: row['accountNo'],
                }
            });
            onCash.subscribe(result => {
                if(result && result == 'onOk'){
                    this._msg.success(this.i18n.fanyi('eleAccount.listPage.alert.opsuc'));
                    this.eletronicAccountTable.doSearch();
                }
            })
        }

    }


    /**
     * 分配
     */
    onDistribution(row:any){
        const onDistri = this.modalService.open({
            title:this.i18n.fanyi('eleAccount.listPage.fRender.title'),
            content:ElectronicAccountListDistributionWinComponent,
            footer:false,
            maskClosable:false,
            componentParams: {
                accountNo: row['accountNo'],
            }
        });
        onDistri.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('eleAccount.listPage.fRender.suc'));
                this.eletronicAccountTable.doSearch();
            }
        })
    }
}
