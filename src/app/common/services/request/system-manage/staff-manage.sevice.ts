import {EventEmitter, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from "../../../net/http.service";

/**
 * 员工管理服务请求地址
 */
@Injectable()
export class StaffManageService{
    constructor(private http: HttpService) {
    }
    step: 0 | 1 | 2 = 1;

    /**
     * 员工管理列表数据地址
         * String userName;    //用户名、唯一
         String realName;    //真实姓名
         Integer isEnabled;    //是否启用
     * @type {string}
     */
    public  static STAFF_LLIST_URL='/userAction/findByPage';

    /**
     * 修改员工密码
     *  Integer  id 主键编号    *
     String userPwd 密码        *
     */
    loadUserModifyPwd(params:any):Observable<any>{
        return this.http.post('/userAction/modifyPwd',params);
    }



    /**
     * 删除员工
     *   id:number  // 编号   *
     */
    loadUserDel(params:any):Observable<any>{
        return this.http.post('/userAction/del',params);
    }

    /**
     * 新增或编辑员工
     * @param params ：
     *    string      userName    用户名      *
         String      userPwd     密码        *
         String      phone       联系电话
         String      realName    真实姓名    *
     * @returns {Observable<any>}
     */
    saveStaffInfo(params:any){
        let url = '/userAction/add';
        if(params && params['id']){
            url = '/userAction/modify';
        }
        return this.http.post(url,params);
    }


    /**
     * 查询员工
     *  Integer     id          主键编号    *
     */
    loadStaff(params:any):Observable<any>{
        return this.http.post('/userAction/findById',params);
    }


    /**
     * 修改员工
     *    Integer     id          主键编号    *
     String      userName    用户名      *
     String      phone       联系电话
     String      realName    真实姓名    *
     *
     *
     */
    loadModifyStaff(params:any):Observable<any>{
        return this.http.post('/userAction/modify',params);
    }

    /**
     * 获取角色列表-不分页
     *   string username 用户名
     int  parentIds 父级id
     */
    loadRoleList(params:any):Observable<any>{
        return this.http.post('/roleAction/findByList',params);
        // return this.http.get('../../../../../webassets/allocatdate.json',params);
    }

    /**
     * 员工分配角色
     *  Integer     id          主键编号*
     Integer[]   roleIds     角色id集*
     */
    loadStaffAllot(params:any):Observable<any>{
        return this.http.post('/userAction/allotRole',params);
    }
}
