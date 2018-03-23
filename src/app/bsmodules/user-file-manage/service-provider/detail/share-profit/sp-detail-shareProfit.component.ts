import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {SimpleTableService, SimpleTableComponent, SimpleTableConfig} from '@delon/abc';
import {MenuService, ModalHelper} from "@delon/theme";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {newClone} from "@delon/abc/utils/utils";
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../../../common/enum/common.enum';
import {HelperService} from '../../../../../common/services/helper.service';
import {ServiceProviderService} from '../../../../../common/services/request/user-file-manage/service-provider.service';
import {SpShareProfitWinComponent} from '../../win/share-profit/sp-shareProfit-win.component';
import {SimpleTableData} from '@delon/abc/simple-table/interface';

/**
 * 服务商详情页-分润配置页
 */
@Component({
    selector:'sp-detail-share-profit',
    templateUrl:'./sp-detail-shareProfit.component.html',
    providers:[SimpleTableService,ServiceProviderService]
})
export class SpDetailShareProfitComponent implements OnInit{
    public shareCfgTableCfg: any; // 分润配置表格配置
    @ViewChild('spShareTable') spShareTable: SimpleTableComponent;

    constructor(
        public i18n:I18NService,
        public menuService: MenuService,
        public router:Router,
        public spService: ServiceProviderService,
        public modalHelper: ModalHelper,
        protected modalService: NzModalService,
        public msg: NzMessageService,
        public helper: HelperService
    ) {}


    ngOnInit() {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let params = menu['params'];

        this.shareCfgTableCfg = {
                url:ServiceProviderService.SP_SHARE_LIST_URL,
                params:{chanNo: params['chanCode']},
                isAjax:true,
                resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
                reqReName:CommonEnum.TABLE_REQ_RE_NAME,
                preDataChange: ((data: SimpleTableData[]) => {
                    data.forEach(item => {
                        item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'division',100);
                        item['limitSingleMax'] = this.helper.isEmpty(item['limitSingleMax']) ? null : this.helper.numberTrans(item['limitSingleMax'],'division',100);
                        item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'division',100);
                    });
                    return data;
                }).bind(this),
                tableColumns:[{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.transType"),        // 支付类型
                    index:'transType'
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.categoryType"),     // 行业类别
                    render:'categoryTypeRender'
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.limitDay"),         // 单日限额
                    // index:'providerNo',
                    render:'limitDayRender'
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.limitCount"),       // 单笔限额
                    // index:'providerNo',
                    render:'limitCountRender'
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.chanRate"),         // 费率
                    index:'chanRate'
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.fixFloatRate"),     // 费率类型
                    render:'fixFloatRateRender'
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.settleCycle"),      // 结算/分润周期
                    render:"settleCycleRender"
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.chanShareRule"),    // 分润规则
                    render:"chanShareRuleRender"
                },{
                    title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.state"),            // 状态
                    render:"stateRender"
                },{
                    title:this.i18n.fanyi("default.tableCol.action"), // 操作
                    buttons:[
                        {
                            // 编辑
                            text:this.i18n.fanyi("default.btn.editBtn"),
                            hide:(() => {
                                if(this.helper.btnRole('EDITDIVIDECONF')){
                                    return false;
                                }
                                return true;
                            }).bind(this),
                            click:((row)=>{
                                this.onEditShare(row);
                            }).bind(this)
                        }
                    ]
                }]
            };
    }

    /**
     * 变更启用状态
     * @param id 数据ID
     * @param state 当前状态值
     */
    public onStateClick(row: any){
        let confirm = this.modalService.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('SP.detailPage.channelCfg.changeUsed')
        });
        confirm.subscribe(result=>{
            if(result && result == 'onOk'){
                let _state = row['state'] == 0 ? 1 : 0;
                this.spService.updataStateInfo({
                    id: row['id'],
                    state: _state}
                ).subscribe((res)=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                        this.spShareTable.doSearch();
                        confirm.destroy();
                    }else{
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }

    /**
     * 详情页的分润配置新增
     * @param row
     */
    onAddShare() {
        let tableData = this.spShareTable._data;
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];
        let subscription = this.modalHelper.static(SpShareProfitWinComponent,{
            orgId: params['orgId'],
            chanCode: params['chanCode'],
            bankCode: params['bankCode'],
            parentChanCode: params['parentChanCode'],
            categoryType:params['categoryTypeGroup'],
            tableData: tableData,
        },1000 ,{title: this.i18n.fanyi('SP.detailPage.shareCfg.shareCfgWin.newTitle')});
        subscription.subscribe((res) => {
            this.spShareTable.doSearch(false);
        })
    }

    /**
     * 详情页的分润配置编辑
     * @param row
     */
    onEditShare(row) {
        let tableData = this.spShareTable._data;
        let menu = this.menuService.getUrlByMenu(this.router.url), params = menu['params'];

        let subscription = this.modalHelper.static(SpShareProfitWinComponent,{
            row: newClone(row),
            id: row['id'],
            orgId: params['orgId'],
            chanCode: params['chanCode'],
            bankCode: params['bankCode'],
            parentChanCode: params['parentChanCode'],
            categoryType:params['categoryTypeGroup'],
            tableData: tableData,
        },1000 ,{title: this.i18n.fanyi('SP.detailPage.shareCfg.shareCfgWin.editTitle')});
        subscription.subscribe((res) => {
            this.spShareTable.doSearch(false);
        })
    }

}
