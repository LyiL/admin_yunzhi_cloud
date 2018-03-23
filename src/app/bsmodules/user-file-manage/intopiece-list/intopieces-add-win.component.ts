import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzModalService, NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IntoPiecesService} from "../../../common/services/request/user-file-manage/intopieces.service";
import {CommonService} from "../../../common/services/request/common.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {IntoPiecesModel} from "../../../common/model/user-file-manage/intopiece-list/intopieces.model";

/**
 * 进件新增
 */

@Component({
    selector: 'intopieces-add-win',
    templateUrl: './intopieces-add-win.component.html',
    providers: [IntoPiecesService]
})
export class IntoPiecesAddWinComponent implements OnInit {

    public model: IntoPiecesModel = new IntoPiecesModel();
    public Addintopieces: FormGroup;

    public applyState: Array<any> = []; // 进件状态
    public payTypes: Array<any> = []; // 支付类型
    public ptCenterId: Array<any> = []; // 通道类型

    public _transId = {}; // 获取通道类型需要的参数
    public isLoad: boolean = false; // 按钮loading效果

    @ViewChild('intoListTable') public intoListTable: SimpleTableComponent;

    constructor(public helper: HelperService,
                public i18n: I18NService,
                public modal: NzModalService,
                public msg: NzMessageService,
                public fb: FormBuilder,
                public CommonDB: CommonService,
                public IntoPiecesDB: IntoPiecesService,
                public _modal: NzModalSubject) {
        this.applyState = this.helper.getDictByKey('APPLY_STATE'); // 进件状态

        this.CommonDB.loadTransApi({transType:""}).subscribe(res =>{ // 获取支付类型
            this.payTypes = res;
        })
    }

    /**
     * 商户名称控件配置
     */
    public merchantCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('IntoPieces.listPage.merchantCfg.title'),
        url: CommonService.MCH_INFO_URL,
        isAjax: false,
        params: {isStore : 0},
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'merchantNo',
            label: this.i18n.fanyi('IntoPieces.listPage.merchantCfg.merchantCode')
        }, {
            field: 'name',
            label: this.i18n.fanyi('IntoPieces.listPage.merchantCfg.name')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('IntoPieces.listPage.merchantCfg.merchantCode'),
            index: 'merchantNo'
        }, {
            title: this.i18n.fanyi('IntoPieces.listPage.merchantCfg.name'),
            index: 'name'
        }]
    };


    /**
     * 所属银行控件配置
     */
    public agencyCodeCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('IntoPieces.listPage.agencyCodeCfg.title'),
        url: CommonService.BANKINFO_URL,
        isAjax: false,
        params: {name: this.model.agencyCode},
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'orgNo',
            label: this.i18n.fanyi('IntoPieces.listPage.agencyCodeCfg.agencyCode')
        },{
            field: 'name',
            label: this.i18n.fanyi('IntoPieces.listPage.agencyCodeCfg.agencyName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('IntoPieces.listPage.agencyCodeCfg.agencyCode'),
            index: 'orgNo'
        }, {
            title: this.i18n.fanyi('IntoPieces.listPage.agencyCodeCfg.agencyName'),
            index: 'name'
        }]
    };


    /**
     * 通道类型控件配置
     */
    public ptCenterCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('IntoPieces.listPage.ptCenterCfg.title'),
        url: CommonService.PAYCENTER_INFO_URL,
        isAjax: false,
        params: this._transId,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [{
            field: 'name',
            label: this.i18n.fanyi('IntoPieces.listPage.ptCenterCfg.ptCenterName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('IntoPieces.listPage.ptCenterCfg.ptCenterName'),
            index: 'name'
        }]
    };

    ngOnInit() {
        this.Addintopieces = this.fb.group({
            merchantId: [this.model.merchantId, [Validators.required]],     // 商户id号
            merchantCode: [this.model.merchantCode],                        // 商户编号
            agencyCode:[this.model.agencyCode, [Validators.required]],      // 所属银行
            transId: [this.model.transId, [Validators.required]],           // 支付类型
            ptCenterId: [this.model.ptCenterId, [Validators.required]],     // 通道类型
            providerNo: [this.model.providerNo]                             // 渠道编号
        });
    }


    /**
     * 商户名称选择事件
     * @param params
     */
    public merChantSelect(params: any) {
        this.model.merchantId = params.id;
        this.model.merchantCode = params.merchantNo;
    }

    /**
     * 所属银行选择事件
     */
    public agencySelect(params: any) {
        this.model.agencyName = params['name'];
        this.model.agencyCode = params['orgNo'];
    }

    /**
     * 支付类型选择事件
     * @param params
     */
    public paySelect(params: any) {

        this._transId['transId'] = params['_value'];
        this.ptCenterCfg.isAjax = true;

        // 新增选择支付类型清空通道类型
        if(params['nzOldValue'] && params['nzOldValue']['nzValue'] != this.model.transId) {
            this.model.ptCenterName =null;
            this.model.ptCenterId = null;
        }
    }

    /**
     * 通道类型默认查询前的事件
     * @returns {boolean}
     */
    onSearchBefore(val) {
        if(!this.model.transId) {
            this.msg.warning(this.i18n.fanyi('IntoPieces.listPage.hint.payTypeHint'));
            return false;
        }
        return true;
    }

    /**
     * 保存提交
     */
    onSubmit(value) {
        this.isLoad = true;

        this.IntoPiecesDB.add({
            merchantId: this.model.merchantId,
            merchantCode: this.model.merchantCode,
            agencyCode: this.model.agencyCode,
            transId: this.model.transId,
            ptCenterId: this.model.ptCenterId,
            providerNo: this.model.providerNo
        }).subscribe(res => {
            if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this._modal.destroy('onOk');
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoad = false;
        })
    }


    /**
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    public getFormControl(name) {
        return this.Addintopieces.controls[ name ];
    }
}


