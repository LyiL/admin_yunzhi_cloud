import {Component, Inject, OnInit} from '@angular/core';
import {ServiceProviderService} from '../../../../../common/services/request/user-file-manage/service-provider.service';
import {HelperService} from '../../../../../common/services/helper.service';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {I18NService} from '../../../../../common/i18n/i18n.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpTradeRuleModel} from '../../../../../common/model/user-file-manage/service-provide/sp-tradeRule.model';
import {CommonEnum} from '../../../../../common/enum/common.enum';

/**
 * 服务商路由配置弹窗
 */
@Component({
    selector: 'sp-trade-rule-win',
    templateUrl: './sp-tradeRule-win.component.html',
    providers: [ServiceProviderService]
})

export class SpTradeRuleWinComponent implements OnInit {
    public totalRuleForm:FormGroup; // 路由配置表单
    public tradeTypes: Array<any>; // 支付类型
    public attention:any; // 提示文字
    public model:SpTradeRuleModel = new SpTradeRuleModel(); // 路由配置模板
    public step:any;
    public parentNo:any; // 面板传入服务商编号
    public ruleState:any; // 面板传入路由配置
    isLoadingOne = false;

    constructor(
        public helper: HelperService,
        public msg: NzMessageService,
        public spService: ServiceProviderService,
        public i18n:I18NService,
        protected fb:FormBuilder,
        public subject: NzModalSubject,
    ) {
        this.tradeTypes = this.helper.getDictByKey('TRADERULECONFTRADETYPE'); // 获取支付类型组
    }

    ngOnInit() {
        this.totalRuleForm = this.fb.group({
            tradeId:[this.model.tradeId,Validators.required]
        });
        this.model.parentNo = this.parentNo;
        this.model.ruleState = this.ruleState;
    }

    /**
     * 表单提交
     */
    _submitForm() {
        if(this.totalRuleForm.valid){
            this.tradeTypes.forEach(item=>{
                if(item.id == this.model.tradeId){
                    this.model.tradeType = item.name; // 取得支付类型名称
                }
            });

            if(this.step){
                // 新增下一步中打开弹框
                this.saveTmpTradeRule();
            }else{
                // 详情中打开弹框
                this.saveTradeRule();
            }
        }
    }

    /**
     * 保存临时路由配置
     */
    saveTmpTradeRule(){
        this.isLoadingOne = true;
        if(this.totalRuleForm.valid){
            this.isLoadingOne = false;
            this.subject.next(this.model);
            this.subject.destroy();
        }
    }

    /**
     * 发送路由配置给后台
     */
    saveTradeRule(){
        this.isLoadingOne = true;
        this.spService.saveTradeRule(this.model).subscribe(result => {
            this.isLoadingOne = false;
            if(result && result[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                this.subject.destroy('onOk');
            } else {
                this.msg.error(result[CommonEnum.SERVER_MES_KEY]);
            }
        })
    }
}
