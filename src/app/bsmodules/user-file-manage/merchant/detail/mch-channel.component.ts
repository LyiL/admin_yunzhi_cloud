import {Component, ViewChild} from '@angular/core';
import {I18NService} from "../../../../common/i18n/i18n.service";
import {MenuService, ModalHelper} from '@delon/theme';
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {mchService} from "../../../../common/services/request/user-file-manage/mch.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {Router} from "@angular/router";
import {MchChannelInfoWinComponent} from "../win/mch-channel-info-win";
import {SimpleTableComponent} from '@delon/abc';
import {MchChannelDetailInfoWinComponent} from '../win/mch-channel-detailInfo.win';
import {HelperService} from '../../../../common/services/helper.service';
import {MchTradeRuleWinComponent} from '../win/mch-tradeRule-win.component';
/**
 * 商户详情渠道信息页面
 */
@Component({
    selector:'mch-channel',
    templateUrl:'./mch-channel.component.html'
})
export class MerchantChannelComponent{
    /**
     * 渠道信息配置
     */
    public tableCfg:any;
    public menu:any; //路由参数
    public mchData:any;  //接收路由参数
    /**
     *  路由配置数据
     */
    public tradeRuleData:any;
    @ViewChild('mchChannelTable') public mchChannelTable:SimpleTableComponent;
    constructor(public i18n:I18NService,public mchDB:mchService,public msg: NzMessageService,
                public helper: HelperService,  public confirmServ: NzModalService,
                 public router:Router,public modalHelper:ModalHelper,
                public menuService:MenuService){}
    ngOnInit(){
        this.menu = this.menuService.getUrlByMenu(this.router.url);
        this.mchData = this.menu['params'];
        this.tableCfg = {
            url:mchService.MCH_CHANNEL_LIST_URL,
            params:{merchantId:this.mchData['id']},
            isAjax:true,
            resReName:CommonEnum.TABLE_NOT_PAGE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            tableColumns:[{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.transId"),
                index:'transType'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.bankNo"),
                index:'agencyName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.ptCenterId"),
                index:'centerName'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.providerNo"),
                // index:'providerNo',
                render:'providerNoRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.applyState"),
                render:'applyStateRender',
                // index:'applyState'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.ally"),
                // index:'ally',
                render:'allyRender'
            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.thirdAppid"),
                // index:'thirdAppid'
                render:'thirdAppidRender'

            },{
                title:this.i18n.fanyi("Mch.detailPage.detail.channelTable.pcmPartkey"),
                // index:'pcmPartkey',
                render:'pcmPartkeyRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('default.btn.editBtn'),
                    hide: ((row) => {
                        if(!this.helper.btnRole('MCHPGEDIT')){
                            return true;
                        }
                        let _applyState = row['applyState'];
                        if(_applyState == 0 || _applyState == 2 ||  _applyState == 3){
                            return false;
                        }
                        return true;
                    }),
                    click: this.onEdit.bind(this),
                },{
                    text: this.i18n.fanyi("Mch.btn.into"), // 要根据进件状态判断显示进件按钮还是重新进件按钮
                    hide: ((row) => {
                        if(!this.helper.btnRole('MCHINTOPIECES')){
                            return true;
                        }
                        let _applyState = row['applyState'];
                        if(_applyState == 0) {
                            return false;
                        }
                        return true;
                    }),
                    click: this.onInto.bind(this)
                },{
                    text: this.i18n.fanyi("Mch.btn.reInto"),
                    hide: ((row) => {
                        if(!this.helper.btnRole('INTOPIECESRESET')){
                            return true;
                        }
                        let _applyState = row['applyState'];
                        if(_applyState == 3) {
                            return false;
                        }
                        return true;
                    }),
                    click: this.onReInto.bind(this)
                },{
                    text:this.i18n.fanyi("default.btn.detailBtn"),
                    click:((row)=>{
                        this.modalHelper.static(MchChannelDetailInfoWinComponent,{channelInfoData:row},800);
                    }).bind(this)
                }
                ]
            }]
        };
        /**
         * 初始化路由配置
         */
        this.loadTradeRule({parentNo: this.mchData['merchantNo']});

    }

    /**
     * 加载路由配置
     * @param data
     */
    public loadTradeRule(data){
        this.mchDB.tradeRuleConf(data).subscribe(res => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.tradeRuleData = res[CommonEnum.SERVER_DATA_KEY];
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }
    /**
     * 切换路由配置
     */
    public onChangeTradeRule(data){
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']){
            let params = menu['params'];
            let _msg:string;
            if(params && params['merchantNo']){
                let _merchantNo = params['merchantNo'];
                let win:any;
                let _ruleState:number;
                if(!data || data['ruleState'] == 1){
                    _ruleState = 0;
                    _msg = this.i18n.fanyi('SP.detailPage.tradeRuleCfg.disableMsg');
                    // 打开支付类型弹窗
                    win = this.modalHelper.static(MchTradeRuleWinComponent,{
                        parentNo:_merchantNo,
                        ruleState:_ruleState,
                        attention:_msg
                    },500,{title:this.i18n.fanyi('default.hint.hintInfo')});
                    win.subscribe(res => {
                        this.loadTradeRule({parentNo: _merchantNo}); // 刷新路由配置信息
                    })
                }else{
                    _ruleState = 1;
                    // 打开提示弹窗
                    _msg = this.i18n.fanyi('SP.detailPage.tradeRuleCfg.enableMsg');
                    win = this.confirmServ.confirm({
                        title:this.i18n.fanyi('default.hint.hintInfo'),
                        content:_msg,
                        maskClosable:false
                    });
                    win.subscribe(res => {
                        if(res && res == 'onOk'){
                            this.mchDB.tradeRuleSave({
                                parentNo:_merchantNo,
                                ruleState:_ruleState
                            }).subscribe(result => {
                                if(result && result[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                                    this.msg.success(this.i18n.fanyi('default.hint.changeSuccess')); // 提交成功
                                    this.loadTradeRule({parentNo: _merchantNo}); // 刷新路由配置信息
                                } else {
                                    this.msg.error(result[CommonEnum.SERVER_MES_KEY]); // 返回失败信息
                                }
                            })
                        }
                    })
                }
            }
        }
    }



    /**
     * 新增渠道信息
     */
    addChannel(row:any){
        let tableData = this.mchChannelTable._data;
        let singleData ={
            bankNo:this.mchData['bankNo'],
            bankName:this.mchData['bankName'],
            orgId:this.mchData['orgId'],
            merchantId:this.mchData['id'],
            merchantNo:this.mchData['merchantNo'],
            chanNo:this.mchData['chanNo'],
            categoryType:this.mchData['categoryType'],
        };
        let win =   this.modalHelper.static(MchChannelInfoWinComponent,{
            singleData:singleData,
            tableData:tableData,
            categoryType:this.mchData['categoryType'].slice(0,1),
        },1000,{title: this.i18n.fanyi('Mch.winTitle.channelAdd')});
        win.subscribe(result =>{
            if(result && result == 'onOk'){
                this.mchChannelTable.doSearch(false);//刷新表格
            }
        })
    }
    /**
     * 编辑渠道信息
     */
    onEdit(row:any){
        let tableData = this.mchChannelTable._data;
        let singleData = {
            id:row['id'],
            transId:row['transId'],
            merchantId:this.mchData['id'],
            bankNo:this.mchData['bankNo'],
            bankName:this.mchData['bankName'],
            orgId:this.mchData['orgId'],
            merchantNo:this.mchData['merchantNo'],
            chanNo:this.mchData['chanNo'],
            categoryType:this.mchData['categoryType'].slice(0,1),
        };
        let win = this.modalHelper.static(MchChannelInfoWinComponent,{
            singleData:singleData,
            tableData:tableData,
            categoryType:this.mchData['categoryType'].slice(0,1),
        },1000,{title: this.i18n.fanyi('Mch.winTitle.channelEdit')});

        win.subscribe(result =>{
            if(result && result == 'onOk'){
                this.mchChannelTable.doSearch(false);//刷新表格
            }
        })
    }
    /**
     * 进件
     */
    onInto(row:any){
        if(row['ptCenterId'] == 0){
            this.msg.warning(this.i18n.fanyi('Mch.tips.ptCenterId'));
        }else {
            if(row['applyState'] == 0){
                this.mchDB.loadOnInto({providerNo:row['providerNo'] ,
                    ptCenterId:row['ptCenterId'],
                    merchantId:row['merchantId'],
                    agencyCode:row['agencyCode']
                    ,id:row['id']}).subscribe(res =>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('Mch.tips.intoSuccess'));
                    }else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY])
                    }
                    this.mchChannelTable.doSearch(false);//刷新表格
                })
            }
        }
    }
    /**
     * 重新进件
     */
    onReInto(row:any){
        if(row['applyState'] == 3 || row['applyState'] == 4){
            this.mchDB.loadOnInto({
                providerNo:row['providerNo'] ,
                ptCenterId:row['ptCenterId'],
                merchantId:row['merchantId'],
                agencyCode:row['agencyCode'] ,
                id:row['id']
            }).subscribe(res =>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('Mch.tips.reIntoSuccess'));
                }else {
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY])
                }
                this.mchChannelTable.doSearch(false);//刷新表格
            })
        }
    }
}
