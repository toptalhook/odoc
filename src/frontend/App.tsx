import React, { useEffect, useState } from "react";
import "./App.css";
import Pages from "./pages";
import { BrowserRouter } from "react-router-dom";
import useInitialData from "./redux/initialData/useInitialData";

import { SnackbarProvider } from "notistack";
import NavBar from "./components/MainComponents/NavBar";
import TopNavBar from "./components/MainComponents/TopNavBar";
import RegistrationForm from "./components/MainComponents/RegistrationForm";
import MessagesDialogBox from "./components/ChatSendMessage/MessagesBoxDialog";
import SearchPopper from "./components/SearchComponent";
import useSocket from "./websocket/use_socket";
import { useSelector } from "react-redux";
import { useBackendContext } from "./contexts/BackendContext";
import { Box, CircularProgress } from "@mui/material";

const App: React.FC = () => {
  const { profile } = useSelector((state: any) => state.filesState);
  const { backendActor } = useBackendContext();
  const {} = useInitialData();
  const { ws } = useSocket();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (backendActor) {
      setIsLoading(false);
    }
    if (profile) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [backendActor, profile]);
  let Loadder = (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // This will make it center vertically for the whole viewport
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );

  return (
    <BrowserRouter>
      <SearchPopper />
      <SnackbarProvider maxSnack={3}>
        <useInitialData />
        <RegistrationForm />
        <MessagesDialogBox />
        <TopNavBar />
        <NavBar>{isLoading ? Loadder : <Pages />}</NavBar>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
