import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import classes from "./UserWidget.module.css";
import Modal from "../Modal/Modal";
import EditProfile from "../Profile/EditProfile";
import AuthContext from "../../context/auth-context";
import { BASE_URL } from "../../api/api";
import FriendsContext from "../../context/friends-context";
import profilePlaceholder from "../../assets/profile-placeholder.png";


const UserWidget = () => {
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const frCtx = useContext(FriendsContext);
  const { username, profileImage, location, occupation, id } = authCtx.currentUser;

  return (
    <>
      <div className={classes["user-widget"] + " px-4 py-3"}>
        <img src={profileImage ? BASE_URL + "/" + profileImage : profilePlaceholder} alt="" />
        <Link to={`/home/profile/${id}`}>{username}</Link>
        <i className="bi bi-person-gear cursor" onClick={() => setShowModal(true)}></i>
        <h6>{frCtx.friends.length + " friends"}</h6>
        <hr />
        <i className="bi bi-geo-alt"></i>
        <span>{location || ""}</span>
        <i className="bi bi-briefcase"></i>
        <span>{occupation || ""}</span>
        <hr />
        <span>Who's viewed your profile</span>
        <span>1142</span>
        <span>Impressions of your post</span>
        <span>6341</span>
        <hr />
        <h6>Social Profiles</h6>
        <i className="bi bi-twitter"></i>
        <span>Twitter</span>
        <i className="bi bi-linkedin"></i>
        <span>LinkedIn</span>
      </div>
      {ReactDOM.createPortal(
        <>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            title="Edit Profile"
            isEditModal
          >
            <EditProfile setShowModal={setShowModal}/>
          </Modal>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default UserWidget;
