import {Component} from '@angular/core';
import {mchService} from '../../../common/services/request/user-file-manage/mch.service';
import {ReuseTabService} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {I18NService} from '../../../common/i18n/i18n.service';
import {HelperService} from '../../../common/services/helper.service';
import {MenuService} from '@delon/theme';
import {Router} from '@angular/router';
import {CommonEnum} from '../../../common/enum/common.enum';
import {CommonService} from '../../../common/services/request/common.service';

/**
 * 商户微信公众号配置信息详情
 */
@Component({
  selector:"merchant-weixinAccountSet-detail",
  templateUrl:"merchant.weixinAccountSet.detail.component.html",
  providers: [mchService]
})
export class merchantWeixinAccountSetDetailComponent{
    public WxInfoData :any; // 微信详情参数
    public WxConfigDetailFields:Array<any> =[
        {title:this.i18n.fanyi("Mch.WXconfig.titleChild"),
         children:
        [
            {
                title:this.i18n.fanyi("Mch.WXconfig.transType"),
                field:'transType',
                type:"br"
            },
        {
            title:this.i18n.fanyi("Mch.WXconfig.ally"),
            field:'ally'
        },
        {
            title:this.i18n.fanyi("Mch.WXconfig.jsapiPath"),
            field:'jsapiPathList',
            type:"array"
        },
        {
            title:this.i18n.fanyi("Mch.WXconfig.subscribeAppid"),
            field:'subscribeAppid'
        },
        {
            title:this.i18n.fanyi("Mch.WXconfig.subAppid"),
            field:'subAppidList',
            type:"arrayObject"
        }
    ]}
    ]




  constructor( public helper:HelperService,public i18n:I18NService,public reuseTabDB:ReuseTabService,
               public msg: NzMessageService,  public menuService:MenuService,  public router:Router,
               public mchDb:mchService){}
    ngOnInit(){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let _params = menu['params'];
            this.WxInfoData = _params;
            // this.loadDetail(_params);
        }
    }
    // /**
    //  * 加载订单详情
    //  */
    // public loadDetail(data){
    //     this.mchDb.getWxConfig(data).subscribe(res=>{
    //         if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
    //             this.WxInfoData = res[CommonEnum.SERVER_DATA_KEY];
    //         }else{
    //             this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
    //         }
    //     });
    // }


  public onBack(){
      this.helper.navigate('/admin/user/mchlist', this.i18n.fanyi('Mch.title'), {});
  }
}





