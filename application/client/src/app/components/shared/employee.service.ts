import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    LogInId: new FormControl('', Validators.required),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      LogInId: '',
      Password: '',
    });
  }
}
