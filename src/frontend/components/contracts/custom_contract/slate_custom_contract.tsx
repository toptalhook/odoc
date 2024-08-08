import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {CustomContract, StoredContract} from "../../../../declarations/backend/backend.did";
import {actor} from "../../../App";
import {handleRedux} from "../../../redux/main";
import {CustomContractComponent} from "./custom_contract";

export default function SlateCustomContract(props: any) {
    const {id} = props.element;
    const {contracts, profile, current_file} = useSelector((state: any) => state.filesReducer);
    const dispatch = useDispatch();
    const [contract, setContract] = useState<CustomContract>(contracts[id]);
    const [loading, setLoading] = useState(false);
    const is_share = window.location.href.includes("share");
    useEffect(() => {
        (async () => {
            if (!contract && is_share) {
                setLoading(true);
                let contract: undefined | { Ok: StoredContract } | { Err: string } = actor && current_file && await actor.get_contract(current_file.author, id);
                setLoading(false);
                if (contract && "Ok" in contract) {
                    setContract(contract.Ok.CustomContract);
                    dispatch(handleRedux("UPDATE_CONTRACT", {contract: contract.Ok}));
                }
            } else {
                setContract(contracts[props.id]);
            }
        })()
    }, [contracts])
    if (loading) {
        return <div>Loading...</div>
    }
    return <CustomContractComponent contract={contracts[id]}/>
}
