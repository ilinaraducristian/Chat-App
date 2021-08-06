import {useState} from "react";
import ChannelSVG from "../../svg/Channel.svg";
import MembersSVG from "../../svg/Members.svg";
import {ChannelType} from "../../types";
import {useAppSelector} from "../../state-management/store";
import {selectSelectedChannel} from "../../state-management/slices/serversDataSlice";
import MessagesPanelComponent from "../message/MessagesPanel.component";
import MembersPanelComponent from "../member/MembersPanel.component";

function ContentPanelComponent() {

  const [isMembersSelected, setIsMembersSelected] = useState(true);

  const selectedChannel = useAppSelector(selectSelectedChannel);

  return (
      <div className="content">
        <header className="content__header">
          <div className="content__header__main">
            {
              selectedChannel === undefined ||
              <>
                  <ChannelSVG type={ChannelType.Text} isPrivate={false}/>
                  <span
                      className="span__header-channel-name">{selectedChannel.name}</span>
              </>
            }
            <button type="button" className={`btn ${isMembersSelected ? "btn--active" : "btn--off"} btn--hover`}
                    onClick={() => setIsMembersSelected(!isMembersSelected)}>
              <MembersSVG/>
            </button>
          </div>
          <div className="content__header__members">
            placeholder
          </div>
        </header>
        <div className="content__body">
          <MessagesPanelComponent/>
          {
            !isMembersSelected ||
            <MembersPanelComponent/>
          }
        </div>
      </div>
  );

}

export default ContentPanelComponent;