
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class Employee1Service {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Patientname: new FormControl('', Validators.required),
    Aadharnumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
    Age: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),
    Gender: new FormControl('1'),
    Contactnumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    Address: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      Patientname: '',
      Aadharnumber: '',
      Age: '',
      Date: '',
      Gender: '1',
      Contactnumber: '',
      Address: '',
    });
  }
}

 