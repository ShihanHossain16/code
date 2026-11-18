import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MasterViewComponent } from './components/master-view/master-view.component';
import { MasterCreateComponent } from './components/master-create/master-create.component';
import { MasterEditComponent } from './components/master-edit/master-edit.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"masterView",component:MasterViewComponent},
  {path:"masterCreate",component:MasterCreateComponent},
  {path:"masterDetails/Edit/:id",component:MasterEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

