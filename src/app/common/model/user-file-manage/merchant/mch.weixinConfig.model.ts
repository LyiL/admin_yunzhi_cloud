import {BaseModel} from "../../base.model";
/**
 * 商户微信公众号配置信息表单
 */
export class MchWxconfigSetModel extends BaseModel{
    public mchId ;//商户ID
    public jsapiPath;  //授权目录
    public  subAppid ;//关联APPID
    public  subscribeAppid ;// 推荐关注APPID
    constructor() {
        super();
    }
}
