import { FinanceTableComponent } from './shared/table/finance/finance-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinanceComponent } from './finance/finance.component';
import { FinanceEditComponent, ConfirmSnackbarComponent } from './finance-edit/finance-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { FulfillmentPipe, OrderPipe } from './pipes/pipe';
import { ActionsTableComponent } from './shared/table/actions/actions-table.component';
import { IntroductionComponent } from './introduction/introduction.component';

@NgModule({
  declarations: [
    AppComponent,
    FinanceComponent,
    FinanceEditComponent,
    FulfillmentPipe,
    FinanceTableComponent,
    OrderPipe,
    ActionsTableComponent,
    ConfirmSnackbarComponent,
    IntroductionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [ConfirmSnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
