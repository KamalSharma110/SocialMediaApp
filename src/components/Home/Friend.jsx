import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ReactDOM from "react-dom";

import Modal from "../Modal/Modal";
import { BASE_URL, addFriend, removeFriend } from "../../api/api";
import classes from "./Friend.module.css";
import AuthContext from "../../context/auth-context";
import FriendsContext from "../../context/friends-context";
import profilePlaceholder from "../../assets/profile-placeholder.png";


const Friend = (props) => {
  const { createdAt, username, userId: friendId, userImage } = props;
  let isFriend = props.isFriend || null;

  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);
  const frCtx = useContext(FriendsContext);

  const currentUserId = authCtx.currentUser.id;

  if (isFriend === null) {
    const index = frCtx.friends.findIndex((f) => f.friendId === friendId);
    if (index >= 0) isFriend = true;
    else isFriend = false;
  }

  const clickHandler = async () => {
    try {
      if (isFriend) {
        await removeFriend({ currentUserId, friendId });
        frCtx.removeFriend(friendId);
      } else {
        await addFriend({ currentUserId, friendId });
        frCtx.addFriend(friendId, username, userImage);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className={classes.friend + " mb-3"}>
        <img
          src={userImage ? BASE_URL + "/" + userImage : profilePlaceholder}
          alt=""
        />
        <div className="ms-2">
          <Link to={`/home/profile/${friendId}`}>{username}</Link>
          {createdAt && <Moment fromNow>{createdAt}</Moment>}
        </div>
        {currentUserId !== friendId && (
          <i
            className={`bi ${
              !isFriend ? "bi-person-plus" : "bi-person-dash"
            } cursor`}
            onClick={clickHandler}
          ></i>
        )}
      </div>
      {ReactDOM.createPortal(
        <Modal
          showModal={!!error}
          setShowModal={setError}
          title="An error occured"
        >
          <p>{error?.message}</p>
        </Modal>,
        document.getElementById("root")
      )}
    </>
  );
};

export default Friend;
