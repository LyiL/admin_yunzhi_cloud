import {Component, OnInit} from '@angular/core';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {CommonService} from '../../../../common/services/request/common.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {Router} from '@angular/router';
import {MenuService, ModalHelper} from '@delon/theme';
import {HelperService} from '../../../../common/services/helper.service';
import {NzMessageService, ObjectExtend} from 'ng-zorro-antd';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {MchTradeFeeLimitWinComponent} from '../win/mch-tradeFeeLimit-win.component';
import {MchInfoConfigSecretkeyComponent} from '../win/mch.infoconfig.secretkey.component';
/**
 * 商户详情信息配置页面
 */
@Component({
    selector:'mch-infoConfigDetail',
    templateUrl:'./mch-infoConfigDetail.component.html',
    providers: [mchService,CommonService]

})
export class MchInfoConfigDetailComponent implements OnInit {
    public tradeLimitData:any; // 交易限额配置参数
    public rsaPublicKeyData:any; // 公钥配置参数

    /**
     * 交易限额基础信息配置
     */
    public tradeLimitFields:Array<any> = [
        {
            title:this.i18n.fanyi("SP.detailPage.infoCfg.tradeLimit.detail.totalFeeLimit"),
            field:'totalFeeLimit'
        }
    ];
    /**
     * 公钥信息配置
     */
    public rsaPublicKeyFields:Array<any> = [
        {
            title:this.i18n.fanyi("Mch.step.infoCfg.rsaPublicKey"),
            field:'rsaPublicKey'
        }
    ];
    constructor(public mchDB:mchService,  public i18n:I18NService, public menuService:MenuService,
                public helper:HelperService, public modalHelper:ModalHelper,  public _msg:NzMessageService,
                public objectExtend:ObjectExtend,
                public router:Router){}
    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let menuParams = menu['params'];
            let _merchantNo = menuParams['merchantNo'];
            /**
             * 初始化交易限额配置
             */
            this.loadTradeLimit({merchantNo:_merchantNo});
            /**
             * 初始化公钥配置
             */
            // this.loadRsaPublicKey({orgNo:_merchantNo});
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
    // /**
    //  * 加载公钥限额配置
    //  */
    // public loadRsaPublicKey(data){
    //     this.mchDB.queryOrgRsakey(data).subscribe(res => {
    //         if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
    //             this.rsaPublicKeyData = res[CommonEnum.SERVER_DATA_KEY];
    //         }else{
    //             this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
    //         }
    //     })
    // }

    /**
     * 配置交易限额
     */
    public onEditTradeLimit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let menuParams = menu['params'];
            let menuMerchantNo = menuParams['merchantNo'];
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
     * 配置公钥
     */
    // public onSetOrgRsakey(){
    //     let menu = this.menuService.getUrlByMenu(this.router.url);
    //     if(menu && menu['params']){
    //         let menuParams = menu['params'];
    //         let menuMerchantNo = menuParams['merchantNo'];
    //         let win = this.modalHelper.static(MchInfoConfigSecretkeyComponent,{
    //             _merchantNo:menuMerchantNo,
    //         },600,{title:this.i18n.fanyi('Mch.step.infoCfg.rsaPublicKey')});
    //         win.subscribe(res => {
    //             this.loadRsaPublicKey({merchantNo:menuMerchantNo}); // 刷新交易限额配置
    //         })
    //     }
    // }
}
