import { ActionsListService } from './../service/actions-list.service';
import { FinanceService } from './../service/finance.service';
import { EXISTING_FINANCE_LIST } from './../data/data';
import { FinanceList, FinanceAction, ActionList } from './../model/model';
import { Component, OnInit, Inject } from '@angular/core';
import { ACTIONONFAILURE, BaseAction } from '../model/model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ACTION_LIST } from '../data/data';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-finance-edit',
  templateUrl: './finance-edit.component.html',
  styleUrls: ['./finance-edit.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class FinanceEditComponent implements OnInit {
  id = '0';
  name: string;
  actionOnFailure = ACTIONONFAILURE;
  durationInSeconds = 5;

  actionsInfo: BaseAction[] = [];
  thisFinanceWorkflow: BaseAction[] = [];
  financeWorkflows: FinanceList[] = [];
  submitFinanceWorkflow: FinanceList = {};
  tmpAction: FinanceAction = {};

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  secondCtrl = new FormControl('', [Validators.required]);

  constructor(
    private _formBuilder: FormBuilder,
    private financeService: FinanceService,
    private actionsListService: ActionsListService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.pattern('^[A-Z0-9]+(_[A-Z0-9]+)*$')]
    });
    if (this.id !== 'create') {
      this.getfinanceWorkflows();
    } else {
      this.getactionsInfo();
    }
  }

  public getErrorMessage(): string {
    if (this.secondCtrl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.secondCtrl.hasError('pattern') ? 'Not a valid  CASE FORM' : '';
  }
  public getfinanceWorkflows(): void {
      this.financeWorkflows = this.financeService.financeList;
      this.thisFinanceWorkflow = this.financeWorkflows[+this.id].actions;
      this.name = this.financeWorkflows[+this.id].name;
      this.reorderFulFillmentWorkflow();
      this.getactionsInfo();
  }

  public getactionsInfo(): void {
    
    this.actionsInfo = this.actionsListService.actionsList;

      // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.thisFinanceWorkflow.length; i++) {
        for (let j = 0; j < this.actionsInfo.length; j++) {

          this.actionsInfo[j].required = false;
          this.actionsInfo[j].actionOnFailure = 'CONTINUE';
          if (this.thisFinanceWorkflow[i].name === this.actionsInfo[j].name) {
            this.thisFinanceWorkflow[i].description = this.actionsInfo[j].description;
            this.actionsInfo.splice(j, 1);
            break;
          }
        }
      }
  }

  public submit(): void {
    if (this.id === 'create' || this.financeWorkflows[+this.id].name !== this.secondFormGroup.get('secondCtrl').value) {
      if (this.financeService.checkIfNameExists(this.secondFormGroup.get('secondCtrl').value)) {
        this.openSnackBar('Name already exists');
        return;
      }
    }
    this.upload();
  }

  public upload(): void {
    this.submitFinanceWorkflow.name = this.secondFormGroup.get('secondCtrl').value;
    this.submitFinanceWorkflow.actions = [];
    this.submitFinanceWorkflow.actions = this.thisFinanceWorkflow;
    if (this.financeWorkflows[+this.id]) {
      this.submitFinanceWorkflow.id = this.financeWorkflows[+this.id].id;
    }
    this.financeService.addFinanceList(this.submitFinanceWorkflow);
    this.openSnackBar('Operation Complete');
    this.actionsListService.fetchAll();
    this.router.navigateByUrl('/');
  }

  public openSnackBar(message: string): void {
    this._snackBar.openFromComponent(ConfirmSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }

  public onChange(value: any, index): void {
    this.thisFinanceWorkflow[index].actionOnFailure = value;
  }

  public drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.reorderFulFillmentWorkflow();
  }

  public reorderFulFillmentWorkflow(): void {
    let count = 1;
    this.thisFinanceWorkflow.forEach(item => {
      if (!item.actionOnFailure) {
        item.actionOnFailure = 'CONTINUE';
      }
      if (!item.required) {
        item.required = false;
        item.order = count;
        count++;
      } else {
        item.order = -1;
      }
    });
  }

  public onBatchChange(index: number): void {
    this.thisFinanceWorkflow[index].required = !this.thisFinanceWorkflow[index].required;
    this.reorderFulFillmentWorkflow();
  }
  public removeItem(index: number): void {
    this.actionsInfo.push(this.thisFinanceWorkflow[index]);
    this.thisFinanceWorkflow.splice(index, 1);
    this.reorderFulFillmentWorkflow();
  }

  public navigateHome(): void {
    this.actionsListService.fetchAll();
    this.router.navigateByUrl('/');
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'confirm-snackbar',
  templateUrl: 'confirm-snackbar.html',
  styles: [`
    .confirm-snackbar {
      color: white;
      margin-left: 35%;
    }
  `],
})
export class ConfirmSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}
