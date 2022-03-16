import { FriendshipStatusDto } from "@rendezvous/common";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import Friendship from "../../entities/friendship";
import keycloak from "../../keycloak";
import { FriendshipsState } from "../../state/friendships-state";
import RootState from "../../state/root-state";

type ComponentProps = {
  rootState: RootState;
  friendshipsState: FriendshipsState;
};

const FriendshipsComponent = observer(({ rootState, friendshipsState }: ComponentProps) => {
  const selectFriendship = useCallback((friendship: Friendship) => {
    rootState.selectedFriendship = friendship;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteFriendship = useCallback(async (friendship: Friendship) => {
    await friendship.apiDelete();
    friendshipsState.friendships.delete(friendship.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acceptFriendship = useCallback(async (friendship: Friendship) => {
    await friendship.apiUpdate(FriendshipStatusDto.accepted);
    friendship.status = FriendshipStatusDto.accepted;
  }, []);

  const rejectFriendship = useCallback(async (friendship: Friendship) => {
    await friendship.apiUpdate(FriendshipStatusDto.rejected);
    friendship.status = FriendshipStatusDto.rejected;
  }, []);

  return (
    <>
      {friendshipsState.friendships.map((friendship) => (
        <li key={friendship.id} className={rootState.selectedFriendship?.id === friendship.id ? "selected" : ""}>
          {friendship.status !== FriendshipStatusDto.accepted || (
            <>
              <button type="button" onClick={() => selectFriendship(friendship)}>
                {rootState.users.get(friendship.friendId)?.username ?? friendship.friendId}
              </button>
              <button type="button" onClick={() => deleteFriendship(friendship)}>
                X
              </button>
            </>
          )}
          {friendship.status !== FriendshipStatusDto.pending || friendship.user2Id !== keycloak.subject || (
            <div>
              <span>{rootState.users.get(friendship.friendId)?.username ?? friendship.friendId}</span>
              <button type="button" onClick={() => acceptFriendship(friendship)}>
                ✓
              </button>
              <button type="button" onClick={() => rejectFriendship(friendship)}>
                x
              </button>
            </div>
          )}
          {friendship.status !== FriendshipStatusDto.pending || friendship.user2Id === keycloak.subject || (
            <div>
              <span>{rootState.users.get(friendship.friendId)?.username ?? friendship.friendId}</span>
              <div>pending</div>
            </div>
          )}
        </li>
      ))}
    </>
  );
});

export default FriendshipsComponent;