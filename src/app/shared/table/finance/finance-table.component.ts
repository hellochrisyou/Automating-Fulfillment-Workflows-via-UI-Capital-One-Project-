import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input } from '@angular/core';
import { DISPLAYED_FINNACE_COLUMNS } from '../../../data/data';
import { FinanceAction } from '../../../model/model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'finance-table',
  templateUrl: './finance-table.component.html',
  styleUrls: ['./finance-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class FinanceTableComponent implements OnInit {

  financeColumns = DISPLAYED_FINNACE_COLUMNS;
  expandedElement: FinanceAction;

  constructor(
    private router: Router
  ) { }

  dataSource: MatTableDataSource<any>;

  public _dataArray: any[];

  @Input()
  public get dataArray(): FinanceAction[] {
    return this._dataArray;
  }
  public set dataArray(value: FinanceAction[]) {
    this._dataArray = value;
    console.log("FinanceTableComponent -> setdataArray -> _dataArray", this._dataArray)
    this.dataSource = new MatTableDataSource(this._dataArray);
  }

  ngOnInit(): void {
  }

}
