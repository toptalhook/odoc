import * as React from 'react';
import {useEffect, useState} from 'react';
import {GridRenderCellParams} from '@mui/x-data-grid';
import {Button} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {handleRedux} from "../../redux/main";
import {
    Row,
    Share,
    SharePaymentOption,
    ShareRequest,
    SharesContract,
    StoredContract,
    User
} from "../../../declarations/user_canister/user_canister.did";
import PayButton from "./shares_contract/pay_button";
import {RenderReceiver} from "./payment_contract/renderers";
import BasicMenu from "../genral/drop_down";
import {randomString} from "../../data_processing/data_samples";
import {Principal} from "@dfinity/principal";
import useGetUser from "../../utils/get_user_by_principal";
import {actor} from "../../App";
import ShareConfirmButton from "./shares_contract/conforim_button";
import useSharesRequests from "./shares_contract/use_shares_requests";
import ApproveButton from "./shares_contract/approve_button";
import ApplyButton from "./shares_contract/apply_button";
import CustomDataGrid from "../datagrid";
import {logger} from "../../dev_utils/log_data";

// export type SharesContractViews = "Payments" | "Shares" | "SharesRequests" | "PaymentOptions";

export default function SharesContract(props: any) {
    let [view, setView] = useState("Shares");
    let {getUser, getUserByName} = useGetUser();
    const dispatch = useDispatch();

    const {
        files_content,
        current_file,
        all_friends,
        profile,
        contracts
    } = useSelector((state: any) => state.filesReducer);


    // ToDo  `props.data[0]` instead of `props.children[0].data[0]`
    let table_content = props.children[0]
    // let initial_rows = table_content.data[0].Table.rows

    let initial_columns = table_content.data[0].Table.columns;


    // ------------------------ Handle Columns and SetData ------------------------ \\
    let custom_columns = initial_columns.map((column: any) => {
        let new_column = {...column}
        switch (column.field.toLowerCase()) {
            case "receiver":
                new_column['renderEditCell'] = (props: any) => RenderReceiver({
                    ...props,
                    options: [...all_friends, profile]
                })
                return new_column

            case "confirmed":
                new_column['renderCell'] = (params: GridRenderCellParams<any, Date>) => {
                    let share_contract_id = params.row.contract[0]["SharesContract"];
                    let share: Share = contracts[table_content.id].shares.find((share) => share.share_contract_id === share_contract_id);
                    return <ShareConfirmButton
                        contract={contracts[table_content.id]}
                        share={share}
                    />
                }

                return new_column
            default:
                return new_column

        }
    })

    let [data, setData]: any = useState({
        rows: [],
        columns: custom_columns
    });

    /// ----------------------- Hande contracts in Share file ----------------------- \\\
    let current_page = window.location.pathname.split("/").pop();
    useEffect(() => {
        (async () => {
            if (current_page === "share") {

                let contract: undefined | { Ok: StoredContract } | { Err: string } = actor && current_file && await actor.get_contract(current_file.author, table_content.id);
                if (contract && "Ok" in contract) {

                    let fetched_contracts = {}
                    fetched_contracts[table_content.id] = contract.Ok["SharesContract"];
                    let normalized_rows = await normalize_share_rows(fetched_contracts);
                    setData((pre: any) => {
                        return {...pre, rows: normalized_rows}
                    })
                    dispatch(handleRedux("UPDATE_CONTRACT", {contract: contract.Ok["SharesContract"]}));

                    //TODO console.log("Why this runs 3 times?");

                }

            } else {
                let rows = await normalize_share_rows(contracts)
                setData((pre: any) => {
                    return {...pre, rows}
                })
            }
        })()
    }, [current_file])


    //  ---------- TODO Why this component renders 10 times -------- \\
    //// ----------------------- TODO ----------------------- \\\\
    //                            Hande add row correct for share
    //                            Sometimes it has two shares on contract, but one row on content,
    //                            which should not happen

    async function normalize_share_rows(CONTRACTS): Promise<Array<Row>> {
        const normalizedRows = await Promise.all(
            CONTRACTS[table_content.id].shares.map(async (share) => {
                let receiver = share && await getUser(share.receiver.toString());
                return {
                    "accumulation": share && share.accumulation,
                    "share%": share && share.share,
                    "receiver": receiver ? receiver.name : "",
                    "id": share.share_contract_id,
                    "contract": [{"SharesContract": share.share_contract_id}],
                    "cells": [],
                };
            })
        );

        return normalizedRows;
    }


    // const {dialog, handleClickOpen} = useFormulaDialog(handleColumnValidator);


    let {setRequest, currentRequest, addRequestRow, handleClickReq, UpdatedContractFromRow} = useSharesRequests({
        table_content,
        props,
        setView,
        data,
        setData
    });
    const updateRow = (new_rows: any, newRow: any) => {
        switch (view) {
            case "Shares":
                let updated_share_id = newRow.contract && newRow.contract[0] && newRow.contract[0]["SharesContract"];
                let receiver_name: string = newRow["receiver"];
                let receiver: User | null = getUserByName(receiver_name);

                let updated_contract: SharesContract = {
                    ...contracts[table_content.id],
                    shares: contracts[table_content.id].shares.map((item: Share) => {
                        if (item.share_contract_id === updated_share_id) {
                            return {
                                ...item,
                                "accumulation": BigInt(item.accumulation || 0),
                                "confirmed": Boolean(item.confirmed),
                                "share_contract_id": updated_share_id,
                                "share": newRow["share%"],
                                "receiver": Principal.fromText(receiver ? receiver.id.toString() : "2vxsx-fae"),
                            };
                        }
                        return item;
                    }),
                };
                dispatch(handleRedux("UPDATE_CONTRACT", {contract: updated_contract}));
                dispatch(handleRedux("CONTRACT_CHANGES", {changes: updated_contract}));

                break
            case "Payment options":
                let payment_options: Array<SharePaymentOption> = contracts[table_content.id].payment_options;
                if (Object.keys(newRow).toString() === ["id", "title", "amount", "description"].toString()) {
                    payment_options = payment_options.map((item: SharePaymentOption) => {
                        if (item.id === newRow.id) {
                            let new_item: SharePaymentOption = {
                                'id': newRow.id,
                                'title': newRow.title,
                                'date': "", // TODO handle and string data if needed later.
                                'description': newRow.description,
                                'amount': BigInt(newRow.amount),
                            };
                            return new_item;
                        }
                        return item
                    })
                }
                let options_updated_contract: SharesContract = {
                    ...contracts[table_content.id],
                    payment_options
                }
                dispatch(handleRedux("UPDATE_CONTRACT", {contract: options_updated_contract}));
                dispatch(handleRedux("CONTRACT_CHANGES", {changes: options_updated_contract}));

                break
            default:
                // request

                let shares_requests: Array<[string, ShareRequest]> = contracts[table_content.id].shares_requests;
                // let shares_requests_keys = ['id', 'receiver', 'share']

                // if (Object.keys(newRow).toString() === shares_requests_keys.toString()) {

                logger({new_rows})
                shares_requests = contracts[table_content.id].shares_requests.map((share_req: [string, ShareRequest]) => {
                    if (share_req[1].id == currentRequest.id) {
                        return [
                            share_req[0],
                            {
                                ...share_req[1],
                                shares: UpdatedContractFromRow(new_rows, share_req[1].shares)
                            }
                        ]
                    } else {
                        return share_req;
                    }

                });

                // }


                let req_updated_contract: SharesContract = {
                    ...contracts[table_content.id],
                    shares_requests
                }

                dispatch(handleRedux("UPDATE_CONTRACT", {contract: req_updated_contract}));
                dispatch(handleRedux("CONTRACT_CHANGES", {changes: req_updated_contract}));
        }
    }


    const deleteRow = (rows: any, rowId: number) => {
        let delete_updated_contract: SharesContract = {...contracts[table_content.id]}

        switch (view) {
            case "Payment options":
                let payment_options: Array<SharePaymentOption> = delete_updated_contract.payment_options.filter((item: SharePaymentOption) => item.id !== rowId);
                delete_updated_contract = {
                    ...delete_updated_contract,
                    payment_options,
                };
                break;
            case "Shares":

                delete_updated_contract = {
                    ...delete_updated_contract,
                    shares: UpdatedContractFromRow(rows, delete_updated_contract.shares),
                };
                break
            case "Shares requests":
                let shares_requests: Array<[string, ShareRequest]> = delete_updated_contract.shares_requests.map((item: [string, ShareRequest]) => {
                    if (item[1].id === currentRequest.id) {
                        item[1].shares = item[1].shares.filter((share: Share) => share.share_contract_id !== rowId)
                    }
                    return item
                });
                delete_updated_contract = {
                    ...delete_updated_contract,
                    shares_requests,
                };
                break;
            default:
                break;
        }

        dispatch(handleRedux("UPDATE_CONTRACT", {contract: delete_updated_contract}));
        dispatch(handleRedux("CONTRACT_CHANGES", {changes: delete_updated_contract}));

    };
    const addRow = (position) => {
        let new_id = randomString();
        switch (view) {
            case "Payment options":
                let new_payment_option: SharePaymentOption = {
                    id: new_id,
                    title: "",
                    amount: 0n,
                    description: "",
                    date: "",
                };
                let payment_options_updated_contract = {
                    ...contracts[table_content.id],
                }
                updated_contract.payment_options.splice(position, 0, new_payment_option);

                dispatch(handleRedux("CONTRACT_CHANGES", {changes: payment_options_updated_contract}));

                return new_payment_option;
            case "Shares":
                let new_shares_row = {
                    id: new_id,
                    contract: [{"SharesContract": new_id}],
                    cells: [],
                };
                let new_table_rows = [...data.rows]
                new_table_rows.splice(position, 0, new_shares_row);

                let shares_update_contract: SharesContract = {
                    ...contracts[table_content.id],
                    shares: UpdatedContractFromRow(new_table_rows, contracts[table_content.id].shares),
                };

                dispatch(handleRedux("CONTRACT_CHANGES", {changes: shares_update_contract}));
                dispatch(handleRedux("UPDATE_CONTRACT", {contract: shares_update_contract}));
                return new_shares_row;
            default:
                let new_share_request = {id: new_id, receiver: profile.name, share: 0n};
                let new_rows = [...data.rows];
                new_rows.splice(position, 0, new_share_request);

                let shares_requests: Array<[string, ShareRequest]> = contracts[table_content.id].shares_requests.map((share_request: [string, ShareRequest]) => {
                    if (share_request[0] === currentRequest.id) {
                        return [share_request[1].id, {
                            ...share_request[1],
                            shares: UpdatedContractFromRow(new_rows, share_request[1].shares)
                        }]
                    }
                    return share_request;
                });

                let req_updated_contract = {
                    ...contracts[table_content.id],
                    shares_requests,
                };
                dispatch(handleRedux("CONTRACT_CHANGES", {changes: req_updated_contract}));
                return new_share_request
            // default:
            //     return {};
        }


    }

    let Click = async (e: string) => {
        switch (e) {
            case 'Shares':
                setData({
                    rows: await normalize_share_rows(contracts),
                    columns: custom_columns
                });
                setView(e);
                setRequest(null);
                break;
            case "Payments":
                let rows = [];
                for (const payment of contracts[table_content.id].payments) {
                    let sender: any = await getUser(payment.sender.toString());
                    sender = sender ? sender.name : ""
                    let row = {
                        id: randomString(),
                        sender,
                        amountUSDC: payment.amount,
                    }
                    rows.push(row);
                }
                setData({
                    rows,
                    columns: [
                        {field: 'sender', headerName: 'sender', width: 150},
                        {field: 'amountUSDC', headerName: 'amountUSDC', width: 150},
                        {field: 'date', headerName: 'date', width: 150},
                    ],
                });

                setView(e);
                setRequest(null);
                break;

            case '+Request':
                let new_share: Share = {
                    'share_contract_id': randomString(),
                    'accumulation': 0n,
                    'share': 100n,
                    'confirmed': true,
                    'receiver': Principal.fromText(profile.id),
                };
                let new_request: ShareRequest = {
                    id: randomString(),
                    name: "name",
                    requester: Principal.fromText(profile.id),
                    shares: [new_share],
                    approvals: [],
                    is_applied: false,
                };

                let shares_requests: Array<[string, ShareRequest]> = contracts[table_content.id].shares_requests;
                shares_requests.push([new_request.id, new_request]);

                let updated_contract: SharesContract = {
                    ...contracts[table_content.id],
                    shares_requests,
                };

                dispatch(handleRedux("UPDATE_CONTRACT", {contract: updated_contract}));
                dispatch(handleRedux("CONTRACT_CHANGES", {changes: updated_contract}));
                await handleClickReq(new_request);
                // setView(new_request.id);
                break;

            case 'Payment options':
                let payment_options_rows = contracts[table_content.id].payment_options.map((payment_option: SharePaymentOption) => {
                    let payment_option_row = {
                        id: payment_option.id,
                        title: payment_option.title,
                        amount: payment_option.amount,
                        // date: payment_option.date,
                        description: payment_option.description,
                    };
                    return payment_option_row
                })
                setData({
                    rows: payment_options_rows,
                    columns: [

                        {field: 'title', headerName: 'title', width: 150, editable: true},
                        {field: 'amount', headerName: 'amount', width: 150, editable: true},
                        {field: 'description', headerName: 'description', width: 150, editable: true},
                    ]
                });
                setView(e);
                setRequest(null);
                break;
            default:
                setView(e);
                break;
        }

    }

    let render_shares_requests = contracts && contracts[table_content.id] && contracts[table_content.id].shares_requests && contracts[table_content.id].shares_requests.map((req: [string, ShareRequest]) => {
        return {content: req[1] && req[1].id, Click: async () => handleClickReq(req[1])}
    }) || [];

    if (!data.columns) {
        console.error("// ------------ data is empty ------------\\")
        return <div>Error</div>
    }

    return (
        <div contentEditable={false}
             style={{
                 // maxHeight: "25%",
                 maxWidth: '90%'
             }}
        >
            {/*{dialog}*/}
            <CustomDataGrid
                data={data}
                addRow={addRow}
                deleteRow={deleteRow}
                // addColumn={addColumn}
                updateRow={updateRow}
                tools={<>
                    <BasicMenu
                        options={[
                            {content: "Shares", Click},
                            {content: "Payment options", Click},
                            {content: "Payments", Click},
                            ...render_shares_requests,
                            {content: "+Request", Click}
                        ]}>{view}</BasicMenu>
                    <Button>Filter</Button>
                    {currentRequest && <ApproveButton
                        req={currentRequest}
                        contract={contracts[table_content.id]}/>}

                    {currentRequest && current_page != 'share' && < ApplyButton
                        setData={setData}
                        props={props}
                        req={currentRequest}
                        id={currentRequest && currentRequest.id}
                        contract={contracts[table_content.id]}/>}

                    {currentRequest && current_page == 'share' && <Button>Upload share request</Button>}
                    <PayButton contract={contracts[table_content.id]}/>
                </>}
            />

        </div>
    );
}
