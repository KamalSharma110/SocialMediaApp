import React, { useState } from "react";

const PostsContext = React.createContext({
  posts: [],
  setPosts: () => {},
  initialPosts: [],
  setInitialPosts: () => {},
});

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [initialPosts, setInitialPosts] = useState([]);

  return (
    <PostsContext.Provider
      value={{ posts: posts, setPosts: setPosts, initialPosts, setInitialPosts }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
