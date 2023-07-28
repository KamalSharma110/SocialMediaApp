import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Modal from "../Modal/Modal";
import { BASE_URL, getPostStats, likePost, unlikePost } from "../../api/api";
import Friend from "./Friend";
import "./Post.css";
import AuthContext from "../../context/auth-context";
import Comments from "./Comments";

const Post = ({
  userImage,
  username,
  postImage,
  postText,
  userId,
  postId,
  createdAt,
}) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [stats, setStats] = useState({ likes: 0, comments: 0 });
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPostStats(postId);
        setStats({
          likes: response.totalLikes,
          comments: response.totalComments,
        });
        const index = response.users.findIndex(
          (user) => user === authCtx.currentUser.id
        );
        if (index >= 0) setLiked(true);
      } catch (err) {
        setError(err);
      }
    })();
  }, [postId, authCtx.currentUser.id]);

  const likeHandler = async () => {
    try {
      if (liked) {
        await unlikePost(postId);
        setLiked((prevState) => !prevState);
        setStats((prevState) => {
          return { ...prevState, likes: prevState.likes - 1 };
        });
      } else {
        await likePost(postId);
        setLiked((prevState) => !prevState);
        setStats((prevState) => {
          return { ...prevState, likes: prevState.likes + 1 };
        });
      }
    } catch (err) {
      setError(err);
    }
  };

  const commentClickHandler = () => {
    setShowComments((prevState) => !prevState);
  };

  return (
    <>
      <div className="post px-4 py-3 mb-4">
        <Friend
          username={username}
          userImage={userImage}
          userId={userId}
          createdAt={createdAt}
        />
        <p className="mb-3">{postText}</p>
        {postImage && (
          <img src={BASE_URL + "/" + postImage} alt="" className="mb-3" />
        )}
        <div>
          <i
            className={`bi ${
              !liked ? "bi-heart" : "bi-heart-fill like"
            } cursor`}
            onClick={likeHandler}
          ></i>
          <span>{stats.likes > 0 ? stats.likes + " Likes" : ""}</span>
          <i
            className="bi bi-chat-left cursor"
            onClick={commentClickHandler}
          ></i>
          <span>{stats.comments > 0 ? stats.comments + " Comments" : ""}</span>
          <i className="bi bi-share"></i>
        </div>
        <Comments postId={postId} setStats={setStats} inProp={showComments} />
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

export default Post;
