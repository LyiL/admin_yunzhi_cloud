import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {RefundSetsService} from "../../../../common/services/request/user-file-manage/refund-setting.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {RefundAuthorityAddWinComponent} from "./refund-authority-add-win.component";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

@Component({
    selector:'refund-authority-list',
    templateUrl:'./refund-authority-list.component.html',
    providers: [RefundSetsService]
})
export class RefundAuthorityListComponent implements OnInit{
    @ViewChild('refundAuthListTable') public refundAuthListTable:SimpleTableComponent;
    /**
     * 表格配置
     */
    public tableCfg:any = {
        url:RefundSetsService.REFUNDAUTH_LIST_URL,
        params:{},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('RefundSets.refAuthPage.tableCols.merchantNo'),
                index:'merchantNo'
            },{
                title:this.i18n.fanyi('RefundSets.refAuthPage.tableCols.transType'),
                index:'transType'
            },{
                title:this.i18n.fanyi('RefundSets.refAuthPage.tableCols.refundAuth'),
                index:'refundAuth',
                data: (function(value){
                    if(value && typeof value == 'string'){
                        let _refundAuths = value.split(',');
                        let _refundAuthNames:Array<string> = [];
                        if(_refundAuths && _refundAuths.length > 0){
                            _refundAuths.forEach && _refundAuths.forEach((_refundAuth:any)=>{
                                _refundAuthNames.push(this.helper.dictTrans('MCH_REFUND_AUTH_REFUND_AUTH',_refundAuth));
                            });
                        }
                        return _refundAuthNames.join(',');
                    }
                }).bind(this),
            },{
                title:this.i18n.fanyi('RefundSets.refAuthPage.tableCols.examType'),
                render:'examTypeRender'
            },{
                title:this.i18n.fanyi('RefundSets.refAuthPage.tableCols.addTime'),
                index:'addTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },{
                title:this.i18n.fanyi('RefundSets.refAuthPage.tableCols.isEnabled'),
                render:'isEnabledRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('REFUNDAUTHSETTINGEDIT')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: this.onEditAuthority.bind(this)
                }]
            }
        ]
    };
    constructor(public helper:HelperService,
                protected i18n:I18NService,
                protected modalService: NzModalService,
                protected menuService: MenuService,
                public router: Router,
                protected refundDBService: RefundSetsService,
                public message: NzMessageService,
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let _merchantNo = menu['params']['merchantNo'];
        this.tableCfg.params = {merchantNo:_merchantNo};
    }

    /**
     * 修改使用状态
     */
    onUpdateStatus(item){
        let that = this;
        that.modalService.confirm({
            title  : this.i18n.fanyi('default.hint.hintInfo'),
            // content:  "您确认要变更当前【"+ item['transType']+"】状态吗？",
            content: this.i18n.fanyi('RefundSets.refAuthPage.message.changeState1') + item['transType'] + this.i18n.fanyi('RefundSets.refAuthPage.message.changeState2'),
            maskClosable:false,// 点击蒙层不允许关闭;
            onOk() {
                let _isEnabled = item['isEnabled'];
                if(_isEnabled == 1){
                    _isEnabled = 0;
                }else if(_isEnabled == 0) {
                    _isEnabled = 1;
                }
                that.refundDBService.updateStatus({authId: item['authId'], isEnabled: _isEnabled}).subscribe((res) => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        that.message.success(that.i18n.fanyi('default.hint.doSuccess'));
                        that.refundAuthListTable.doSearch(false);//刷新表格
                    }else {
                        that.message.warning(res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            },
            onCancel() {
            }
        })
    }

    /**
     * 添加退款权限
     */
    public onAddAuthority(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('RefundSets.refAuthPage.btn.addBtn'),
            content: RefundAuthorityAddWinComponent,
            maskClosable:false,// 点击蒙层不允许关闭;
            footer: false,
            componentParams: {
                paramsInfo:{
                    name: menuParams['name'],
                    merchantNo:menuParams['merchantNo']
                }
            }
        });
        subscription.subscribe(res => {
            if(res && res == 'onOk' ){
                this.refundAuthListTable.doSearch(false);//刷新表格
            }
        })
    }
    /**
     * 编辑退款权限
     */
    onEditAuthority(row:any){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('RefundSets.refAuthPage.btn.editBtn'),
            content: RefundAuthorityAddWinComponent,
            maskClosable:false,// 点击蒙层不允许关闭;
            footer: false,
            componentParams: {
                paramsInfo:{
                    name: menuParams['name'],
                    merchantNo:menuParams['merchantNo'],
                    authId: row['authId'],
                }
            }
        });
        subscription.subscribe(res => {
            if(res && res == 'onOk' ){
                this.refundAuthListTable.doSearch(false);//刷新表格
            }
        })
    }
}
