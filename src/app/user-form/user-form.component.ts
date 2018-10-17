import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from './username.validator';
import { PasswordValidation } from './password.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userDetailsForm: FormGroup;
  genders = ['male', 'female'];
  constructor() { }

  ngOnInit() {
    this.userDetailsForm = new FormGroup({
      fullname: new FormControl(null, Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
     ])),
     confirm_password: new FormControl('', Validators.required)
   }, (formGroup: FormGroup) => {
     return PasswordValidation.MatchPassword(formGroup);
   });
  }

  onSubmitUserDetails() {
    console.log(this.userDetailsForm);
  }

}
