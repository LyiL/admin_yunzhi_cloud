import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {luoApplicationModel} from "../../../common/model/marketing-manage/luoluo.application.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {HelperService} from "../../../common/services/helper.service";
import {CommonEnum} from "../../../common/enum/common.enum";
import {NzMessageService} from "ng-zorro-antd";
import {I18NService} from "../../../common/i18n/i18n.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {LuoApplicationService} from "../../../common/services/request/marketing-manage/luoluo.application.service";

/**
 * 络络应用新增页
 */

@Component({
    selector: 'luo-application-add',
    templateUrl: 'luoluo.application.add.component.html',
    providers: [LuoApplicationService]
})
export class LuoApplicationAddComponent implements OnInit, AfterContentChecked{
    public model:luoApplicationModel = new luoApplicationModel();
    public luoApplicationFormGrouo: FormGroup;

    public platforms: Observable<any>;  // 应用系统
    public nzTitle: string;             // 这个是新增页/编辑页的标题

    public androidFlag: boolean; // 安卓下载地址提示
    public iOSFlag: boolean; // ios下载地址提示
    public isLoad: boolean = false; // 按钮loading效果


    //文件上传控件配置
    public defFieldUploadSetting: any = {
        url:'/assets/upload',
        fileSuffix:'.jpg;.jpeg;.png;.gif;'
    };

    constructor(public fb: FormBuilder,
                public luoApplicationDB: LuoApplicationService,
                public helper: HelperService,
                public msg: NzMessageService,
                public i18n: I18NService,
                public menuService:MenuService,
                public router: Router,
                public changeDetectorRef:ChangeDetectorRef) {

        this.platforms = Observable.of(this.helper.getDictByKey('CLOUD_PLATFORM_DATA')); // 获取应用系统
    }

    ngOnInit() {
        this.luoApplicationFormGrouo = this.fb.group({
            appName: [this.model.appName, [Validators.required]],                                   // 应用名称
            devName: [this.model.devName, [Validators.required]],                                   // 开发者名称
            downloadNum: [this.model.downloadNum, [Validators.required, this.numberValidator]],     // 下载量
            downloadUrl: [this.model.downloadUrl, [Validators.required]],                           // 下载地址
            remark: [this.model.remark, [Validators.required]],                                     // 软件说明
            platform: [this.model.platform],                                                        // 应用系统
            releaseTime: [this.model.releaseTime, [Validators.required]],                           // 发布日期
            appLogo: [this.model.appLogo, [Validators.required]],                                   // 应用logo
            appImg1: [this.model.appImg1, [Validators.required]],                                   // 应用图片1
            appImg2: [this.model.appImg2, [Validators.required]],                                   // 应用图片2
            appImg3: [this.model.appImg3, [Validators.required]]                                    // 应用图片3
        })

        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let params = menu['params'];

            if(params && params['id']) {
                this.nzTitle = 'luoluo.detailOrAdd.editTitle';
                this.luoApplicationDB.getAppDetail({id: params['id']}).subscribe((res) => {
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.model = res[CommonEnum.SERVER_DATA_KEY];
                    }
                })
            }
        }else {
            this.nzTitle = 'luoluo.detailOrAdd.addTitle';
        }
    }

    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * 保存
     */
    onSubmit() {
        this.isLoad = true;
        this.luoApplicationDB.addOrUpdateApp(this.model).subscribe((res) => {
            if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                this.msg.success(this.i18n.fanyi('default.hint.saveSuccess'));
                this.helper.navigate('/admin/marketing/luoapplist', this.i18n.fanyi('luoluo.listPage.title'), null);
            }else {
                this.msg.error(res[CommonEnum.SERVER_MES_KEY]);
            }
            this.isLoad = false;
        })
    }

    /**
     * 返回
     */
    onBack() {
        this.helper.navigate('/admin/marketing/luoapplist', this.i18n.fanyi('luoluo.listPage.title'), null);
    }

    /**
     * 应用系统选择事件
     * @param system
     */
    public systemSelect(system: any) {
        let _label = system['_label'];
        let _value = system['_value'];

        if(_value != 'ios' && _value != 'android') {
            this.androidFlag = false;
            this.iOSFlag = false;
        }

        if(_value == 'android' && _label == this.i18n.fanyi('luoluo.detailOrAdd.android')) {
            this.androidFlag = true;
            this.iOSFlag = false;
        }

        if(_value == 'ios' && _label == this.i18n.fanyi('luoluo.detailOrAdd.ios')) {
            this.androidFlag = false;
            this.iOSFlag = true;
        }
    }

    public onReleaseTimeModelChange(value: any) {
        if(!this.helper.isEmpty(value)) {
            this.model.releaseTime = this.helper.dateFormat(value);
        }
    }

    /**
     * 文件上传错误信息
     * @param data
     */
    public onFileUploadError(data){
        if(data && data[CommonEnum.SERVER_MES_KEY]){
            this.msg.warning(data[CommonEnum.SERVER_MES_KEY]);
        }
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

    /**onChangeControl
     * 获取响应式表单项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.luoApplicationFormGrouo.controls[name];
    }



}
