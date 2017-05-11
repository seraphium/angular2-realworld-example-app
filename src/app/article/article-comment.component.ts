/**
 * Created by zezhang on 2017/5/9.
 */


import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Comment, User, UserService } from '../shared';
@Component({
  selector:'article-comment',
  templateUrl:'./article-comment.component.html'
})
export class ArticleCommentComponent implements OnInit{
  constructor(
    private userService: UserService
  ){}

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  ngOnInit(){
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username == this.comment.author.username);
      }
    )
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
