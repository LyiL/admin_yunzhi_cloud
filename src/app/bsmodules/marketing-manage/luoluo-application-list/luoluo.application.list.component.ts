import {Component, OnInit, ViewChild} from '@angular/core';
import {LuoApplicationForm} from "../../../common/form/marketing-manage/luoluo.application.form";
import {I18NService} from "../../../common/i18n/i18n.service";
import {LuoApplicationService} from "../../../common/services/request/marketing-manage/luoluo.application.service";
import {HttpHeaders} from "@angular/common/http";
import {CommonEnum} from "../../../common/enum/common.enum";
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Observable} from "rxjs/Observable";

/**
 * 络络应用列表页
 */

@Component({
    selector: 'luo-application-list',
    templateUrl: 'luoluo.application.list.component.html',
    providers: [LuoApplicationService]
})
export class LuoApplicationComponent implements OnInit{

    public luoApplicationForm:LuoApplicationForm = new LuoApplicationForm();

    public releaseKey: Observable<any>; // 发布链接

    @ViewChild('luoApplicationTable') luoApplicationTable: SimpleTableComponent;

    constructor(public i18n: I18NService,
                public helper: HelperService,
                public modal: NzModalService,
                public LuoApplicationDB: LuoApplicationService,
                public msg: NzMessageService) {

        this.releaseKey = Observable.of(this.helper.getDictByKey('CLOUD_OTO_RELEASE_APP_DOWNLOAD')); // 获取发布链接
    }

    /**
     * 进件列表表格基础信息配置
     * @type {{url: string; params: any; total: number; isAjax: boolean; resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); index: string; render: any} , {title: (string | any); buttons: [{text: string; click: any}]}]}}
     */
    public tableCfg:any = {
        url:LuoApplicationService.LUO_APPLICATION_LIST_URL,
        params: this.luoApplicationForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns:[
            {
                title:this.i18n.fanyi('luoluo.listPage.tableCols.appName'),         // 应用名称
                index:'appName'
            },{
                title:this.i18n.fanyi('luoluo.listPage.tableCols.downloadNum'),     // 下载量
                index:'downloadNum'
            },{
                title:this.i18n.fanyi('luoluo.listPage.tableCols.devName'),         // 开发者名称
                index:'devName'
            },{
                title:this.i18n.fanyi('luoluo.listPage.tableCols.platform'),        // 应用系统(CLOUD_PLATFORM_DATA)
                render:'platformRender'
            },{
                title:this.i18n.fanyi('luoluo.listPage.tableCols.releaseTime'),     // 发布时间
                render:'releaseTimeRender'
            },{
                title:this.i18n.fanyi('luoluo.listPage.tableCols.createdTime'),     // 创建时间
                render:'createdTimeRender'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[
                    {
                        text: this.i18n.fanyi('default.btn.editBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('LUOAPPEDIT')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((row: any) => {
                            this.helper.navigate('/admin/marketing/luoappadd', this.i18n.fanyi('luoluo.detailOrAdd.editTitle'), row);
                        })
                    },
                    {
                        text: this.i18n.fanyi('default.btn.delBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('LUOAPPDEL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onDel.bind(this)
                    },
                    {
                        text: this.i18n.fanyi('default.btn.detailBtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('LUOAPPINFO')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: ((row: any) => {
                            this.helper.navigate('/admin/marketing/luoappdetail', this.i18n.fanyi('luoluo.detailOrAdd.detailTitle'), row);
                        })
                    },
                    {
                        text: this.i18n.fanyi('luoluo.listPage.tableCols.seleasebtn'),
                        hide: ( () => {
                            if (this.helper.btnRole('LUOAPPCREATEURL')){
                                return false;
                            }
                            return true;
                        }).bind(this),
                        click: this.onSelease.bind(this)
                    },
                ]
            }
        ]
    };

    ngOnInit() {

    }

    /**
     * 查询
     */
    onSearch() {
        this.luoApplicationTable.doSearch(true);
    }

    /**
     * 生成发布链接
     * @param row
     */
    onSelease(row) {
        let _confirm = this.modal.confirm({
            title: this.i18n.fanyi('luoluo.hint.selease'),
            content: this.releaseKey['value'] + "index?id=" + row['id'],
            width: '500px',
            maskClosable: false,
        });
    }

    /**
     * 新增
     */
    onAdd() {
        this.helper.navigate('/admin/marketing/luoappadd', this.i18n.fanyi('luoluo.detailOrAdd.addTitle'), null);
    }

    /**
     * 删除
     * @param row
     */
    onDel(row: any) {
        let _confirm = this.modal.confirm({
            title: this.i18n.fanyi('default.hint.hintInfo'),
            content: this.i18n.fanyi('luoluo.hint.delApp1') + row['appName'] + this.i18n.fanyi('luoluo.hint.delApp2'),
            width: '500px',
            maskClosable: false,
        });

        _confirm.subscribe(res => {
            if(res && res == 'onOk') {
                this.LuoApplicationDB.deleteApp({id: row['id']}).subscribe((_res) => {
                    if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        this.msg.success(this.i18n.fanyi('default.hint.delSuccess'));
                        this.luoApplicationTable.doSearch(false);
                    } else {
                        this.msg.error(_res[CommonEnum.SERVER_MES_KEY]);
                    }
                });
            }
        })
    }
}

