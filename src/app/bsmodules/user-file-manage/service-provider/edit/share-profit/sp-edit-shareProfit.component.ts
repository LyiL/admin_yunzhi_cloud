import {Component, OnInit, ViewChild} from "@angular/core";
import {DynamicStepsService, SearchWindowConfig, SimpleTableComponent, SimpleTableService} from "@delon/abc";
import {ObjectExtend, NzModalService, NzMessageService} from "ng-zorro-antd";
import {FormBuilder} from "@angular/forms";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {MenuService, ModalHelper} from "@delon/theme";
import {HelperService} from "../../../../../common/services/helper.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";
import {newClone} from "@delon/abc/utils/utils";
import {SpShareProfitWinComponent} from '../../win/share-profit/sp-shareProfit-win.component';
import {SimpleTableData} from '@delon/abc/simple-table/interface';

/**
 * 服务商新增页-分润配置页
 */
@Component({
    selector:'sp-share-edit',
    templateUrl:'./sp-edit-shareProfit.component.html',
    providers: [ServiceProviderService, SimpleTableService]
})
export class SpEditShareProfitComponent implements OnInit{

    public stepData:any; // 接收步骤跳转时传递的数据
    public tableCfg:any; // 账户信息表格配置
    isLoadingOne = false;

    @ViewChild('SpShareTable') public SpShareTable:SimpleTableComponent;

    constructor(protected fb: FormBuilder,
                protected dynamicStepsService:DynamicStepsService,
                public i18n:I18NService,
                public menuService:MenuService,
                protected modalService: NzModalService,
                public helper:HelperService,
                public objectExtend:ObjectExtend,
                public simpleTableService:SimpleTableService,
                public modalHelper:ModalHelper,
                public ServiceProvideDB: ServiceProviderService,
                public msg: NzMessageService,
    ) {}


    ngOnInit() {
        this.simpleTableService.pTable = this.SpShareTable;
        this.stepData = this.dynamicStepsService.getStepByInstance(0);
        let chanCode = this.stepData.model['chanCode'];

        this.tableCfg = {
            url:ServiceProviderService.SP_SHARE_LIST_URL,
            params:{chanNo:chanCode},
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
                title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.limitDay"),         // 单日限额(元)
                render:'limitDayRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.limitCount"),       // 单笔限额
                render:'limitCountRender'

            },{
                title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.chanRate"),         // 费率(‰)
                index:'chanRate'
            },{
                title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.fixFloatRate"),     // 费率类型
                render:'fixFloatRateRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.settleCycle"),      // 结算/分润周期
                render:'settleCycleRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.chanShareRule"),    // 分润规则
                render:'chanShareRuleRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.shareCfg.shareCfgTable.state"),             // 状态
                render:'stateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    // 编辑
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    click: this.onEditShare.bind(this)
                },{
                    // 删除
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    hide:((row) => {
                        // 分润配置根据id判断。
                        let _id = row['id'];
                        if(_id) {
                            return true;
                        }
                        return false;
                    }),
                    click: this.onDelShare.bind(this)
                }]
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
                row['state'] = row['state'] == 1 ? 0 : 1;
            }
        });
    }

    /**
     * 删除分润信息
     * @param row
     */
    onDelShare(row: any) {
        this.simpleTableService.delRow(row['id'],row['table_id']);
    }


    /**
     * 编辑分润配置
     */
    onEditShare(row:any){
        let stepParams = this.stepData['model'];
        let tableData = this.SpShareTable._data;

        const subscription = this.modalHelper.static(SpShareProfitWinComponent,{
            model:newClone(row),
            id: row['id'],
            orgId: stepParams['orgId'],
            chanCode: stepParams['chanCode'],
            bankCode: stepParams['bankCode'],
            parentChanCode: stepParams['parentChanCode'],
            categoryType:stepParams['categoryTypeGroup'],
            tableData: tableData,
            step: 'shareStep'
        }, 1000 ,{title: this.i18n.fanyi('default.btn.editBtn')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.editRow(Object['assign'](row,res));
            }
        })
    }


    /**
     * 新增分润配置
     */
    onAddShare(){
        let stepParams = this.stepData['model'];
        let tableData = this.SpShareTable._data;
        const subscription = this.modalHelper.static(SpShareProfitWinComponent,{
            orgId: stepParams['orgId'],
            chanCode: stepParams['chanCode'],
            bankCode: stepParams['bankCode'],
            parentChanCode: stepParams['parentChanCode'],
            categoryType:stepParams['categoryTypeGroup'],
            tableData: tableData,
            step: 'shareStep'
        }, 1000 ,{title: this.i18n.fanyi('default.btn.newBtn')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res);
            }
        })
    }

    /**
     * 上一页
     */
    prev() {
        this.dynamicStepsService.prevStep();
    }

    /**
     * 新增并下一页
     */
    toNext(){
        this.isLoadingOne = true;
        let shareTable = this.SpShareTable._data;
        shareTable.forEach(item => {
            // 单笔限额、单日限额乘以100
            item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'multiplication',100);
            item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'multiplication',100);
            item['limitSingleMax'] = this.helper.isEmpty(item['limitSingleMax']) ? null : this.helper.numberTrans(item['limitSingleMax'],'multiplication',100);
        });
        this.ServiceProvideDB.addShareS (shareTable).subscribe((res) => {
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.dynamicStepsService.nextStep();
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                shareTable.forEach(item => {
                    // 单笔限额、单日限额除以100
                    item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'division',100);
                    item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'division',100);
                    item['limitSingleMax'] = this.helper.isEmpty(item['limitSingleMax']) ? null : this.helper.numberTrans(item['limitSingleMax'],'division',100);
                });
            }
        })
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
