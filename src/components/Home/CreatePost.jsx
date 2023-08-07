import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Modal from "../Modal/Modal";
import classes from "./CreatePost.module.css";
import AuthContext from "../../context/auth-context";
import { BASE_URL, createPost, getPosts } from "../../api/api";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import PostsContext from "../../context/posts-context";
import { socket } from "../../App";
import Image from "../Image/Image";

const CreatePost = () => {
  const [showSelector, setShowSelector] = useState(false);
  const [inputs, setInputs] = useState({ text: "", file: null });
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);
  const postCtx = useContext(PostsContext);

  const profileImage = authCtx.currentUser.profileImage;
  let { setPosts } = postCtx;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);


  socket?.on('post_added', async() => {
    const response = await getPosts();
    setPosts(response.posts);
  });

  const fileChangeHandler = (e) => {
    setInputs((prevState) => {
      return { ...prevState, file: e.target.files[0] };
    });
  };

  const textChangeHandler = (e) => {
    setInputs((prevState) => {
      return { ...prevState, text: e.target.value };
    });
  };

  const fileDeleteHandler = () => {
    document.querySelector("#file").value = "";
    setInputs((prevState) => {
      return { ...prevState, file: null };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", authCtx.currentUser.id);
    formData.append("text", inputs.text);
    formData.append("image", inputs.file);

    try {
      await createPost(formData);
    } catch (err) {
      setError(err);
    }

    if (document.querySelector("#file"))
      document.querySelector("#file").value = "";
    setInputs({ text: "", file: null });
  };

  return (
    <>
      <div className={classes["create-post"] + " px-xl-4 py-xl-3 px-3 py-2 mb-4"} >
        <form onSubmit={submitHandler}>
          <div className="pb-3 border-bottom border-1">
            <Image
              src={
                profileImage
                  ? BASE_URL + "/" + profileImage
                  : profilePlaceholder
              }
            />
            <input
              type="text"
              placeholder="What's on your mind..."
              className="rounded-pill p-2 ps-4"
              onChange={textChangeHandler}
              value={inputs.text}
            />
          </div>
          {showSelector && (
            <>
              <label
                htmlFor="file"
                className="p-3 border border-2 rounded"
                onClick={(e) => {
                  if (e.target !== e.currentTarget) e.preventDefault();
                }}
              >
                {inputs.file?.name || "Add Image Here"}
                {inputs.file?.name && (
                  <i
                    className="bi bi-trash-fill float-end fs-6"
                    onClick={fileDeleteHandler}
                  ></i>
                )}
              </label>
              <input id="file" type="file" onChange={fileChangeHandler} />
            </>
          )}
          <span onClick={() => setShowSelector((prevState) => !prevState)} className="cursor">
            <i className="bi bi-image cursor"></i>Image
          </span>
          <span>
            <i className="bi bi-filetype-gif"></i>Clip
          </span>
          <span>
            <i className="bi bi-paperclip"></i>Attachment
          </span>
          <span>
            <i className="bi bi-mic-fill"></i>Audio
          </span>
          <button
            type="submit"
            className="px-3 py-1 rounded-pill border-0"
            disabled={!(inputs.file || inputs.text)}
          >
            POST
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

export default CreatePost;
