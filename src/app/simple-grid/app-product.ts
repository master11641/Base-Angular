
export class AppProduct {
  constructor(
    public ProductId: number,
    public ProductName: string,
    public Price: number,
    public IsAvailable: boolean,
    public Description:string,
    public ShowFromDate:any,
    public CaegoryId:number
  ) {}
}
