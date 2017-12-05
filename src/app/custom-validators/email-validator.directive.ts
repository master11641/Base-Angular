import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector:
    "[appEmailValidator][formControlName],[appEmailValidator][formControl],[appEmailValidator][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator {
  validate(element: AbstractControl): { [key: string]: any } {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const valid = emailRegex.test(element.value);
    return valid ? null : { appEmailValidator: true };
  }
}
