import { FinanceEditComponent } from './finance-edit/finance-edit.component';
import { FinanceComponent } from './finance/finance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';


const routes: Routes = [
  {
    path: '',
    component: IntroductionComponent,
  },
  {
    path: 'finance',
    component: FinanceComponent,
  },
    {
      path: 'edit/:id',
      component: FinanceEditComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
