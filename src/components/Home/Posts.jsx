import React, { useContext } from "react";

import Post from "./Post";
import PostsContext from "../../context/posts-context";


const Posts = () => {
  const postCtx = useContext(PostsContext);


  return postCtx.posts.length > 0 ? (
    postCtx.posts.map((post) => (
      <Post
        key={post._id}
        userId={post.userId}
        userImage={post.userImage}
        username={post.username}
        postText={post.text}
        postImage={post.file}
        postId={post._id}
        createdAt={post.createdAt}
      />
    ))
  ) : (
    <span
      style={{
        display: 'block',
        textAlign: 'center',
        fontSize: "2.5rem",
        color: "#757675",
      }}
    >
      No posts found.
    </span>
  );
};

export default Posts;
