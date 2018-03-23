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
import {SpAccountWinComponent} from '../../win/account/sp-account-win.component';

/**
 * 服务商新增页-账户信息页
 */
@Component({
    selector:'sp-edit-account',
    templateUrl:'./sp-edit-account.component.html',
    providers: [ServiceProviderService, SimpleTableService]
})
export class SpEditAccountComponent implements OnInit{

    public stepData:any; // 接收步骤跳转时传递的数据
    public tableCfg:any; // 账户信息表格配置
    isLoadingOne = false;

    @ViewChild('SpAccountTable') public SpAccountTable:SimpleTableComponent;

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
        this.simpleTableService.pTable = this.SpAccountTable; // 临时表
        this.stepData = this.dynamicStepsService.getStepByInstance(0);
        let orgId = this.stepData.model['orgId'];

        this.tableCfg = {
            url:ServiceProviderService.SP_ACCOUNT_LIST_URL,
            params:{orgId: orgId},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.name"),
                index:'name'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.type"),
                render:'typeRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.bankCardno"),
                index:'bankCardno'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.bankName"),
                index:'bankName'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.subbranchName"),
                render:'subbranchNameRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.subbanrchCode"),
                render:'subbanrchCodeRender'
            },{
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.transId"),
                index:'transId',
                data: (function(value){
                    if(value && typeof value == 'string') {
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
                title:this.i18n.fanyi("SP.detailPage.detail.accountTable.cardType"),
                render:'cardTypeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    click: this.onEditAccount.bind(this)
                },{
                    text: this.i18n.fanyi('default.btn.delBtn'),
                    hide:((row) => {
                        // 账户信息根据acntId判断。
                        let _acntId = row['acntId'];
                        if(_acntId) {
                            return true;
                        }
                        return false;
                    }),
                    click:this.onDelAccount.bind(this),
                }]
            }]
        };
    }

    /**
     * 删除账户信息
     * @param row
     */
    public onDelAccount(row: any) {
        this.simpleTableService.delRow(row['id'],row['table_id']);
    }

    /**
     * 编辑账户信息
     */
    public onEditAccount(row:any){
        let stepParams = this.stepData['model'];
        let tableData = this.SpAccountTable._data;
        let subscription = this.modalHelper.static(SpAccountWinComponent, {
                model:newClone(row),
                orgId: stepParams['orgId'],
                // acntId: row['acntId'],
                tableData: tableData,
                step: 'accountStep'
            },
            1000 ,{title: this.i18n.fanyi('default.btn.editBtn')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.editRow(Object['assign'](row,res));
            }
        })
    }

    /**
     * 新增账户信息
     */
    public onAddAccount(){
        let stepParams = this.stepData['model'];
        let tableData = this.SpAccountTable._data;
        let subscription = this.modalHelper.static(SpAccountWinComponent, {
                orgId: stepParams['orgId'],
                tableData: tableData,
                step: 'accountStep'
            }, 1000 ,{title: this.i18n.fanyi('default.btn.newBtn')});
        subscription.subscribe(res => {
            if(this.objectExtend.isObject(res)){
                this.simpleTableService.addRow(res);
            }
        })
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
        this.isLoadingOne = true;
        let accountTable = this.SpAccountTable._data;
        this.ServiceProvideDB.addAccount(accountTable).subscribe(res => {
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                // this.dynamicStepsService.goStep(2);
                this.dynamicStepsService.nextStep();
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 判断是否有数据
     */
    hasData(): boolean{
        if (this.simpleTableService.pTable._data && this.simpleTableService.pTable._data.length){
            return true;
        }
        return false;
    }

}
