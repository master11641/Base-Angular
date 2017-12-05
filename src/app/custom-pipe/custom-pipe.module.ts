import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomPipeRoutingModule } from "./custom-pipe-routing.module";
import { MomentJalaaliTestComponent } from "./moment-jalaali-test/moment-jalaali-test.component";
import { MomentJalaaliPipe } from "./moment-jalaali.pipe";
import { JsonDatesService } from "./json-dates.service";
import { SafePipe } from "./safe.pipe";

@NgModule({
  imports: [CommonModule, CustomPipeRoutingModule],
  exports: [SafePipe,MomentJalaaliPipe],
  declarations: [MomentJalaaliTestComponent, MomentJalaaliPipe, SafePipe],
  providers: [JsonDatesService]
})
export class CustomPipeModule {}
