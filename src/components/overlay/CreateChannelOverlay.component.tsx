import {useEffect, useRef} from "react";
import config from "config";
import {useLazyCreateChannelQuery} from "state-management/apis/socketio";
import {addChannel, selectChannel, setOverlay} from "state-management/slices/data/data.slice";
import {useAppDispatch, useAppSelector} from "state-management/store";
import {ChannelType, TextChannel} from "types/Channel";
import {selectSelectedServer} from "state-management/selectors/data.selector";
import OverlayComponent from "components/overlay/Overlay.component";

type ComponentProps = {
  groupId?: number | null
}

function CreateChannelOverlayComponent({groupId = null}: ComponentProps) {

  const ref = useRef<HTMLInputElement>(null);
  const selectedServer = useAppSelector(selectSelectedServer);
  const [fetch, {data, isSuccess}] = useLazyCreateChannelQuery();
  const dispatch = useAppDispatch();

  function createChannel() {
    if (config.offline) return;
    if (selectedServer === undefined) return;
    // TODO
    const channelName = ref.current?.value as string;
    fetch({serverId: selectedServer.id, groupId, channelName});
  }

  useEffect(() => {
    if (selectedServer === undefined) return;
    if (!isSuccess) return;
    if (data === undefined) return;
    const channelName = ref.current?.value as string;
    const channel: TextChannel = {
      id: data?.channelId,
      serverId: selectedServer.id,
      groupId,
      type: ChannelType.Text,
      name: channelName,
      messages: [],
      order: 0
    };
    dispatch(addChannel(channel));
    dispatch(selectChannel(channel.id));
    dispatch(setOverlay(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
      <OverlayComponent>
        <h1 className="h1">Channel name</h1>
        <input type="text" ref={ref}/>
        <button type="button" className="btn btn__overlay-select" onClick={createChannel}>Create
        </button>
      </OverlayComponent>
  );
}

export default CreateChannelOverlayComponent;