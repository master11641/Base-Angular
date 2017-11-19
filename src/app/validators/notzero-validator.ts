import { FormControl } from '@angular/forms';
export class CannotEqualZeroValidators {
  static cannotEqualZero(control: FormControl) {
    if (control.value === 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }
}
