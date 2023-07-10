import { useContext } from "react";

import { addFriend, removeFriend } from "../../api/api";
import classes from "./Friend.module.css";
import AuthContext from "../../context/auth-context";
import FriendsContext from "../../context/friends-context";

const Friend = (props) => {
  const { username, userId: friendId } = props;
  let isFriend = props.isFriend || null;

  const authCtx = useContext(AuthContext);
  const frCtx = useContext(FriendsContext);

  const currentUserId = authCtx.currentUser.id;

  if (isFriend === null) {
    const index = frCtx.friends.findIndex((f) => f.friendId === friendId);
    if (index >= 0) isFriend = true;
    else isFriend = false;
  }

  const clickHandler = () => {
    if (isFriend) {
      removeFriend({ currentUserId, friendId });
      frCtx.removeFriend(friendId);
    } else {
      addFriend({ currentUserId, friendId });
      frCtx.addFriend(friendId, username);
    }
  };

  return (
      <div className={classes.friend + " mb-3"}>
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <div className="ms-2">
          <h5 className="mb-0">{username}</h5>
          <h6 className="mb-0">India</h6>
        </div>
        <span className="text-primary bg-info-subtle rounded-circle fs-5">
          {currentUserId !== friendId && (
            <i
              className={`bi ${
                !isFriend ? "bi-person-plus" : "bi-person-dash"
              }`}
              onClick={clickHandler}
            ></i>
          )}
        </span>
      </div>
  );
};

export default Friend;
