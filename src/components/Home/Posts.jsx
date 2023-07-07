import { useEffect, useState } from "react";

import Post from "./Post";
import { getPosts } from "../../api/api";

const Posts = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    (async () => {
      const response = await getPosts();
      setPosts(response.posts);
    })();
  }, []);

  return posts.map((post) => (
    <Post
      key={post._id}
      userId={post.userId}
      userImage={post.userImage}
      username={post.username}
      postText={post.text}
      postImage={post.file}
    />
  ));
};

export default Posts;
