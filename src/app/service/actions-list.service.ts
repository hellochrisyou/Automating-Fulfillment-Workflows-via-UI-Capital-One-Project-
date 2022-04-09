import { BehaviorSubject } from 'rxjs';
import { FinanceList } from './../model/model';
import { Injectable } from '@angular/core';
import { ActionList } from '../model/model';
import { ACTION_LIST } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class ActionsListService {

  constructor() {
    this.fetchAll();
  }

  private _actionsList = new BehaviorSubject<ActionList[]>([]);

  readonly actionsList$ = this._actionsList.asObservable();

  // the getter will return the last value emitted in _todos subject
  get actionsList(): ActionList[] {
    return this._actionsList.getValue();
  }


  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
  set actionsList(val: ActionList[]) {
    this._actionsList.next(val);
  }

  async removeAction(financeList: FinanceList) {
    // optimistic update
    this.actionsList = this.actionsList.filter(list => list.name !== financeList.name);
  }

  async fetchAll() {
    this.actionsList = [
      {
        name: 'Change Rewards',
        description: 'This action will change the rewards for the given account'
      },
      {
        name: 'Change Network Product',
        description: 'This action will change the network for the given account by just using the destination Opset ID'
      },
      {
        name: 'Change Membership Fee Details',
        description: 'This action will change the fee for the given account'
      },
      {
        name: 'Send Letter',
        description: 'This action will send a reward letter to the given account holder'
      },
      {
        name: 'Change Credit Line',
        description: 'This action will perform a CLIP for the given account'
      },
      {
        name: 'Transfer Balance',
        description: 'This action will initiate a balance transfer'
      },
      {
        name: 'Change Product Terms',
        description: 'This action will change the product for the given account'
      },
      {
        name: 'Change Venture Membership Fee Details',
        description: 'This action will change the fee for the given account'
      }
    ]
  };

}
