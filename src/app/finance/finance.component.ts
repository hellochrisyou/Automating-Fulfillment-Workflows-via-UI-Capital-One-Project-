import { ActionsListService } from './../service/actions-list.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ActionList } from '../model/model';
import { FinanceService } from '../service/finance.service';
import {
  ACTION_LIST,
  DISPLAYED_ACTION_COLUMNS,
  DISPLAYED_FINNACE_COLUMNS,
} from './../data/data';
import { FinanceList } from './../model/model';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {
  financeWorkflows: FinanceList[] = [];
  actionsInfo: ActionList[] = [];
  actionColumns = DISPLAYED_ACTION_COLUMNS;

  constructor(
    private _router: Router,
    private financeService: FinanceService,
    private actionsListService: ActionsListService
  ) {}

  ngOnInit(): void {
    this.getfinanceWorkflows();
    this.actionsInfo = this.actionsListService.actionsList;
    this.actionsListService.fetchAll();
  }

  public navigateToIntro(): void {
    this._router.navigate(['']);
  }

  public getfinanceWorkflows(): void {
    this.financeWorkflows = this.financeService.financeList;
    this.reorderFulFillmentWorkflow();
  }

  public reorderFulFillmentWorkflow() {
    this.financeWorkflows.forEach((workflow) => {
      let count = 1;
      workflow.actions.forEach((item) => {
        // tslint:disable-next-line: triple-equals
        if (item.required == false) {
          item.required = false;
          item.order = count;
          count++;
        } else {
          item.order = -1;
        }
      });
    });
  }
}
