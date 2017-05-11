/**
 * Created by zezhang on 2017/5/8.
 */


import {Component, OnInit} from "@angular/core";
import {Article} from "../shared/models/article.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ArticlesService} from "../shared/services/articles.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit{
  article: Article = new Article();
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting: boolean = false;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });


  }

  ngOnInit()  {
    this.route.data.subscribe(
      (data: {article: Article}) => {
        if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
    }
      }
    );
  }

  addTag(){
    let tag = this.tagField.value;
    if (this.article.tagList.indexOf(tag) < 0)  {
      this.article.tagList.push(tag);
    }
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter((tag) => tag != tagName);

  }

  updateArticle(values: Object){
    (<any>Object).assign(this.article, values);

  }

  submitForm() {
     this.isSubmitting = true;
     this.updateArticle(this.articleForm.value);

     this.articlesService.save(this.article)
       .subscribe(
         article => this.router.navigateByUrl('/article/' + article.slug),
         err => {
           this.errors = err;
           this.isSubmitting = false;
         }
       );
  }
}
