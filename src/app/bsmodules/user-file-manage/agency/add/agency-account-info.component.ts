import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DynamicStepsService, SimpleTableComponent, SimpleTableService} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {AgencyService} from "../../../../common/services/request/user-file-manage/agency.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService, ModalHelper} from "@delon/theme";
import {AgencyAccountAddWinComponent} from "../win/agency-account-win/agency-account-add-win.component";
import {NzLocaleService, NzMessageService, NzModalService, ObjectExtend} from "ng-zorro-antd";
import {HelperService} from "../../../../common/services/helper.service";
import {newClone} from "@delon/abc/utils/utils";

/**
 * 代理商新增账户信息（step2）
 */
@Component({
    selector:'agency-account',
    templateUrl:'./agency-account-info.component.html',
    providers:[AgencyService,SimpleTableService]
})
export class AgencyAccountInfoComponent implements OnInit{
    public isLoading:boolean = false;//按钮加载效果
    public stepData:any;//接收步骤跳转时传递的数据
    /**
     * 账户信息表格配置
     */
    public tableCfg:any;
    @ViewChild('agencyAccountTable') public agencyAccountTable:SimpleTableComponent;
    constructor(protected fb: FormBuilder,
                protected dynamicStepsService:DynamicStepsService,
                public i18n:I18NService,
                protected agencyService:AgencyService,
                public menuService:MenuService,
                protected modalService: NzModalService,
                public helper:HelperService,
                public objectExtend:ObjectExtend,
                public simpleTableService:SimpleTableService,
                public modalHelper:ModalHelper,
                public message: NzMessageService,
                public log:NzLocaleService,
    ) {}

    ngOnInit() {
        this.simpleTableService.pTable = this.agencyAccountTable;//临时表
        this.stepData = this.dynamicStepsService.getStepByInstance(0);
        this.log.debug('this.stepData:::;',this.stepData);this.log.debug('this.stepData.model:::;',this.stepData.model);
        let chanCode = this.stepData.model['chanCode'];
        this.tableCfg = {
            url:AgencyService.AGENCY_ACCOUNT_LIST_URL,
            params:{chanCode:chanCode},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.name"),
                index:'name'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.type"),
                render:'typeRender'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.bankCardno"),
                index:'bankCardno'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.bankName"),
                index:'bankName'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.subbranchName"),
                render:'subbranchNameRender'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.subbanrchCode"),
                render:'subbanrchCodeRender'
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.transId"),
                index:'transId',
                data: (function(value){
                    if(value && typeof value == 'string'){
                        let _transIds = value.split(',');
                        let _transNames:Array<string> = [];
                        if(_transIds && _transIds.length > 0){
                            _transIds.forEach && _transIds.forEach((_transId:any)=>{
                                _transNames.push(this.helper.dictTrans('BANK_ACT_TRADE_TYPE',_transId));
                            });
                        }
                        return _transNames.join(',');
                    }
                }).bind(this)
            },{
                title:this.i18n.fanyi("Agency.detailPage.detail.accountTable.cardType"),
                render:'cardTypeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    click: this.onEditAccount.bind(this)
                },{
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    hide:(function(row:any){
                        if(row['acntId']){//数据库里已有的数据，不能删除
                            return true;
                        }
                        return false;
                    }),
                    click: this.onDeleteAccount.bind(this)
                }]
            }]
        };
    }
    /**
     * 新增账户信息
     */
    onAddAccount(){
        let stepParams = this.stepData['model'];
        let tableData = this.agencyAccountTable._data;

        const subscription = this.modalHelper.static(AgencyAccountAddWinComponent,{
            orgId: stepParams['orgId'],
            tableData:tableData,
            step:'accountStep'
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.detail.accountInfoAddTitle'),width:'900px'});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res);
            }
        })
    }

    /**
     * 编辑账户信息
     */
    onEditAccount(row:any){
        // this.log.debug('表格data：：：',this.agencyAccountTable._data);
        let stepParams = this.stepData['model'];
        let tableData = this.agencyAccountTable._data;
        const subscription = this.modalHelper.static(AgencyAccountAddWinComponent,{
            orgId: stepParams['orgId'],
            model:newClone(row),
            tableData:tableData,
            step:'accountStep'
        },'lg',{title: this.i18n.fanyi('Agency.detailPage.detail.accountInfoEditTitle'),width:'900px'});
        subscription.subscribe(res => {
           if(this.objectExtend.isObject(res)){
               this.simpleTableService.editRow(Object['assign'](row,res));
           }
        })
    }

    /**
     *删除
     */
    onDeleteAccount(row:any){
        this.simpleTableService.delRow(row['id'],row['table_id']);
    }
    /**
     *返回上一步
     */
    prev() {
        this.dynamicStepsService.prevStep();
    }
    /**
     *下一步
     */
    toNext(){
        this.isLoading = true;
        let _commitData = this.simpleTableService.pTable._data;//临时表数据
        this.agencyService.saveAccountInfos(_commitData).subscribe(res=>{
            this.isLoading = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                // this.dynamicStepsService.goStep(2);
                this.dynamicStepsService.nextStep();
            }else{
                this.message.error(res[CommonEnum.SERVER_MES_KEY]);
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
