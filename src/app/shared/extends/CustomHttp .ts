import { Http,ConnectionBackend ,RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { Injectable ,Injector} from '@angular/core';


@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
    private injector: Injector) {
    super(backend, defaultOptions);
  }

  public get router(): Router {
     return this.injector.get(Router);
  }}
