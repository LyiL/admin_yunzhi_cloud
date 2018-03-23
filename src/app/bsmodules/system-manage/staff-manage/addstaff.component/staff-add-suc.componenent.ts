import {Component} from "@angular/core";
import {StaffManageService} from "../../../../common/services/request/system-manage/staff-manage.sevice";
import {HelperService} from "../../../../common/services/helper.service";
import {I18NService} from "../../../../common/i18n/i18n.service";
import {DynamicStepsService} from "@delon/abc";


/**
 *成功页
 */
@Component({
    selector: 'staff-add-suc',
    templateUrl: 'staff-add-suc.componenent.html',
    providers: [StaffManageService,DynamicStepsService]
})
export class StaffAddSucComponenent{


    constructor(
                     public helper:HelperService,
                     public staffSev:StaffManageService,
                     public i18n:I18NService,
                     public dynamicStepsService:DynamicStepsService) {}

    /**
     * 返回
     */
    onBank(){
        this.helper.navigate('/admin/systems/staffmanage',this.i18n.fanyi('StaffM.listPage.navigate.staffmanage'),{});
    }

}
