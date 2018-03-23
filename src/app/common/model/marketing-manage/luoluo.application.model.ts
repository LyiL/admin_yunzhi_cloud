import {BaseModel} from "../base.model";

/**
 * 络络应用
 */

export class luoApplicationModel extends BaseModel {
    id: number; // id
    appName: string; //应用名称
    devName: string; //开发者名称 *
    downloadNum: number; //下载量 *
    downloadUrl: string; //下载地址 *
    remark: string; //软件说明 *
    platform: string;  //应用系统
    // releaseTime: string; //发布日期 * 时间格式：yyyy-MM-dd HH:mm:ss
    private _releaseTime: string;
    appLogo: string; //应用logo *
    appImg1: string; //应用图片1 *
    appImg2: string; //应用图片2 *
    appImg3: string; //应用图片3 *


    get releaseTime(): string{
        if(this.isEmpty(this._releaseTime)) {
            return '';
        }
        return this.format(this._releaseTime, 'YYYY-MM-DD HH:mm:ss');
    }
    set releaseTime(_releaseTime: string){
        this._releaseTime = _releaseTime;
    }
}
