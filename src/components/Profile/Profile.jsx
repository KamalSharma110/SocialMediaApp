import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";

import Modal from "../Modal/Modal";
import { BASE_URL, addFriend, getProfile, removeFriend } from "../../api/api";
import classes from "./Profile.module.css";
import coverPlaceholder from "../../assets/cover-placeholder.jpg";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import FriendsContext from "../../context/friends-context";
import AuthContext from "../../context/auth-context";
import { socket } from "../../App";
import Image from "../Image/Image";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const frCtx = useContext(FriendsContext);
  const authCtx = useContext(AuthContext);

  const userId = params.userId;
  const currentUserId = authCtx.currentUser.id;

  const isFriend = !!frCtx.friends.find((f) => f.friendId === userId);

  useEffect(() => {
    window.scroll(0, 0);
    (async () => {
      try {
        const response = await getProfile(userId);
        setProfile(response);
      } catch (error) {
        setError(error);
      }
    })();
  }, [userId]);

  socket?.on("add_friend", ({ id: friendId, username, profileImage }) => {
    frCtx.addFriend(friendId, username, profileImage);
  });

  socket?.on("remove_friend", ({ id: friendId }) => {
    frCtx.removeFriend(friendId);
  });

  const clickHandler = async () => {
    try {
      if (isFriend) {
        removeFriend({ currentUserId, friendId: userId });
      } else {
        await addFriend({ currentUserId, friendId: userId });
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className={classes.profile + " mb-4"}>
        <Image
          className="img-fluid"
          src={
            profile?.coverImage
              ? BASE_URL + "/" + profile?.coverImage
              : coverPlaceholder
          }
        />
        <Image
          className={"img-thumbnail " + classes.thumbnail}
          src={
            profile?.profileImage
              ? BASE_URL + "/" + profile?.profileImage
              : profilePlaceholder
          }
        />
        <div className="px-4 py-3">
          <h4>{profile?.username}</h4>
          <div>
            <div>
              <i className="bi bi-twitter me-2"></i>
              <i className="bi bi-linkedin"></i>
            </div>
            <div>
              <i className="bi bi-geo-alt me-2"></i>
              <span>{profile?.location}</span>
            </div>
            <div>
              <i className="bi bi-briefcase me-2"></i>
              <span>{profile?.occupation}</span>
            </div>
            <div>
              <i className="bi bi-envelope me-2"></i>
              <i className="bi bi-three-dots-vertical"></i>
            </div>
          </div>
          <button onClick={clickHandler} disabled={currentUserId === userId ? true : false}>
            {isFriend ? "- Remove Friend" : "+ Add Friend"}
          </button>
        </div>
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

export default Profile;
