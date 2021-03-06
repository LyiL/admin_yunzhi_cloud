import {BaseForm} from "../base.form";
/**
 * 机构日结列表查询form
 */
export class channelDayForm extends BaseForm{

    // public billTimeStart:string;
    // public billTimeEnd:string;
    private _billTimeStart:string; //清算开始时间
    private _billTimeEnd:string; //清算结束时间
    public cashType:number; //款项类型
    public merchantNo:string;
    public agencyCode:string;
    public merchantName:string;
    public canalNo:string;//渠道编号
    public  canalName:string;//渠道名称
    public transId:string;
    public ally:string;
    public allyName:string;
    public chanProNo: string;  // 服务商
    public chanProName: string;
    public settleTitle: string; //结算打款标题
    public remark: string; //结算打款备注
    constructor(){
        super();
    }
    get billTimeStart(){
        return this.isEmpty(this._billTimeStart) ? this.defTime(0,'YYYY-MM-DD') : this.format(this._billTimeStart,'YYYY-MM-DD');
    }
    set billTimeStart(_billTimeStart:string){
        this._billTimeStart = _billTimeStart;
        this._billTimeEnd = this.modifyDate(this.billTimeStart,29);
    }
    get billTimeEnd(){
        if(this._billTimeEnd == ''){
            return '';
        }
        return this.isEmpty(this._billTimeEnd) ? this.defTime(0,'YYYY-MM-DD') : this.format(this._billTimeEnd,'YYYY-MM-DD');
    }
    set billTimeEnd(_billTimeEnd:string){
        this._billTimeEnd = _billTimeEnd;
    }

}
