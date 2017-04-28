/**
 * Created by jackiezhang on 2017/4/27.
 */
import { Component, OnInit }from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Errors} from "../shared/models/errors.model";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: string = '';
  errors: Errors = new Errors();
  isSubmitting: boolean = false;
  authForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ){
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(){
      this.route.url.subscribe(data => {
        this.authType = data[data.length - 1].path;
        this.title = (this.authType === 'login')? 'Sign in' : 'Sign up';
        if (this.authType === 'register') {
          this.authForm.addControl('username', new FormControl('', Validators.required))
        }
      })
  }

  submitForm(){
    this.isSubmitting = true;
    this.errors = new Errors();
    let credential = this.authForm.value;
    this.userService.attemptAuth(this.authType,  credential)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      )

  }


}

