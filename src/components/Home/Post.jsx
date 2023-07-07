import { useState } from "react";

import { BASE_URL } from "../../api/api";
import Friend from "./Friend";
import classes from "./Post.module.css";

const Post = ({ userImage, username, postImage, postText, userId }) => {
  const [liked, setLiked] = useState(false);

  const likeHandler = () => {
    setLiked((prevState) => !prevState);
  };

  return (
    <div className={classes.post + " px-4 py-3 mb-4"}>
      <Friend username={username} userImage={userImage} userId={userId} />
      <p className="mb-0">{postText}</p>
      <img src={BASE_URL + "/" + postImage} alt="" className="my-3" />
      <div>
        <i
          style={{color: liked ? 'orangeRed' : '', animation: liked ? 'like-anim 0.2s' : ''}}
          className={`bi ${!liked ? "bi-heart" : "bi-heart-fill"}`}
          onClick={likeHandler}
        ></i>
        <i className="bi bi-chat-left"></i>
        <i className="bi bi-share"></i>
      </div>
    </div>
  );
};

export default Post;
