import uuid from "react-uuid";
import { CSSTransition } from "react-transition-group";
import { useContext, useEffect, useRef, useState } from "react";

import "./Comments.css";
import Comment from "./Comment";
import { addComment, getComments } from "../../api/api";
import AuthContext from "../../context/auth-context";


const Comments = ({ postId, setStats, inProp }) => {
  const inputRef = useRef();
  const [comments, setComments] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await getComments(postId);
      setComments(response.comments);
    })();
  }, [postId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const commentData = {
      text: inputRef.current.value,
      createdAt: new Date(),
    };
    await addComment(postId, commentData);

    setComments((prevComments) => {
      return [
        ...prevComments,
        {
          ...commentData,
          _id: uuid(),
          username: authCtx.currentUser.username,
        },
      ];
    });

    setStats((prevState) => {
      return { ...prevState, comments: prevState.comments + 1 };
    });

    inputRef.current.value = "";
  };

  return (
    <CSSTransition
      classNames="comment"
      timeout={200}
      in={inProp}
      unmountOnExit
    >
      <div className='comments'>
        <form className="my-3" onSubmit={submitHandler}>
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="current_user_profile_picture"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="rounded-pill ps-3"
            ref={inputRef}
          />
          <button type="submit" className="rounded border-0">
            Send
          </button>
        </form>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              username={comment.username}
              text={comment.text}
              createdAt={comment.createdAt}
            />
          );
        })}
      </div>
    </CSSTransition>
  );
};

export default Comments;
