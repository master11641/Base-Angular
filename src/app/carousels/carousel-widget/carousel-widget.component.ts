import { Carousel } from "./../models/carousels";
import { CarouselsService } from "./../carousels.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-carousel-widget",
  templateUrl: "./carousel-widget.component.html",
  styleUrls: ["./carousel-widget.component.css"]
})
export class CarouselWidgetComponent implements OnInit {
  carousels: Carousel[];
  constructor(private service: CarouselsService) {}

  ngOnInit() {
    this.service.getActivated().subscribe(res => {
      this.carousels = res;
    });
  }
}
