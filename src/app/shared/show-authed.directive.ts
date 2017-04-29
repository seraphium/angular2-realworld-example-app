/**
 * Created by jackiezhang on 2017/4/29.
 */
import {UserService} from './services/user.service'
import {Directive, OnInit, Input} from "@angular/core";
import {TemplateRef, ViewContainerRef} from '@angular/core';

@Directive ({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements  OnInit{
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

  ngOnInit(){
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
  }

  @Input() set showAuthed(condition: boolean) {
    this.condition = condition;
  }
}
