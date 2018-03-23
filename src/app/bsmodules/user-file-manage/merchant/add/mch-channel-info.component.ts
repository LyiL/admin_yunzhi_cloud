import {Component, ViewChild} from '@angular/core';
import {DynamicStepsService, SimpleTableComponent, SimpleTableData, SimpleTableService} from '@delon/abc';
import {HelperService} from '../../../../common/services/helper.service';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {ModalHelper} from '@delon/theme';
import {NzMessageService, NzModalService, ObjectExtend} from 'ng-zorro-antd';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {newClone} from '@delon/abc/utils/utils';
import {MchChannelInfoWinComponent} from '../win/mch-channel-info-win';
import {SpTradeRuleWinComponent} from '../../service-provider/win/trade-rule/sp-tradeRule-win.component';
import {MchTradeRuleWinComponent} from '../win/mch-tradeRule-win.component';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/observable/zip";
/**
 * 新增商户渠道信息页面
 */
@Component({
    selector:'mch-channel-info',
    templateUrl:'./mch-channel-info.component.html',
    providers:[mchService,SimpleTableService]
})
export class MchChannelInfoComponent {
    public stepData:any; //传递参数
    public isLoadingOne = false; // loading
    /**
     *  路由配置数据
     */
    public tradeRuleData:any ;
    /**
     * 渠道信息配置
     */
    public tableCfg:any;
    @ViewChild('mchChannelTable') public mchChannelTable:SimpleTableComponent;
        constructor(public dynamicStepsService:DynamicStepsService,  public message: NzMessageService,
                    public helper:HelperService,public i18n:I18NService,public mchDB:mchService, public confirmServ: NzModalService,
            public simpleTableService:SimpleTableService, public modalHelper:ModalHelper, public objectExtend:ObjectExtend,
                    ){}

    ngOnInit(){
        this.simpleTableService.pTable = this.mchChannelTable;
        this.stepData = this.dynamicStepsService.getStepByInstance(0); //获取第一步的数据
        this.tradeRuleData = { ruleState :1, parentNo:this.stepData.model['merchantNo']};
        let merchantId =this.stepData.model.id;
        this.tableCfg = {
            url:mchService.MCH_CHANNEL_LIST_URL,
            params:{merchantId:merchantId},
            isAjax:true,
            preDataChange: ((data: SimpleTableData[]) => {
                data.forEach(item => {
                    item['limitDay'] = this.helper.isEmpty(item['limitDay']) ? null : this.helper.numberTrans(item['limitDay'],'division',100);
                    item['limitSingle'] = this.helper.isEmpty(item['limitSingle']) ? null : this.helper.numberTrans(item['limitSingle'],'division',100);
                    item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin']) ? null : this.helper.numberTrans(item['limitSingleMin'],'division',100);
                });
                // console.log(data);
                return data;
            }).bind(this),
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.transId"),
                index:'transType'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.bankNo"),
                index:'agencyName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.ptCenterId"),
                index:'centerName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.providerNo"),
                // index:'providerNo'
                render:'providerNoRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.ally"),
                // index:'providerNo'
                render:'allyRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.thirdAppid"),
                // index:'thirdAppid'
                render:'thirdAppidRender'

                // render:'rCRender',
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.pcmPartkey"),
                // index:'pcmPartkey'
                render:'pcmPartkeyRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    click: this.onEdit.bind(this),
                },{
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    click: this.onDeleteChannel.bind(this),
                    hide: ((row) => {
                        if(row['id']){
                            return true;
                        }
                    }),
                }
                ]
            }]
        };
        /**
         * 初始化路由配置
         */
        this.loadTradeRule({parentNo:this.stepData.model['merchantNo']});
    }
    /**
     * 新增渠道信息
     */
    public tmpTableData = [];//接收临时表数据
    addChannel(){
        let stepParams = this.stepData['model'];
        let tableData = this.mchChannelTable._data;
        const subscription = this.modalHelper.static(MchChannelInfoWinComponent,{
            orgId: stepParams['orgId'],
            chanNo: stepParams['chanNo'],
            categoryType:stepParams['categoryType'].slice(0,1),
            tableData:tableData,
            stepParams:stepParams,
            channelStep:'channelStep'
        },1000,{title: this.i18n.fanyi('Mch.winTitle.channelAdd')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res);
            }
        })
    }
    /**
     * 编辑渠道信息
     */
    onEdit(row:any){
        let stepParams = this.stepData['model'];
        let tableData = this.mchChannelTable._data;
        // const tmpRow = newClone(row);
        const subscription = this.modalHelper.static(MchChannelInfoWinComponent,{
            orgId: stepParams['orgId'],
            chanNo: stepParams['chanNo'],
            model:newClone(row),
            stepParams:stepParams,
            categoryType:stepParams['categoryType'].slice(0,1),
            tableData:tableData,
            _transId:row['transId'],
            channelStep:'channelStep'
        },1000,{title: this.i18n.fanyi('Mch.winTitle.channelEdit')});
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
     * 加载路由配置
     * @param data
     */
    public loadTradeRule(data){
        this.mchDB.tradeRuleConf(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tradeRuleData = res[CommonEnum.SERVER_DATA_KEY];
            } else {
                this.message.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }
    /**
     * 切换路由配置
     */
    public onChangeTradeRule(data){
        if(!data || data['ruleState'] == 1){
           let _ruleState = 0;
           let _msg = this.i18n.fanyi('SP.detailPage.tradeRuleCfg.disableMsg');
            // 打开支付类型弹窗
          let  win = this.modalHelper.static(MchTradeRuleWinComponent,{
                parentNo:this.stepData.model['merchantNo'],
                ruleState:_ruleState,
                attention:_msg,
               channelStep:'channelStep'
            },500,{title:this.i18n.fanyi('default.hint.hintInfo')});
            win.subscribe(res => {
                // this.loadTradeRule({parentNo: _merchantNo}); // 刷新路由配置信息
                // console.log(res);
                this.tradeRuleData = res
            })
        }else {
           let _ruleState = 1;
            // 打开提示弹窗
          let  _msg = this.i18n.fanyi('SP.detailPage.tradeRuleCfg.enableMsg');
          let  win = this.confirmServ.confirm({
                title:this.i18n.fanyi('default.hint.hintInfo'),
                content:_msg,
                maskClosable:false
            });
            win.subscribe(res => {
                if(res && res == 'onOk'){
                    this.tradeRuleData = {
                        ruleState :_ruleState,
                        parentNo:this.stepData.model['merchantNo'],
                    }
                }
            })
        }
    }


    /**
     *上一步
     */
    onPrev() {
        this.dynamicStepsService.prevStep();
    }
    /**
     *保存并提交
     */
    onSubmit(){
        this.isLoadingOne = true;
        let _commitData = this.simpleTableService.pTable._data;//临时表格数据
        _commitData.forEach((item)=>{
            //单笔限额、单日限额乘以100
            item['limitDay'] = this.helper.isEmpty(item['limitDay'])? null : this.helper.numberTrans(item['limitDay'],'multiplication',100);
            item['limitSingle'] = this.helper.isEmpty(item['limitSingle'])? null : this.helper.numberTrans(item['limitSingle'],'multiplication',100);
            item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin'])? null : this.helper.numberTrans(item['limitSingleMin'],'multiplication',100);
        });
        let post1 = this.mchDB.saveChannelInfos(_commitData);
        let tradeRuleparams = this.tradeRuleData? this.tradeRuleData:{ruleState :1, parentNo:this.stepData.model['merchantNo']};
        let post2 = this.mchDB.tradeRuleSave(tradeRuleparams);
        Observable.zip(post1, post2).subscribe(results=>{
            if(results && results[0] && results[1] && results[0][CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY && results[1][CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){

                this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.dynamicStepsService.nextStep();//下一步
            }else{
                this.message.error(results[0][CommonEnum.SERVER_MES_KEY]+ '<br/>' +results[1][CommonEnum.SERVER_MES_KEY])
                _commitData.forEach((item)=>{
                    //单笔限额、单日限额除以100
                    item['limitDay'] = this.helper.isEmpty(item['limitDay'])? null : this.helper.numberTrans(item['limitDay'],'division',100);
                    item['limitSingle'] = this.helper.isEmpty(item['limitSingle'])? null : this.helper.numberTrans(item['limitSingle'],'division',100);
                    item['limitSingleMin'] = this.helper.isEmpty(item['limitSingleMin'])? null : this.helper.numberTrans(item['limitSingleMin'],'division',100);
                });
            }
            this.isLoadingOne = false;
            })
                // this.mchDB.saveChannelInfos(_commitData).subscribe(res => {
        //     if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
        //         this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
        //         this.dynamicStepsService.nextStep();//下一步
        //         // this.helper.navigate('/admin/user/mchlist', this.i18n.fanyi('Mch.title'), {});
        //     }else{
        //         this.message.error(res[CommonEnum.SERVER_MES_KEY])
        //     }
        // });
    }
    /**
     * 判断是否有数据
     */
    hasData():boolean{
        if(this.simpleTableService.pTable._data &&this.simpleTableService.pTable._data.length > 0){
            return true;
        }
        return false;
    }
}
