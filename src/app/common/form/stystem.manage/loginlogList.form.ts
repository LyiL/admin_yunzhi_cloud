/**
 * 登陆日志表单字段
 */

import {BaseForm} from "../base.form";

export class LoginLogForm extends BaseForm{

    public userName:string;  //用户名
    private _loginTime:string; //开始时间
    // private _loginTimeAt:string; //结束时间

    // private _loginTime:string; //开始时间
    private _lastLoginAt:string; //结束时间
    constructor(){
        super();
    }
    get loginTime(){
        return this.isEmpty(this._loginTime) ? this.defTime(0,'YYYY-MM-DD 00:00:00') : this.format(this._loginTime);
    }
    set loginTime(_loginTime:string){
        this._loginTime = _loginTime;
    }
    get lastLoginAt(){
        if(this._lastLoginAt == ''){
            return '';
        }
        return this.isEmpty(this._lastLoginAt) ? this.defTime(0,'YYYY-MM-DD 23:59:59') : this.format(this._lastLoginAt,'YYYY-MM-DD 23:59:59');
    }
    set lastLoginAt(_lastLoginAt:string){
        this._lastLoginAt = _lastLoginAt;
    }

}

