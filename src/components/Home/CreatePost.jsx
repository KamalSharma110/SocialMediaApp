import { useContext, useState } from "react";

import classes from "./CreatePost.module.css";
import AuthContext from "../../context/auth-context";
import { BASE_URL, createPost, getPosts } from "../../api/api";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import PostsContext from "../../context/posts-context";

const CreatePost = () => {
  const [showSelector, setShowSelector] = useState(false);
  const [inputs, setInputs] = useState({ text: "", file: null });

  const authCtx = useContext(AuthContext);
  const postCtx = useContext(PostsContext);

  const profileImage = authCtx.currentUser.profileImage;
  let {setPosts, setInitialPosts} = postCtx;

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
    formData.append("file", inputs.file);
      
    await createPost(formData);

    const response = await getPosts();
    setInitialPosts(response.posts);
    setPosts(response.posts);

    if (document.querySelector("#file"))
      document.querySelector("#file").value = "";
    setInputs({ text: "", file: null });
  };

  return (
    <div className={classes["create-post"] + " px-4 py-3 mb-4"}>
      <form onSubmit={submitHandler}>
        <div className="pb-3 border-bottom border-2">
          <img
            src={
              profileImage ? BASE_URL + "/" + profileImage : profilePlaceholder
            }
            alt="user-pic"
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
        <span onClick={() => setShowSelector((prevState) => !prevState)}>
          <i className="bi bi-image"></i>Image
        </span>
        <span>
          <i className="bi bi-filetype-gif"></i>Clip
          <input type="file" />
        </span>
        <span>
          <i className="bi bi-paperclip"></i>Attachment
          <input type="file" />
        </span>
        <span>
          <i className="bi bi-mic-fill"></i>Audio
          <input type="file" />
        </span>
        <button
          type="submit"
          className="px-3 py-1 bg-info text-info-emphasis rounded-pill border-0"
        >
          POST
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
