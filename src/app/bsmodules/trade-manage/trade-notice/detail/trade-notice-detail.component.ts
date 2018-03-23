import {Component, OnDestroy, OnInit} from '@angular/core';
import {HelperService} from '../../../../common/services/helper.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {MenuService} from '@delon/theme';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {TradeNoticeService} from '../../../../common/services/request/trade-manage/trade-notice.service';
import {ReuseTabService} from '@delon/abc';

/**
 * 交易通知详情页
 */
@Component({
    selector:'trade-notice-detail',
    templateUrl:'./trade-notice-detail.component.html',
    providers:[TradeNoticeService],
    styles:[`.break-reqXml{width:90%;word-break: break-all;word-wrap: break-word;}`]
})
export class TradeNoticeDetailComponent implements OnInit, OnDestroy{
    public tradeNoticeInfoData:any; // 交易通知详情参数

    /**
     * 交易查询详情基础信息配置
     */
    public tradeNoticeFields:Array<any> = [
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.id"),
            field:'id'
        },
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.orderNo"),
            field:'orderNo'
        },
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.plantReqXml"),
            field:'plantReqXml',
            type:'reqXml'
        },
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.outRspXml"),
            field:'outRspXml'
        },
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.notifyState"),
            field:'notifyState',
            type:'dict',
            transKey:'ORDER_NOTIFY_STATE'
        },
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.createdTime"),
            field:'createdTime',
            type:'datetime',
            format:'YYYY-MM-DD HH:mm:ss'
        },
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.reqType"),
            field:'reqType',
            type:'dict',
            transKey:'ORDER_NOTIFY_TYPE'
        },
        {
            title:this.i18n.fanyi("TradeNotice.detailPage.detail.errmsg"),
            field:'errmsg'
        }
    ];

    constructor(
        public tradeNoticeService:TradeNoticeService,
        public helper:HelperService,
        public i18n:I18NService,
        public menuService:MenuService,
        public router:Router,
        public _msg: NzMessageService,
        private reuseTabService:ReuseTabService
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url); // 获取路由
        if(menu && menu['params']){
            let menuParams = menu['params']; // 获取路由参数
            this.loadDetail({id:menuParams['id']});
        }
    }

    ngOnDestroy(){
        this.reuseTabService.refresh();
    }

    /**
     * 加载订单详情
     */
    public loadDetail(data){
        this.tradeNoticeService.loadNoticeDetail(data).subscribe(res=>{
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tradeNoticeInfoData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        });
    }

    /**
     * 返回列表页
     */
    public _onBack(){
        this.helper.navigate('/admin/trades/tradenotice',this.i18n.fanyi('TradeNotice.listPage.title'),{});
    }
}
