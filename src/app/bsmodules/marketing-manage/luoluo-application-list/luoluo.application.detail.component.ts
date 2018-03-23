import {Component} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd";
import {LuoApplicationService} from "../../../common/services/request/marketing-manage/luoluo.application.service";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {MenuService} from "@delon/theme";
import {Router} from "@angular/router";
import {CommonEnum} from "../../../common/enum/common.enum";
import {ImagePreviewService} from "@delon/abc";

/**
 * 络络应用详情页
 */

@Component({
    selector: 'luo-application-detail',
    templateUrl: 'luoluo.application.detail.component.html',
    providers: [LuoApplicationService]
})
export class LuoApplicationDetailComponent {

    public detailData = {}; // 络络应用详情页参数

    /**
     * 差错异常详情页配置
     * @type {[{title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string} , {title: (string | any); field: string}]}
     */
    public detailFields: Array<any> = [
        {
            title: this.i18n.fanyi("luoluo.detailOrAdd.appName"),       // 应用名称
            field: 'appName',
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.devName"),       // 开发者名称
            field: 'devName',
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.downloadNum"),   // 下载量
            field: 'downloadNum',
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.downloadUrl"),   // 下载地址
            field: 'downloadUrl',
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.createdTime"),   // 创建时间
            field: 'createdTime',
            type: 'datetime',
            format: 'YYYY-HH-DD hh:mm:ss'
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.releaseTime"),   // 发布时间
            field: 'releaseTime',
            type: 'datetime',
            format: 'YYYY-HH-DD hh:mm:ss'
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.appLogo"),       // 应用Logo
            field: 'appLogo',
            type:'image'
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.appImg1"),       // 应用图片1
            field: 'appImg1',
            type:'image'
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.appImg2"),       // 应用图片2
            field: 'appImg2',
            type:'image'
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.appImg3"),       // 应用图片3
            field: 'appImg3',
            type:'image'
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.platform"),      // 应用系统(CLOUD_PLATFORM_DATA)
            field: 'platform',
            type: 'dict',
            transKey: 'CLOUD_PLATFORM_DATA'
        }, {
            title: this.i18n.fanyi("luoluo.detailOrAdd.remark"),        // 软件说明
            field: 'remark',
        }
    ]

    constructor(public msg: NzMessageService,
                public LuoApplicationDB: LuoApplicationService,
                public helper:HelperService,
                public i18n: I18NService,
                public menuService: MenuService,
                public router: Router,
                public imageService:ImagePreviewService,) {
    }

    ngOnInit() {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let params = menu['params'];

            this.LuoApplicationDB.getAppDetail({id: params['id']}).subscribe((res) => {
                if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                    this.detailData = res[CommonEnum.SERVER_DATA_KEY];
                }
            })
        }
    }

    /**
     * 图片预览
     */
    onImagePreview(field:string){
        this.imageService.showImageByFieldName(field);
        this.imageService.showImageViewer(true);
    }

    /**
     * 跳转到编辑页
     */
    onEdit() {
        let menu = this.menuService.getUrlByMenu(this.router.url);
        if(menu && menu['params']) {
            let params = menu['params'];
            this.helper.navigate('/admin/marketing/luoappadd', this.i18n.fanyi('luoluo.detailOrAdd.editTitle'), {id: params['id']});
        }
    }

    /**
     * 返回列表页
     */
    onBack() {
        this.helper.navigate('/admin/marketing/luoapplist', this.i18n.fanyi('luoluo.listPage.title'), null);
    }
}
