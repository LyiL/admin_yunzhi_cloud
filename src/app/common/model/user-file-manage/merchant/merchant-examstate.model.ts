import {BaseModel} from '../../base.model';

/**
 * 商户审核状态表单
 */
export class examstateModel extends BaseModel{
    public examState: string; //状态
    public examIllu: string; //备注
    public id:any;
    constructor() {
        super();
    }
}
