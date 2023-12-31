import uuid from "react-uuid";
import { CSSTransition } from "react-transition-group";
import { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import Modal from "../Modal/Modal";
import "./Comments.css";
import Comment from "./Comment";
import AuthContext from "../../context/auth-context";
import { BASE_URL, addComment, getComments } from "../../api/api";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import Image from "../Image/Image";

const Comments = ({ postId, setStats, inProp }) => {
  const nodeRef = useRef();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const profileImage = authCtx.currentUser.profileImage;

  useEffect(() => {
    if (inProp) {
      (async () => {
        try {
          const response = await getComments(postId);
          setComments(response.comments);
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, [postId, inProp]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const commentData = {
      text: comment,
    };

    try {
      await addComment(postId, commentData);
    } catch (err) {
      setError(err);
    }

    setComments((prevComments) => {
      return [
        {
          ...commentData,
          _id: uuid(),
          username: authCtx.currentUser.username,
          userImage: authCtx.currentUser.profileImage,
        },
        ...prevComments,
      ];
    });

    setStats((prevState) => {
      return { ...prevState, comments: prevState.comments + 1 };
    });

    setComment("");
  };

  return (
    <>
      <CSSTransition
        classNames="comment"
        timeout={200}
        in={inProp}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
      >
        <div className="comments mt-3" ref={nodeRef}>
          <form className="mb-3" onSubmit={submitHandler}>
            <Image
              src={
                profileImage
                  ? BASE_URL + "/" + profileImage
                  : profilePlaceholder
              }
            />
            <input
              type="text"
              placeholder="Add a comment..."
              className="rounded-pill ps-3"
              onChange={e => setComment(e.target.value)}
              value={comment}
            />
            <button
              type="submit"
              className="rounded border-0"
              disabled={comment === ""}
            >
              Send
            </button>
          </form>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                username={comment.username}
                userImage={comment.userImage}
                text={comment.text}
                createdAt={comment.createdAt}
              />
            );
          })}
        </div>
      </CSSTransition>
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

export default Comments;
