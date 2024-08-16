import React, {useState} from 'react';
import {Box, Button, Paper, TextField} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {Message} from "../../../declarations/backend/backend.did";
import {Principal} from "@dfinity/principal";
import {useSnackbar} from "notistack";
import {handleRedux} from '../../redux/store/handleRedux';
import {styled} from '@mui/material/styles';
import {randomString} from "../../DataProcessing/dataSamples";

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  }));

export default function SendMessageBox() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const {current_chat_id, current_user} = useSelector((state: any) => state.chatsState);
    const {profile} = useSelector((state: any) => state.chatsState);

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();


    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendClick = async () => {
        let new_chat_id = randomString();
        // Handle sending the message (you can add your logic here)
        let new_message: Message = {
            'id': randomString(),
            'date': BigInt(Date.now() * 1e6),
            'sender': Principal.fromText(profile.id),
            'seen_by': [Principal.fromText(profile.id)],
            'message': message,
            'chat_id': current_chat_id == 'chat_id' ? new_chat_id : current_chat_id,
        }

        dispatch(handleRedux("SEND_MESSAGE", {message: {...new_message, is_saving: true}}));
        setMessage('');

        // let notification: Notification = {
        //     'id': "string",
        //     'is_seen': false,
        //     'content': {'NewMessage': "from query is it faster?"},
        //     'sender': Principal.fromText(profile.id),
        //     'receiver': current_user,
        // }
        // TODO
        //    let socket_res: undefined | { Ok: null } | { Err: null } = actor && await actor.send_socket_message(notification)
        //    an update it takes a bit of time to send the message so I want to use it just for saving the message
        //    ws.send()
        if (new_message.chat_id == "chat_id") {
            console.error("chat_id is not set")
        }
        let res: undefined | { Ok: string } | { Err: string } = actor && await actor.send_message([current_user], new_message);
        // TODO use ws.send_message in addition to actor.send_message because that would be faster.
        if ("Err" in res) {
            enqueueSnackbar("Error sending message: " + res.Err, {variant: "error"});
        } else {
            dispatch(handleRedux("UPDATE_MESSAGE", {message: new_message}))
        }
    };
    return (
        <Paper elevation={3}>
            <StyledBox>
                <TextField
                    label="Type your message here..."
                    multiline
                    rows={4}
                    variant="outlined"
                    value={message}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleSendClick}>
                    Send
                </Button>
            </StyledBox>
        </Paper>
    );
}
