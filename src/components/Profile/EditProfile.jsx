import { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import Modal from "../Modal/Modal";
import "./EditProfile.css";
import { BASE_URL, updateProfile } from "../../api/api";
import AuthContext from "../../context/auth-context";
import coverPlaceholder from "../../assets/cover-placeholder.jpg";
import profilePlaceholder from "../../assets/profile-placeholder.png";


const EditProfile = (props) => {
  const profileImageRef = useRef();
  const coverImageRef = useRef();
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const { username, profileImage, coverImage, location, occupation } =
      authCtx.currentUser;
    const form = document.forms.editProfileForm;

    form.elements[2].value = username || "";
    form.elements[3].value = location || "";
    form.elements[4].value = occupation || "";

    if (profileImage)
      profileImageRef.current.src = BASE_URL + "/" + profileImage;
    if (coverImage) coverImageRef.current.src = BASE_URL + "/" + coverImage;
  }, [authCtx.currentUser]);

  const fileChangeHandler = (e) => {
    const id = e.target.id;
    const files = e.target.files;
    let ref;

    if (id === "profile-pic") ref = profileImageRef;
    else ref = coverImageRef;

    if (files.length > 0) {
      ref.current.src = URL.createObjectURL(files[0]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("profileImage", form.elements[0].files[0]);
    formData.append("coverImage", form.elements[1].files[0]);
    formData.append("username", form.elements[2].value);
    formData.append("location", form.elements[3].value);
    formData.append("occupation", form.elements[4].value);

    try {
      await updateProfile(formData);
      await authCtx.updateCurrentUser();
    } catch (error) {
      setError(error);
    }
    props.setShowModal(false);
  };

  return (
    <>
      <div className="edit-profile">
        <form onSubmit={submitHandler} name="editProfileForm">
          <h2 className="fs-6">Profile Picture</h2>
          <input type="file" id="profile-pic" onChange={fileChangeHandler} />
          <label htmlFor="profile-pic">
            <i className="bi bi-pencil-square cursor"></i>
          </label>
          <img src={profilePlaceholder} alt="" ref={profileImageRef} />

          <h2 className="fs-6">Cover Photo</h2>
          <input type="file" id="cover-pic" onChange={fileChangeHandler} />
          <label htmlFor="cover-pic">
            <i className="bi bi-pencil-square cursor"></i>
          </label>
          <img src={coverPlaceholder} alt="" ref={coverImageRef} />

          <h2 className="fs-6">Other Info</h2>
          <input type="text" placeholder="Username" className="p-1 ps-3 p-sm-2 ps-sm-4" />
          <input type="text" placeholder="Location" className="p-1 ps-3 p-sm-2 ps-sm-4" />
          <input type="text" placeholder="Occupation" className="p-1 ps-3 p-sm-2 ps-sm-4" />
          <button type="submit" className="px-5 py-1 my-3 border-0">
            Update
          </button>
        </form>
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

export default EditProfile;
