import {BaseModel} from "../../base.model";

/**
 * 审核代理商
 */
export class AgencyExamineModel extends BaseModel{
  public id:number;//主键ID
  public chanCode:string;//代理商编号
  public examState: number; //审核状态
  public examIllu: string; //审核状态修改说明
  constructor() {
    super();
  }
}
