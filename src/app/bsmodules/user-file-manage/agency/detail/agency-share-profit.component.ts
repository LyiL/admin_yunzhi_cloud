import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AgencyService} from "../../../../common/services/request/user-file-manage/agency.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {MenuService, ModalHelper} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {AgencyChannelAddWinComponent} from "../win/agency-share-profit-win/agency-share-profit-add-win.component";
import {NzLocaleService, NzMessageService, NzModalService} from "ng-zorro-antd";
import {SimpleTableComponent, SimpleTableService} from "@delon/abc";
import {HelperService} from "../../../../common/services/helper.service";
import {AgencyChannelDetailWinComponent} from "../win/agency-share-profit-win/agency-share-profit-detail-win.component";
import {newClone} from "@delon/abc/utils/utils";

/**
 * 代理商详情分润配置页
 */
@Component({
    selector:'agency-share-profit',
    templateUrl:'./agency-share-profit.component.html',
    providers:[SimpleTableService]
})
export class AgencyChannelComponent implements OnInit,OnDestroy{
    /**
     * 渠道信息配置
     */
    public tableCfg:any;
    @ViewChild('agencyChannelTable') public agencyChannelTable:SimpleTableComponent;
    constructor(public i18n:I18NService,
                protected agencyService:AgencyService,
                public menuService:MenuService,
                public router:Router,
                protected modalService: NzModalService,
                public helper:HelperService,
                public message: NzMessageService,
                public modalHelper:ModalHelper,
                public log:NzLocaleService,
    ){}
    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let params = menu['params'];
        let chanCode = params['chanCode'];
        this.tableCfg = {
            url:AgencyService.AGENCY_CHANNEL_LIST_URL,
            params:{chanNo:chanCode},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.transType"),
                index:"transType"
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.categoryType"),
                render:'categoryTypeRender'
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.limitDay"),
                render:"limitDayRender"
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.limitCount"),
                render:"limitCountRender"
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.chanRate"),
                index:"chanRate"
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.fixFloatRate"),
                render:"fixFloatRateRender"
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.settleCycle"),
                render:"settleCycleRender"
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.chanShareRule"),
                render:"shareRuleRender"
            },{
                title:this.i18n.fanyi("Agency.detailPage.shareProfitCfg.shareProfitInfo.state"),
                render:"stateRender"
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide:((row:any)=>{
                        if(this.helper.btnRole('AGENTPGEDIT')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: this.onEditChannel.bind(this)
                },{
                    text:this.i18n.fanyi("default.btn.detailBtn"),
                    hide:((row:any)=>{
                        if(this.helper.btnRole('AGENTDETAILDIVIDECONF')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click:((row)=>{
                        this.modalHelper.static(AgencyChannelDetailWinComponent,{channelInfoData:row},670);
                    }).bind(this)
                }
                // ,{
                //     text: this.i18n.fanyi('default.btn.delBtn'),
                //     hide:((row:any)=>{
                //         if(this.helper.btnRole('AGENTPGDELETE')){
                //             return false;
                //         }
                //         return true;
                //     }).bind(this),
                //     click: this.onDeleteChannel.bind(this)
                // }
                ]
            }]
        };
    }

    ngOnDestroy(){}

    /**
     * 变更启用状态
     * @param id 数据ID
     * @param state 当前状态值
     */
    public onStateClick(id:number,state:any){
        let confirm = this.modalService.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('Agency.detailPage.shareProfitCfg.changeUsed')
        });
        confirm.subscribe(result=>{
            if(result && result == 'onOk'){
                this.agencyService.updataStateInfo({id: id, state: state == 0 ? 1 : 0}).subscribe((res)=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.message.success(this.i18n.fanyi('default.hint.changeSuccess'));
                        this.agencyChannelTable.doSearch();
                        confirm.destroy();
                    }else{
                        this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        });
    }

    /**
     * 新增分润配置信息
     */
    onAddChannel(){
        // this.log.debug('表格data：：：',this.agencyChannelTable._data);
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.agencyChannelTable._data;
        const subscription = this.modalHelper.static(AgencyChannelAddWinComponent,{
            orgId: menuParams['orgId'],
            chanCode: menuParams['chanCode'],
            parentChanCode: menuParams['parentChanCode'],
            categoryTypeGroup:menuParams['categoryTypeGroup'],
            bankCode:menuParams['bankCode'],
            tableData:tableData
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfoAddTitle'),width:'900px'});
        subscription.subscribe(res => {
            this.agencyChannelTable.doSearch(false);//刷新表格
        });
    }
    /**
     * 编辑分润配置信息
     */
    onEditChannel(row:any){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        let tableData = this.agencyChannelTable._data;
        const subscription = this.modalHelper.static(AgencyChannelAddWinComponent,{
            model:newClone(row),//这里的编辑也需要将row赋值给model，否则会有列表上的值与弹框里的值不同步的问题（弹框里的那几个需要给默认值的字段会被识别为undefine，然后会给其赋默认值）
            orgId: menuParams['orgId'],
            chanCode: menuParams['chanCode'],
            parentChanCode: menuParams['parentChanCode'],
            categoryTypeGroup:menuParams['categoryTypeGroup'],
            bankCode:menuParams['bankCode'],
            id: row['id'],
            tableData:tableData
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfoEditTitle'),width:'900px'});
        subscription.subscribe(res => {
            this.agencyChannelTable.doSearch(false);//刷新表格
        })
    }

    /**
     * 表格点击删除触发事件
     */
    onDeleteChannel(row:any){
        let that = this;
        that.modalService.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content:  row['centerName']?this.i18n.fanyi('Agency.detailPage.shareProfitCfg.tips.delTip1')+row['centerName']+this.i18n.fanyi('Agency.detailPage.shareProfitCfg.tips.delTip2'):this.i18n.fanyi('Agency.detailPage.shareProfitCfg.tips.delTip3'),
            maskClosable:false,// 点击蒙层不允许关闭;
            onOk() {
                that.agencyService.deleteChannelInfos({id:row['id']}).subscribe((res) => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        that.message.success(this.i18n.fanyi('default.hint.delSuccess'));
                        that.agencyChannelTable.doSearch(false);//刷新表格
                    }else {
                        that.message.warning(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            },
            onCancel() {
            }
        })
    }

}
