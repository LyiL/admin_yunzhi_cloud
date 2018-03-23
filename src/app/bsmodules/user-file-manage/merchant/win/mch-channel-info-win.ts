import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../../../common/services/helper.service";
import {mchService} from "../../../../common/services/request/user-file-manage/mch.service";
import {CommonEnum} from "../../../../common/enum/common.enum";
import {NzLocaleService, NzMessageService, NzModalSubject, ObjectExtend} from 'ng-zorro-antd';
import {CommonService} from "../../../../common/services/request/common.service";
import {SearchWindowConfig} from "@delon/abc";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {MchChannelModel} from "../../../../common/model/user-file-manage/merchant/mch.channel.model";
import {Observable} from 'rxjs/Observable';
/**
 * 新增或编辑商户渠道信息弹出框
 */
@Component({
    selector:'mch-channel-info-win',
    templateUrl:'./mch-channel-info-win.html',
    providers:[mchService,CommonService]
})
export class MchChannelInfoWinComponent implements OnInit, AfterContentChecked{
    public modelGroup: FormGroup;
    public model: MchChannelModel = new MchChannelModel();


    /**
     * 支付类型配置
     */
    public transTypes:Observable<any>;//支付类型
    /**
     * 结算周期配置
     */
    public settleCycle:Array<string>= [];
    /**
     * 分润规则配置
     */
    public shareRule:Array<string>= [];



    public useStates:Observable<any>;//状态
    public applyState: Observable<any>;//进件类型

    public _centerName:any;
    public orgId:any;//来源
    public tableData:any;//来源
    public id:number;//来源
    public chanNo:any;//来源
    public bankNo:any;
    public parentChanCode:any;//来源
    public channelStep:any;//来源
    public isEditDisabled:boolean = false;//支付类型是否禁用标识
    public isUloFlag:boolean; //所属机构是否禁用标识
    public categoryType:string;
    public centerIdTableCfg:SearchWindowConfig;
    public stepParams:any;
    public singleData:any;
    public _transId:any;
    public isLoadingOne = false; // loading
    public agencyCodeCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('Mch.listPage.BankCfg.title'),
        url: CommonService.BANKINFO_URL,
        // params: {chanType: 0},
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'orgNo',
            label: this.i18n.fanyi('Mch.listPage.BankCfg.BankNo')
        }, {
            field: 'name',
            label: this.i18n.fanyi('Mch.listPage.BankCfg.BankName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('Mch.listPage.BankCfg.BankNo'),
            index: 'orgNo'
        }, {
            title: this.i18n.fanyi('Mch.listPage.BankCfg.BankName'),
            index: 'name'
        }]
    };
    constructor(public helper: HelperService, public mchDB: mchService, public commonDB:CommonService,public log:NzLocaleService,
                public msg: NzMessageService,public i18n:I18NService,public changeDetectorRef: ChangeDetectorRef,
                public objExtend:ObjectExtend,
                public modal: NzModalSubject) {}

    ngOnInit() {
        this.modelGroup = new FormGroup({
            transId: new FormControl(this.model.transId, [Validators.required]),
            agencyCode: new FormControl(this.model.agencyCode,[Validators.required] ),
            ptCenterId: new FormControl(this.model.ptCenterId,[Validators.required] ),
            providerNo: new FormControl(this.model.providerNo, ),
            applyState: new FormControl(this.model.applyState, ),
            ally: new FormControl(this.model.ally, ),
            pcmPartkey: new FormControl(this.model.pcmPartkey, ),
            thirdAppid: new FormControl(this.model.thirdAppid, ),
            settleCycle: new FormControl(this.model.settleCycle,[Validators.required] ),
            limitDay: new FormControl(this.model.limitDay,),
            limitSingleMin: new FormControl(this.model.limitSingleMin,),
            limitSingle: new FormControl(this.model.limitSingle, ),
            settleRate: new FormControl(this.model.settleRate,[Validators.required] ),
            mchShareRule: new FormControl(this.model.mchShareRule,[Validators.required] ),
            used: new FormControl(this.model.used,[Validators.required] )

        });
        this.applyState =Observable.of(this.helper.getDictByKey('APPLY_STATE').filter((item=>{
            return item['id'] != 1;
        })));
        this.settleCycle = this.helper.getDictByKey('BALANCE_DATE');//结算周期配置
        this.shareRule = this.helper.getDictByKey('PAYCENTER_CH_TYPE');//分润规则配置
        this.useStates = Observable.of(this.helper.getDictByKey('ENABLE_STATUS'));//状态
        if(this.stepParams){ //从步骤新增进来的数据

            this.model.chanNo = this.stepParams["chanNo"];

            if(this.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.stepParams["bankNo"])){
                this.isUloFlag = false;
            }else {

                this.isUloFlag = true;
                this.model.agencyCode  = this.stepParams.bankNo;
                this.model.agencyName = this.stepParams.bankName
            }
            this.transTypes = this.commonDB.loadTradeType({parentChanNo:this.model.chanNo ,categoryType:this.categoryType });
        }else if(this.singleData){//从详情进来的数据

            this.model.chanNo = this.singleData["chanNo"];
            // this.model.agencyCode =  this.singleData.bankNo;
            if(this.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.singleData.bankNo)){
                this.isUloFlag = false;
            }else {
                this.isUloFlag = true;
                this.model.agencyCode  = this.singleData.bankNo;
                this.model.agencyName = this.singleData.bankName;
            }
            this.transTypes = this.commonDB.loadTradeType({parentChanNo: this.singleData.chanNo,categoryType: this.categoryType,transId:this.singleData.transId});
        }

        if(this.singleData&&this.singleData.id){ ////详情编辑进来的数据
            this.isEditDisabled = true;
            this.isUloFlag = true;
            this.mchDB.loadChannelById({id: this.singleData['id']}).subscribe(res =>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.model = res[CommonEnum.SERVER_DATA_KEY];
                    this.model.limitSingle =this.helper.isEmpty( this.model['limitSingle'])? null : this.helper.numberTrans(res[CommonEnum.SERVER_DATA_KEY].limitSingle,'division',100) ;
                    this.model.limitDay = this.helper.isEmpty( this.model['limitDay'])? null :this.helper.numberTrans(res[CommonEnum.SERVER_DATA_KEY].limitDay,'division',100) ;
                    this.model.limitSingleMin =this.helper.isEmpty( this.model['limitSingleMin'])? null : this.helper.numberTrans(res[CommonEnum.SERVER_DATA_KEY].limitSingleMin,'division',100) ;
                    this._centerName = res[CommonEnum.SERVER_DATA_KEY].centerName;
                }
            });
            this._centerName = this.model.centerName;
        }else if(!this.model.id&&!this.model['table_id']){
            this.model.mchShareRule = 1;
            this.model.used = 1;
            this.model.settleCycle = 1;
        }


        /**
         * 新增下一步页面中判断是新增还是编辑模式
         */
        if(this.model['table_id']){
            this.transTypes = this.commonDB.loadTradeType({parentChanNo:this.stepParams.chanNo,categoryType:this.categoryType});
            this._centerName = this.model.centerName;
            // console.log(this.tableData);
            // this.model.limitSingle = this.helper.numberTrans(this.model.limitSingle,'division',100) || null;
            // this.model.limitDay = this.helper.numberTrans(this.model.limitDay,'division',100)|| null;
            // this.model.limitSingleMin =this.helper.numberTrans(this.model.limitSingleMin,'division',100) || null;
        }

    }
    /**
     * 受理机构选中事件
     * @param value
     */
    agencyCodesearchSelected(value){
        this.model.agencyCode = value.orgNo;
        this._centerName= null;
        this.model.ptCenterId = null;
        this.model.providerNo = null;
        this.model.ally = null;
        this.model.pcmPartkey = null;
    }

    getTransType(value){
        /**
         * 重新根据支付类型加载通道类型的数据
         */
        this.model= this.objExtend.extend(this.model,value['nzData']);
        if(!this.model.id){
            if(this.model['table_id']){ //新增下一步进来

                if(this.model.transId == this._transId){ //新增下一步进来并判断支付类型无改变
                    this._centerName = this.model.centerName;
                    if(value['nzOldValue']){
                        if(value['nzOldValue']['nzData']['transId'] !=this.model.transId){
                            this._centerName = null;
                            this.model.ptCenterId = null;
                            this.model.ally = null;
                            this.model.pcmPartkey = null;
                            // if(this.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.model.agencyCode)){
                            //     this.model.agencyName = null;
                            //     this.model.agencyCode = null;
                            // }
                        }
                    }
                }else {//新增下一步进来并判断支付类型有改变
                    this.model.ptCenterId = null;
                    this._centerName = null;
                    // if(this.hasConfigValueMatch('CLOUD_ULO_BANK_NO',this.model.agencyCode)){
                    //     this.model.agencyName = null;
                    //     this.model.agencyCode = null;
                    // }
                    this.model.providerNo = null;
                    this.model.ally = null;
                    this.model.pcmPartkey = null;
                }

            }else {
                this._centerName= null;
                this.model.ptCenterId = null;
                this.model.providerNo = null;
                this.model.ally = null;
                this.model.pcmPartkey = null;
                this.model.transId = value['nzValue'];
            }
        }else if(this.model.id && this.stepParams){
            if(this.model.transId == this._transId){ //返回上一步进来并判断支付类型无改变
                this._centerName = this.model.centerName;
                if(value['nzOldValue']){
                    if(value['nzOldValue']['nzData']['transId'] !=this.model.transId){
                        this._centerName = null;
                        this.model.ptCenterId = null;
                        this.model.providerNo = null;
                        this.model.ally = null;
                        this.model.pcmPartkey = null;
                    }
                }
            }else {
                this._centerName= null;
                this.model.ptCenterId = null;
                this.model.providerNo = null;
                this.model.ally = null;
                this.model.pcmPartkey = null;
            }

        }

        let _parmas = {transId:this.model.transId,parentChanCode:this.model.chanNo,bankNo:this.model.agencyCode,categoryType:this.categoryType};
        this.centerIdTableCfg = {
            title:this.i18n.fanyi('Mch.listPage.CenterCfg.title'),
            url:CommonService.PAYCENTER_INFO_URL,
            params:_parmas,
            isAjax:true,
            resReName:CommonEnum.TABLE_RES_RE_NAME,
            reqReName:CommonEnum.TABLE_REQ_RE_NAME,
            searchFields:[{
                field:'name',
                label:this.i18n.fanyi('Mch.listPage.CenterCfg.centerName')
            }],
            tableColumns:[{
                title:this.i18n.fanyi('Mch.listPage.CenterCfg.centerName'),
                index:'name'
            }]
        };
    }
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }
    /**
     * 所属银行search款搜索前置条件
     */
    agencyCodeSearchBefore(){
        if(!this.model.transId){
            this.msg.warning(this.i18n.fanyi('Mch.tips.transId'));
            return false
        }
    }
    /**
     * 通道类型search款搜索前置条件
     */
    public searchBefore(){
        if(!this.model.transId){
            this.msg.warning(this.i18n.fanyi('Mch.tips.transId'));
            return false
        }
        if(!this.model.agencyCode){
            this.msg.warning(this.i18n.fanyi('Mch.tips.bankNo'));
            return false
        }

        if(this.stepParams){
                this.centerIdTableCfg.params = {transId:this.model.transId,parentChanCode:this.model.chanNo ,bankNo:this.model.agencyCode,categoryType:this.categoryType};
        }else {
            if(this.singleData['chanNo']){
                this.centerIdTableCfg.params = {transId:this.model.transId,parentChanCode:this.singleData['chanNo'],bankNo:this.model.agencyCode,categoryType:this.categoryType};
            }else {
                this.centerIdTableCfg.params = {transId:this.model.transId,parentChanCode:null,bankNo:this.model.agencyCode,categoryType:this.categoryType};
            }
        }
    }
    /**
     * 根据通道类型获取数据赋值
     */
    onChangeCenterId(value){
        if(!this.helper.isEmpty(value.name)){
            this.model['centerName'] = value.name;
        }else {
            this.model['centerName'] = null;
        }
        if(!this.helper.isEmpty(value.providerNo)){
            this.model['providerNo'] = value.providerNo;
        }else {
            this.model['providerNo'] = null;
        }
        if(!this.helper.isEmpty(value.otherCenterId)){
            this.model['otherCenterId'] = value.otherCenterId;//后台需要这个参数
        }else {
            this.model['otherCenterId'] = null
        }
        if(!this.helper.isEmpty(value.otherCenterBank)){
            this.model['otherCenterBank'] = value.otherCenterBank;//后台需要这个参数
        }else {
            this.model['otherCenterBank'] = null;
        }
        // if(!this.helper.isEmpty(value.pcmPartKey)){
        //     this.model['pcmPartkey'] = value.pcmPartKey;
        // }else {
        //     this.model['pcmPartkey'] = null;
        // }
        // if(!this.helper.isEmpty(value.ally)){
        //     this.model['ally'] = value.ally;
        // }else{
        //     this.model['ally'] = null;
        // }


    }

    onSubmit(){
        //单笔限额与单日限额的比较
        let _day = this.model['limitDay'], // 单日限额
            _min = this.model['limitSingleMin'], // 单笔限额最小
            _max = this.model['limitSingle'];// 单笔限额最大
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
        //新增下一步中对比条件是this.model['table_id']，详情中是this.model['id']
        if(this.model.ptCenterId == 0){
            this._centerName = null;
        }
        //新增下一步中对比条件是this.model['table_id']，详情中是this.model['id']
        let condition = (this.channelStep && this.channelStep == 'channelStep')?'table_id':'id';
        //判断支付类型不能重复
        let hasDataSourceInTransId = this.tableData.find((item)=>{
            let _tmpTransId = this.objExtend.isArray(item['transId']) ? item['transId'].join(',') : item['transId'];
            if(!(this.model[condition] == item[condition]) && !this.objExtend.isEmpty(this.model['transId']) && _tmpTransId.indexOf(this.model['transId']) != -1 ){
                return true;
            }
            return false;
        });
        if(hasDataSourceInTransId){
            this.msg.warning(this.i18n.fanyi('Mch.step.accountInfo.tips.transId')); //"支付类型已经存在，请调整！",
            return false;
        }
        if(this.channelStep && this.channelStep == 'channelStep'){//新增下一步中打开弹框
             this.onAdd();
        }else{//详情中打开弹框
            this.upDateDetail()
        }

    }
    //详情中打开弹框
    upDateDetail(){
        this.model['merchantId'] =this.singleData['merchantId'];
        if(this.model['applyState']){
            this.model['applyState']  =  this.model['applyState']
        }else {
            this.model['applyState']  =  0;
        }
        // //剔除支付类型中括号与括号中的值
        // let arr = this.helper.getDictByKey('MCH_TYPE');
        // this.model['transType'] = this.stringReplace(this.model['transType'],arr);
        if(this.modelGroup.valid){
            this.isLoadingOne = true;
            this.mchDB.saveChannelSingle(this.objExtend.extend(this.model,{
                limitSingle:this.helper.isEmpty( this.model['limitSingle'])? null :this.helper.numberTrans(this.model.limitSingle,'multiplication',100),
                limitDay:this.helper.isEmpty( this.model['limitDay'])? null :this.helper.numberTrans(this.model.limitDay,'multiplication',100),
                limitSingleMin:this.helper.isEmpty( this.model['limitSingleMin'])? null :this.helper.numberTrans(this.model.limitSingleMin,'multiplication',100)
            })  ).subscribe(res =>{
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                    this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                    this.modal.destroy('onOk');
                }else {
                    this.msg.warning(res[CommonEnum.SERVER_MES_KEY]);
                    //单笔限额、单日限额除以100
                    this.model['limitSingle'] =this.helper.isEmpty( this.model['limitSingle'])? null :this.helper.numberTrans(this.model.limitSingle,'division',100),
                    this.model['limitDay'] =this.helper.isEmpty( this.model['limitDay'])? null :this.helper.numberTrans(this.model.limitDay,'division',100),
                    this.model['limitSingleMin'] =this.helper.isEmpty( this.model['limitSingleMin'])? null :this.helper.numberTrans(this.model.limitSingleMin,'division',100)
                }
                this.isLoadingOne = false;
            })

        }

}

    onAdd(){//新增下一步中打开弹框
        if (this.modelGroup.valid) {
            if(this.model['applyState']){
                this.model['applyState']  =  this.model['applyState']
            }else {
                this.model['applyState']  =  0;
            }
            this.modal.next(this.objExtend.extend(this.model,{agencyCode:this.model.agencyCode,merchantId:this.stepParams.id}) );
            this.modal.destroy();
        }
    }


    getFormControl(name) {
        return this.modelGroup.controls[name];
    }
    /**
     * 定义数字的校验器
     */
    numberValidator(control: FormControl): any{
        if(control.value){
            // var req = /^[0-9]*$/;//整数
            var req = /^\d+(\.\d+){0,1}$/;//整数和小数都可以
            let valid = req.test(control.value);
            if(!valid){
                return {numberError:true,error:true}
            }
        }
    }
    /**
     * 判断配置项是否匹配对应值
     * @param cfgKey  配置项key
     * @param val 匹配值
     * @return 匹配到返回true ,否 false
     */
    hasConfigValueMatch(cfgKey:string,val:any):boolean{
        let _cfgVal = this.helper.getDictByKey(cfgKey);
        if(_cfgVal && typeof _cfgVal === 'string'){
            let _cfgVals = _cfgVal.split(',');
            if(_cfgVals.findIndex((item)=>{return item == val}) != -1){
                return true;
            }
        }
        return false;
    }
}
