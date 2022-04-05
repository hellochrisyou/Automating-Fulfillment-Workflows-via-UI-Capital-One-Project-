import { EXISTING_FINANCE_LIST } from '../data/data';
import { Injectable } from '@angular/core';
import { FinanceList } from '../model/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor() {
    this.fetchAll();
  }

  private _financeList = new BehaviorSubject<FinanceList[]>([]);

  readonly financeList$ = this._financeList.asObservable();

  // the getter will return the last value emitted in _todos subject
  get financeList(): FinanceList[] {
    return this._financeList.getValue();
  }

  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
  set financeList(val: FinanceList[]) {
    this._financeList.next(val);
  }

  public checkIfNameExists(name: string): boolean {
    if (this.financeList.find(element => element.name === name) !== undefined) {
      return true;
    }
    return false;
  }

  async addFinanceList(financeList: FinanceList) {
    if (this.financeList.find(element => element.id === financeList.id) !== undefined) {
    this.financeList.forEach( (value, index) => {
       if (value.id === financeList.id) {
         this.financeList[index] = financeList;
         console.log("FinanceService -> addFinanceList -> this.financeList", this.financeList)
       }
      });
      }  else {
        financeList.id = (this.financeList.length + 1).toString();
      this.financeList = [
        ...this.financeList,
        financeList
      ];
    }
  }

  async removeFinanceList(name: string) {
    // optimistic update
    this.financeList = this.financeList.filter(list => list.name !== name);
  }

  async fetchAll() {
    this.financeList = EXISTING_FINANCE_LIST;
  };

}
