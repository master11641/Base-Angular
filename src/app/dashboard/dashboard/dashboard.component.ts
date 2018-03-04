import { DashboardService } from "./../dashboard.service";
import { PagedQueryModel } from "./../../simple-grid/paged-query-model";
import { UserslistService } from "./../../user-operations/userslist.service";
import { Component, OnInit } from "@angular/core";
import { User } from "app/user-operations/Models/User";
import { PagedQueryResult } from "app/simple-grid/paged-query-result";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  DisplayValue: any;

  UserCount: number;
  commentsCount:number;
  Users: User[];
  queryModel = new PagedQueryModel("ID", true, 1, 1000000, "", "");
  queryResult = new PagedQueryResult<User>(0, []);

  ordersCount = 0;
  paymentSum=0;

  data: Array<number> = [];
  public barChartLabels: string[] = [];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData: any[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: "تعداد سفارشات" }
  ];

  data1: Array<number> = [];
  public barChartLabels1: string[] = [];
  public barChartType1 = "bar";
  public barChartLegend1 = true;
  public barChartData1: any[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: "پرداختها طی یک هفته گذشته" }
  ];


  data2: Array<number> = [];
  public barChartLabels2: string[] = [];
  public barChartType2 = "doughnut";
  public barChartLegend2 = true;
  public barChartData2: any[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: "پرداختها طی یک هفته گذشته" }
  ];

  constructor(
    private userService: UserslistService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    // this.data = new Array<number>();

    this.userService.getPagedList(this.queryModel).subscribe(result => {
      this.queryResult = result;
      this.Users = this.queryResult.items;
      this.UserCount = this.Users.length;
    });
    this.dashboardService.getProductOrdersChart().subscribe(res => {
      this.DisplayValue = res;
      console.log(this.DisplayValue);
      this.DisplayValue.forEach(element => {
        this.barChartLabels.push(element.Display);
        this.data.push(element.Value);
      });

      this.BarChartDataBind();
    });

    this.dashboardService.getPaymentChart().subscribe(res => {
      this.DisplayValue = res;
      this.DisplayValue.forEach(element => {
        this.barChartLabels1.push(element.Display);
        this.data1.push(element.Value);
      });

      this.PaymentChartDataBind();
    });
  this.dashboardService.getOrderItemChart().subscribe(res => {
      this.DisplayValue = res;
      this.DisplayValue.forEach(element => {
        this.barChartLabels2.push(element.Display);
        this.data2.push(element.Value);
      });

this.OrderItemChartDataBind();
    });



    this.dashboardService.getOrdersCount().subscribe(res => {
      this.ordersCount = res;
    });
    this.dashboardService.getPaymentSum().subscribe(res => {
      this.paymentSum = res;
    });
    this.dashboardService.getUnreadCommentsCount().subscribe(res => {
      this.commentsCount = res;
    });
  } //End init
  public BarChartDataBind(): void {
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = this.data;
    this.barChartData = clone;
  }
  public PaymentChartDataBind(): void {
    const clone = JSON.parse(JSON.stringify(this.barChartData1));
    clone[0].data = this.data1;
    this.barChartData1 = clone;
  }
  public OrderItemChartDataBind(): void {
    const clone = JSON.parse(JSON.stringify(this.barChartData2));
    clone[0].data = this.data2;
    this.barChartData2 = clone;
  }
}
