import { ActionList, FinanceList } from './../model/model';
export const ACTION_LIST: ActionList[] = [
    { name: 'Change Rewards',
      description: 'This action will change the rewards for the given account'
    },
    { name: 'Change Network Product',                
      description: 'This action will change the network for the given account by just using the destination Opset ID'
    },
    { name: 'Change Membership Fee Details',
      description: 'This action will change the fee for the given account'
    },
    { name: 'Send Letter',
      description: 'This action will send a reward letter to the given account holder'
    },
    { name: 'Change Credit Line',
      description: 'This action will perform a CLIP for the given account'
    },
    { name: 'Transfer Balance',
      description: 'This action will initiate a balance transfer'
    },
    { name: 'Change Product Terms',
      description: 'This action will change the product for the given account'
    },
    { name: 'Change Venture Membership Fee Details',
      description: 'This action will change the fee for the given account'  
    }
]


export const EXISTING_FINANCE_LIST: FinanceList[] = [
    {
        id: '1',
        name: 'PRODUCT_UPGRADES',
        actions: [
            {
                name: 'Change Network Upgrade',
                order: 1,
                required: false,
                actionOnFailure: 'CONTINUE'
            },
            {
                name: 'Change Membership Fee Details',
                order: 2,
                required: false,
                actionOnFailure: 'CONTINUE'
            },
            {
                name: 'Change Product Terms',
                order: 3,
                required: false,
                actionOnFailure: 'CONTINUE'
            },
            {
                name: 'Send Letter',
                order: 4,
                required: false,
                actionOnFailure: 'TERMINATED'
            },
            {
                name: 'Send Venture Opt Out Letter',
                order: 5,
                required: false,
                actionOnFailure: 'CONTINUE'
            },
            {
                name: 'Change Venture Membership Fee Details',
                order: -1,
                required: true,
                actionOnFailure: 'TERMINATE_ON_ANY'
            },
            {
                name: 'Change Rewards',
                order: -1,
                required: true,
                actionOnFailure: 'CONTINUE'
            },
        ]
    },
    {
        id: '2',
        name: 'BALANCE_TRANSFER_CLIP',
        actions: [
            {
                name: 'Change Credit Line',
                order: 1,
                required: false,
                actionOnFailure: 'CONTINUE'
            },
            {
                name: 'Transfer Balance',
                order: 2,
                required: false,
                actionOnFailure: 'CONTINUE'
            },
                    ]
    },
    {
        id: '3',
        name: 'BALANCE_TRANSFER',
        actions: [
            {
                name: 'Transfer Balance',
                order: 1,
                required: false,
                actionOnFailure: 'TERMINATE_ON_ANY'
            },
        ]
    }
]

export const DISPLAYED_FINNACE_COLUMNS: string[] = ['name', 'order', 'actionOnFailure', 'required'];
export const DISPLAYED_ACTION_COLUMNS: string[] = ['name', 'description'];
