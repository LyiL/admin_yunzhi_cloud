import {Component, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {HttpHeaders} from "@angular/common/http";
import {RefundSettingsForm} from "../../../common/form/user-file-manage/refund-settings.form";
import {RefundSetsService} from "../../../common/services/request/user-file-manage/refund-setting.service";
import {CommonEnum} from "../../../common/enum/common.enum";
@Component({
    selector:'refund-settings-list',
    templateUrl:'./refund-settings-list.component.html',
    providers: [RefundSetsService]
})
export class RefundSettingsListComponent{
    public refundListForm:RefundSettingsForm = new RefundSettingsForm();
    @ViewChild('refundListTable') public refundListTable:SimpleTableComponent;
    /**
     * 表格配置
     */
    public tableCfg:any = {
        url:RefundSetsService.REFUNDSETS_LIST_URL,
        params:this.refundListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('RefundSets.listPage.tableCols.name'),
                index:'name'
            },{
                title:this.i18n.fanyi('RefundSets.listPage.tableCols.merchantNo'),
                index:'merchantNo'
            },{
                title:this.i18n.fanyi('RefundSets.listPage.tableCols.chanName'),
                render:'chanNameRender'
            },{
                title:this.i18n.fanyi('RefundSets.listPage.tableCols.examState'),
                render:'examStateRender'
            },{
                title:this.i18n.fanyi('RefundSets.listPage.tableCols.activeState'),
                render:'activeStateRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('RefundSets.listPage.btn.refundStrategy'),
                    hide:(()=>{
                        if(this.helper.btnRole('REFUNDPOLICYSETTING')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((row: any) =>{
                        //跳转到退款策略
                        this.helper.navigate('/admin/user/refundstrategy', this.i18n.fanyi('RefundSets.refStrategyPage.title'), {merchantNo:row['merchantNo'], name:row['name']});
                    }).bind(this)
                },{
                    text: this.i18n.fanyi('RefundSets.listPage.btn.refundAuthority'),
                    hide:(()=>{
                        if(this.helper.btnRole('REFUNDAUTHSETTING')){
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((row: any) =>{
                        //跳转到退款权限
                        this.helper.navigate('/admin/user/refundauthority', this.i18n.fanyi('RefundSets.refAuthPage.title'), {merchantNo:row['merchantNo'], name:row['name']});
                    }).bind(this)
                }]
            }
        ]
    };
    constructor(public helper:HelperService,
                protected i18n:I18NService,
    ){}

    /**
     * 查询
     */
    public onSearch(){
        this.refundListTable.doSearch();
    }
}
