import {Component, OnInit} from "@angular/core";
import {SearchWindowConfig, SimpleTableComponent, DynamicStepsService} from "@delon/abc";
import {NzMessageService, ObjectExtend} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {I18NService} from "app/common/i18n/i18n.service";
import {MenuService, ModalHelper} from '@delon/theme';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {HelperService} from '../../../../common/services/helper.service';
import {MchTradeFeeLimitWinComponent} from '../win/mch-tradeFeeLimit-win.component';
import {CommonEnum} from '../../../../common/enum/common.enum';

/**
 * 商户新增页-信息配置页
 */
@Component({
    selector:'mch-info-config',
    templateUrl:'./mch-infoConfig.component.html',
    providers: [mchService]
})
export class MchInfoConfigComponent implements OnInit{
    public tradeLimitData:any; // 交易限额配置参数
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
                public mchDB:mchService,
                public menuService:MenuService,
                public router:Router,
                public object:ObjectExtend,
                public msg:NzMessageService, public _msg:NzMessageService,
                public i18n:I18NService,public modalHelper:ModalHelper,
                protected dynamicStepsService:DynamicStepsService
    ){

    }

    ngOnInit(){
        let stepData = this.dynamicStepsService.getStepByInstance(0);
        if(stepData && stepData['model']){
            let _merchantNo =stepData.model.merchantNo;
            /**
             * 初始化交易限额配置
             */
            this.loadTradeLimit({merchantNo:_merchantNo});
        }
    }

    /**
     * 加载交易限额配置
     */
    public loadTradeLimit(data){
        this.mchDB.queryMchLimit(data).subscribe(res => {
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
        let stepData = this.dynamicStepsService.getStepByInstance(0);
        if(stepData && stepData['model']){
            let menuMerchantNo =stepData.model.merchantNo;
            let win = this.modalHelper.static(MchTradeFeeLimitWinComponent,{
                merchantNo:menuMerchantNo,
                totalFeeLimit:this.tradeLimitData['totalFeeLimit']
            },600,{title:this.i18n.fanyi('SP.detailPage.infoCfg.tradeLimit.title')});
            win.subscribe(res => {
                this.loadTradeLimit({merchantNo:menuMerchantNo}); // 刷新交易限额配置
            })
        }
    }

    /**
     *上一步
     */
    onPrev() {
        this.dynamicStepsService.prevStep();
    }

    onSubmit(){
        this.helper.navigate('/admin/user/mchlist', this.i18n.fanyi('Mch.title'), {},true);
    }


}
