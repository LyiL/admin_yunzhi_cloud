import {BaseModel} from './base.model';

/**
 * 业务员密码信息模板
 */
export class ModifyLoginPswModel extends BaseModel{
    public userPwd: string; //旧密码
    public newPassword: string; // 新密码
    public newpwd2: string; //确认新密码

}
