import { Observable } from 'rxjs/Observable';
import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppConfigService {
    constructor(private http: Http) {   }
  private config: Object = null;
    get apiRoot() {
      return this.getProperty('host'); // <--- THIS GETS CALLED FIRST
    }
    load(): Promise<any> {
      console.log('get user called');
      const promise = this.http.get('assets/config.json').map((res) => res.json()).toPromise();
      promise.then(config => {
        this.config = config;     // <--- THIS RESOLVES AFTER
        console.log(this.config);
      });
    return promise;
  }
    private getProperty(property: string): any {
      //noinspection TsLint
      if (!this.config) {
        throw new Error('Attempted to access configuration property before configuration data was loaded, please implemented.');
      }

      if (!this.config[property]) {
        throw new Error(`Required property ${property} was not defined within the configuration object. Please double check the
        assets/config.json file`);
      }

      return this.config[property];
    }

}

