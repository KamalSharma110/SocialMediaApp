import { Outlet } from "react-router-dom";

import classes from './Root.module.css';
import Friends from "../components/Home/Friends";
import Navbar from "../components/Home/Navbar";
import UserWidget from "../components/Home/UserWidget";

const Root = () => {
  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <UserWidget />
        <div>
          <Outlet />
        </div>
        <Friends />
      </div>
    </>
  );
};

export default Root;