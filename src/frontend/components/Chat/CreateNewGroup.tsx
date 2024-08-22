import React, {useRef, useState} from "react";
import {handleRedux} from "../../redux/store/handleRedux";
import {useDispatch, useSelector} from "react-redux";
import {Button, MenuItem, Tooltip, Select, TextField} from "@mui/material";
import MultiAutoComplete from "../MuiComponents/MultiAutocompelte";
import {Chat, Message, WorkSpace} from "../../../declarations/backend/backend.did";
import {Principal} from "@dfinity/principal";
import {useSnackbar} from "notistack";
import {randomString} from "../../DataProcessing/dataSamples";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Input from '@mui/material/Input';
import {useBackendContext} from "../../contexts/BackendContext";

interface SelectMembersProps {
    onChange: (friends: any) => void;
}

function SelectMembers(props: SelectMembersProps) {
    const {
        all_friends,
    } = useSelector((state: any) => state.filesState)
    const [selectedFriends, setSelectedFriends] = useState([]);
    return (<MultiAutoComplete
            onChange={(event, friends) => {
                console.log(friends);
                props.onChange(friends);
                setSelectedFriends(friends);
            }}
            value={selectedFriends}
            options={all_friends.map(friend => ({title: friend.name, id: friend.id}))}
            multiple={true}
        />
    )
}

function useCreateChatGroup() {
    const {enqueueSnackbar} = useSnackbar();
    const {all_friends, profile, workspaces} = useSelector((state: any) => state.filesState);

    const options = all_friends ? all_friends.map((f) => {
        return {title: f.name, id: Principal.fromText(f.id)}
      }) : [];

    const dispatch = useDispatch();

    // Initialize refs for TextField values
    const nameRef = useRef('');

    const handleChange = (ref) => (event) => {
        ref.current = event.target.value;
    };

    const work_spaces = workspaces ? workspaces.map((w: WorkSpace) => w.name) : [];

    let current_user = {title: profile ? profile.name : '', id: profile ? Principal.fromText(profile.id) : ''};
    const [admins, setAdmins] = useState([current_user]);
    const [members, setMember] = useState();
    const {backendActor} = useBackendContext();


    const top_dialog = {
            open: true,
            handleSave: async () => {
                if (nameRef.current.length === 0) {
                    enqueueSnackbar("Name is required", {variant: "error"});
                    return false;
                }
                ;
                let chat_id = randomString();
                let message: Message = {
                    'id': randomString(),
                    'date': BigInt(Date.now()),
                    'sender': Principal.fromText(profile.id),
                    'seen_by': [Principal.fromText(profile.id)],
                    'message': profile.name + " Just create a new Chat group named " + nameRef.current,
                    'chat_id': chat_id,
                }
                let chat: Chat = {
                    'id': chat_id,
                    'creator': Principal.fromText(profile.id),
                    'members': members ? members.map(m => m.id) : [],
                    'messages': [message],
                    'name': nameRef.current,
                    'admins': admins.map(a => a.id),
                    'workspace': "",
                };

                let res = await backendActor.make_new_chat_room(chat)

                if ("Ok" in res) {
                    enqueueSnackbar("Chat group created successfully", {variant: "success"});
                } else {
                    enqueueSnackbar("Error: " + res.Err, {variant: "error"});
                }
                return true;
            },
            content: <>
                <TextField name="name" label="Name" onChange={handleChange(nameRef)}/>
                <MultiAutoComplete
                    label="admins"
                    onChange={(event: any, values: any) => {
                        // TODO check profile.id in v.id.toText() of values
                        if (false) {
                            setAdmins([...values, current_user])
                        } else {
                            setAdmins(values)
                        }
                        ;

                    }}
                    value={admins}
                    options={options}
                    multiple={true}/>

                <MultiAutoComplete
                    label="members"
                    onChange={(event: any, value: any) => {
                        setMember(value)
                    }}
                    value={members}
                    options={options}
                    multiple={true}/>


                <p/>
                <Select onChange={(e) => {
                    console.log(e.target.value)
                }}>
                    {work_spaces.map((w, i) => <MenuItem key={i} value={w}>{w}</MenuItem>)}
                </Select>

            </>,
        }
    ;
    const createNewGroup = async () => {
        dispatch(handleRedux("TOP_DIALOG", top_dialog))

    }
    const [searchValue, setSearchValue] = useState("");
    const GroupOptions = () => {
        return <div>
            <Tooltip arrow title={"Create new group"}>
                <Button onClick={createNewGroup}><GroupAddIcon/></Button>
            </Tooltip>
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ml: 1, flex: 1}}
                placeholder="Search username, content, group name"
                inputProps={{'aria-label': 'search google maps'}}
            />
        </div>
    }
    return {
        chatGroup: {
            pure: true,
            content: <GroupOptions/>

        },
        searchValue
    };
}

export default useCreateChatGroup;
