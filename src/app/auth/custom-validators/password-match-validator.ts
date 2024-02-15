import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordRepeat = control.get('passwordRepeat');

  return password && passwordRepeat && password.value === passwordRepeat.value
    ? null
    : { passwordMismatch: true };
};

export { passwordMatchValidator };
