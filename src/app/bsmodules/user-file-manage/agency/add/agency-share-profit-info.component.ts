import {Component, OnInit, ViewChild} from "@angular/core";
import {DynamicStepsService, SimpleTableComponent, SimpleTableService} from "@delon/abc";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {NzLocaleService, NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {MenuService, ModalHelper} from "@delon/theme";
import {AgencyService} from "../../../../common/services/request/user-file-manage/agency.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {AgencyChannelAddWinComponent} from "../win/agency-share-profit-win/agency-share-profit-add-win.component";
import {newClone} from "@delon/abc/utils/utils";

/**
 * 代理商新增分润配置信息（step3）
 */
@Component({
    selector:'agency-share-profit-info',
    templateUrl:'./agency-share-profit-info.component.html',
    providers:[AgencyService,SimpleTableService]
})
export class AgencyChannelInfoComponent implements OnInit{
    public isLoading:boolean = false;//按钮加载效果
    public stepData:any;
    /**
     * 渠道信息配置
     */
    public tableCfg:any;
    @ViewChild('agencyChannelTable') public agencyChannelTable:SimpleTableComponent;
    constructor(protected dynamicStepsService:DynamicStepsService,
                public helper:HelperService,
                public i18n:I18NService,
                protected agencyService:AgencyService,
                public menuService:MenuService,
                protected modalService: NzModalService,
                protected modalHelper: ModalHelper,
                public objectExtend:ObjectExtend,
                public simpleTableService:SimpleTableService,
                public message: NzMessageService,
                public log:NzLocaleService,
    ) {

    }

    ngOnInit() {
        this.simpleTableService.pTable = this.agencyChannelTable;//临时表
        this.stepData = this.dynamicStepsService.getStepByInstance(0);
        this.log.debug('this.stepData:::;',this.stepData);this.log.debug('this.stepData.model:::;',this.stepData.model);
        let chanCode = this.stepData.model['chanCode'];
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
                    click: this.onEditChannel.bind(this)
                },{
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    hide:(function(row:any){
                        if(row['id']){//数据库里已有的数据，不能删除
                            return true;
                        }
                        return false;
                    }),
                    click: this.onDeleteChannel.bind(this)
                }]
            }]
        };
    }

    /**
     * 变更状态
     * @param row
     */
    public onStateClick(row: any){
        let confirm = this.modalService.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('Agency.detailPage.shareProfitCfg.changeUsed')
        });
        confirm.subscribe(result=>{
            if(result && result == 'onOk'){
                row['state'] = (row['state'] == 1) ? 0 :1;
            }
        });
    }
    /**
     * 新增分润配置信息
     */
    onAddChannel(){
        let modelParams = this.stepData.model;
        let tableData = this.agencyChannelTable._data;
        const subscription = this.modalHelper.static(AgencyChannelAddWinComponent,{
            orgId: modelParams['orgId'],
            chanCode: modelParams['chanCode'],
            parentChanCode: modelParams['parentChanCode'],
            categoryTypeGroup:modelParams['categoryTypeGroup'],
            bankCode:modelParams['bankCode'],
            tableData:tableData,
            step:'channelStep'
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfoAddTitle'),width:'900px'});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res);
            }
        })
    }
    /**
     * 编辑分润配置信息
     */
    onEditChannel(row:any){
        // this.log.debug('this.simpleTableService.pTable;:::',this.simpleTableService.pTable);
        let modelParams = this.stepData.model;
        let tableData = this.agencyChannelTable._data;
        const subscription = this.modalHelper.static(AgencyChannelAddWinComponent,{
            orgId: modelParams['orgId'],
            chanCode: modelParams['chanCode'],
            parentChanCode: modelParams['parentChanCode'],
            categoryTypeGroup:modelParams['categoryTypeGroup'],
            bankCode:modelParams['bankCode'],
            model:newClone(row),
            tableData:tableData,
            step:'channelStep'
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.shareProfitCfg.shareProfitInfoEditTitle'),width:'900px'});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.editRow(Object['assign'](row,res));
            }
        })
    }
    /**
     *删除
     */
    onDeleteChannel(row:any){
        this.simpleTableService.delRow(row['id'],row['table_id']);
    }
    /**
     *返回上一步
     */
    prev() {
        // this.dynamicStepsService.prevStep();
        this.dynamicStepsService.goStep(1);
    }
    onSubmit(){
        this.isLoading = true;
        let _commitData = this.simpleTableService.pTable._data;//临时表格数据
        _commitData.forEach((item)=>{
            //单笔限额、单日限额乘以100
            item['limitDay'] = this.helper.isEmpty(item['limitDay'])?null: this.helper.numberTrans(item['limitDay'],'multiplication',100);
            item['limitSingleMax'] = this.helper.isEmpty(item['limitSingleMax'])?null: this.helper.numberTrans(item['limitSingleMax'],'multiplication',100);
            item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin'])?null: this.helper.numberTrans(item['limitSingleMin'],'multiplication',100);
        })
        this.agencyService.saveBatchChannelInfos(_commitData).subscribe(res => {
            this.isLoading = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/user/agencylist', this.i18n.fanyi('Agency.listPage.title'), {}, true);
            }else{
                this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                _commitData.forEach((item)=>{
                    //单笔限额、单日限额除以100
                    item['limitDay'] = this.helper.isEmpty(item['limitDay'])?null: this.helper.numberTrans(item['limitDay'],'division',100);
                    item['limitSingleMax'] = this.helper.isEmpty(item['limitSingleMax'])?null: this.helper.numberTrans(item['limitSingleMax'],'division',100);
                    item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin'])?null: this.helper.numberTrans(item['limitSingleMin'],'division',100);
                })
            }
        });

    }

    /**
     * 判断是否有数据
     */
    hasData(): boolean{
        if (this.simpleTableService.pTable._data && this.simpleTableService.pTable._data.length > 0){
            return true;
        }
        return false;
    }
}
