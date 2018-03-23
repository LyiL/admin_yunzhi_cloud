import {Component, OnInit} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent, DynamicStepsService} from "@delon/abc";
import {NzMessageService, ObjectExtend} from "ng-zorro-antd";
import {HelperService} from "../../../../../common/services/helper.service";
import {Router} from "@angular/router";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";
import {I18NService} from "app/common/i18n/i18n.service";
import {MenuService, ModalHelper} from '@delon/theme';
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {SpInfoConfigWeixinWinComponent} from '../../win/weixin/sp-infoConfig-weixin-win.component';
import {newClone} from '@delon/abc/utils/utils';
import {SpTradeFeeLimitWinComponent} from '../../win/trade-fee-limit/sp-tradeFeeLimit-win.component';

/**
 * 服务商新增页-信息配置页
 */
@Component({
    selector:'sp-edit-info-config',
    templateUrl:'./sp-edit-infoConfig.component.html',
    styles:[`.config-row{margin-left:30px;margin-bottom:16px}`],
    providers: [ServiceProviderService]
})
export class SpEditInfoConfigComponent implements OnInit{
    public weixinData:any; // 公众号配置参数
    public tradeLimitData:any; // 交易限额配置参数
    public stepData:any; // 接收步骤跳转时传递的数据

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
     * 交易限额基础信息配置
     */
    public tradeLimitFields:Array<any> = [
        {
            title:this.i18n.fanyi("SP.detailPage.infoCfg.tradeLimit.detail.totalFeeLimit"),
            field:'totalFeeLimit'
        }
    ];

    constructor(public helper:HelperService,
                public spService:ServiceProviderService,
                public menuService:MenuService,
                public router:Router,
                public object:ObjectExtend,
                public msg:NzMessageService,
                public i18n:I18NService,
                public modalHelper:ModalHelper,
                protected dynamicStepsService:DynamicStepsService
    ){}

    ngOnInit(){
        this.stepData = this.dynamicStepsService.getStepByInstance(0).model;
        let _chanCode = this.stepData['chanCode'];
        /**
         * 初始化公众号配置
         */
        this.loadWeixin({chanCode:_chanCode});
        /**
         * 初始化交易限额配置
         */
        this.loadTradeLimit({chanCode:_chanCode});
    }

    /**
     * 加载微信公众号配置
     */
    public loadWeixin(data){
        this.spService.querySPWxConfig(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.weixinData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 新增公众号配置
     */
    addWeixin(){
        if(this.stepData && this.stepData['chanCode']){
            let _chanCode = this.stepData['chanCode'];
            let win = this.modalHelper.static(SpInfoConfigWeixinWinComponent,{
                chanCode:_chanCode
            },700,{title:this.i18n.fanyi('SP.detailPage.infoCfg.weixin.newTitle')});
            win.subscribe(res => {
                this.loadWeixin({chanCode:_chanCode}); // 刷新公众号配置信息
            })
        }
    }

    /**
     * 编辑公众号配置
     */
    editWeixin(){
        if(this.stepData && this.stepData['chanCode']){
            let _chanCode = this.stepData['chanCode'];
            let win = this.modalHelper.static(SpInfoConfigWeixinWinComponent,{
                model:newClone(this.weixinData)
            },700,{title:this.i18n.fanyi('SP.detailPage.infoCfg.weixin.newTitle')});
            win.subscribe(res => {
                this.loadWeixin({chanCode:_chanCode}); // 刷新公众号配置信息
            })
        }
    }

    /**
     * 加载交易限额配置
     */
    public loadTradeLimit(data){
        this.spService.loadTradeLimit(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tradeLimitData = res[CommonEnum.SERVER_DATA_KEY];
            }else{
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }

    /**
     * 配置交易限额
     */
    public onEditTradeLimit(){
        if(this.stepData && this.stepData['chanCode']){
            let _chanCode = this.stepData['chanCode'];
            let win = this.modalHelper.static(SpTradeFeeLimitWinComponent,{
                chanCode:_chanCode,
                totalFeeLimit:this.tradeLimitData['totalFeeLimit']
            },500,{title:this.i18n.fanyi('SP.detailPage.infoCfg.tradeLimit.title')});
            win.subscribe(res => {
                this.loadTradeLimit({chanCode:_chanCode}); // 刷新交易限额配置
            })
        }
    }

    /**
     * 返回上一步
     */
    prev() {
        this.dynamicStepsService.prevStep();
    }

    /**
     * 返回列表页
     */
    onNext() {
        this.helper.navigate('/admin/user/splist', this.i18n.fanyi('SP.listPage.title'), {},true);
    }
}
