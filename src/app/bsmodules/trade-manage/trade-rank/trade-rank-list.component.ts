import {Component, ViewChild} from '@angular/core';
import {HelperService} from "../../../common/services/helper.service";
import {SimpleTableComponent} from "@delon/abc";
import {I18NService} from "../../../common/i18n/i18n.service";
import {CommonEnum} from '../../../common/enum/common.enum';
import {TradeRankForm} from '../../../common/form/trade-manage/trade-rank.form';
import {TradeRankService} from '../../../common/services/request/trade-manage/trade-rank.service';
import {NzMessageService} from 'ng-zorro-antd';

/**
 * 商户排名列表页
 */
@Component({
    selector: 'trade-rank-list',
    templateUrl: './trade-rank-list.component.html',
    providers:[TradeRankService]
})
export class TradeRankListComponent{
    public rankListForm: TradeRankForm = new TradeRankForm();

    constructor(
        public helper: HelperService,
        public i18n: I18NService,
        public _msg: NzMessageService
    ) {}

    @ViewChild('rankListTable') public rankListTable: SimpleTableComponent;

    public tableCfg:any = {
        url:TradeRankService.RANK_LIST_URL,
        params:this.rankListForm,
        isAjax:true,
        resReName:CommonEnum.TABLE_RES_RE_NAME,
        reqReName:CommonEnum.TABLE_REQ_RE_NAME,
        tableColumns: [
            {
                title:this.i18n.fanyi('TradeRank.listPage.tableCols.billTime'),
                index:'billTime',
                type:'date',
                dateFormat:'YYYY-MM-DD'
            },
            {
                title:this.i18n.fanyi('TradeRank.listPage.tableCols.mchName'),
                index:'mchName'
            },
            {
                title:this.i18n.fanyi('TradeRank.listPage.tableCols.totalCount'),
                index:'totalCount'
            },
            {
                title:this.i18n.fanyi('TradeRank.listPage.tableCols.totalFee'),
                index:'totalFee'
            },
            {
                title:this.i18n.fanyi('TradeRank.listPage.tableCols.avgFee'),
                index:'avgFee'
            },
            {
                title:this.i18n.fanyi('TradeRank.listPage.tableCols.thiTotalCountRatio'),
                render:'thiTotalCountRatioRender'

            },
            {
                title:this.i18n.fanyi('TradeRank.listPage.tableCols.contrastYesterday'),
                render:'contrastRender'
            }
        ]
    };

    /**
     * 列表页查询
     */
    public onSearch(){
        this.rankListTable.doSearch();
    }
}
