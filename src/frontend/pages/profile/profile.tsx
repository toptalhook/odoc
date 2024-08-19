import React, { useState } from 'react';
import {
    Avatar, Box, Button, Card, CardContent, CircularProgress, Container, Divider, Grid, IconButton, List, ListItem,
    Rating, TextField, Tooltip, Typography
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import Friends from './Friends';
import { capitalizeFirstLetter } from './utils';
import { convertToBlobLink, convertToBytes } from "../../DataProcessing/imageToVec";
import { handleRedux } from '../../redux/store/handleRedux';
import BasicTabs from "./History";
import TransactionHistory from "./TransactionHistory";
import { UserHistoryCom } from "../User";
import ProfilePhotoDialog from './actions/ProfilePhotoDialog';
import ProfilePhoto from './ProfilePhoto';
import ProfileRatings from './ProfileRating';
import WalletSection from './WalletSection';
import { useBackendContext } from '../../contexts/BackendContext';



export default function ProfileComponent() {
    const { backendActor } = useBackendContext();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { profile, friends, profile_history, wallet } = useSelector((state: any) => state.filesState);

    const [user_history, setUserHistory] = useState<UserHistoryCom | null>(null);
    const [profileData, setProfileData] = useState({
        id: profile?.id || '',
        name: profile?.name || '',
        description: profile?.description || '',
        photo: profile?.photo || '',
        changed: false,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleSaveChanges = async () => {
        setButtonLoading(true);
        if (profileData.changed) {
            try {
                const res = await backendActor?.update_user_profile({
                    name: [profileData.name],
                    description: [profileData.description],
                    photo: [profileData.photo],
                });
                setProfileData((prev) => ({ ...prev, changed: false }));
                enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
                return res;
            } catch (error) {
                console.error("Error saving profile:", error);
                enqueueSnackbar('Failed to update profile.', { variant: 'error' });
            } finally {
                setButtonLoading(false);
            }
        } else {
            enqueueSnackbar('No changes to save.', { variant: 'info' });
        }
    };

    const handlePhotoChange = async (e) => {
        const fileInput = e.target;
        const photo = await convertToBytes(fileInput.files[0]);
        setProfileData((prev) => ({ ...prev, photo, changed: true }));

        dispatch(handleRedux("UPDATE_PROFILE", { profile: { photo } }));

        fileInput.value = '';
    };

    const handleAvatarClick = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const ProfileDetailList = () => (
        <List>
            {Object.entries(profileData).map(([key, value]) => {
                if (['photo', 'changed'].includes(key)) return null;
                return (
                    <ListItem key={key}>
                        <TextField
                            disabled={key === 'id'}
                            label={capitalizeFirstLetter(key)}
                            value={value}
                            onChange={(e) =>
                                setProfileData((prev) => ({
                                    ...prev,
                                    [key]: e.target.value,
                                    changed: true,
                                }))
                            }
                            fullWidth
                            multiline={key === 'description'}
                            rows={key === 'description' ? 4 : 1}
                            variant="outlined"
                            InputLabelProps={{ style: { fontWeight: 'bold' } }}
                            InputProps={{ style: { borderRadius: 8 } }}
                        />
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
                        <CardContent>
                            <Typography variant="h4" align="center" gutterBottom>
                                Profile
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ProfilePhoto
                                        photo={convertToBlobLink(profileData.photo)}
                                        onAvatarClick={handleAvatarClick}
                                        onPhotoChange={handlePhotoChange}
                                    />
                                    <ProfileRatings profile_history={profile_history} profileData={profileData} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ProfileDetailList />
                                    {profileData.changed && (
                                        <Box sx={{ width: '100%', mt: 2 }}>
                                            <Button
                                                color="primary"
                                                onClick={handleSaveChanges}
                                                variant="contained"
                                                sx={{ width: '100% !important' }}
                                            >
                                                {buttonLoading ? <CircularProgress size={20} /> : 'Save changes'}
                                            </Button>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <WalletSection wallet={wallet} />
                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <BasicTabs
                            items={{
                                Friends: <Friends friends={friends} />,
                                Reputation: user_history && <UserHistoryCom {...user_history} />,
                                ...(wallet && { Transactions: <TransactionHistory items={wallet.exchanges} /> }),
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <ProfilePhotoDialog
                open={openDialog}
                onClose={handleDialogClose}
                imageSrc={convertToBlobLink(profileData.photo)}
            />
        </Container>
    );
}
