import { Outlet } from "react-router-dom";

import classes from './Root.module.css';
import Friends from "../components/Home/Friends";
import Navbar from "../components/Home/Navbar";
import UserWidget from "../components/Home/UserWidget";

const Root = () => {
  
  return (
    <>
      <Navbar />
      <div className={classes.root + ' row align-items-start g-0 m-auto'}>
        <UserWidget />
        <div className="col-lg-6 col-12 px-xl-4 px-lg-3 px-xxl-5 p-0 order-lg-0 order-1">
          <Outlet />
        </div>
        <Friends />
      </div>
    </>
  );
};

export default Root;