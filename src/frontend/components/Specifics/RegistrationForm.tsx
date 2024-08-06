import React, { useState } from "react";
import { 
    TextField,
    Box, 
    CircularProgress, 
    Avatar, 
    IconButton, 
    Typography 
} from "@mui/material";

import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { convertToBytes } from "../../data_processing/image_to_vec";
import { useBackendContext } from "../../contexts/BackendContext";
import { RegisterUser, User } from "../../../declarations/backend/backend.did";
import { handleRedux } from "../../redux/store/handleRedux";
import RegistrationFormDialog from "../General/RegistrationFormDialog";

interface FormValues {
    username: string;
    bio: string;
    first_name?: string;
    last_name?: string;
    email?: string;
}

interface State {
    filesReducer: {
        Anonymous: boolean;
    };
}

const RegistrationForm: React.FC = () => {
    const dispatch = useDispatch();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { backendActor } = useBackendContext();

    const { Anonymous } = useSelector((state: State) => state.filesState);
    
    const [formValues, setFormValues] = useState<FormValues>({
        username: "",
        bio: "",
        first_name: "",
        last_name: "",
        email: ""
    });
    const [open, setOpen] = useState(Anonymous);
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoByte, setPhotoByte] = useState<Uint8Array | number[] | undefined>();
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormValues(prevValues => ({ ...prevValues, [id]: value }));
    };

    const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (image) {
            try {
                setLoading(true);
                const imageByteData = await convertToBytes(image);
                setPhoto(image);
                setPhotoByte(imageByteData);
            } catch (error) {
                enqueueSnackbar(error.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRegister = async () => {
        if (!formValues.username || !formValues.bio) {
                enqueueSnackbar("Please fill all required fields", { variant: "error" });
            return;
        }

        setOpen(false);
        const loaderMessage = (
            <span>
                Creating agreement... <CircularProgress size={20} style={{ marginLeft: 10 }} />
            </span>
        );
        const loadingSnackbar = enqueueSnackbar(loaderMessage, { variant: "info" });

        const input: RegisterUser = {
            name: [formValues.username],
            description: [formValues.bio],
            photo: photoByte ? [photoByte] : [],
        };

        try {
            let register: { Ok: User } | { Err: string } | undefined;
            if(backendActor) {
                register = await backendActor.register(input);
                closeSnackbar(loadingSnackbar);
            }  
            if (register?.Ok) {
                dispatch(handleRedux("UPDATE_PROFILE", { profile: register.Ok }));
                enqueueSnackbar(`Welcome ${register.Ok.name}, to Odoc`, { variant: "success" });
            } else if (register?.Err) {
                enqueueSnackbar(register.Err, { variant: "error" });
                setOpen(true);
            }
        } catch (error) {
            console.error("There was an issue with registration: ", error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    return (
        <RegistrationFormDialog
            title="Register yourself here."
            description=""
            inputFields={
                <>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 2 }}>
                        <input
                            accept="image/*"
                            id="photo"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleUploadPhoto}
                        />
                        <label htmlFor="photo">
                            <IconButton component="span">
                                <Avatar
                                    src={photo ? URL.createObjectURL(photo) : undefined}
                                    alt="Profile Photo"
                                    sx={{ width: 100, height: 100 }}
                                >
                                    <Add />
                                </Avatar>
                            </IconButton>
                        </label>
                        <Typography variant="subtitle1">Upload Photo</Typography>
                        {loading && <CircularProgress size={20} style={{ marginTop: 10 }} />}
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            required
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <TextField
                            id="first_name"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formValues.first_name || ""}
                            onChange={handleChange}
                            sx={{ marginRight: 1 }}
                        />
                        <TextField
                            id="last_name"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formValues.last_name || ""}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={formValues.email || ""}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            required
                            multiline
                            id="bio"
                            label="Bio"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formValues.bio}
                            onChange={handleChange}
                        />
                    </Box>
                </>
            }
            buttons={[
                { name: "Cancel", onClick: () => setOpen(false) },
                { name: "Submit", onClick: handleRegister },
            ]}
            open={open}
            maxWidth="md"
        />
    );
};

export default RegistrationForm;
