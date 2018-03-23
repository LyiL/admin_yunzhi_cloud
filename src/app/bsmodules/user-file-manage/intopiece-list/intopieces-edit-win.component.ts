import {Component, OnInit, ViewChild} from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {SearchWindowConfig, SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {NzModalService, NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {IntoPiecesService} from "../../../common/services/request/user-file-manage/intopieces.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {IntoPiecesModel} from "../../../common/model/user-file-manage/intopiece-list/intopieces.model";
import {CommonService} from "../../../common/services/request/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonEnum} from "../../../common/enum/common.enum";

/**
 * 进件编辑
 */

@Component({
    selector: 'intopieces-edit-win',
    templateUrl: './intopieces-edit-win.component.html',
    providers: [IntoPiecesService]
})
export class IntoPiecesEditWinComponent implements OnInit {

    public model: IntoPiecesModel = new IntoPiecesModel();
    public intoPiecesEditForm: FormGroup;

    public applyState: Array<any> = []; // 进件类型
    public ptCenterId: Array<any> = []; // 通道类型

    public _centerName: any; // 通道类型名称
    public _transId = {}; // 获取通道类型需要的参数
    public isLoad: boolean = false; // 按钮loading效果

    // set params(value: any) {
    //     this._params = value;
    // }

    @ViewChild('intoListTable') public intoListTable: SimpleTableComponent;

    constructor(public helper: HelperService,
                public i18n: I18NService,
                public modal: NzModalService,
                public msg: NzMessageService,
                public IntoPiecesDB: IntoPiecesService,
                public router: Router,
                public menuService: MenuService,
                public fb: FormBuilder,
                public _modal: NzModalSubject) {

        /**
         * 过滤掉处理中状态
         */
        this.applyState = this.helper.getDictByKey('APPLY_STATE') && this.helper.getDictByKey('APPLY_STATE').filter((item => {
            return item['id'] != 1;
        }));
    }

    /**
     * 通道类型控件配置
     */
    public ptCenterCfg: SearchWindowConfig = {
        title: this.i18n.fanyi('IntoPieces.listPage.ptCenterCfg.title'),
        url: CommonService.PAYCENTER_INFO_URL,
        params: this._transId,
        isAjax: true,
        resReName: CommonEnum.TABLE_RES_RE_NAME,
        reqReName: CommonEnum.TABLE_REQ_RE_NAME,
        searchFields: [ {
            field: 'name',
            label: this.i18n.fanyi('IntoPieces.listPage.ptCenterCfg.ptCenterName')
        }],
        tableColumns: [{
            title: this.i18n.fanyi('IntoPieces.listPage.ptCenterCfg.ptCenterName'),
            index: 'name'
        }]
    };

    ngOnInit() {

        /**
         * 获取数据渲染编辑框
         */
        this.IntoPiecesDB.query({id: this.model['id']}).subscribe((res) => {
            this.model = res[CommonEnum.SERVER_DATA_KEY];
            this._transId['transId'] = this.model['transId'];
            this._centerName = this.model['centerName'];
        });


        this.intoPiecesEditForm = this.fb.group({
            name: [this.model.name, [Validators.required]],                  // 商户名称
            merchantCode: [this.model.merchantCode],                         // 商户编号
            chanName: [this.model.chanName],                                 // 所属上级
            agencyCode: [this.model.agencyCode],                             // 所属机构
            ptCenterId: [this.model.ptCenterId, [Validators.required]],      // 通道类型
            bankName: [this.model.bankName],                                 // 所属银行
            providerNo: [this.model.providerNo],                             // 渠道编号
            applyState: [this.model.applyState, [Validators.required]],      // 进件状态
            ally: [this.model.ally]                                          // 商户识别码
        })
    }

    /**
     * 编辑保存
     */
    onSubmit() {
        this.isLoad = true;
        this.IntoPiecesDB.update({
            id: this.model['id'],
            agencyCode: this.model['agencyCode'],
            ptCenterId: this.model['ptCenterId'],
            providerNo: this.model['providerNo'],
            ally: this.model['ally'],
            applyState: this.model['applyState']
        }).subscribe((res) => {
            if (res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.editSuccess'));
                this._modal.destroy('onOk');
            } else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoad = false;
        })
    }


    /**onChangeControl
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.intoPiecesEditForm.controls[name];
    }

    /**
     * 根据某个条件判断某个参数是否为必填项
     * @param name
     * @returns {boolean}
     */
    public onChangeControl(name) {
        let _control = this.getFormControl(name);
        let allyControl = this.intoPiecesEditForm.controls['ally'];
        if (_control && _control['value'] == 2 && !allyControl['value']) {
            allyControl.setValidators([Validators.required]);
            allyControl.updateValueAndValidity();
            return true;
        }
        allyControl.clearValidators();
        allyControl.updateValueAndValidity();
        return false;
    }
}
