import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MenuService,ModalHelper} from "@delon/theme";
import {NzMessageService, NzModalService, ObjectExtend} from 'ng-zorro-antd';
import {SimpleTableComponent} from "@delon/abc";
import {newClone} from "@delon/abc/utils/utils";
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {HelperService} from '../../../../../common/services/helper.service';
import {ServiceProviderService} from '../../../../../common/services/request/user-file-manage/service-provider.service';
import {CommonEnum} from '../../../../../common/enum/common.enum';
import {SpChannelWinComponent} from '../../win/channel/sp-channel-win.component';
import {SpTotalChannelWinComponent} from '../../win/total-channel/sp-totalChannel-win.component';
import {SpChannelInfoWinComponent} from '../../win/channel/sp-channel-info-win.component';
import {SpTradeRuleWinComponent} from '../../win/trade-rule/sp-tradeRule-win.component';
import {SimpleTableData} from '@delon/abc/simple-table/interface';

/**
 * 服务商详情页-渠道配置页
 */
@Component({
    selector:'sp-detail-channel',
    templateUrl:'./sp-detail-channel.component.html',
    providers: [ServiceProviderService]
})
export class SpDetailChannelComponent implements OnInit{
    /**
     * 服务商总通道信息表格配置
     */
    public totalChannelTableCfg:any;
    /**
     * 服务商总通道信息表格控件
     */
    @ViewChild('spTotalChannelTable') spTotalChannelTable: SimpleTableComponent;
    /**
     * 服务商渠道信息表格配置
     */
    public channelTableCfg:any;
    /**
     * 服务商渠道信息表格控件
     */
    @ViewChild('spChannelTable') spChannelTable: SimpleTableComponent;

    /**
     * 总资源池配置数据
     */
    public poilData:any;

    /**
     *  路由配置数据
     */
    public tradeRuleData:any;

    constructor(public i18n:I18NService,
                public menuService: MenuService,
                public router:Router,
                public confirmServ: NzModalService,
                public spService:ServiceProviderService,
                public msg:NzMessageService,
                public helper: HelperService,
                public modalHelper:ModalHelper,
                public objectExtend:ObjectExtend
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        if(this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',menuParams['bankCode'])){
            /**
             * 总通道信息配置基础信息
             */
            this.totalChannelTableCfg = {
                url:ServiceProviderService.SP_TOTAL_CHANNEL_LIST_URL,
                params:{proNo: menuParams['chanCode']},
                isAjax:true,
                resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
                reqReName:CommonEnum.TABLE_REQ_RE_NAME,
                tableColumns:[
                    {
                        // 银行
                        title:this.i18n.fanyi("SP.detailPage.totalChannelCfg.table.bankNo"),
                        index:'bankName',
                        width:'400px'
                    },
                    {
                        // 银行服务商编号
                        title:this.i18n.fanyi("SP.detailPage.totalChannelCfg.table.bankProNo"),
                        render:'bankProNoRender'
                    },
                    {
                        // 同步状态
                        title:this.i18n.fanyi("SP.detailPage.totalChannelCfg.table.applyState"),
                        render:'applyStateRender'
                    },
                    {
                        // 最近同步时间
                        title:this.i18n.fanyi("SP.detailPage.totalChannelCfg.table.applyTime"),
                        render:'applyTimeRender'
                    },
                    {
                        title:this.i18n.fanyi("default.tableCol.action"),
                        buttons:[
                            {
                                // 编辑
                                text:this.i18n.fanyi("default.btn.editBtn"),
                                hide:(function (row: any) {
                                    if(this.helper.btnRole('TOTALSPPGEDIT')) {
                                        return false;
                                    }
                                    return true;
                                }).bind(this),
                                click:this.onEditTotalChannel.bind(this)
                            },
                            {
                                // 同步
                                text:this.i18n.fanyi("SP.detailPage.totalChannelCfg.btn.syncBtn"),
                                hide:(function (row: any) {
                                    if(this.helper.btnRole('TOTALSPPGSYNC')) {
                                        return false;
                                    }
                                    return true;
                                }).bind(this),
                                click:this.onSyncApplyBank.bind(this)
                            }
                        ]
                    }
                ]
            };

            /**
             * 初始化路由配置
             */
            this.loadTradeRule({parentNo: menuParams['chanCode']});
        }

        /**
         * 渠道信息配置基础信息
         */
        this.channelTableCfg = {
            url:ServiceProviderService.SP_CHANNEL_LIST_URL,
            params:{merchantId:menuParams['chanCode']},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            preDataChange: ((data: SimpleTableData[]) => {
                data.forEach(item => {
                    item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'division',100);
                    item['limitSingle'] = this.helper.isEmpty(item['limitSingle']) ? null : this.helper.numberTrans(item['limitSingle'],'division',100);
                    item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'division',100);
                });
                return data;
            }).bind(this),
            tableColumns:[
                {
                    title:this.i18n.fanyi("SP.detailPage.channelCfg.channelTable.transId"),
                    index:'transType'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.channelCfg.channelTable.agencyCode"),
                    index:'agencyName'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.channelCfg.channelTable.ptCenterId"),
                    index:'ptCenterName'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.channelCfg.channelTable.providerNo"),
                    render:'providerNoRender'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.channelCfg.channelTable.used"),
                    render:'usedRender'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.channelCfg.channelTable.settleCycle"),
                    render:'settleCycleRender'
                },
                {
                    title:this.i18n.fanyi("SP.detailPage.channelCfg.channelTable.settleRate"),
                    index:"settleRate"
                },
                {
                    title:this.i18n.fanyi("default.tableCol.action"),
                    buttons:[
                        {
                            // 编辑
                            text:this.i18n.fanyi("default.btn.editBtn"),
                            hide:(function (row: any) {
                                if(this.helper.btnRole('SPPGEDIT')) {
                                    return false;
                                }
                                return true;
                            }).bind(this),
                            click:this.editChannelInfo.bind(this)
                        },
                        {
                            // 详情
                            text:this.i18n.fanyi("default.btn.detailBtn"),
                            hide:(function(){
                                if (this.helper.btnRole('LOOKCHANRATEINFO')) {
                                    return false;
                                }
                                return true;
                            }).bind(this),
                            click:((row)=>{
                                this.modalHelper.static(SpChannelInfoWinComponent,{channelInfoData:row}, 800);
                            }).bind(this)
                        }
                    ]
                }
            ]
        };

        /**
         * 初始化轮循配置
         */
        // this.loadPoil({chanCode: params['chanCode']});
    }

    /**
     * 调整启用状态方法
     * @param id 数据ID
     * @param used 当前状态值
     */
    public onUsedClick(row: any){
        let confirm = this.confirmServ.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('SP.detailPage.channelCfg.changeUsed')
        });
        confirm.subscribe(result=>{
            if(result && result == 'onOk'){
                let _used = row['used'] == 1 ? 0 : 1;
                this.spService.saveState({
                    id: row['id'],
                    used: _used }
                ).subscribe((res)=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                        this.spChannelTable.doSearch();
                        confirm.destroy();
                    }else{
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }

    /**
     * 编辑渠道信息
     * @param row
     */
    public editChannelInfo(row){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.spChannelTable._data;
        let bankName$:any;
        if(!this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',menuParams['bankCode'])){
            bankName$ = menuParams['bankName'];
        };
        let channelWin = this.modalHelper.static(SpChannelWinComponent, {
            model:newClone(row),
            id:row['id'],
            chanCode:menuParams['chanCode'],
            bankCode:menuParams['bankCode'],
            bankName:bankName$,
            parentChanCode:menuParams['parentChanCode'],
            categoryTypeGroup:menuParams['categoryTypeGroup'],
            tableData:tableData,
        }, 1000, {title: this.i18n.fanyi('SP.win.channnel.editTitle')});

        channelWin.subscribe(() => {
            this.spChannelTable.doSearch();
        })
    }

    /**
     * 新增渠道信息
     */
    public addChannel() {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.spChannelTable._data;
        let bankName$ = null;
        if(!this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',menuParams['bankCode'])){
            bankName$ = menuParams['bankName'];
        }
        let channelWin = this.modalHelper.static(SpChannelWinComponent, {
            chanCode:menuParams['chanCode'],
            bankCode:menuParams['bankCode'],
            bankName:bankName$,
            parentChanCode:menuParams['parentChanCode'],
            categoryTypeGroup:menuParams['categoryTypeGroup'],
            tableData: tableData,
        }, 1000, {title: this.i18n.fanyi('SP.win.channnel.newTitle')});
        channelWin.subscribe(() => {
            this.spChannelTable.doSearch();
        })
    }

    /**
     * 新增总通道信息（单条）
     */
    public addTotalChannel(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.spTotalChannelTable._data;
        let subscription = this.modalHelper.static(SpTotalChannelWinComponent,{
            proNo: menuParams['chanCode'],
            tableData: tableData
        }, 500 ,{title: this.i18n.fanyi('SP.win.totalChannel.newTitle')});
        subscription.subscribe(res => {
            this.spTotalChannelTable.doSearch(false); // 刷新账户信息
        })
    }

    /**
     * 编辑总通道信息（单条）
     */
    public onEditTotalChannel(row:any){
        let tableData = this.spTotalChannelTable._data;
        const subscription = this.modalHelper.static(SpTotalChannelWinComponent,{
            model:newClone(row),
            tableData:tableData
        },500,{title: this.i18n.fanyi('SP.win.totalChannel.editTitle')});
        subscription.subscribe(res => {
            this.spTotalChannelTable.doSearch(false);//刷新表格
        })
    }

    /**
     * 同步相关银行(单条)
     */
    public onSyncApplyBank(row:any){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let _content = this.i18n.fanyi('SP.detailPage.totalChannelCfg.table.syncConfirmBefore') + row['bankName'] + this.i18n.fanyi('SP.detailPage.totalChannelCfg.table.syncConfirmAfter');
        let syncWin = this.confirmServ.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:_content,
            maskClosable:false
        });
        syncWin.subscribe(result => {
            if(result && result == 'onOk'){
                this.spService.syncTotalChannel({
                    proNo: menuParams['chanCode'],
                    bankNo: row['bankNo']
                }).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('Salesman.win.message.success'));
                        this.spTotalChannelTable.doSearch(false);
                    }else{
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }

    /**
     * 加载轮循配置
     * @param data
     */
    public loadPoil(data){
        this.spService.loadpoil(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                let resultData = res[CommonEnum.SERVER_DATA_KEY];
                this.poilData = resultData['usePolling'];
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 切换轮循配置
     * @param data
     */
    public onChangePoil(data){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let menuParams = menu['params'];
            let _chanCode = menuParams['chanCode'];
            let _msg = data == 0 ? this.i18n.fanyi('SP.detailPage.poilCfg.enablePoilMsg') : this.i18n.fanyi('SP.detailPage.poilCfg.disablePoilMsg');
            let _poil = data == 0 ? 1 : 0;
            const poilWin = this.confirmServ.confirm({
                title:this.i18n.fanyi('default.hint.hintInfo'),
                content:_msg,
                maskClosable:false
            });
            poilWin.subscribe(result => {
                if(result && result == 'onOk'){
                    this.spService.updatepoil({
                        chanCode: _chanCode,
                        usePolling: _poil
                    }).subscribe(res=>{
                        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                            this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                            this.loadPoil({chanCode: _chanCode});
                        }else{
                            this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                        }
                    })
                }
            })
        }
    }

    /**
     * 加载路由配置
     * @param data
     */
    public loadTradeRule(data){
        this.spService.loadTradeRule(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                if(res[CommonEnum.SERVER_DATA_KEY]){
                    this.tradeRuleData = res[CommonEnum.SERVER_DATA_KEY];
                }
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 切换路由配置
     */
    public onChangeTradeRule(data){
        let _msg:string;
        let win:any;
        let _ruleState:number;
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        if(!data || data['ruleState'] == 1){
            _ruleState = 0;
            _msg = this.i18n.fanyi('SP.detailPage.tradeRuleCfg.disableMsg');
            // 打开支付类型弹窗
            win = this.modalHelper.static(SpTradeRuleWinComponent,{
                parentNo:menuParams['chanCode'],
                ruleState:_ruleState,
                attention:_msg
            },500,{title:this.i18n.fanyi('default.hint.hintInfo')});
            win.subscribe(res => {
                this.loadTradeRule({parentNo:menuParams['chanCode']}); // 刷新路由配置信息
            })
        }else{
            _ruleState = 1;
            // 打开提示弹窗
            _msg = this.i18n.fanyi('SP.detailPage.tradeRuleCfg.enableMsg');
            win = this.confirmServ.confirm({
                title:this.i18n.fanyi('default.hint.hintInfo'),
                content:_msg,
                maskClosable:false
            });
            win.subscribe(res => {
                if(res && res == 'onOk'){
                    this.spService.saveTradeRule({
                        parentNo:menuParams['chanCode'],
                        ruleState:_ruleState
                    }).subscribe(result => {
                        if(result && result[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                            this.msg.success(this.i18n.fanyi('default.hint.changeSuccess')); // 提交成功
                            this.loadTradeRule({parentNo:menuParams['chanCode']}); // 刷新路由配置信息
                        } else {
                            this.msg.error(result[CommonEnum.SERVER_MES_KEY]); // 返回失败信息
                        }
                    })
                }
            })
        }
    }

    /**
     * 判断所属银行
     */
    public onBankBelong():boolean {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        if(this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',menuParams['bankCode'])){
            return true;
        }
        return false;
    }
}
