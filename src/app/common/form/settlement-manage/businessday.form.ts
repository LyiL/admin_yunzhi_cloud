import {BaseForm} from "../base.form";
/**
 * 商户日结列表查询form
 */
export class BusinessDayForm extends BaseForm{

    public settleTitle: string; //结算打款标题
    public remark: string; //结算打款备注
    public searchType: string;    //查询类型
    private _beginTime: string;
    private _endTime: string;
    // public beginTime: string;     //开始时间
    // public endTime: string;       //结束时间
    public merchantNo: string;
    public merchantName: string;
    public ally: string;          //结算账户
    public centerId: number;      //支付中心
    public transId: string;       //支付类型
    public agencyCode: string;    //受理机构
    public cashState: string;     //付款状态
    public cashCycle: string;     //结算周期
    public agentno: string;       //渠道名称
    public agentName: string;       //渠道名称
    public chanProNo: string;       //服务商
    public chanProName: string;       //服务商

    constructor(){
        super();
    }
    get beginTime():string{
        return this.isEmpty(this._beginTime) ? this.defTime(0,'YYYY-MM-DD') : this.format(this._beginTime,'YYYY-MM-DD');
    }
    set beginTime(_beginTime:string){
        this._beginTime = _beginTime;
        this.endTime = this.modifyDate(this.beginTime,29);
    }

    get endTime():string{
        if(this._endTime == ''){
            return '';
        }
        return this.isEmpty(this._endTime) ? this.defTime(0,'YYYY-MM-DD') : this.format(this._endTime,'YYYY-MM-DD');
    }
    set endTime(_endTime:string){
        this._endTime = _endTime;
    }
}
