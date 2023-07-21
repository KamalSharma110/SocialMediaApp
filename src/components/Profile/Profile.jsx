import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BASE_URL, addFriend, getProfile, removeFriend } from "../../api/api";
import classes from "./Profile.module.css";
import coverPlaceholder from "../../assets/cover-placeholder.jpg";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import FriendsContext from "../../context/friends-context";
import AuthContext from "../../context/auth-context";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const frCtx = useContext(FriendsContext);
  const authCtx = useContext(AuthContext);


  const userId = params.userId;
  const currentUserId = authCtx.currentUser.id;

  const isFriend = !!frCtx.friends.find((f) => f.friendId === userId);

  useEffect(() => {
    (async () => {
      const response = await getProfile(userId);
      setProfile(response);
    })();
  }, [userId]);

  const clickHandler = async () => {
    if (isFriend) {
      removeFriend({ currentUserId, userId });
      frCtx.removeFriend(userId);
    } else {
      await addFriend({ currentUserId, userId });
      frCtx.addFriend(userId, profile.username, profile.profileImage);
    }
  };

  return (
    <div className={classes.profile + " mb-4"}>
      <img
        className="img-fluid"
        alt="cover-pic"
        src={
          profile?.coverImage
            ? BASE_URL + "/" + profile?.coverImage
            : coverPlaceholder
        }
      />
      <div className="px-4 py-3">
        <img
          className="img-thumbnail"
          src={
            profile?.profileImage
              ? BASE_URL + "/" + profile?.profileImage
              : profilePlaceholder
          }
          alt="profile-pic"
        />
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
        { currentUserId !== userId && <button onClick={clickHandler}>
          {isFriend ? "- Remove Friend" : "+ Add Friend"}
        </button> }
      </div>
    </div>
  );
};

export default Profile;
