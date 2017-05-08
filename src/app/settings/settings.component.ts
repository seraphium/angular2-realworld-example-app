/**
 * Created by zezhang on 2017/5/8.
 */



import {Component, OnInit} from "@angular/core";
import {User} from "../shared/models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit{
  user: User = new User();
  settingsForm:  FormGroup;
  errors: Object = {};
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder

  ){

    this.settingsForm = this.fb.group({
      image:'',
      username:'',
      bio:'',
      email:'',
      password:'',
    })
  }

  ngOnInit(){
    (<any>Object).assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout(){
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  updateUser(values: Object){
    (<any>Object).assign(this.user, values);
  }

  submitForm(){
    this.isSubmitting = true;
    this.updateUser(this.settingsForm.value);

    this.userService
      .update(this.user)
      .subscribe(
        updatedUser => this.router.navigateByUrl('/profile' + updatedUser.username),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

}
