

import {BaseForm} from "../../base.form";

export class addRoleBaseForm extends BaseForm{
    /**
     * 新增角色表单字段
     * @author hsz
     * @date
     */
    public id:number;
    // public roleName:string;////角色名/角色组名
    // public description:string;//描述
    // public parentIds:number;//父级id
    // public appId:string;//领域id
    // public orgNo:string;//组织机构编号
    // public rolecode:string//角色编码/角色组编码
    public roleName:string;
    public description:string;
    public parentIds:number;
    constructor(){
        super();
    }
}
