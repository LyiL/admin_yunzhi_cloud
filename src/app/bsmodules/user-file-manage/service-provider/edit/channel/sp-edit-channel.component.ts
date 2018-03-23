import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {MenuService,ModalHelper} from "@delon/theme";
import {NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {DynamicStepsService, SimpleTableService, SimpleTableComponent} from "@delon/abc";
import {HelperService} from "app/common/services/helper.service";
import {newClone} from "@delon/abc/utils/utils";
import {SpChannelWinComponent} from '../../win/channel/sp-channel-win.component';
import {SpTotalChannelWinComponent} from '../../win/total-channel/sp-totalChannel-win.component';
import {SpTradeRuleWinComponent} from '../../win/trade-rule/sp-tradeRule-win.component';
import {Observable} from 'rxjs/Observable';
import {SimpleTableData} from '@delon/abc/simple-table/interface';
import {SpTradeRuleModel} from '../../../../../common/model/user-file-manage/service-provide/sp-tradeRule.model';

/**
 * 服务商新增页-渠道配置页
 */
@Component({
    selector:'sp-channel-edit',
    templateUrl:'./sp-edit-channel.component.html',
    providers:[ServiceProviderService, SimpleTableService]
})
export class SpEditChannelComponent implements OnInit{

    public stepData:any; // 接收步骤跳转时传递的数据
    isLoadingOne = false;

    /**
     * 服务商总通道信息表格配置
     */
    public totalChannelTableCfg = {
        url:ServiceProviderService.SP_TOTAL_CHANNEL_LIST_URL,
        params:null,
        isAjax:false,
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
                        click: this.onEditTotalChannel.bind(this)
                    },
                    {
                        // 删除
                        text:this.i18n.fanyi("default.btn.delBtn"),
                        hide:(row:any) => row['id'],
                        click:this.onDelTotalChannel.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 服务商总通道信息表格控件
     */
    @ViewChild('spTotalChannelTable') spTotalChannelTable: SimpleTableComponent;

    /**
     * 服务商渠道信息表格配置
     */
    public channelTableCfg = {
        url:ServiceProviderService.SP_CHANNEL_LIST_URL,
        params:null,
        resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        isAjax:true,
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
                // index:"settleCycle"
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
                        text:this.i18n.fanyi("default.btn.editBtn"),
                        click:this.editChannelInfo.bind(this)
                    },
                    {
                        text:this.i18n.fanyi("default.btn.delBtn"),
                        hide:(row) => row['id'],
                        click:this.delChannelInfo.bind(this)
                    }
                ]
            }
        ]
    };

    /**
     * 服务商渠道信息表格控件
     */
    @ViewChild('SpChannelTable') SpChannelTable: SimpleTableComponent;

    /**
     *  路由配置数据
     */
    public tradeRuleData:SpTradeRuleModel = new SpTradeRuleModel();

    constructor(
        public i18n:I18NService,
        public menuService: MenuService,
        public helper: HelperService,
        public router:Router,
        public confirmServ: NzModalService,
        public serviceProviderDB:ServiceProviderService,
        public msg:NzMessageService,
        public modalHelper:ModalHelper,
        protected dynamicStepsService:DynamicStepsService,
        public objectExtend:ObjectExtend,
        public simpleTableService:SimpleTableService,
        public changeDetectorRef:ChangeDetectorRef
    ) {}

    ngOnInit() {

        this.stepData = this.dynamicStepsService.getStepByInstance(0);
        let chanCode = this.stepData.model['chanCode'];

        this.simpleTableService.pTable = this.SpChannelTable; // 临时渠道信息表
        // this.simpleTableService.pTable = this.spTotalChannelTable; // 临时总通道信息表

        /**
         * 路由配置默认值设置
         * @type {number}
         */
        this.tradeRuleData.ruleState = 1; // 默认启用
        this.tradeRuleData.parentNo = chanCode;

        this.channelTableCfg.params = {merchantId:chanCode};

        if(this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.stepData.model['bankCode'])){

            this.totalChannelTableCfg.params = {proNo:chanCode};
            this.totalChannelTableCfg.isAjax = true;

            /**
             * 初始化路由配置
             */
            this.loadTradeRule({parentNo: chanCode});
            this.tradeRuleData['parentNo'] = chanCode;
        }
    }

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * 新增总通道信息（单条）
     */
    public addTotalChannel(){
        if(this.simpleTableService.getPTable(1) === undefined){
            this.simpleTableService.pTable = this.spTotalChannelTable; // 临时总通道信息表
        }
        let stepParams = this.stepData['model'];
        let totalChannelTableData = this.spTotalChannelTable._data;
        let win = this.modalHelper.static(SpTotalChannelWinComponent,{
            proNo: stepParams['chanCode'],
            tableData: totalChannelTableData,
            step: 'channelStep'
        }, 500 ,{title: this.i18n.fanyi('SP.win.totalChannel.newTitle')});
        win.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res,1);
            }
        })
    }

    /**
     * 编辑总通道信息（单条）
     */
    public onEditTotalChannel(row:any){
        if(this.simpleTableService.getPTable(1) === undefined){
            this.simpleTableService.pTable = this.spTotalChannelTable; // 临时总通道信息表
        }
        let totalChannelTableData = this.spTotalChannelTable._data;
        let win = this.modalHelper.static(SpTotalChannelWinComponent,{
            model:newClone(row),
            tableData:totalChannelTableData,
            step:'channelStep'
        },500,{title: this.i18n.fanyi('SP.win.totalChannel.editTitle')});
        win.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.editRow(Object['assign'](row,res));
            }
        })
    }

    /**
     * 删除临时总通道信息（单条）
     * @param row
     */
    onDelTotalChannel(row:any){
        this.simpleTableService.delRow(1,row['table_id']);
    }

    /**
     * 调整渠道信息启用状态方法
     * @param id 数据ID
     * @param used 当前状态值
     */
    public onUsedClick(row: any){
        let confirm = this.confirmServ.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('SP.detailPage.channelCfg.changeUsed')
        });
        confirm.subscribe(res=>{
            if(res && res == 'onOk'){
                row['used'] = row['used'] == 1 ? 0 : 1;
            }
        });
    }

    /**
     * 删除渠道信息
     * @param row
     */
    delChannelInfo(row: any) {
        this.simpleTableService.delRow(0,row['table_id']);
    }

    /**
     * 编辑渠道信息
     * @param row
     */
    public editChannelInfo(row: any) {
        let stepParams = this.stepData['model'];
        let tableData = this.SpChannelTable._data;
        let bankName$:any;
        if(!this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',stepParams['bankCode'])){
            bankName$ = stepParams['bankName'];
        }
        const subscription = this.modalHelper.static(SpChannelWinComponent, {
            model:newClone(row),
            // id: row['id'],
            chanCode:stepParams['chanCode'],
            bankCode:stepParams['bankCode'],
            bankName:bankName$,
            categoryTypeGroup:stepParams['categoryTypeGroup'],
            parentChanCode:stepParams['parentChanCode'],
            tableData:tableData,
            step:'channelStep'
        }, 1000, {title: this.i18n.fanyi('SP.win.channnel.editTitle')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.editRow(Object['assign'](row,res));
            }
        })
    }

    /**
     * 新增渠道信息
     */
    public onAddChannel() {
        let stepParams = this.stepData['model'];
        let channelTableData = this.SpChannelTable._data;
        let bankName$:any;
        if(!this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',stepParams['bankCode'])){
            bankName$ = stepParams['bankName'];
        }
        const subscription = this.modalHelper.static(SpChannelWinComponent,{
            chanCode:stepParams['chanCode'],
            bankCode:stepParams['bankCode'],
            bankName:bankName$,
            categoryTypeGroup:stepParams['categoryTypeGroup'],
            parentChanCode:stepParams['parentChanCode'],
            tableData:channelTableData,
            step:'channelStep'
        }, 1000 ,{title: this.i18n.fanyi('SP.win.channnel.newTitle')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res,0);
            }
        })
    }

    /**
     * 加载路由配置
     * @param data
     */
    public loadTradeRule(data){
        this.serviceProviderDB.loadTradeRule(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                if(res[CommonEnum.SERVER_DATA_KEY]){
                    this.tradeRuleData = res[CommonEnum.SERVER_DATA_KEY];
                }
            }else{
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
        let stepParams = this.stepData['model'];
        if(!data || data['ruleState'] == 1){
            _ruleState = 0;
            _msg = this.i18n.fanyi('SP.detailPage.tradeRuleCfg.disableMsg');
            // 打开支付类型弹窗
            win = this.modalHelper.static(SpTradeRuleWinComponent,{
                parentNo:stepParams['chanCode'],
                ruleState:_ruleState,
                attention:_msg,
                step:'channelStep'
            },500,{title:this.i18n.fanyi('default.hint.hintInfo')});
            win.subscribe(res => {
                if(this.objectExtend.isObject(res)){
                    this.tradeRuleData = res;
                }
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
                    this.tradeRuleData.ruleState = _ruleState;
                    this.tradeRuleData.tradeId = null;
                    this.tradeRuleData.tradeType = null;
                }
            })
        }
    }

    /**
     * 返回上一步
     */
    prev() {
        this.dynamicStepsService.prevStep();
    }

    /**
     * 下一步
     */
    toNext(){
        /**
         * 判断所属优络是不是优络
         */
        if(this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.stepData.model['bankCode'])){
            this.saveAllData();
        }else{
            this.saveSigData();
        }
    }

    /**
     * 提交总通道、渠道、路由
     */
    public saveAllData(){
        this.isLoadingOne = true;
        let totalChannelTableData = this.spTotalChannelTable._data;
        let channelTableData = this.SpChannelTable._data;
        channelTableData.forEach((item)=>{
            // 单笔限额、单日限额乘以100
            item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'multiplication',100);
            item['limitSingle'] = this.helper.isEmpty(item['limitSingle']) ? null : this.helper.numberTrans(item['limitSingle'],'multiplication',100);
            item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'multiplication',100);
        });
        let totalChannelObs = this.serviceProviderDB.saveTotalChannels(totalChannelTableData);
        let channelObs = this.serviceProviderDB.addChannelbatch(channelTableData);
        let ruleObs = this.serviceProviderDB.saveTradeRule(this.tradeRuleData);
        Observable.zip(totalChannelObs,channelObs,ruleObs).subscribe(resArr => {
            this.isLoadingOne = false;
            if(resArr && resArr[1] && resArr[1][CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.dynamicStepsService.nextStep();
            }else{
                let errMsg = this.i18n.fanyi('SP.detailPage.totalChannelCfg.title') + ':' + resArr[0][CommonEnum.SERVER_MES_KEY] + ';' + this.i18n.fanyi('SP.detailPage.channelCfg.sTitle') + ':' + resArr[1][CommonEnum.SERVER_MES_KEY] + ';' + this.i18n.fanyi('SP.detailPage.tradeRuleCfg.title') + ':' + resArr[2][CommonEnum.SERVER_MES_KEY];
                this.msg.error(errMsg);
                channelTableData.forEach((item)=>{
                    // 单笔限额、单日限额乘以100
                    item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'division',100);
                    item['limitSingle'] = this.helper.isEmpty(item['limitSingle']) ? null : this.helper.numberTrans(item['limitSingle'],'division',100);
                    item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'division',100);
                });
            }
        })
    }

    /**
     * 提交渠道
     */
    public saveSigData(){
        this.isLoadingOne = true;
        let channelTable = this.SpChannelTable._data;
        channelTable.forEach((item)=>{
            //单笔限额、单日限额乘以100
            item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'multiplication',100);
            item['limitSingle'] = this.helper.isEmpty(item['limitSingle']) ? null : this.helper.numberTrans(item['limitSingle'],'multiplication',100);
            item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'multiplication',100);
        });
        this.serviceProviderDB.addChannelbatch(channelTable).subscribe((res) => {
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.dynamicStepsService.nextStep();
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                channelTable.forEach((item)=>{
                    // 单笔限额、单日限额乘以100
                    item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'division',100);
                    item['limitSingle'] = this.helper.isEmpty(item['limitSingle']) ? null : this.helper.numberTrans(item['limitSingle'],'division',100);
                    item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'division',100);
                });
            }
        })
    }

    /**
     * 判断是否有数据
     */
    hasData(): boolean{
        let stepModel = this.stepData['model'];
        let _bankCode = stepModel['bankCode'];
        let totalChannelTableData:any,channelTableData:any;
        if(this.spTotalChannelTable){
            totalChannelTableData = this.spTotalChannelTable['_data'];
        }
        if(this.SpChannelTable){
            channelTableData = this.SpChannelTable['_data'];
        }
        /**
         * 优络下面总通道、渠道必填
         */
        if(this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',_bankCode) && totalChannelTableData && totalChannelTableData.length && channelTableData && channelTableData.length){
            return true;
        }
        /**
         * 非优络渠道必填
         */
        if(!this.helper.hasConfigValueMatch('CLOUD_ULO_BANK_NO',_bankCode) && channelTableData && channelTableData.length){
            return true;
        }
        return false;
    }

}
