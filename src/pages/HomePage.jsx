import { useRef } from "react";

import Posts from "../components/Home/Posts";
import CreatePost from "../components/Home/CreatePost";

const HomePage = () => {
  const ref = useRef();
  const fetchPosts = () => ref.current.fetchPosts();
  // we shouldn't send Posts's fetchPosts fn directly as a prop to CreatePost component because it might result in its value being undefined inside CreatePost

  return (
    <>
      <CreatePost fetchPosts={fetchPosts}/>
      <Posts ref={ref} />
    </>
  );
};

export default HomePage;
