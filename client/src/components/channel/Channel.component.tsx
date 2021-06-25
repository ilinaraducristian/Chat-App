import {GlobalStates} from "../app/App.component";
import {useCallback, useContext, useMemo} from "react";
import {Channel} from "../../types";
import ChannelSVG from "../../svg/Channel.svg";

type Props = {
  channel: Channel
}

function ChannelComponent({channel}: Props) {

  const {dispatch} = useContext(GlobalStates);

  const selectedChannel = useCallback(() => {
    dispatch({type: "CHANNEL_SET", payload: channel});
  }, [channel, dispatch]);

  return useMemo(() => (
      <li>
        <button className="btn btn__channel" type="button" onClick={selectedChannel}>
          <ChannelSVG type={channel.type} isPrivate={false} className="svg__text-channel svg__text-channel--private"/>
          <span className="span__channel-name">{channel.name}</span>
        </button>
      </li>
  ), [channel.name, channel.type, selectedChannel]);

}

export default ChannelComponent;