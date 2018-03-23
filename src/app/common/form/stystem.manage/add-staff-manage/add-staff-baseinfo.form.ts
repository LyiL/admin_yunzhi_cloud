

import {BaseForm} from "../../base.form";
/**
 * 新增员工基本信息字段
 */
export class AddStaffBaseinfoForm extends BaseForm{
    public id:number;      //主键id
    public userName:string;   //用户名
    public userPwd:string;    //密码
    public realName:string;    //真实姓名
    public phone:number;        //联系号码
   // public deptName:string;
    constructor(){
        super();
    }
}
