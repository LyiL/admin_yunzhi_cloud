
import {BaseForm} from "../base.form";

/**
 * 员工管理列表查询form字段
 */
export class StaffManageForm extends BaseForm{
    public userName:string;//用户名、唯一
    public realName:string;//真实姓名
    public isEnabled:number; //是否启用

    constructor(){
        super();
    }
}
