import {Component, OnInit} from "@angular/core";
import {HelperService} from "../../../../../common/services/helper.service";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";
import {MenuService, ModalHelper} from '@delon/theme';
import {Router} from "@angular/router";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {ObjectExtend, NzMessageService} from "ng-zorro-antd";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {SpTradeRuleWinComponent} from '../../win/trade-rule/sp-tradeRule-win.component';
import {SpInfoConfigWeixinWinComponent} from '../../win/weixin/sp-infoConfig-weixin-win.component';
import {newClone} from '@delon/abc/utils/utils';
import {SpTradeFeeLimitWinComponent} from '../../win/trade-fee-limit/sp-tradeFeeLimit-win.component';

export type AuditDataType = {name:string,examStyle:string};
/**
 * 服务商详情页-信息配置页
 */
@Component({
    selector:'sp-detail-info-config',
    templateUrl:'./sp-detail-infoConfig.component.html',
    styles:[`.config-row{margin-left:30px;margin-bottom:16px}`],
    providers:[ServiceProviderService]
})
export class SpDetailInfoConfigComponent implements OnInit{
    public weixinData:any; // 公众号配置参数
    public subMchPatternData:any; // 子商户模式配置参数
    public tradeLimitData:any; // 交易限额配置参数

    /**
     * 公众号基础信息配置
     */
    public weixinFields:Array<any> = [
        {
            title:this.i18n.fanyi("SP.detailPage.infoCfg.weixin.detail.subAppid"),
            field:'subAppid'
        },
        {
            title:this.i18n.fanyi("SP.detailPage.infoCfg.weixin.detail.subscribeAppid"),
            field:'subscribeAppid'
        },
        {
            title:this.i18n.fanyi("SP.detailPage.infoCfg.weixin.detail.jsapiPath"),
            field:'jsapiPath'
        }
    ];

    /**
     * 子商户配置基础信息配置
     */
    public subMchPatternFields:Array<any> = [
        {
            title:this.i18n.fanyi("SP.detailPage.infoCfg.subMchPattern.detail.examStyle"),
            field:'examStyle'
        }
    ];

    /**
     * 交易限额基础信息配置
     */
    public tradeLimitFields:Array<any> = [
        {
            title:this.i18n.fanyi("SP.detailPage.infoCfg.tradeLimit.detail.totalFeeLimit"),
            field:'totalFeeLimit'
        }
    ];

    constructor(
        public helper:HelperService,
        public spService:ServiceProviderService,
        public menuService:MenuService,
        public router:Router,
        public _msg:NzMessageService,
        public i18n:I18NService,
        public modalHelper:ModalHelper,
        public objectExtend:ObjectExtend
    ){}

    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let menuParams = menu['params'];
            let menuChanCode = menuParams['chanCode'];
            /**
             * 初始化公众号配置
             */
            this.loadWeixin({chanCode:menuChanCode});
            /**
             * 初始化子商户模式配置
             */
            // this.loadSubMchPattern({chanCode:menuChanCode});
            /**
             * 初始化交易限额配置
             */
            this.loadTradeLimit({chanCode:menuChanCode});
        }
    }

    /**
     * 加载微信公众号配置
     */
    public loadWeixin(data){
        this.spService.querySPWxConfig(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.weixinData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 新增公众号配置
     */
    addWeixin(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let menuParams = menu['params'];
            let menuChanCode = menuParams['chanCode'];
            let win = this.modalHelper.static(SpInfoConfigWeixinWinComponent,{
                chanCode:menuChanCode
            },700,{title:this.i18n.fanyi('SP.detailPage.infoCfg.weixin.newTitle')});
            win.subscribe(res => {
                this.loadWeixin({chanCode:menuChanCode}); // 刷新公众号配置信息
            })
        }
    }

    /**
     * 编辑公众号配置
     */
    editWeixin(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let menuParams = menu['params'];
            let menuChanCode = menuParams['chanCode'];
            let win = this.modalHelper.static(SpInfoConfigWeixinWinComponent,{
                model:newClone(this.weixinData)
            },700,{title:this.i18n.fanyi('SP.detailPage.infoCfg.weixin.newTitle')});
            win.subscribe(res => {
                this.loadWeixin({chanCode:menuChanCode}); // 刷新公众号配置信息
            })
        }
    }

    /**
     * 加载子商户模式配置
     */
    public loadSubMchPattern(data){
        this.spService.loadSubMchType(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.subMchPatternData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 配置子商户模式
     */
    onEditSubMchPattern(){
    }

    /**
     * 加载交易限额配置
     */
    public loadTradeLimit(data){
        this.spService.loadTradeLimit(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tradeLimitData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 配置交易限额
     */
    public onEditTradeLimit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let menuParams = menu['params'];
            let menuChanCode = menuParams['chanCode'];
            let win = this.modalHelper.static(SpTradeFeeLimitWinComponent,{
                chanCode:menuChanCode,
                totalFeeLimit:this.tradeLimitData['totalFeeLimit']
            },500,{title:this.i18n.fanyi('SP.detailPage.infoCfg.tradeLimit.title')});
            win.subscribe(res => {
                this.loadTradeLimit({chanCode:menuChanCode}); // 刷新交易限额配置
            })
        }
    }
}
