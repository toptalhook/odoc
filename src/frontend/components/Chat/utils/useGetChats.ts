import React from "react";
import { useBackendContext } from "../../../contexts/BackendContext";
import { handleRedux } from "../../../redux/store/handleRedux";
import {useDispatch, useSelector} from "react-redux";
import {Principal} from "@dfinity/principal";
import {Chat, FEChat} from "../../../../declarations/backend/backend.did";


function useGetChats() {
    const { backendActor } = useBackendContext();
    const profile = useSelector((state: any) => state.filesState.profile);
    const chats = useSelector((state: any) => state.chatsState.chats);

    const dispatch = useDispatch();


    function getPrivateChat(user: Principal): Chat | undefined {
        return (
            user &&
            chats &&
            chats.length > 0 &&
            chats.find((chat: Chat) => chat.admins[0].toString() === user.toString())
        );
    }

    const getChats = React.useCallback(async () => {
        if (!chats || chats.length === 0) {
            try {
                let res: undefined | Array<FEChat> = backendActor && await backendActor.get_my_chats();
                res && dispatch(handleRedux("SET_CHATS", {chats: res}));
                return res;
            } catch (error) {
                // Handle error
                console.error("Error fetching chats:", error);
                return undefined;
            }
        } else {
            return chats;
        }
    }, [chats, dispatch]);

    const getOther = (chat: FEChat) => {
        if (chat.creator.id.toString() === profile.id) {
            return chat.admins[0];
        } else {
            return chat.creator;
        }
    };

    return {getChats, getPrivateChat, getOther};
}

export default useGetChats;
