import { Component, OnInit, Input } from '@angular/core';
import { DISPLAYED_ACTION_COLUMNS } from '../../../data/data'
import { MatTableDataSource } from '@angular/material/table';
import { ActionList } from '../../../model/model'

@Component({
  selector: 'actions-table',
  templateUrl: './actions-table.component.html',
  styleUrls: ['./actions-table.component.scss']
})
export class ActionsTableComponent implements OnInit {
  
  actionsColumns = DISPLAYED_ACTION_COLUMNS;

  constructor(
  ) { }

  dataSource: MatTableDataSource<any>;

  public _dataArray: any[];

  @Input()
  public get dataArray(): ActionList[] {
    return this._dataArray;
  }
  public set dataArray(value: ActionList[]) {
    this._dataArray = value;
    this.dataSource = new MatTableDataSource(this._dataArray);
  }

  ngOnInit(): void {
  }
}
