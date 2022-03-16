import { observer } from "mobx-react-lite";
import Overlays from "../Overlays";
import friendshipsState from "../state/friendships-state";
import RootState from "../state/root-state";
import serversState from "../state/servers-state";
import "./OverlayPanel.component.css";
import AddChannelOverlayComponent from "./overlays/AddChannelOverlay.component";
import AddFriendOverlayComponent from "./overlays/AddFriendOverlay.component";
import AddGroupOverlayComponent from "./overlays/AddGroupOverlay.component";
import AddServerOverlayComponent from "./overlays/AddServerOverlay.component";

type ComponentProps = { rootState: RootState };

const OverlayPanelComponent = observer(({ rootState }: ComponentProps) => (
  <>
    {rootState.overlay === null || (
      <div className="overlay-container">
        {rootState.overlay[0] !== Overlays.addServer || <AddServerOverlayComponent rootState={rootState} serversState={serversState} />}
        {rootState.overlay[0] !== Overlays.addGroup || <AddGroupOverlayComponent rootState={rootState} />}
        {rootState.overlay[0] !== Overlays.addChannel || <AddChannelOverlayComponent rootState={rootState} group={rootState.overlay[1]} />}
        {rootState.overlay[0] !== Overlays.addFriendship || <AddFriendOverlayComponent rootState={rootState} friendshipsState={friendshipsState} />}
      </div>
    )}
  </>
));

export default OverlayPanelComponent;