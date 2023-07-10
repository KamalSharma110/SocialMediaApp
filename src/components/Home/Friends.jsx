import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./Friends.css";
import Friend from "./Friend";
import FriendsContext from "../../context/friends-context";

const Friends = () => {
  const frCtx = useContext(FriendsContext);

  return (
    <div className="friends-container ms-5 px-4 py-3">
      <h4 className="fs-6 mb-3">Friends List</h4>
      <TransitionGroup component='ul'>
        {frCtx.friends.map((friend) => (
          <CSSTransition timeout={300} classNames='friend-anim'>
            <li key={friend.friendId}>
              <Friend
                userId={friend.friendId}
                username={friend.friendUsername}
                isFriend={true}
              />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Friends;
