import {BaseModel} from "../../base.model";

/**
 * 分配角色字段
 * @author hsz
 */

export class StaffAllocationRoleModel extends BaseModel{

    public userName:string;   //用户名
    public id:number;          //主键ID
    public roleIds:Array<number> = new Array<any>();   //角色菜单集合

    public syncStatus: string;        //角色菜单集合formControlName
    constructor() {
        super();
    }
}


