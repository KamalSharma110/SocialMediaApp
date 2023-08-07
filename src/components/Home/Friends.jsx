import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./Friends.css";
import Friend from "./Friend";
import FriendsContext from "../../context/friends-context";

const Friends = () => {
  const frCtx = useContext(FriendsContext);

  return (
    <div className="friends-container px-3 py-2 px-xl-4 py-xl-3 col-12 col-lg-3 mb-4">
      <h4 className="fs-6 mb-3">Friends List</h4>
      <TransitionGroup component='ul'>
        {frCtx.friends.map((friend) => (
          <CSSTransition timeout={300} classNames='friend-anim' key={friend.friendId}> 
          {/*nodeRef prop is required when react is running in strict mode*/}
            <li>
              <Friend
                userId={friend.friendId}
                username={friend.friendUsername}
                userImage={friend.friendImage}
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
