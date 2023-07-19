import React, { useEffect, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "./Post";
import { getPosts, getPostsOfUser } from "../../api/api";

const Posts = React.forwardRef((props, ref) => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const userId = params.userId;

  useImperativeHandle(
    ref,
    () => {
      return {
        fetchPosts: async () => {
          const response = await getPosts();
          setPosts(response.posts);
        },
      };
    },
    []
  );

  useEffect(() => {
    (async () => {
      let response;
      if (userId) response = await getPostsOfUser(userId);
      else response = await getPosts();
      setPosts(response.posts);
    })();
  }, [userId]);

  return posts.map((post) => (
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
  ));
});

export default Posts;
