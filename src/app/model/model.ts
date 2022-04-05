export interface FinanceList {
    id?: string;
    name?: string;
    actions?: FinanceAction[];
  }

export interface FinanceAction {
  name?: string;
  order?: number;
  actionOnFailure?: string;
  required?: boolean;
}


export interface ActionList {
  name: string;
  description: string;
}

export interface BaseAction {
  id?: string;
  name?: string;
  description?: string;
  order?: number;
  actionOnFailure?: string;
  required?: boolean;
}

export interface ActionSelect {
  value: string;
  viewValue: string;
}

export const ACTIONONFAILURE: ActionSelect[] = [
  {value: 'TERMINATED', viewValue: 'Terminated'},
  {value: 'CONTINUE', viewValue: 'Continue'},
  {value: 'TERMINATE_ON_ANY', viewValue: 'Terminate on any'}
];
