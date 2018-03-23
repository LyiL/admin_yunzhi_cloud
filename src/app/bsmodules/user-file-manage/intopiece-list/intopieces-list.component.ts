import {Component,ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {IntoPiecesForm} from "../../../common/form/user-file-manage/intopieces.form";
import {NzModalService, NzMessageService} from "ng-zorro-antd";
import {IntoPiecesAddWinComponent} from "./intopieces-add-win.component";
import {IntoPiecesEditWinComponent} from "app/bsmodules/user-file-manage/intopiece-list/intopieces-edit-win.component";
import {IntoPiecesService} from "../../../common/services/request/user-file-manage/intopieces.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {CommonService} from "app/common/services/request/common.service";
import {newClone} from "@delon/abc/utils/utils";
import {ModalHelper} from "@delon/theme";

/**
 * 进件列表页
 */

@Component({
    selector:'into-pieces-list',
    templateUrl:'./intopieces-list.component.html',
    providers:[
        IntoPiecesService,
        CommonService
    ]
})
export class IntoPiecesListComponent{

    public IntoListForm:IntoPiecesForm = new IntoPiecesForm();
    public applyState:Array<any> = []; // 进件状态

    public UloCode: any;

    @ViewChild('intoListTable') intoListTable:SimpleTableComponent;

    /**
     * 所属机构控件配置
     */
    public bankNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('IntoPieces.listPage.agencyCfg.title'),
        url:CommonService.BANKINFO_URL,
        params:{},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'orgNo',
            label:this.i18n.fanyi('IntoPieces.listPage.agencyCfg.agencyNo')
        },{
            field:'name',
            label:this.i18n.fanyi('IntoPieces.listPage.agencyCfg.agencyName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('IntoPieces.listPage.agencyCfg.agencyNo'),
            index:'orgNo'
        },{
            title:this.i18n.fanyi('IntoPieces.listPage.agencyCfg.agencyName'),
            index:'name'
        }]
    };


    /**
     * 所属上级控件配置
     */
    public superiorCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('IntoPieces.listPage.superiorCfg.title'),
        url:CommonService.PARENTCHAN_INFO_URL,
        params: {},
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'chanCode',
            label:this.i18n.fanyi('IntoPieces.listPage.superiorCfg.superior')
        },{
            field:'name',
            label:this.i18n.fanyi('IntoPieces.listPage.superiorCfg.superiorName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('IntoPieces.listPage.superiorCfg.superior'),
            index:'chanCode'
        },{
            title:this.i18n.fanyi('IntoPieces.listPage.superiorCfg.superiorName'),
            index:'name'
        }]
    };


    /**
     * 进件列表表格
     * @type {{url: string; params: any; total: number; isAjax: boolean;  resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url:IntoPiecesService.INTOPIECES_LIST_URL,
        isAjax: false,
        params: this.IntoListForm,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.name'),            // 商户名称
                index:'name'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.merchantCode'),    // 商户编号
                render:'merchantCodeRender'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.chanName'),        // 所属上级
                render:'chanNameRender'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.bankName'),        // 所属机构
                index:'orgName'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.centerName'),      // 通道类型
                render:'centerNameRender'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.agencyName'),      // 所属银行
                render:'agencyNameRender'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.providerNo'),      // 渠道编号
                render:'providerNoRender'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.applyState'),      // 进件状态
                render:'applyStateRender'
            },{
                title:this.i18n.fanyi('IntoPieces.listPage.tableCols.ally'),            // 商户识别码
                render:'allyRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),                       // 操作
                buttons:[{
                    // 编辑
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide:((row:any)=>{
                        if(this.helper.btnRole('INTOEDIT')){
                            if(row['applyState'] == 1 || row['applyState'] == 4){
                                return true;
                            }
                            if((row['applyState'] == 2 || row['applyState'] ==0 || row['applyState'] ==3)){
                                return false;
                            }
                        }
                        return true;
                    }).bind(this),
                    click: this.onEditIntopiece.bind(this)
                }, {
                    // 进件
                    text: this.i18n.fanyi('IntoPieces.listPage.tableCols.intoBtn'),
                    hide:((row:any)=>{
                        if(!this.helper.btnRole('INTOPIECES') ){
                            return true;
                        }
                        if(row['applyState'] == 0){
                            return false;
                        }
                        return  true;
                    }),
                    click: this.onInto.bind(this)
                },{
                    // 重新进件
                    text: this.i18n.fanyi('IntoPieces.listPage.tableCols.againBtn'),
                    hide:((row:any)=>{
                        if(!this.helper.btnRole('INTOPIECESRESET')){
                            return true;
                        }
                        if(row['applyState'] == 3 ){
                            return false;
                        }
                        return  true;
                    }),
                    click: this.onInto.bind(this)
                }]
            }
        ]
    };

    constructor(
        public helper:HelperService,
        public i18n:I18NService,
        public modal: ModalHelper,
        public nzModal: NzModalService,
        public msg: NzMessageService,
        public IntoPiecesDB: IntoPiecesService
    ) {
        this.applyState = this.helper.getDictByKey('APPLY_STATE'); // 进件状态
        this.UloCode = this.helper.getDictByKey('CLOUD_ULO_BANK_NO');
    }

    /**
     * 受理机构选中事件
     */
    onBankCodeSelected(value){
        this.IntoListForm.bankNo = value.orgNo;
        //重新选择清空所属上级
        this.IntoListForm.superior = null;
        this.IntoListForm.superiorName = null;
    }

    /**
     * 所属上级查询前事件
     */
    onParentChanSearchBefore(value){
        if(this.IntoListForm.bankNo){
            this.superiorCfg.params = {bankCode:this.IntoListForm.bankNo};
        }else {
            this.superiorCfg.params = {bankCode:this.UloCode};
        }
    }

    /**
     * 所属上级选中事件
     * @param value
     */
    onParentChanSelect(value) {
        this.IntoListForm.superiorName = value.name;
    }

    /**
     * 查询事件
     */
    public onSearch(){
        if(this.helper.isEmpty(this.IntoListForm.name) && this.helper.isEmpty(this.IntoListForm.merchantNo) && this.helper.isEmpty(this.IntoListForm.superior)){
            this.msg.warning(this.i18n.fanyi('IntoPieces.listPage.search.searchLimit'));
            return;
        }
        this.intoListTable.doSearch(true);
    }

    /**
     * 新增进件
     * @param contentTpl
     */
    public onAddIntopiece(){

        const win = this.modal.static(IntoPiecesAddWinComponent, {

        }, 600, {title: this.i18n.fanyi('IntoPieces.listPage.addWin.title')});

        win.subscribe(res => {
            if(res && res == 'onOk') {
                this.intoListTable.doSearch(false);
            }
        })
    }

    /**
     * 编辑进件
     * @param contentTpl
     */
    public onEditIntopiece(row: any){

        const win = this.modal.static(IntoPiecesEditWinComponent, {
            model: newClone(row)
        }, 850, {title: this.i18n.fanyi('IntoPieces.listPage.editWin.title')});

        win.subscribe(res => {
            if(res && res == 'onOk') {
                this.intoListTable.doSearch(false);
            }
        })
    }

    /**
     * 进件事件
     * @param row
     * @param {MouseEvent} e
     */
    public onInto(row:any,e:MouseEvent):void {
        if (row['ptCenterId'] == 0) {
            this.msg.warning(this.i18n.fanyi('IntoPieces.listPage.hint.ptCenterId'));
        } else {
            let _confirm = this.nzModal.confirm({
                title: this.i18n.fanyi('default.hint.hintInfo'),
                content: row["providerNo"] ? this.i18n.fanyi('IntoPieces.listPage.hint.merchantCfm') + "【"+row["name"]+"】" + this.i18n.fanyi('IntoPieces.listPage.hint.providerCfm') + "【"+ row["providerNo"]+"】" + this.i18n.fanyi('IntoPieces.listPage.hint.into') : this.i18n.fanyi('IntoPieces.listPage.hint.current') + "【"+row["name"]+"】" + this.i18n.fanyi('IntoPieces.listPage.hint.providerNull'),
                width: '500px',
                maskClosable: false,
                onOk: () => {}
            });

            _confirm.subscribe((res) => {
                if(res && res == 'onOk') {
                    this.IntoPiecesDB.apply({
                        id: row["id"],
                        providerNo: row['providerNo'],
                        agencyCode:row['agencyCode'],
                        ptCenterId: row['ptCenterId'],
                        merchantId: row["merchantId"]
                    }).subscribe(_res => {
                        if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                            this.msg.success(this.i18n.fanyi('IntoPieces.listPage.hint.intoSuccess'));
                        } else {
                            this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                        }
                        this.intoListTable.doSearch(false);
                    })
                }
            })
        }
    }

    /**
     * 批量进件
     */
    // public onBatchIntopiece() {
    //
    //     if(this.helper.isEmpty(this.IntoListForm.bankNo)){
    //         this.msg.warning(this.i18n.fanyi('IntoPieces.listPage.search.bankWarn'));
    //         return;
    //     }
    //
    //     if(!this.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.IntoListForm.bankNo)){
    //         this.msg.warning(this.i18n.fanyi('IntoPieces.listPage.search.bankWarn2'));
    //         return;
    //     }
    //
    //     if(this.helper.isEmpty(this.IntoListForm.superior)){
    //         this.msg.warning(this.i18n.fanyi(this.i18n.fanyi('IntoPieces.listPage.search.superiorWarn')));
    //         return;
    //     }
    //
    //     // 进件状态(筛选条件)0:待进件、1:处理中、2:进件成功、3:进件失败、 4:被风控
    //     if(this.helper.isEmpty(this.IntoListForm.applyState)){
    //         this.msg.warning(this.i18n.fanyi('IntoPieces.listPage.search.applyStateWarn'));
    //         return;
    //     }
    //     if(!(this.IntoListForm.applyState === 0 || this.IntoListForm.applyState === 3)){
    //         this.msg.warning(this.i18n.fanyi('IntoPieces.listPage.search.batchWarn'));
    //         return;
    //     }
    //     this.IntoPiecesDB.BatchInto(this.IntoListForm).subscribe(res => {
    //         if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
    //             this.msg.success(this.i18n.fanyi('IntoPieces.listPage.search.batchSuc'));
    //             this.intoListTable.doSearch(false);
    //         }else{
    //             this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
    //         }
    //     })
    // }

    /**
     * 判断配置项是否匹配对应值
     * @param cfgKey  配置项key
     * @param val 匹配值
     * @return 匹配到返回true ,否 false
     */
    hasConfigValueMatch(cfgKey:string,val:any):boolean{
        let _cfgVal = this.helper.getDictByKey(cfgKey);
        if(_cfgVal && typeof _cfgVal === 'string'){
            let _cfgVals = _cfgVal.split(',');
            if(_cfgVals.findIndex((item)=>{return item == val}) != -1){
                return true;
            }
        }
        return false;
    }
}
