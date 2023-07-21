import React, { useContext, useEffect } from "react";
import {useParams} from 'react-router-dom';

import Post from "./Post";
import PostsContext from "../../context/posts-context";
import AuthContext from "../../context/auth-context";
import {getPostsOfUser, getPosts} from '../../api/api.js';

const Posts = () => {
  const postCtx = useContext(PostsContext);
  const authCtx = useContext(AuthContext);
  const params = useParams();

  const { posts, setPosts, setInitialPosts } = postCtx;
  const { isLoggedIn } = authCtx;
  const userId = params.userId;

  useEffect(() => {
    if(isLoggedIn)
    (async () => {
      let response;
      if (userId) response = await getPostsOfUser(userId);
      else response = await getPosts();
      setInitialPosts(response.posts);
      setPosts(response.posts);
    })();
  }, [userId, isLoggedIn, setInitialPosts, setPosts]);

  return posts.length > 0 ? (
    posts.map((post) => (
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
