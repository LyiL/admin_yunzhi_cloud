import {Component, Inject, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../../common/services/helper.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {CommonEnum} from '../../../../common/enum/common.enum';
import {MchTradeRuleModel} from '../../../../common/model/user-file-manage/merchant/mch.tradeRule.model';


/**
 * 商户路由配置弹窗
 */
@Component({
    selector: 'mch-trade-rule-win',
    templateUrl: './mch-tradeRule-win.component.html',
    providers: [mchService]
})

export class MchTradeRuleWinComponent implements OnInit {
    public totalRuleForm:FormGroup; // 路由配置表单
    public tradeTypes: Array<any>; // 支付类型
    public attention:any; // 提示文字
    public model:MchTradeRuleModel = new MchTradeRuleModel(); // 路由配置模板
    public channelStep:any;
    public parentNo:any; // 面板传入服务商编号
    public ruleState:any; // 面板传入路由配置
    public isLoadingOne = false; // loading
    constructor(
        public helper: HelperService,
        public msg: NzMessageService,
        public mchDB:mchService,
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

            if(this.channelStep){
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
        this.subject.next(this.model);
        this.subject.destroy();
    }

    /**
     * 发送路由配置给后台
     */
    saveTradeRule(){
        this.isLoadingOne = true;
        this.mchDB.tradeRuleSave(this.model).subscribe(result => {
            if(result && result[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                this.msg.success(this.i18n.fanyi('default.hint.changeSuccess'));
                this.subject.destroy('onOk');
            } else {
                this.msg.error(result[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoadingOne = false;
        })
    }
}
