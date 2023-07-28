import React, { useState } from "react";

const PostsContext = React.createContext({
  posts: [],
  setPosts: () => {},
});

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider
      value={{ posts: posts, setPosts: setPosts }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
