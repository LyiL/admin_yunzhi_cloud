import {Component, Inject, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {mchService} from '../../../../common/services/request/user-file-manage/mch.service';
import {MchTradeFeeLimitModel} from '../../../../common/model/user-file-manage/merchant/mch.tradeFeeLimit.model';
import {HelperService} from '../../../../common/services/helper.service';
import {I18NService} from '../../../../common/i18n/i18n.service';
import {CommonEnum} from '../../../../common/enum/common.enum';

/**
 * 商户交易限额弹窗
 */
@Component({
    selector: 'mch-trade-fee-limit-win',
    templateUrl: './mch-tradeFeeLimit-win.component.html',
    providers: [mchService]
})

export class MchTradeFeeLimitWinComponent implements OnInit {
    public tradeFeeLimitForm: FormGroup;
    public model: MchTradeFeeLimitModel = new MchTradeFeeLimitModel();
    public merchantNo:any; // 面板传入服务商编号
    public totalFeeLimit:any; // 面板传入交易限额
    public isLoadingOne = false; // loading
    constructor(
        public helper: HelperService,
        public msg: NzMessageService,
        public mchDB: mchService,
        public i18n:I18NService,
        public fb:FormBuilder,
        public subject: NzModalSubject,
    ) {

    }

    ngOnInit() {
        /**
         * 响应式表单配置
         * @type {FormGroup}
         */
        this.tradeFeeLimitForm = this.fb.group({
            totalFeeLimit: [this.model.totalFeeLimit, this.feeValidator]
        });

        this.model.merchantNo = this.merchantNo;
        this.model.totalFeeLimit = this.totalFeeLimit;
    }


    /**
     * 表单提交
     */
    _submitForm() {
        if(this.tradeFeeLimitForm.valid){
            if(this.model.totalFeeLimit > 100000000){
                this.msg.warning(this.i18n.fanyi('Mch.tips.totalFeeLimit'));
                return false;
            }
                this.isLoadingOne = true;
                this.mchDB.setMchLimit(this.model).subscribe(res => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                        this.subject.destroy('onOk');
                    } else {
                        this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                    this.isLoadingOne = false;
                })
        }
    }

    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.tradeFeeLimitForm.controls[ name ];
    }

    /**
     * 验证交易限额
     */
    public feeValidator = (control: FormControl):{ [s: string]: boolean } => {
        let _val = control.value;
        let tmpStr = '' + _val;
        let ind = tmpStr.indexOf('.');
        if(this.helper.isEmpty(_val)){
            return { require:true }
        };
        if(_val < 0){
            return { minError:true, error:true }
        };
        if(ind > 0 && tmpStr.length > 2){
            let _fl = tmpStr.split('.')[1];
            if(_fl.length > 2){
                return { deciError:true,error:true }
            }
        }
    };
}
