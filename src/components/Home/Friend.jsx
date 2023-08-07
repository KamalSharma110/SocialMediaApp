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
import { socket } from "../../App";
import Image from "../Image/Image";



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

  socket.on('add_friend', ({id: friendId, username, profileImage}) => {
    frCtx.addFriend(friendId, username, profileImage);
  });

  socket.on('remove_friend', ({id: friendId}) => {
    frCtx.removeFriend(friendId);
  });

  const clickHandler = async () => {
    try {
      if (isFriend) {
        await removeFriend({ currentUserId, friendId });
      } else {
        await addFriend({ currentUserId, friendId });
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className={classes.friend + " mb-3"}>
        <Image
          src={userImage ? BASE_URL + "/" + userImage : profilePlaceholder}
        />
        <div>
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
