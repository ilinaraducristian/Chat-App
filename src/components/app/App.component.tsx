import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "state-management/store";
import config from "config";
import {processedServerData} from "mock-data";
import {initializeBackend} from "state-management/slices/data/data.slice";
import FirstPanelComponent from "components/first-panel/FirstPanel.component";
import SecondPanelComponent from "components/second-panel/SecondPanel.component";
import ThirdPanelComponent from "components/third-panel/ThirdPanel.component";
import AddServerOverlayComponent from "components/overlay/AddServerOverlay.component";
import CreateChannelOverlayComponent from "components/overlay/CreateChannelOverlay.component";
import CreateGroupOverlayComponent from "components/overlay/CreateGroupOverlay.component";
import CreateServerOverlayComponent from "components/overlay/CreateServerOverlay.component";
import InvitationOverlayComponent from "components/overlay/InvitationOverlay.component";
import JoinServerOverlayComponent from "components/overlay/JoinServerOverlay.component";
import {
    selectIsBackendInitialized,
    selectIsSettingsShown,
    selectJoinedChannel,
    selectOverlay,
    selectSelectedServer
} from "state-management/selectors/data.selector";
import {selectJoinedChannelUsers} from "state-management/selectors/channel.selector";
import ImageInputOverlayComponent from "components/overlay/ImageInputOverlay.component";

import ForthPanelComponent from "../ForthPanel.component";
import HeaderComponent from "../Header.component";
import AddFriendOverlayComponent from "../overlay/AddFriendOverlay.component";
import {OverlayTypes} from "../../types/UISelectionModes";
import SettingsPanelComponent from "../settings/SettingsPanel.component";
import LoadingComponent from "./Loading.component";
import styled from "styled-components";
import {useKeycloak} from '@react-keycloak/web';
import {useMediasoup} from "../../mediasoup/ReactMediasoupProvider";
import {getUserData, useSocket} from "../../socketio/ReactSocketIOProvider";
import useAsyncEffect from "../../util/useAsyncEffect";
import {useLazyLoginQuery} from "../../state-management/apis/http.api";
import CreateChannelOrGroupComponent from "../overlay/CreateChannelOrGroup.component";

function AppComponent() {

    const isBackendInitialized = useAppSelector(selectIsBackendInitialized);
    const selectedServer = useAppSelector(selectSelectedServer);
    const overlay = useAppSelector(selectOverlay);
    const joinedChannel = useAppSelector(selectJoinedChannel);
    const joinedChannelUsers = useAppSelector(selectJoinedChannelUsers);
    const isSettingsShown = useAppSelector(selectIsSettingsShown);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const {keycloak, initialized} = useKeycloak();
    const {createConsumer, consumers} = useMediasoup();
    const {socket, connected} = useSocket();
    const [fetchLogin, {data: loginData, isSuccess: isLoginSuccess}] = useLazyLoginQuery();

    useEffect(() => {
        if (!initialized || !keycloak.authenticated) return;
        if (joinedChannel === null) {
            // TODO disconnect
            return;
        }

        (async () => {
            const users = joinedChannelUsers.filter(user => user.userId !== keycloak.subject &&
                !consumers.find(consumer => user.socketId === consumer.socketId));
            await Promise.all(users.map(user => createConsumer(user.socketId)));
        })();
    }, [consumers, createConsumer, joinedChannelUsers, joinedChannel, selectedServer, keycloak, initialized]);

    useEffect(() => {
        if (config.offline) return;
        if (!initialized) return;
        if (!keycloak.authenticated) {
            keycloak.login();
        } else {
            keycloak.loadUserInfo().then(() => {
                fetchLogin();
            });
        }
    }, [fetchLogin, keycloak, initialized]);

    useAsyncEffect(async () => {
        if (config.offline) {
            dispatch(initializeBackend(processedServerData));
            return;
        }
        if (!connected || isBackendInitialized) return;
        const backendData = await getUserData();
        dispatch(initializeBackend(backendData));
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBackendInitialized, connected]);

    useEffect(() => {
        if (!isLoginSuccess || loginData === undefined) return;
        socket.auth = {token: loginData};
        if (!socket.connected) socket.connect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginSuccess]);

    return isLoading && !config.offline ?
        <LoadingComponent/>
        :
        (
            <>
                <FirstPanelComponent/>
                <SecondPanelComponent/>
                <ContentContainer>
                    <HeaderComponent/>
                    <MainContainer>
                        <ThirdPanelComponent/>
                        <ForthPanelComponent/>
                    </MainContainer>
                </ContentContainer>
                {
                    !isSettingsShown ||
                    <SettingsPanelComponent/>
                }
                {
                    overlay === null ||
                    overlayToComponent(overlay)
                }
                <CreateChannelOrGroupComponent/>
            </>
        );
}

/* CSS */

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

/* CSS */

function overlayToComponent({type, payload}: { type: number, payload: any }) {
    switch (type) {
        case OverlayTypes.AddServerOverlayComponent:
            return <AddServerOverlayComponent/>;
        case OverlayTypes.CreateChannelOverlayComponent:
            return <CreateChannelOverlayComponent groupId={payload.groupId}/>;
        case OverlayTypes.CreateGroupOverlayComponent:
            return <CreateGroupOverlayComponent/>;
        case OverlayTypes.CreateServerOverlayComponent:
            return <CreateServerOverlayComponent/>;
        case OverlayTypes.InvitationOverlayComponent:
            return <InvitationOverlayComponent invitation={payload.invitation}/>;
        case OverlayTypes.JoinServerOverlayComponent:
            return <JoinServerOverlayComponent/>;
        case OverlayTypes.ImageInputOverlayComponent:
            return <ImageInputOverlayComponent image={payload.image}/>;
        case OverlayTypes.AddFriendOverlayComponent:
            return <AddFriendOverlayComponent/>;
    }
}

export default AppComponent;

