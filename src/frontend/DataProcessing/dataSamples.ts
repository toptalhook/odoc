import {Principal} from "@dfinity/principal";
import {
    Column,
    CustomContract, Filter, Formula, PermissionType,
    Share,
    SharePaymentOption,
    SharesContract
} from "../../declarations/backend/backend.did";

let paymentContractId = randomString();
let sharesContractId = randomString();
let firstShareId = randomString();
export let note_page_content = [{"id": 4, "children": [{"id": 5, "text": "", "type": "h1"}]}]
export let file_data = {"id": "0000", "content": "0", "name": "NameTest", "children": {}, "parent": []}
let column: Column = {
    _type: "",
    field: "receiver",
    filters: [],
    permissions: [],
    dataValidator: [],
    editable: true,
    formula: [],
    id: randomString(),
}
export let dataGrid = {

    "id": randomString(),
    "children": [{
        "id": randomString(), "text": "", "data": [{
            "Table": {
                "rows": [
                    {
                        id: randomString(),
                        contract: [],
                        cells: [[["name", ""], ["last_name", "x"], ["full_name", "xxxa"]]],
                        requests: [],
                    }
                ],
                "columns": [
                    {...column, id: randomString(), field: "name"},
                    {
                        ...column,
                        id: randomString(),
                        field: "last_name",
                    },
                    {...column, id: randomString(), field: "full_name",}
                ]
            }
        }]
    }],
    "type": "data_grid"
}


export const sharesContract = {

    "id": randomString(),
    "children": [{
        "id": sharesContractId, "text": "", "data": [{
            "Table": {
                "rows": [
                    {
                        id: firstShareId,
                        contract: [{"SharesContract": firstShareId}],
                        cells: [],
                        requests: [],
                    }
                ],
                "columns": [
                    {...column, id: randomString(), field: "receiver"},
                    {...column, id: randomString(), field: "accumulation", editable: false},
                    {...column, id: randomString(), field: "share%",},
                    {...column, id: randomString(), field: "confirmed", editable: false,},
                ]
            }
        }]
    }],
    "type": "shares_contract"
}

export let customContract: CustomContract = {
    'id': randomString(),
    "name": "Custom contract",
    'creator': Principal.fromText("2vxsx-fae"),
    'date_created': Date.now() * 1e6,
    'payments': [],
    'promises': [],
    'contracts': [],
    'formulas': [],
    'date_updated': 0,
    'permissions': [],
}

export let slateCustomContract = {
    "id": customContract.id,
    "children": [{
        "id": randomString(),
        "text": "",
        "data": []
    }],
    "type": "custom_contract"
}

export let paymentContract = {
    "id": paymentContractId,
    "children": [{
        "id": randomString(), "text": "", "data": [{
            "Table": {
                "rows": [
                    {
                        id: paymentContractId,
                        contract: [{"PaymentContract": paymentContractId}],
                        cells: [],
                        requests: [],
                    }
                ],
                "columns": [
                    {...column},
                    {...column, id: randomString(), field: "amount"},
                    {
                        ...column,
                        id: randomString(),
                        field: "released",
                    },
                    // {...column, id: randomString(), field: "confirmed",}
                ]
            }
        }]
    }],
    "type": "payment_contract"
}

export let fileContentSample = [
    {type: "p", children: [{text: ""}]},
]
export let payment_contract_row = {"Contract": {"PaymentContract": "0"}}
export let payment_contract_row2 = {"Contract": {"PaymentContract": "1"}}

export let contracts_sample = {
    "4": {
        "contract_id": "4",
        "sender": {
            "id": "l5gd7-bl4bd-jodqy-yqblz-eawxr-w4fdt-eqxhj-luwyp-nav4q-fs66j-xae",
            "name": "d",
            "description": "d",
            "photo": {}
        },
        "released": false,
        "confirmed": false,
        "amount": "200",
        "receiver": {
            "id": "l5gd7-bl4bd-jodqy-yqblz-eawxr-w4fdt-eqxhj-luwyp-nav4q-fs66j-xae",
            "name": "d",
            "description": "d",
            "photo": {}
        }
    },
    "18": {
        "contract_id": "18",
        "sender": {
            "id": "l5gd7-bl4bd-jodqy-yqblz-eawxr-w4fdt-eqxhj-luwyp-nav4q-fs66j-xae",
            "name": "d",
            "description": "d",
            "photo": {}
        },
        "released": false,
        "confirmed": false,
        "amount": "150",
        "receiver": {
            "id": "l5gd7-bl4bd-jodqy-yqblz-eawxr-w4fdt-eqxhj-luwyp-nav4q-fs66j-xae",
            "name": "d",
            "description": "d",
            "photo": {}
        }
    }
}
export let paymentContractSample: PaymentContract = {
    "contract_id": paymentContractId,
    "sender": Principal.fromText("2vxsx-fae")!,
    "receiver": Principal.fromText("2vxsx-fae")!,
    "released": false,
    "confirmed": false,
    "canceled": false,
    "amount": BigInt(0),
    "objected": [], // or ["some string value"] if you want it to be non-empty
    "extra_cells": [],
}

let shareSample: Share = {
    'share_contract_id': firstShareId,
    'accumulation': BigInt(0),
    'confirmed': false,
    'share': BigInt(100),
    'receiver': Principal.fromText("2vxsx-fae"),
    extra_cells: []
}

let paymentOption: SharePaymentOption = {
    'id': "",
    'title': "",
    'date': "",
    'description': "",
    'amount': BigInt(0),
}
export let sharesContractSample: SharesContract = {
    'shares': [shareSample],
    'payments': [],
    'contract_id': sharesContractId,
    'shares_requests': [],
    "payment_options": [paymentOption],
    "author": "2vxsx-fae",
}

export let contractIdSample = {"Contract": {"PaymentContract": "18"}}


export function randomString() {
    return Math.random().toString(36).substring(2, 8);
}

