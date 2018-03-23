import {Component, OnInit, ViewChild} from '@angular/core';
import {BatchSettleForm} from "../../../common/form/settlement-manage/batchsettle.form";
import {Observable} from "rxjs/Observable";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {
    HitMoneyDbService,
    hitMoneyLoad
} from "../../../common/services/request/settlement-manage/batch.settle.list.db.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {SettingsService} from "@delon/theme";
import {CommonService} from "../../../common/services/request/common.service";

/**
 * 结算打款列表页
 */

@Component({
  selector: 'batch-settle',
  templateUrl: './batch-settle-list.component.html',
  providers: [hitMoneyLoad,CommonEnum,HitMoneyDbService,CommonService]
})
export class batchSettleListComponent implements OnInit {
    public BatchSettleForm:BatchSettleForm = new BatchSettleForm();
    @ViewChild('BatchSettleListTable') public BatchSettleListTable:SimpleTableComponent;
    /**
     * 结算批次号
     */
    public batchs:Observable<any>;
    /**
     *账户类型
     */
    public actType: Array<any> = [];
    /**
     *同步状态
     */
    public syncStatus: Array<any> = [];
    /**
     *行内账户
     */
    public cardType: Array<any> = [];
    /**
     *操作类型
     */
    public syncMode: Array<any> = [];
    /**
     *最终状态
     */
    public finalState: Array<any> = [];
    /**
     * 受理机构配置
     */
    public agencyCodeCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.title'),
        url: CommonService.BANKINFO_URL,
        isAjax: false,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'orgNo',
            label: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyCode')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyCode'),
            index: 'orgNo'
        }, {
            title: this.i18n.fanyi('Settle.listPage.agencyCodeCfg.agencyName'),
            index: 'name'
        }]
    };
    /**
     * 所属商户控件配置
     */
    public mchTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('BatchSettle.listPage.MchCfg.title'),
        url:CommonService.MCH_INFO_URL,
        params:{isStore: 0},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('BatchSettle.listPage.MchCfg.specNo')
        },{
            field:'name',
            label:this.i18n.fanyi('BatchSettle.listPage.MchCfg.specName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('BatchSettle.listPage.MchCfg.specNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('BatchSettle.listPage.MchCfg.specName'),
            index:'name'
        }]
    };
    /**
     * 结算账户控件配置
     */
    public allyTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('BatchSettle.listPage.AllyCfg.title'),
        url:CommonService.COMPANIONFORBANK_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'companion',
            label:this.i18n.fanyi('BatchSettle.listPage.AllyCfg.ally')
        },{
            field:'name',
            label:this.i18n.fanyi('BatchSettle.listPage.AllyCfg.allyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('BatchSettle.listPage.AllyCfg.ally'),
            index:'companion'
        },{
            title:this.i18n.fanyi('BatchSettle.listPage.AllyCfg.allyName'),
            index:'companionName'
        }]
    };
    /**
     * 批量结款列表配置
     */

    public tableCfg:any = {
        url:HitMoneyDbService.BATCH_SETTLE_LIST_URL,
        params:this.BatchSettleForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('BatchSettle.listPage.tableCols.createTime'),
                index:'createTime',
                type:"date",
                dateFormat:"YYYY-MM-DD",
                width:"150px"
            },{
                title:this.i18n.fanyi('BatchSettle.listPage.tableCols.merchantName'),
                index:'merchantName',
                width:"300px"
            },{
                title:this.i18n.fanyi('BatchSettle.listPage.tableCols.bankBranchName'),
                index:'bankBranchName',
                width:"300px"
            },{
                title:this.i18n.fanyi('BatchSettle.listPage.tableCols.actName'),
                index:'actName',
                width:"300px"
            },{
                title:this.i18n.fanyi('BatchSettle.listPage.tableCols.bankCardNo'),
                index:'bankCardNo',
                width:"250px"
            },{
                title:this.i18n.fanyi('BatchSettle.listPage.tableCols.actType'),
                // index:'actType',
                render:"actTypeRender"
            }

            ,{
                title:this.i18n.fanyi('BatchSettle.listPage.tableCols.cashTotalFee'),
                index:'cashTotalFee'
                // render:"cashTotalRender"
            }

        ]
    };
    public summaryCount: any = {}; //统计数据
    public orgNumber:any; //当前登录的机构编码
    public UloCode:any; //优络编码
    constructor(public helper:HelperService,  public msg: NzMessageService,   public modal: NzModalService,
                public settingService:SettingsService,public objectExtend:ObjectExtend,
                public i18n:I18NService, public hitmoneyDB:hitMoneyLoad,public helpful:ObjectExtend){
        let userInfo = this.settingService.user;
        this.orgNumber = userInfo && userInfo['orgNo'];
        this.loadCountData();
    }
    ngOnInit(){
        this.actType = this.helper.getDictByKey('ACCOUNT_TYPE');
        this.cardType = this.helper.getDictByKey('ACCOUNT_CARD_TYPE');
        this.syncStatus = this.helper.getDictByKey('TRADE_CASH_SYNC_STATUS');
        this.syncMode = this.helper.getDictByKey('OPERATION_TYPE');
        this.finalState = this.helper.getDictByKey('BATCH_SETTLE_FINAL_STATUS');
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');
        this.loadSettleBatch();
    }
    public loadSettleBatch(){
        this.hitmoneyDB.loadSettleBatch({createTime: this.BatchSettleForm.createTime}).subscribe(res =>{
            this.batchs = res;
        });//打款批次号数据
    }
    onChangeTime(value){
        if(!this.helper.isEmpty(value)){
            this.BatchSettleForm.createTime = this.BatchSettleForm.format(value,"YYYY-MM-DD");
            this.loadSettleBatch();
        }
    }

    /**
     * 查询
     */
    public onSearch(){
        this.BatchSettleListTable.doSearch();
        this.loadCountData();
    }

    /**
     * 受理机构选中事件
     * @param value
     */
    agencyCodesearchSelected(value){
        this.BatchSettleForm.agencyCode = value.orgNo;
        this.BatchSettleForm.specNo = null;
        this.BatchSettleForm.specName = null;

    }
    /**
     * 商户搜索前事件
     */
    public merchantNoSearchBefore(){
        if(this.BatchSettleForm.agencyCode){
            this.mchTableCfg.params = {isStore: 0,bankNo:this.BatchSettleForm.agencyCode};
        }else {
            this.mchTableCfg.params = {isStore: 0,bankNo:this.UloCode};
        }
    }

    /**
     * 导出报表
     */
    public  onExportBtn(){
        this.hitmoneyDB.loadExport( this.objectExtend.clone(this.BatchSettleForm)).subscribe(res => {
            if(res instanceof FileReader){
                res.onloadend=(function(){
                    let _res = JSON.parse(res.result);
                    this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                }).bind(this);
            }else{
                this.msg.success(this.i18n.fanyi('Settle.exportInfo'));
                this.downloadFile(res.fileName, res.blob); //导出报表
            }
        });
    }
    downloadFile(fileName, content){
        var aLink = document.createElement('a');
        var blob = content;
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click()
    }


    /**
     * 面板统计
     * @param row
     */
    public loadCountData(){
        this.hitmoneyDB.loadSettleCount( this.objectExtend.clone(this.BatchSettleForm)).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.summaryCount = res[CommonEnum.SERVER_DATA_KEY];
            }
        });
    }

}
