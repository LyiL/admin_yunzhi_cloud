import {BaseModel} from "../../base.model";

/**
 * 服务商公众号配置表单模板
 */
export class SpWeixinModel extends BaseModel {
    public id:string; // 配置信息编号
    public chanCode: string; // 服务商编号
    public subAppid: string; // 关联公众号appid
    public jsapiPath: string; // 支付授权目录
    public subscribeAppid: string; // 推荐关注公众号APPID
}
