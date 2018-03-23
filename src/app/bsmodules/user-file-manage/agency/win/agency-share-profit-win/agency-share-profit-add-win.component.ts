import { Component, Input, OnInit } from '@angular/core';
import {NzLocaleService, NzMessageService, NzModalSubject, ObjectExtend} from 'ng-zorro-antd';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {AgencyService} from "../../../../../common/services/request/user-file-manage/agency.service";
import {HelperService} from "../../../../../common/services/helper.service";
import {CommonService} from "../../../../../common/services/request/common.service";
import {CommonEnum} from "../../../../../common/enum/common.enum";
import {AgencyChannelInfoModel} from "../../../../../common/model/user-file-manage/agency/agency-channel.model";
import {I18NService} from "../../../../../common/i18n/i18n.service";

/**
 * 代理商新增|编辑分润配置弹框
 */
@Component({
    selector: 'agency-channel-add-win',
    templateUrl: './agency-share-profit-add-win.component.html',
    providers:[AgencyService]
})
export class AgencyChannelAddWinComponent implements OnInit {
    public isLoading:boolean = false;//按钮加载效果
    public id:number;//来源
    public orgId:any;//来源
    public chanCode:any;//来源
    public parentChanCode:any;//来源
    public categoryTypeGroup:any;//来源
    public bankCode:any;//来源
    public tableData:any;//来源
    public step:any;//来源

    public payTypes:Observable<any>;//支付类型
    public categoryTypes:Observable<any>;//行业类别
    public shareRules:Observable<any>;//分润规则
    public rateTypes:Observable<any>;//费率类型
    public settleCycles:Observable<any>;//结算/分润周期
    public useStates:Observable<any>;//状态

    public isEditDisabled:boolean = false;//支付类型是否禁用标识
    public agencyChannelForm: FormGroup;
    public model: AgencyChannelInfoModel = new AgencyChannelInfoModel();
    constructor(public subject: NzModalSubject,
                protected fb: FormBuilder,
                public commonDB:CommonService,
                public helper:HelperService,
                public message: NzMessageService,
                protected agencyDBService: AgencyService,
                public objExtend:ObjectExtend,
                public i18n:I18NService,
                public log:NzLocaleService,
    ) {}
    ngOnInit() {
        this.categoryTypes = Observable.of(this.helper.getDictByKey('MCH_TYPE'));//行业类别
        this.rateTypes = Observable.of(this.helper.getDictByKey('RATE_TYPE'));//费率类型
        this.settleCycles = Observable.of(this.helper.getDictByKey('BALANCE_DATE'));//结算周期
        this.shareRules = Observable.of(this.helper.getDictByKey('PAYCENTER_CH_TYPE'));//分润规则
        this.useStates = Observable.of(this.helper.getDictByKey('ENABLE_STATUS'));//状态
        this.agencyChannelForm = this.fb.group({
            transId:[this.model.transId, [Validators.required]],
            categoryType:[this.model.categoryType, [Validators.required]],
            limitDay:[this.model.limitDay, [this.numberValidator]],
            limitSingleMin:[this.model.limitSingleMin, [this.numberValidator]],
            limitSingleMax:[this.model.limitSingleMax, [this.numberValidator]],
            chanRate:[this.model.chanRate, [Validators.required,this.numberValidator]],
            fixFloatRate:[this.model.fixFloatRate, [Validators.required]],
            settleCycle:[this.model.settleCycle, [Validators.required]],
            chanShareRule:[this.model.chanShareRule, [Validators.required]],
            state:[this.model.state, [Validators.required]],
        });
        this.model.orgId = this.orgId;
        this.model.chanNo = this.chanCode;
        this.model.bankNo = this.bankCode;
        if(this.helper.isEmpty(this.model.fixFloatRate)){
            this.model.fixFloatRate = 0;//费率类型默认为固定费率
        }
        if(this.helper.isEmpty(this.model.settleCycle)){
            this.model.settleCycle = 1;//结算周期默认为T+1
        }
        if(this.helper.isEmpty(this.model.chanShareRule)){
            this.model.chanShareRule = 1;//分润规则默认为参与分润
        }
        if(this.helper.isEmpty(this.model.state)){
            this.model.state = 1;//状态默认为启用
        }
        this.payTypes = this.commonDB.loadTradeType({bankNo:this.bankCode,parentChanNo: this.parentChanCode,categoryType:this.categoryTypeGroup});//支付类型

        /**
         * 详情页面根据id判断是进入新增还是编辑模式
         */
        if(this.id) {
            //编辑状态下支付类型字段为只读
            this.isEditDisabled = true;
            this.agencyDBService.loadAgencyChannel({ id: this.id})
            .subscribe( res => {
                if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                    this.model.id = this.id;
                    //单笔限额、单日限额除以100
                    this.model.limitDay = this.helper.isEmpty(this.model.limitDay)?null: this.helper.numberTrans(this.model.limitDay,'division',100);
                    this.model.limitSingleMax = this.helper.isEmpty(this.model.limitSingleMax)?null: this.helper.numberTrans(this.model.limitSingleMax,'division',100);
                    this.model.limitSingleMin = this.helper.isEmpty(this.model.limitSingleMin)?null: this.helper.numberTrans(this.model.limitSingleMin,'division',100);
                    /**
                     * 重新根据行业类别加载支付类型的数据
                     */
                    let tradeTypeParams = {bankNo:this.bankCode,parentChanNo: this.parentChanCode,categoryType:this.categoryTypeGroup,transId: this.model['transId']};
                    this.payTypes = this.commonDB.loadTradeType(tradeTypeParams);
                }
            })
        }
        /**
         * 新增下一步页面中判断是新增还是编辑模式
         */
        if(this.model['table_id']){//编辑
            //编辑状态下支付类型字段为只读
            this.isEditDisabled = true;
        }
    }

    onChangeTransId(value){
        this.model.transType = value['nzLabel'];
        // this.log.debug('选中支付类型::::',value);
    }
    /**
     *保存
     */
    onSave() {
        //单笔限额与单日限额的比较
        let _day = this.model['limitDay'], // 单日限额
            _min = this.model['limitSingleMin'], // 单笔限额最小
            _max = this.model['limitSingleMax'];// 单笔限额最大
        if ((_max !== null && _day !== null) && _max*1 > _day*1) {
            // '单日限额需大于单笔限额最大值！';
            this.message.warning(this.i18n.fanyi('Agency.addPage.tips.limitDayAndMaxTip'));
            return false;
        }
        if ((_min !== null && _day !== null) && _min*1 > _day*1) {
            // '单日限额需大于单笔限额最小值！';
            this.message.warning(this.i18n.fanyi('Agency.addPage.tips.limitDayAndMinTip'));
            return false;
        }
        if ((_min !== null && _max !== null) && _min*1 > _max*1) {
            // '单笔限额最大值需大于单笔限额最小值！';
            this.message.warning(this.i18n.fanyi('Agency.addPage.tips.limitMinAndMaxTip'));
            return false;
        }

        //新增下一步中对比条件是this.model['table_id']，详情中是this.model['id']
        let condition = (this.step && this.step == 'channelStep')?'table_id':'id';
        //判断支付类型、行业类别不能同时重复
        let hasDataSourceInTransId = this.tableData.find((item)=>{
            let _tmpTransId = this.objExtend.isArray(item['transId']) ? item['transId'].join(',') : item['transId'];
            if(!(this.model[condition] == item[condition]) && !this.objExtend.isEmpty(this.model['transId']) && _tmpTransId.indexOf(this.model['transId']) != -1 && this.model['categoryType'] == item['categoryType']){
                return true;
            }
            return false;
        });
        if(hasDataSourceInTransId){
            this.message.warning(this.i18n.fanyi('Agency.addPage.tips.sharePayTypeTip'));
            return false;
        }
        if(this.step && this.step == 'channelStep'){//新增下一步中打开弹框
            this.onSaveTmpChannelInfo();
        }else{//详情中打开弹框
            this.onSaveChannelInfo();
        }
    }

    onSaveChannelInfo() {//详情中打开弹框
        this.isLoading = true;
        //单笔限额、单日限额乘以100
        this.model.limitDay = this.helper.isEmpty(this.model.limitDay)?null: this.helper.numberTrans(this.model.limitDay,'multiplication',100);
        this.model.limitSingleMax = this.helper.isEmpty(this.model.limitSingleMax)?null: this.helper.numberTrans(this.model.limitSingleMax,'multiplication',100);
        this.model.limitSingleMin = this.helper.isEmpty(this.model.limitSingleMin)?null: this.helper.numberTrans(this.model.limitSingleMin,'multiplication',100);
        if (this.agencyChannelForm.valid) {
            this.agencyDBService.saveChannelInfos(this.model).subscribe(res => {
                this.isLoading = false;
                if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.message.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.subject.destroy('onOk');
                } else {
                    this.message.error(res[CommonEnum.SERVER_MES_KEY]);
                    //单笔限额、单日限额除以100
                    this.model.limitDay = this.helper.isEmpty(this.model.limitDay)?null: this.helper.numberTrans(this.model.limitDay,'division',100);
                    this.model.limitSingleMax = this.helper.isEmpty(this.model.limitSingleMax)?null: this.helper.numberTrans(this.model.limitSingleMax,'division',100);
                    this.model.limitSingleMin = this.helper.isEmpty(this.model.limitSingleMin)?null: this.helper.numberTrans(this.model.limitSingleMin,'division',100);
                }
            })
        }
    }
    onSaveTmpChannelInfo(){//新增下一步中打开弹框
        if (this.agencyChannelForm.valid) {
            this.subject.next(this.model);
            this.subject.destroy();
        }
    }
    getFormControl(name) {
        return this.agencyChannelForm.controls[name];
    }
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
