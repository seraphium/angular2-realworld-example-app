import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EditorComponent} from "./editor.component";
import {AuthGuard} from "../shared/services/auth-guard.service";
import {EditableArticleResolver} from "./editable-article-resolver.service";
import {SharedModule} from "../shared/shared.module";
/**
 * Created by zezhang on 2017/5/8.
 */

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component:EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableArticleResolver
  ]
})
export class EditorModule{}

