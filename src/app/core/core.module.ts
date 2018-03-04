import { ChatService } from "./services/chat.service";
import { AuthInterceptor } from "./services/auth.interceptor";
import { FileUploaderService } from "./file-uploader.service";
import {
  NgModule,
  SkipSelf,
  Optional,
  ErrorHandler,
  APP_INITIALIZER
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppErrorHandler } from "./../app.error-handler";
import { LoaderInterceptorService } from "./interceptors/loader-interceptor.service";
import { AppConfigService } from "./app-config.service";
import { BrowserStorageService } from "./browser-storage.service";
import { ModalService } from "./modal.service";
import { APP_CONFIG, AppConfig } from "./services/app.config";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "app/core/services/auth.guard";
import { WebsocketService } from "app/core/services/websocket.service";
// import RxJs needed operators only once

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    // components that are used in app.component.ts will be listed here.
  ],
  declarations: [
    // components that are used in app.component.ts will be listed here.
  ],
  providers: [
    // global singleton services of the whole app will be listed here.
    WebsocketService,
    ChatService,
    AuthGuard,
    FileUploaderService,
    ModalService,
    BrowserStorageService,
    AppConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfigService) => () => config.loadClientConfig(),
      deps: [AppConfigService],
      multi: true
    },
    AuthService,
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    core: CoreModule
  ) {
    if (core) {
      throw new Error("CoreModule should be imported ONLY in AppModule.");
    }
  }
}
