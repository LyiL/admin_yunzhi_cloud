import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../../common/services/helper.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {NzMessageService, NzModalSubject, ObjectExtend} from 'ng-zorro-antd';
import {CommonService} from "../../../../../common/services/request/common.service";
import {SearchWindowConfig, SimpleTableService} from "@delon/abc";
import {I18NService} from "../../../../../common/i18n/i18n.service";
import {SpShareModel} from "../../../../../common/model/user-file-manage/service-provide/sp-share.model";
import {Observable} from "rxjs/Observable";
import {ServiceProviderService} from "../../../../../common/services/request/user-file-manage/service-provider.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";

/**
 * 服务商分润配置弹窗
 */
@Component({
    selector:'sp-share-profit-win',
    templateUrl:'./sp-shareProfit-win.component.html',
    providers: [SimpleTableService, ServiceProviderService]
})
export class SpShareProfitWinComponent implements OnInit{

    public model: SpShareModel = new SpShareModel();
    public SpShareWinFormGroup: FormGroup;

    public categoryTypes: Array<string>= [];  //行业类别
    public rateType: Array<string>= [];      // 费率类型
    public settleCycle: Array<string>= [];   // 结算/分润周期
    public shareRule: Array<string>= [];     // 分润规则
    public useState: Array<string>= [];      // 状态
    public tmpTransIdArr = [];

    public payType: Observable<any>;
    public id: any;
    public orgId: any;
    public chanCode: any;
    public bankCode: any;
    public parentChanCode: any;
    public categoryType: any;
    public tableData: any;
    public row:any;
    public step: any;
    public chanShareRule: any;
    public state: any;
    public isTableId:boolean;
    // public table_id: any;

    public transFlag: boolean = false;
    isLoadingOne = false;

    constructor(
        public fb: FormBuilder,
        public helper: HelperService,
        public msg: NzMessageService,
        public menuService: MenuService,
        public router: Router,
        public i18n:I18NService,
        public objExtend:ObjectExtend,
        public subject: NzModalSubject,
        public commonDB: CommonService,
        public ServiceProvideDB: ServiceProviderService
    ) {
        this.categoryTypes = this.helper.getDictByKey('MCH_TYPE');           // 行业类别
        this.rateType = this.helper.getDictByKey('RATE_TYPE');              // 费率类型
        this.settleCycle = this.helper.getDictByKey('BALANCE_DATE');        // 结算/分润周期
        this.shareRule = this.helper.getDictByKey('PAYCENTER_CH_TYPE');     // 分润规则
        this.useState = this.helper.getDictByKey('ENABLE_STATUS');          // 状态

        this.model.fixFloatRate = 0 ; // 费率类型默认固定费率
        this.model.settleCycle = 1; // 结算/分润周期默认T+1
        this.model.chanShareRule = 1; // 分润规则默认参与分润
        this.model.state = 1; // 状态默认启用
    }

    ngOnInit() {
        this.SpShareWinFormGroup = this.fb.group({
            transId: [this.model.transId, [Validators.required]],                        // 支付类型
            categoryType: [this.model.categoryType, [Validators.required]],              // 行业类别
            limitDay: [this.model.limitDay, [this.numberValidator]],                     // 单日限额(元)
            limitSingleMin: [this.model.limitSingleMin, [this.numberValidator]],         // 单笔限额最小值(元)
            limitSingleMax: [this.model.limitSingleMax, [this.numberValidator]],         // 单笔限额最大值(元)
            chanRate: [this.model.chanRate, [Validators.required, this.numberValidator]],// 费率(‰)
            fixFloatRate: [this.model.fixFloatRate, [Validators.required]],              // 费率类型
            settleCycle: [this.model.settleCycle, [Validators.required]],                // 结算/分润周期
            chanShareRule: [this.model.chanShareRule, [Validators.required]],            // 分润规则
            state: [this.model.state, [Validators.required]],                            // 状态
        });

        // if(this.model['table_id']) {
        //     this.table_id = this.model['table_id'];
        // }

        this.model.orgId = this.orgId;
        this.model.bankNo = this.bankCode;
        this.model.chanNo = this.chanCode;
        this.model.parentChanCode = this.parentChanCode;
        this.payType = this.commonDB.loadTradeType({
            bankNo:this.bankCode,
            parentChanNo:this.parentChanCode,
            categoryType:this.categoryType,
        });//支付类型

        // 详情页的编辑模式，从后台请求的单条数据
        if(!this.step && this.id) {
            // 编辑状态下支付类型字段为只读
            this.transFlag = true;
            this.ServiceProvideDB.loadlShareOne({id: this.id}).subscribe((res) => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                    this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'division',100);
                    this.model['limitSingleMax'] = this.helper.isEmpty(this.model['limitSingleMax']) ? null : this.helper.numberTrans(this.model['limitSingleMax'],'division',100);
                    this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'division',100);
                    /**
                     * 重新根据行业类别加载支付类型的数据
                     */
                    let tradeTypeParams = {
                        parentChanNo:this.parentChanCode,
                        categoryType:this.categoryType,
                        transId: this.model['transId'],
                        bankNo:this.bankCode
                    };
                    this.payType = this.commonDB.loadTradeType(tradeTypeParams);
                }else{
                    this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                }
            })
        }

        if(this.model['table_id']){
            // 新增服务商编辑功能
            this.transFlag = true;
        }
    }

    /**
     * 支付类型选中事件
     * @param params
     */
    onTransSelect(value: any) {
        // this.model.transId = params['_value'];
        // this.model.transType = params['_label'];
        this.model.transType = value['nzLabel'];
    }

    /**
     * 获取响应式表单项
     */
    getFormControl(name) {
        return this.SpShareWinFormGroup.controls[name];
    }

    /**
     * 提交表单
     */
    onSubmit() {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        let params = menu['params'];

        //单笔限额与单日限额的比较
        let _day = this.model['limitDay'], // 单日限额
            _min = this.model['limitSingleMin'], // 单笔限额最小
            _max = this.model['limitSingleMax'];// 单笔限额最大
        if ((_max !== null && _day !== null) && _max*1 > _day*1) {
            // '单日限额需大于单笔限额最大值！';
            this.msg.warning(this.i18n.fanyi('Agency.addPage.tips.limitDayAndMaxTip'));
            return false;
        }
        if ((_min !== null && _day !== null) && _min*1 > _day*1) {
            // '单日限额需大于单笔限额最小值！';
            this.msg.warning(this.i18n.fanyi('Agency.addPage.tips.limitDayAndMinTip'));
            return false;
        }
        if ((_min !== null && _max !== null) && _min*1 > _max*1) {
            // '单笔限额最大值需大于单笔限额最小值！';
            this.msg.warning(this.i18n.fanyi('Agency.addPage.tips.limitMinAndMaxTip'));
            return false;
        }

        // 单日限额的最大限制
        if(_day * 100 > 2147483647){
            this.msg.warning(this.i18n.fanyi('SP.win.channnel.limitDayTip'));
            return false;
        }

        // 单笔限额最小值的最大限制
        if(_min * 100 > 2147483647){
            this.msg.warning(this.i18n.fanyi('SP.win.channnel.limitMinTip'));
            return false;
        }

        // 单笔限额最大值的最大限制
        if(_max * 100 > 2147483647){
            this.msg.warning(this.i18n.fanyi('SP.win.channnel.limitMaxTip'));
            return false;
        }

        //新增下一步中对比条件是this.model['table_id']，详情中是this.model['id']
        let condition = (this.step && this.step == 'shareStep')?'table_id':'id';

        //判断支付类型、行业类别不能同时重复
        let hasDataSourceInTransId = this.tableData.find((item)=>{
            let _tmpTransId = this.objExtend.isArray(item['transId']) ? item['transId'].join(',') : item['transId'];
            if(!(this.model[condition] == item[condition]) && !this.objExtend.isEmpty(this.model['transId']) && _tmpTransId.indexOf(this.model['transId']) != -1 && this.model['categoryType'] == item['categoryType']){
                return true;
            }
            return false;
        });
        if(hasDataSourceInTransId){
            this.msg.warning(this.i18n.fanyi('Agency.addPage.tips.sharePayTypeTip'));
            return false;

        }

        // 判断编辑否
        // if(this.model.id || this.model['table_id']) {
        //     this.editShare()
        // }else {
        //     this.addShare()
        // }

        if(this.step){
            // 新增下一步中打开弹框
            this.onSaveTmpShare();
        }else{
            // 详情中打开弹框
            this.onPostShare();
        }
    }

    /**
     * 保存临时分润配置（单条）
     */
    onSaveTmpShare(){
        this.isLoadingOne = true;
        if (this.SpShareWinFormGroup.valid) {
            this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
            this.isLoadingOne = false;
            this.subject.next(this.model);
            this.subject.destroy('onOk');
        }
    }

    /**
     * 发送分润配置（单条）
     */
    onPostShare(){
        this.isLoadingOne = true;
        this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'multiplication',100);
        this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'multiplication',100);
        this.model['limitSingleMax'] = this.helper.isEmpty(this.model['limitSingleMax']) ? null : this.helper.numberTrans(this.model['limitSingleMax'],'multiplication',100);
        this.ServiceProvideDB.addOrEditShare(this.model).subscribe((res) => {
            this.isLoadingOne = false;
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.subject.destroy('onOk');
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
                // 请求失败，单笔限额、单日限额除以100还原
                this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'division',100);
                this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'division',100);
                this.model['limitSingleMax'] = this.helper.isEmpty(this.model['limitSingleMax']) ? null : this.helper.numberTrans(this.model['limitSingleMax'],'division',100);
            }
        })
    }

    /**
     * 编辑分润配置
     */
    // editShare() {
    //     // 新增页
    //     if(this.step && this.step == 'shareStep') {
    //         if (this.SpShareWinFormGroup.valid) {
    //             this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
    //             this.subject.next(this.model);
    //             this.subject.destroy('onOk');
    //         }
    //     }else {
    //         // 单笔限额、单日限额乘以100
    //         this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'multiplication',100);
    //         this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'multiplication',100);
    //         this.model['limitSingleMax'] = this.helper.isEmpty(this.model['limitSingleMax']) ? null : this.helper.numberTrans(this.model['limitSingleMax'],'multiplication',100);
    //         this.ServiceProvideDB.addOrEditShare(this.model).subscribe((res) => {
    //             if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
    //                 this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
    //                 this.subject.destroy('onOk');
    //             }else {
    //                 this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
    //                 // 请求失败，单笔限额、单日限额除以100还原
    //                 this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'division',100);
    //                 this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'division',100);
    //                 this.model['limitSingleMax'] = this.helper.isEmpty(this.model['limitSingleMax']) ? null : this.helper.numberTrans(this.model['limitSingleMax'],'division',100);
    //             }
    //         })
    //     };
    // }


    /**
     * 新增分润配置
     */
    // addShare() {
    //     // 新增页
    //     if(this.step && this.step == 'shareStep') {
    //         if (this.SpShareWinFormGroup.valid) {
    //             this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
    //             this.subject.next(this.model);
    //             this.subject.destroy('onOk');
    //         }
    //     }else {
    //     // 详情页
    //         // //单笔限额、单日限额乘以100
    //         this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'multiplication',100);
    //         this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'multiplication',100);
    //         this.model['limitSingleMax'] = this.helper.isEmpty(this.model['limitSingleMax']) ? null : this.helper.numberTrans(this.model['limitSingleMax'],'multiplication',100);
    //
    //         this.ServiceProvideDB.addOrEditShare(this.model).subscribe((res) => {
    //             if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
    //                 this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
    //                 this.subject.destroy('onOk');
    //             }else {
    //                 this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
    //                 // 请求失败，单笔限额、单日限额除以100还原
    //                 this.model['limitDay'] = this.helper.isEmpty(this.model['limitDay']) ? null : this.helper.numberTrans(this.model['limitDay'],'division',100);
    //                 this.model['limitSingleMin'] = this.helper.isEmpty(this.model['limitSingleMin']) ? null : this.helper.numberTrans(this.model['limitSingleMin'],'division',100);
    //                 this.model['limitSingleMax'] = this.helper.isEmpty(this.model['limitSingleMax']) ? null : this.helper.numberTrans(this.model['limitSingleMax'],'division',100);
    //             }
    //         })
    //     }
    // }

    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            // var req = /^[0-9]*$/;//整数
            var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            // this.log.debug("数字校验结果是：" + valid);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }
}
