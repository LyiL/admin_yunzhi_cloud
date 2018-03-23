import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {RefundSetsService} from "../../../../common/services/request/user-file-manage/refund-setting.service";
import {RefundStrategyAddWinComponent} from "./refund-strategy-add-win.component";
import {NzModalService} from "ng-zorro-antd";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

@Component({
    selector:'refund-strategy-list',
    templateUrl:'./refund-strategy-list.component.html',
    providers: [RefundSetsService]
})
export class RefundStrategyListComponent implements OnInit{
    @ViewChild('refundStrategyListTable') public refundStrategyListTable:SimpleTableComponent;
    /**
     * 表格配置
     */
    public tableCfg:any = {
        url:RefundSetsService.REFUNDSTRATEGY_LIST_URL,
        params:{},
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.merchantNo'),
                index:'merchantNo'
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.transType'),
                index:'transType'
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.transId'),
                index:'transId'
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.refundDayRange'),
                index:'refundDayRange'
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.dayRefundCount'),
                index:'dayRefundCount'
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.singleRefundFee'),
                index:'singleRefundFee',
                data:function (val) {
                    let _singleRefundFee = val / 100;
                    return _singleRefundFee;
                }
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.dayRefundFee'),
                index:'dayRefundFee',
                data:function (val) {
                    let _dayRefundFee = val / 100;
                    return _dayRefundFee;
                }
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.useState'),
                render:'useStateRender'
            },{
                title:this.i18n.fanyi('RefundSets.refStrategyPage.tableCols.createdTime'),
                index:'createdTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide:(()=>{
                        if(this.helper.btnRole('REFUNDPOLICYSETTINGEDIT')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: this.onEditStrategy.bind(this)
                }]
            }
        ]
    };

    constructor(public helper:HelperService,
                protected i18n:I18NService,
                protected modalService: NzModalService,
                protected menuService: MenuService,
                public router: Router
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let _merchantNo = menu['params']['merchantNo'];
        this.tableCfg.params = {merchantNo:_merchantNo};
    }

    /**
     * 添加退款策略
     */
    public onAddStrategy(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('RefundSets.refStrategyPage.btn.addBtn'),
            content: RefundStrategyAddWinComponent,
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
                this.refundStrategyListTable.doSearch(false);//刷新表格
            }
        })
    }

    /**
     * 编辑退款策略
     */
    onEditStrategy(row:any){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let menuParams = menu['params'];
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('RefundSets.refStrategyPage.btn.editBtn'),
            content: RefundStrategyAddWinComponent,
            footer: false,
            maskClosable:false,// 点击蒙层不允许关闭;
            componentParams: {
                paramsInfo:{
                    name: menuParams['name'],
                    merchantNo:menuParams['merchantNo'],
                    id: row['id']
                }
            }
        });
        subscription.subscribe(res => {
            if(res && res == 'onOk' ){
                this.refundStrategyListTable.doSearch(false);//刷新表格
            }
        })
    }
}
