import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {NzMessageService, NzModalService, ObjectExtend} from 'ng-zorro-antd';
import {TradeRefundWinComponent} from './win/trade-refund-win.component';
import {CommonEnum} from '../../../common/enum/common.enum';
import {TradeRefundService} from '../../../common/services/request/trade-manage/trade-refund.service';
import {TradeRefundForm} from '../../../common/form/trade-manage/trade-refund.form';
import {CommonService} from '../../../common/services/request/common.service';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';

/**
 * 退款审核列表页
 */
@Component({
    selector: 'trade-refund-list',
    templateUrl: './trade-refund-list.component.html',
    providers:[TradeRefundService]
})
export class TradeRefundListComponent implements OnInit{
    public refundListForm: TradeRefundForm = new TradeRefundForm();
    public mchExams:Array<any> = []; // 商户审核状态
    public dmAudits:Array<any> = []; // 平台审核状态
    public rfSources:Array<any> = []; // 退款来源
    public rfStates:Array<any> = []; // 退款状态
    public transTypes:Observable<any>; // 支付类型
    public counts:any ={}; // 统计面板参数

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public modalService:NzModalService,
        public tradeRefundService:TradeRefundService,
        public _msg: NzMessageService,
        public cmService:CommonService,
        public objectExtend:ObjectExtend
    ) {
        this.mchExams = this.helper.getDictByKey('REFUND_MCH_AUDIT_STATUS');
        this.dmAudits = this.helper.getDictByKey('REFUND_DAEMON_AUDIT');
        this.rfSources = this.helper.getDictByKey('REFUND_REFUNDSOURCE');
        this.rfStates = this.helper.getDictByKey('REFUND_STATUS');
        this.transTypes = this.cmService.loadTransApi({transId:''});
    }

    ngOnInit(){
        let _form = this.objectExtend.clone(this.refundListForm);
        this.loadSummary(_form);
    }

    /**
     * 商户控件配置
     */
    public merchantNoCfg:SearchWindowConfig = {
        title:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.title'),
        url:CommonService.MCH_INFO_URL,
        params:{
            isStore:0
        },
        isAjax:false,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields:[{
            field:'merchantNo',
            label:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantNo')
        },{
            field:'name',
            label:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantName')
        }],
        tableColumns:[{
            title:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantNo'),
            index:'merchantNo'
        },{
            title:this.i18n.fanyi('TradeRefund.listPage.merchantNoCfg.merchantName'),
            index:'name'
        }]
    };

    @ViewChild('refundListTable') public refundListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:TradeRefundService.REFUND_LIST_URL,
        params:this.refundListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                // 申请时间
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.addTime'),
                index:'addTime',
                type:'date',
                dateFormat:'YYYY-MM-DD HH:mm:ss'
            },
            {
                // 退款单号/平台单号
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.refundNo') + '/' + this.i18n.fanyi('TradeRefund.listPage.tableCols.orderNo'),
                render:'refundNoRender',
                width:'220px'
            },
            {
                // 商户名称
                title: this.i18n.fanyi('TradeRefund.listPage.tableCols.merchantName'),
                index:'merchantName'
            },
            {
                // 支付类型
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.transType'),
                index:'transType'
            },
            {
                // 商户审核
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.merchantExam'),
                render:'merchantExamRender'
            },
            {
                // 平台审核
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.daemonAudit'),
                render:'dmAuditRender'
            },
            {
                // 退款金额
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.refundFee'),
                render:'refundFeeRender'
            },
            {
                // 退款状态
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.refundState'),
                render:'rfStateRender'
            },
            {
                // 风控状态
                title:this.i18n.fanyi('TradeRefund.listPage.tableCols.riskCtr'),
                render:'rCRender'
            },
            {
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        // 详情
                        text:this.i18n.fanyi('default.btn.detailBtn'),
                        hide:(()=>{
                            if(this.helper.btnRole('REFUNDDETAIL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click:((row: any) =>{
                            this.helper.navigate('/admin/trades/traderefunddetail',this.i18n.fanyi('TradeRefund.detailPage.title'),{
                                refundNo:row['refundNo']
                            });
                        }).bind(this)
                    },
                    {
                        // 重新发起
                        text:this.i18n.fanyi('TradeRefund.listPage.btn.reissueBtn'),
                        hide:((row:any)=>{
                            if(!this.helper.btnRole('REFUNDRENEW')){
                                return true;
                            }
                            if(row['refundState'] == 0 && (row['daemonAudit'] == 3 || row['daemonAudit'] == 2 || row['refundState'] == 2)){
                                return false;
                            }else{
                                return true;
                            }
                        }).bind(this),
                        click: this.onReissue.bind(this)
                    },
                    {
                        // 自动通过
                        text:this.i18n.fanyi('TradeRefund.listPage.btn.autoByPassBtn'),
                        hide:(row:any)=>{
                            if(row['daemonAudit'] == 3){
                                return false;
                            }else {
                                return  true;
                            }
                        },
                        disabled:true
                    },
                    {
                        // 审核通过
                        text:this.i18n.fanyi('TradeRefund.listPage.btn.auditByPassBtn'),
                        hide:((row:any)=>{
                            if(!this.helper.btnRole('REFUNDEXAMINE')){
                                return true;
                            }
                            if(row['daemonAudit'] == 0){
                                return false;
                            }else {
                                return  true;
                            }
                        }).bind(this),
                        click:this.onAuditByPass.bind(this)
                    },
                    {
                        // 退回
                        text:this.i18n.fanyi('TradeRefund.listPage.btn.goBackBtn'),
                        hide:((row:any)=>{
                            if(!this.helper.btnRole('REFUNDBACK')){
                                return true;
                            }
                            if(row['daemonAudit'] == 0){
                                return false;
                            }else {
                                return  true;
                            }
                        }).bind(this),
                        click:this.onGoBack.bind(this)
                    }
                ]
            }
        ]
    };


    /**
     * 列表页查询
     */
    public onSearch(){
        // 当有退款开始时间时，退款结束时间不能为空
        if(!this.helper.isEmpty(this.refundListForm.refundTimeStart) && this.helper.isEmpty(this.refundListForm.refundTimeEnd)){
            this._msg.warning(this.i18n.fanyi('TradeRefund.listPage.message.returnTimeEndTip'));
            return;
        }

        // 退款时间必须在申请时间范围内
        if(this.refundListForm.refundTimeStart && this.refundListForm.refundTimeEnd){
            let tradeStart,tradeEnd,returnStart,returnEnd,_tradeStart,_tradeEnd,_returnStart,_returnEnd;
            tradeStart = this.refundListForm.tradeTimeStart;
            tradeEnd = this.refundListForm.tradeTimeEnd;
            returnStart = this.refundListForm.refundTimeStart;
            returnEnd = this.refundListForm.refundTimeEnd;
            _tradeStart = moment(tradeStart).unix();
            _tradeEnd = moment(tradeEnd).unix();
            _returnStart = moment(returnStart).unix();
            _returnEnd = moment(returnEnd).unix();
            if( !(!(_returnStart < _tradeStart) && !(_returnEnd > _tradeEnd))){
                this._msg.warning(this.i18n.fanyi('TradeRefund.listPage.message.returnTimeLimit'));
                return;
            }
        }
        let _form = this.objectExtend.clone(this.refundListForm);
        this.loadSummary(_form);
        this.refundListTable.doSearch();
    }

    /**
     * 申请退款
     */
    public onApplyRefund(){
        const subscription = this.modalService.open({
            title:this.i18n.fanyi('TradeRefund.listPage.btn.applyRefundBtn'),
            content:TradeRefundWinComponent,
            footer:false,
            maskClosable:false
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this.refundListTable.doSearch();
            }
        })
    }

    /**
     * 重新发起
     */
    public onReissue(row:any){
        const reWin = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:'【'+ row['refundNo'] + '】' + this.i18n.fanyi('TradeRefund.listPage.message.reissueConfirm')
        });
        reWin.subscribe(result => {
            if(result && result == 'onOk'){
                this.tradeRefundService.renew({
                    refundNo:row['refundNo'],
                    mchRefuseReason:row['mchRefuseReason'],
                    refundUser: row['refundUser']
                }).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('TradeRefund.listPage.message.reissueSuc'));
                        this.refundListTable.doSearch(false); // 刷新表格
                    }else{
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }

    /**
     * 审核通过
     * @param row
     */
    public onAuditByPass(row:any){
        const auditPassWin = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('TradeRefund.listPage.message.passConfirm')
        });
        auditPassWin.subscribe(result => {
            if(result && result == 'onOk'){
                this.tradeRefundService.pass({refundNo:row['refundNo']})
                    .subscribe(res => {
                        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                            this._msg.success(this.i18n.fanyi('TradeRefund.listPage.message.passSuc'));
                            this.refundListTable.doSearch(false); // 刷新表格
                        }else{
                            this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                        }
                    })
            }
        })
    }

    /**
     * 退回
     */
    public onGoBack(row:any){
        const backWin = this.modalService.confirm({
            title:this.i18n.fanyi('default.hint.hintInfo'),
            content:this.i18n.fanyi('TradeRefund.listPage.message.backConfirm')
        });
        backWin.subscribe(result => {
            if(result && result == 'onOk'){
                this.tradeRefundService.back({refundNo:row['refundNo']})
                    .subscribe(res => {
                        if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                            this._msg.success(this.i18n.fanyi('TradeRefund.listPage.message.backSuc'));
                            this.refundListTable.doSearch(false); // 刷新表格
                        }else{
                            this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                        }
                    })
            }
        })
    }

    /**
     * 统计面板数据查询
     */
    public loadSummary(form){
        this.tradeRefundService.loadCount(form).subscribe( res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.counts = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 交易结束日期限制
     * @param endValue
     * @returns {boolean}
     */
    public refundTradeEndDateDisabled(endValue:any){
        if(!endValue || !this.refundListForm.tradeTimeEnd){
            return false;
        }
        return endValue < this.helper.modifyDateByDay(this.refundListForm.tradeTimeStart) || endValue >= this.helper.modifyDateByDay(this.refundListForm.tradeTimeStart,30);
    }

    /**
     * 退款结束时间限制
     * @param endValue
     * @returns {boolean}
     */
    returnTimeEndDateDisabled(endValue:any){
        if(!endValue || !this.refundListForm.refundTimeStart){
            return false;
        }
        if(typeof endValue == 'object'){
            let _start = this.refundListForm.refundTimeStart;
            let _end = moment(_start).add(30,'days').format('YYYY-MM-DD 23:59:59');
            return endValue.getTime() < new Date(_start).getTime() || endValue.getTime() > new Date(_end).getTime();
        }
    }

    /**
     * 退款开始时间切换事件
     * @param data
     */
    returnTimeStartChange(data:any){
        if(data){
            let _start = moment(data).format('YYYY-MM-DD HH:mm:ss');
            this.refundListForm.refundTimeStart = _start;
        }else{
            this.refundListForm.refundTimeStart = null;
            this.refundListForm.refundTimeEnd = null;
        }
    }

    /**
     * 退款开始时间切换事件
     * @param data
     */
    returnTimeEndChange(data:any){
        if(data){
            let _end = moment(data).format('YYYY-MM-DD 23:59:59');
            this.refundListForm.refundTimeEnd = _end;
        }else{
            this.refundListForm.refundTimeEnd = null;
        }
    }
}
