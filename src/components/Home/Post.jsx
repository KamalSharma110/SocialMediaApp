import { useContext, useEffect, useState } from "react";

import { BASE_URL, getPostStats, likePost, unlikePost } from "../../api/api";
import Friend from "./Friend";
import "./Post.css";
import AuthContext from "../../context/auth-context";
import Comments from "./Comments";


const Post = ({ userImage, username, postImage, postText, userId, postId }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [stats, setStats] = useState({ likes: 0, comments: 0 });
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await getPostStats(postId);
      setStats({
        likes: response.totalLikes,
        comments: response.totalComments,
      });
      const index = response.users.findIndex(
        (user) => user === authCtx.currentUser.id
      );
      if (index >= 0) setLiked(true);
    })();
  }, [postId, authCtx.currentUser.id]);

  const likeHandler = async () => {
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
  };

  const commentClickHandler = () => {
    setShowComments((prevState) => !prevState);
  };

  return (
    <div className="post px-4 py-3 mb-4">
      <Friend username={username} userImage={userImage} userId={userId} />
      <p className="mb-0">{postText}</p>
      <img src={BASE_URL + "/" + postImage} alt="" className="my-3" />
      <div>
        <i
          className={`bi ${!liked ? "bi-heart" : "bi-heart-fill like"}`}
          onClick={likeHandler}
        >
          {stats.likes > 0 ? stats.likes + " Likes" : ""}
        </i>
        <i className="bi bi-chat-left" onClick={commentClickHandler}>
          {stats.comments > 0 ? stats.comments + " Comments" : ""}
        </i>
        <i className="bi bi-share"></i>
      </div>
      <Comments postId={postId} setStats={setStats} inProp={showComments} />
    </div>
  );
};

export default Post;