import {useCallback, useContext, useRef} from "react";
import {GlobalStates} from "../../state-management/global-state";
import useBackend from "../../hooks/backend.hook";
import {ChannelType, Server} from "../../types";
import config from "../../config";
import Actions from "../../state-management/actions";

type ComponentProps = {
  groupId?: number | null
}

function CreateChannelOverlay({groupId = null}: ComponentProps) {

  const Backend = useBackend();
  const {state, dispatch} = useContext(GlobalStates);
  const ref = useRef<HTMLInputElement>(null);

  const createChannel = useCallback(async () => {
    if (!config.offline) {
      if (state.selectedServer.id === null) return;
      const channelName = ref.current?.value as string;
      const selectedServer = state.servers.get(state.selectedServer.id) as Server;
      const channelId = await Backend.createChannel(selectedServer.id, groupId, channelName);
      const channel = {
        id: channelId,
        serverId: selectedServer.id,
        groupId,
        type: ChannelType.Text,
        name: channelName
      };
      dispatch({type: Actions.CHANNEL_ADDED, payload: channel});
      dispatch({type: Actions.CHANNEL_SELECTED, payload: channel.id});
    }
    dispatch({type: Actions.OVERLAY_SET, payload: null});
  }, [Backend, dispatch, state.servers, state.selectedServer, groupId]);

  return (
      <div className="overlay">
        <div className="overlay__container">
          <h1 className="h1">Channel name</h1>
          <input type="text" ref={ref}/>
          <button type="button" className="btn btn__overlay-select" onClick={createChannel}>Create
          </button>
        </div>
      </div>
  );
}

export default CreateChannelOverlay;