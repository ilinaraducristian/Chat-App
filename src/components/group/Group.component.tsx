import {useCallback, useContext, useState} from "react";
import ChannelsListComponent from "../channel/ChannelsList.component";
import ArrowSVG from "../../svg/Arrow.svg";
import {GlobalStates} from "../../state-management/global-state";
import CreateChannelOverlayComponent from "../channel/CreateChannelOverlay.component";
import Actions from "../../state-management/actions";

type ComponentProps = {
  id: number,
  name: string
}

function GroupComponent({id, name}: ComponentProps) {

  const {dispatch} = useContext(GlobalStates);
  const [isCollapsed, setIsExpanded] = useState(true);

  const createChannel = useCallback(() => {
    dispatch({type: Actions.OVERLAY_SET, payload: <CreateChannelOverlayComponent groupId={id}/>});
  }, [dispatch, id]);

  return (
      <li>
        <div className="div__group">
          <button className="btn btn__group btn--gray" type="button" onClick={() => setIsExpanded(!isCollapsed)}>
            <ArrowSVG className={"svg__arrow" + (isCollapsed ? " svg__arrow--active" : "")}/>
            <span>{name}</span>
          </button>
          <button type="button" className="btn btn__create-channel" onClick={createChannel}>+</button>
        </div>
        {
          isCollapsed ||
          <ol className="list">
              <ChannelsListComponent groupId={id}/>
          </ol>
        }
      </li>
  );

}

export default GroupComponent;

