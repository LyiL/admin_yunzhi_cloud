import {BaseModel} from "../base.model";

export class changeStatusModel extends BaseModel{
  public syncStatus: string; //结算状态
  public modifyCause: string; //更改原因
  constructor() {
    super();
  }
}
