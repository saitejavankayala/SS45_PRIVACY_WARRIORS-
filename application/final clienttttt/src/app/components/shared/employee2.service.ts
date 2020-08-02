
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class Employee2Service {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Hospitalname: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    pincode: new FormControl('', [Validators.required,Validators.minLength(6)]),
    city: new FormControl(''),
    Contactnumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    License: new FormControl(''),
    Address: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      Hospitalname: '',
      state: '',
      district: '',
      pincode: '',
      city: '',
      Contactnumber: '',
      Address: '',
      License: '',
    });
  }
}

 