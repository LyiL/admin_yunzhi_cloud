import { Component, OnInit, ViewChild } from "@angular/core";
import {HelperService} from "../../../common/services/helper.service";
import {I18NService} from "../../../common/i18n/i18n.service";
import {DynamicStepsService, ReuseTabService, SimpleTableComponent} from "@delon/abc";
import {HttpHeaders} from "@angular/common/http";
import {StaffManageForm} from "../../../common/form/stystem.manage/staffm.form";
import {psdModifyComponent} from "./psdModify/psdModify.component";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {StaffManageService} from "../../../common/services/request/system-manage/staff-manage.sevice";
import {CommonEnum} from "../../../common/enum/common.enum";


/**
 * 员工管理列表页模块
 */
@Component({
    selector: 'staffmanage-list',
    templateUrl: 'staff-manage-list.component.html',
    providers: [StaffManageService,DynamicStepsService]
})
export class StaffManageComponent {
    public smListForm:StaffManageForm = new StaffManageForm();  //定义form表单
    public isEnabledStatus:Array<any> = [];     //使用状态字段名



    constructor(public helper:HelperService,
                public i18n:I18NService,
                public modalService: NzModalService,
                public staffSer:StaffManageService,
                public _msg: NzMessageService,
                public modal: NzModalService,
                public dynamicStepsService:DynamicStepsService,
                public reuseTabService:ReuseTabService){
        this.isEnabledStatus = this.helper.getDictByKey('ACTV_STATUS');   //获取使用状态数据
    }

    @ViewChild('staffListTable') public staffListTable:SimpleTableComponent;

    /**
     * 列表页数据源
     * @type {{url: string; params: StaffManageForm; total: number; isAjax: boolean;: HttpHeaders; resReName: {list: string}; reqReName: {pi: string; ps: string}; tableColumns: [{title: (string | any); index: string} , {title: (string | any); index: string; render: string} , {title: (string | any); index: string} , {title: (string | any); index: string} , {title: (string | any); render: string} , {title: (string | any); render: string; with: string} , {title: (string | any); buttons: [{text: (string | any); click: any} , {text: (string | any); click: any}]}]}}
     */
    public staffTableCfg:any = {
        url:StaffManageService.STAFF_LLIST_URL,
        params:this.smListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        // reqReName:{pi:'0',ps:'size'},
        tableColumns:[
            {
                title:this.i18n.fanyi('StaffM.listPage.tableCols.userName'),   //用户名
                index:'userName',
                width:'300px'

            },{
                title:this.i18n.fanyi('StaffM.listPage.tableCols.b'),           //密码
                index:'b',
                render:'bRender'
            },{
                title:this.i18n.fanyi('StaffM.listPage.tableCols.realName'),     //员工姓名
                index:'realName'
            },{
                title:this.i18n.fanyi('StaffM.listPage.tableCols.phone'),        //联系电话
                index:'phone'
            },{
                title:this.i18n.fanyi('StaffM.listPage.tableCols.allocation'),   //角色分配
                // index:'allocation'
                render:'allocationRender'
            },{
                title:this.i18n.fanyi('StaffM.listPage.tableCols.isEnabled'),      //使用状态
                render:'isEnbledStateRender',
                // with:'80'
            },{
                title:this.i18n.fanyi('default.tableCol.action'),
                buttons:[{
                    text: this.i18n.fanyi('StaffM.listPage.tableActionCfg.edit'),
                    // 员工管理 - 编辑按钮
                    hide: (() => {
                        if (this.helper.btnRole('STAFFEDIT')) {
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click: ((record: any) =>{
                        this.helper.navigate('/admin/systems/staffmanageaddstaff', this.i18n.fanyi('StaffM.listPage.navigate.editstaff'), {isEdit: true,step:0, id: record['id'] })
                    }).bind(this)
                },{
                    text: this.i18n.fanyi('StaffM.listPage.tableActionCfg.del'),
                    // 员工管理 - 删除按钮
                    hide: (() => {
                        if (this.helper.btnRole('STAFFDEL')) {
                            return false;
                        }
                        return true;
                    }).bind(this),
                    click:this.onDelete.bind(this)
                }]
            }
        ]
    };



    /**
     * 编辑返回刷新数据
     */
    // ngOnInit(){
    //     this.reuseTabService.change.subscribe(()=>{
    //         this.staffListTable.doSearch(false);
    //     })
    // }

    /**
     * 修改密码弹窗打开
     * @param
     */
    onModifypwd = (item:any) => {
        const subscription = this.modalService.open({
            title: this.i18n.fanyi('StaffM.listPage.alert.psdModify'),
            content: psdModifyComponent,
            onOk() {
            },
            footer : false,
            componentParams: {
                id: item['id']
            }
        });
        subscription.subscribe(result => {
            if(result && result == 'onOk'){
                this._msg.success(this.i18n.fanyi('StaffM.listPage.alert.psdModifySU'));
                this.staffListTable.doSearch();
            }
        })

    };


    /**
     * 分配角色事件
     * @param item
     */
    onAllocation(item:any) {
        // this.dynamicStepsService.goStep(1);
        this.helper.navigate('/admin/systems/staffmanageaddstaff',this.i18n.fanyi('StaffM.nzTitle.step2Title'), {step:1,id: item['id'], userName: item['userName'], roleType: item['roleType'],isedit:true });
    }

    /**
     * 列表页查询
     */
    public onSearch(){
        this.staffListTable.doSearch();
    }

    /**
     * 新增员工
     * @constructor
     */
    Onaddstaff(): void {
        this.helper.navigate('/admin/systems/staffmanageaddstaff', this.i18n.fanyi('StaffM.listPage.navigate.addstaff'),{});
    }


    /**
     * 删除员工
     */
    public onDelete(row:any,e: MouseEvent){
        let _confirm= this.modal.confirm({
            // title: '您是否确认要删除该用户',
            title:this.i18n.fanyi('StaffM.listPage.alert.prompt'),
            content: this.i18n.fanyi('StaffM.listPage.alert.qusdeluser')
        });
        _confirm.subscribe(result => {
            if(result && result == 'onOk'){
                this.staffSer.loadUserDel({id:row['id']}).subscribe(res=>{
                    if(res && res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY){
                        this._msg.success(this.i18n.fanyi('StaffM.listPage.alert.opsuc'));
                        this.staffListTable.doSearch();
                    }else {
                        this._msg.error(res[CommonEnum.SERVER_MES_KEY]);
                    }
                })
            }
        })
    }


    /**
     * 变更使用状态状态
     */
    public onEnabled(row:any) {
        let isState=row['isEnabled']==0?this.i18n.fanyi('StaffM.listPage.tableCols.enable'):this.i18n.fanyi('StaffM.listPage.tableCols.disable');
        const statusWin = this.modal.confirm({
            title:this.i18n.fanyi('StaffM.listPage.alert.prompt'),
            content:this.i18n.fanyi('StaffM.listPage.alert.qusupdate',row['userName'],isState)
        // content:this.i18n.fanyi('StaffM.listPage.alert.qusupdate')+
        //          "【"+row['userName']+ "】"
        //          + (row['isEnabled'] == 0 ? this.i18n.fanyi('StaffM.listPage.tableCols.enable')
        //              : this.i18n.fanyi('StaffM.listPage.tableCols.disable'))+this.i18n.fanyi('StaffM.listPage.alert.status')
        });

        statusWin.subscribe(result => {
            if(result && result == 'onOk'){
                let _useStatus = row['isEnabled'];
                if (_useStatus == 0) {
                    row['isEnabled'] = 1;
                } else {
                    row['isEnabled'] = 0;
                }
                this.staffSer.loadModifyStaff(row).subscribe(_res => {
                    if (_res && _res[CommonEnum.SERVER_STATUS_KEY] == CommonEnum.SERVER_STATUS_DATE_KEY) {
                        if (_res['data']['isEnabled'] == 1) {
                            this._msg.success(this.i18n.fanyi('StaffM.listPage.alert.enablesuc'));
                        } else {
                            this._msg.success(this.i18n.fanyi('StaffM.listPage.alert.disablesuc'));
                        }
                        this.staffListTable.doSearch();
                    } else {
                        this._msg.error(_res.message);
                    }
                });


            }
        })
    }
}
