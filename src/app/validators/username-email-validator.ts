import { UsersService } from './../user-operations/users.service';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable()
export class UsernameValidator {

  constructor(private uerService: UsersService) { }
  matchOther1Validator(otherControlName: string) {
    let thisControl: FormControl;
    const _UserService: UsersService = this.uerService;
    return function matchOther1Validate(control: FormControl) {

      if (!control.parent) {
        return null;
      }
      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        this.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      _UserService.checkExistUserName(thisControl.value).subscribe(res => {
        if (<boolean>res === true) {
          alert('این نام قبلا اخذ شده است');
          return {
            matchOther1: false
          };
        }
      });

    };

  }
}
