import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {ReuseTabService, SearchWindowConfig, SimpleTableComponent} from '@delon/abc';
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {mchForm} from "../../../common/form/user-file-manage/mch.form";
import {CommonEnum} from "../../../common/enum/common.enum";
import {CommonService} from "../../../common/services/request/common.service";
import {mchService} from "../../../common/services/request/user-file-manage/mch.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {MchAccountInfoWinComponent} from './win/mch-account-info-win';
import {ModalHelper} from '@delon/theme';
import {MchWxconfigWinComponent} from './win/mch-wxconfig-win';

/**
 * 商户列表页面业务
 */
@Component({
    selector:'mch-list',
    templateUrl:'./merchant-list.component.html',
    providers: [mchService,CommonService]
})
export class MerchantListComponent implements OnInit{
    public mchListForm:mchForm = new mchForm();
    public UloCode:any; //优络编码
    /**
     * 受理机构配置
     */
    public agencyCodeCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Mch.listPage.BankCfg.title'),
        url: CommonService.BANKINFO_URL,
        // params: {chanType: 0},
        isAjax: false,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'orgNo',
            label: this.i18n.fanyi('Mch.listPage.BankCfg.BankNo')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Mch.listPage.BankCfg.BankName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Mch.listPage.BankCfg.BankNo'),
            index: 'orgNo'
        }, {
            title: this.i18n.fanyi('Mch.listPage.BankCfg.BankName'),
            index: 'name'
        }]
    };



    /**
     * 审核状态
     */
    public examineStatus:Array<any> = [];
    /**
     * 支付权限
     */
    public tradeAuth:Array<any> = [];
    /**
     * 所属上级控件配置
     */
    public chanNoTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Mch.listPage.ChanCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        params: {},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('Mch.listPage.ChanCfg.chanNo')
        },{
            field:'name',
            label:this.i18n.fanyi('Mch.listPage.ChanCfg.chanName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Mch.listPage.ChanCfg.chanNo'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('Mch.listPage.ChanCfg.chanName'),
            index:'name'
        }]
    };
    /**
     * 通道类型控件配置
     */
    public centerIdTableCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('Mch.listPage.CenterCfg.title'),
        url:CommonService.PAYCENTER_INFO_URL,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'name',
            label:this.i18n.fanyi('Mch.listPage.CenterCfg.centerName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('Mch.listPage.CenterCfg.centerName'),
            index:'name'
        }]
    };
    /**
     * 商户列表控件配置
     */
    @ViewChild('mchListTable') public mchListTable:SimpleTableComponent;
    public tableCfg:any = {
        url:mchService.MCH_LIST_URL,
        params:this.mchListForm,
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('Mch.listPage.tableCols.name'),
                index:'name',

            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.merchantNo'),
                index:'merchantNo'
            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.outerBatchId'),
                // index:'outerBatchId',
                render:"outerBatchIdRender",

            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.shortName'),
                index:'shortName',

            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.chanName'),
                // index:'chanName',
                render:"chanNameRender",

            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.bankName'),
                index:'bankName',

            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.examState'),
                // index:'examState',
                render:"examStateRender"
            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.alipayMchLive'),
                // index:'alipayMchLive',
                render:"alipayMchLiverender",
            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.aliPayMchLiveSearch'),
                // index:'aliPayMchLiveSearch',
                render:"aliPayMchLiveSearchRender",
            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.tradeAuth'),
                // index:'tradeAuth',
                render:"tradeAuthRender",

            },{
                title:this.i18n.fanyi('Mch.listPage.tableCols.weixinAccountSet'),
                // index:'weixinAccountSet',
                render:"weixinAccountSetRender",

            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.detailBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('MCHDETAIL')){
                            return true;
                        }
                    }),
                    click: ((record: any) =>{
                        this.helper.navigate('/admin/user/mchdetail',this.i18n.fanyi('Mch.mchDetail'),{id:record['id'],bankNo:record['bankNo'],bankName:record['bankName'],orgId:record['orgId'],merchantNo:record['merchantNo'],chanNo:record['chanNo'],categoryType:record['categoryType']});
                    }).bind(this)
                }]
            }
        ]
    };

    constructor(public helper:HelperService,public i18n:I18NService,public reuseTabDB:ReuseTabService,
                public msg: NzMessageService,public modal: NzModalService, public modalHelper:ModalHelper,
    public mchDb:mchService,public commonDb:CommonService
    ){

    }

    ngOnInit(){
        this.examineStatus = this.helper.getDictByKey('EXAMINE_STATUS');
        this.tradeAuth = this.helper.getDictByKey('MCH_WECHAT_TRADE_AUTH');

        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');

        this.reuseTabDB.change.subscribe(res =>{
            if(res && res["active"] == "refresh" &&res['pageName'] == "user/mchlist"){
                this.onSearch(false);
            }
        })

    }
    /**
     * 受理机构选中事件
     * @param value
     */
    agencyCodesearchSelected(value){
        this.mchListForm.bankNo = value.orgNo;
        this.mchListForm.chanName =null;
        this.mchListForm.chanNo =null;
    }
    /**
     * 所属上级搜索前事件
     */
    public chanNoSearchBefore(){
        if(this.mchListForm.bankNo){
            this.chanNoTableCfg.params = {bankCode:this.mchListForm.bankNo};
        }else {
            this.chanNoTableCfg.params = {bankCode:this.UloCode};
        }
    }
    /**
     * 查询
     */
    public onSearch(Search:boolean = true){
        this.mchListTable.doSearch(Search);
    }
    /**
     * 新增商户
     */
    public onAdd(){
        this.helper.navigate('/admin/user/merchantadd',this.i18n.fanyi('Mch.step.title'),{});
    }
    onSelectValue(value){
        this.mchListForm.chanName = value.name;
    }
    /**
     * 批量认证
     */
    public onAuthentication(e:MouseEvent){
        if(!this.mchListForm.chanNo){
            this.msg.warning(this.i18n.fanyi('Mch.tips.onAuthenticationTips1'));
            return false;
        }
        if(this.mchListForm['examState'] !== 0 ){
            this.msg.warning(this.i18n.fanyi('Mch.tips.onAuthenticationTips1'));
            return false;
        }
        this.modal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('Mch.tips.onAuthenticationConfirm1')+"【"+this.mchListForm.chanName+"】"+this.i18n.fanyi('Mch.tips.onAuthenticationConfirm2'),
            okText: this.i18n.fanyi('Modal.okText'),
            maskClosable:false,
            onOk: () => {
                this.mchDb.batchAuthentication(this.mchListForm).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('Mch.tips.onAuthenticationTipsOk'));
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY])
                    }
                    this.mchListTable.doSearch();
                })
            }
        });
    }
    //查询这个商户的支付宝的等级事件
    public aliPayMchLiveSearch(row:any){
        this.mchDb.aliPayMchLiveFind({id:row['id']}).subscribe((res)=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('Mch.tips.searchSuc'));
                this.mchListTable.doSearch(false);
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY])
            }

        });
    }

    /**
     * 变更微信支付权限状态
     * @param row
     * @returns {boolean}
     */
    onChangeStatus(row){
        if(row['examState'] != 1 ){
            this.msg.warning(this.i18n.fanyi('Mch.tips.onChangeStatusMsg'));
            return false;
        }
        this.modal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('Mch.tips.onChangeStatusConfirm'),
            okText: this.i18n.fanyi('Modal.okText'),
            maskClosable:false,
            onOk: () => {
                this.mchDb.mchwxConfrim({id:row['id']}).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('Mch.tips.onChangeStatusSuccess'));
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY])
                    }
                    this.mchListTable.doSearch(false);
                })
            }
        });
    }

    /**
     * 微信公众帐号配置
     * @param row
     */
    onConfig(row){
        if(row['examState'] != 1){
            this.msg.warning(this.i18n.fanyi('Mch.tips.onConfigWarn'));
            return false;
        }
        this.mchDb.centerMirJspFind({merchantId:row['id']}).subscribe((res)=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                let win = this.modalHelper.static(MchWxconfigWinComponent,{
                    mchId: row['id'],
                },600,{title: this.i18n.fanyi('Mch.tips.onConfigTitle')});
                win.subscribe(res => {
                    this.mchListTable.doSearch(false);//刷新表格
                })
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY])
            }
        });
    }
    /**
     * 查询微信公众帐号配置
     * @param row
     */
    onSearchW(row){
        this.mchDb.accountConfigFind({mchId:row['id']}).subscribe((res)=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                let _data = res[CommonEnum.SERVER_DATA_KEY];
                this.helper.navigate('/admin/user/merchantweixincfgdetail',this.i18n.fanyi('Mch.tips.onSearchWTitle'),_data);
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY])
            }
        });
    }
    /**
     * 判断配置项是否匹配对应值
     * @param cfgKey  配置项key
     * @param val 匹配值
     * @return 匹配到返回true ,否 false
     */
    hasConfigValueMatch(cfgKey:string,val:any):boolean{
        let _cfgVal = this.helper.getDictByKey(cfgKey);
        if(_cfgVal && typeof _cfgVal === 'string'){
            let _cfgVals = _cfgVal.split(',');
            if(_cfgVals.findIndex((item)=>{return item == val}) != -1){
                return true;
            }
        }
        return false;
    }

}
