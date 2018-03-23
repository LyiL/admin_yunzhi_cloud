import {Component, ViewChild} from '@angular/core';
import {DynamicStepsService, SimpleTableComponent, SimpleTableService} from '@delon/abc';
import {HelperService} from '../../../../common/services/helper.service';
import {NzMessageService, NzModalService, ObjectExtend} from 'ng-zorro-antd';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {MchAccountInfoWinComponent} from '../win/mch-account-info-win';
import {ModalHelper} from '@delon/theme';
import {newClone} from '@delon/abc/utils/utils';

/**
 * 新增商户帐户信息页面
 */
@Component({
    selector:'mch-account-info',
    templateUrl:'./mch-account-info.component.html',
    providers:[mchService,SimpleTableService]
})
export class MchAccountInfoComponent {
    public stepData:any; //传递参数
    public isLoadingOne = false; // loading
    /**
     * 帐户信息配置
     */
    public tableCfg:any;
    @ViewChild('mchAccountTable') public mchAccountTable:SimpleTableComponent;
    constructor(public i18n:I18NService,public mchService:mchService, public dialog:NzModalService,public helper:HelperService,
                public dynamicStepsService:DynamicStepsService,public simpleTableService:SimpleTableService,public msg: NzMessageService,
                public modalHelper:ModalHelper, public objectExtend:ObjectExtend,
            ){}
    ngOnInit(){
        this.simpleTableService.pTable = this.mchAccountTable;
        this.stepData = this.dynamicStepsService.getStepByInstance(0); //获取第一步的数据
        let orgId = this.stepData.model.orgId;
        this.tableCfg = {
            url:mchService.MCH_ACCOUNT_LIST_URL,
            params:{orgId:orgId},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.name"),
                index:'name'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.type"),
                // index:'type',
                render:'typeRender',
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.bankCardno"),
                index:'bankCardno'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.bankName"),
                index:'bankName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.subbranchName"),
                // index:'subbranchName'
                render:'subbranchNameRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.subbanrchCode"),
                // index:'subbanrchCode'
                render:'subbanrchCodeRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.transId"),
                index:'transId',
                data: (function(value){
                    let _transIds = value.split(',');
                    let _transNames:Array<string> = [];
                    if(_transIds && _transIds.length > 0){
                        _transIds.forEach && _transIds.forEach((_transId:any)=>{
                            _transNames.push(this.helper.dictTrans('BANK_ACT_TRADE_TYPE',_transId));
                        });
                    }
                    return _transNames.join(',');
                }).bind(this)
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.accountTable.cardType"),
                // index:'cardType'
                render:'cardTypeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    click: this.onEdit.bind(this),
                },{
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    click: this.onDeleteAccount.bind(this),
                    hide: ((row) => {
                        if(row['acntId']){
                            return true;
                        }
                    }),
                }]
            }]
        };
    }
    /**
     *删除
     */
    onDeleteAccount(row:any){
        this.simpleTableService.delRow(row['id'],row['table_id']);
    }
    /**
     * 新增账户信息
     */
    public tmpTableData = [];//接收临时表数据
    addAccount(){
        let menuParams = this.stepData['model']; //定义步骤获取的model数据
        let tableData = this.mchAccountTable._data;
        const subscription = this.modalHelper.static(MchAccountInfoWinComponent,{
            orgId:this.stepData.model.orgId,
            stepAccount:"account",
            tableData:tableData,
            menuParams:menuParams

        },1000,{title: this.i18n.fanyi('Mch.winTitle.accountAdd')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res);
            }
        })
    }
    /**
     * 编辑账户信息
     */
    onEdit(row:any){
        let stepParams = this.stepData['model'];
        let tableData = this.mchAccountTable._data;
        // const tmpRow = newClone(row);
        const subscription = this.modalHelper.static(MchAccountInfoWinComponent,{
            orgId:this.stepData.model.orgId,
            stepAccount:"account",
            tableData:tableData,
            menuParams:stepParams,
            model:newClone(row)},1000,{title: this.i18n.fanyi('Mch.winTitle.accountEdit')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.editRow(Object['assign'](row,res));
            }
        })
    }

    /**
     * 返回上一步
     */
    onPrev() {
        this.dynamicStepsService.prevStep();
    }
    /**
     * 保存下一步
     */
    onNext(){
        this.isLoadingOne = true;
        this.mchService.saveAccountInfos(this.mchAccountTable._data).subscribe(res =>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.dynamicStepsService.nextStep();//下一步
            }else {
                this.msg.warning(res[CommonEnum.SERVER_MES_KEY])
            }
            this.isLoadingOne = false;
        })
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
