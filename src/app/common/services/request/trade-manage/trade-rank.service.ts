import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpService} from '../../../net/http.service';

/**
 * 交易排名数据源
 */
@Injectable()
export class TradeRankService{
    constructor(private http:HttpService){}

    /**
     * 商户排名查询地址
     */
    public static RANK_LIST_URL = '/mchDayBillSort/query';
}
