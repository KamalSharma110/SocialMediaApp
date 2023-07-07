import CreatePost from "./CreatePost";
import Friends from "./Friends";
import Navbar from "./Navbar";
import Posts from "./Posts";
import classes from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className={classes.layout}>
        <div>
          <CreatePost />
          <Posts />
        </div>
        <Friends />
      </div>
      
    </>
  );
};

export default Layout;