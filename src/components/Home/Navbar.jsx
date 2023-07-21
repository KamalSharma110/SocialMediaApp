import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";
import AuthContext from "../../context/auth-context";
import { searchQuery } from "../../api/api";
import PostsContext from "../../context/posts-context";

const Navbar = () => {
  const [allowSearch, setAllowSearch] = useState(false);
  const authCtx = useContext(AuthContext);
  const postCtx = useContext(PostsContext);
  const inputRef = useRef();

  const {initialPosts, setPosts} = postCtx;
  

  const submitHandler = async () => {
    const response = await searchQuery({
      searchText: inputRef.current.value,
    });

    const ids = response.ids || [];
    setPosts([
      ...initialPosts.filter((post) => ids?.includes(post._id)),
    ]);
  };

  const inputChangeHandler = (e) => {
    if (e.target.value === "") {
      setPosts(initialPosts);
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }
  };

  return (
    <header className={classes.navbar + " mb-4"}>
      <nav>
        <div>
          <Link to="/home" className="fs-2 fw-bold mb-0">
            Sociopedia
          </Link>
          <div>
            <input
              type="text"
              placeholder="Search..."
              onChange={inputChangeHandler}
              ref={inputRef}
            />
            <button
              onClick={submitHandler}
              style={{visibility: allowSearch ? 'visible' : 'hidden'}}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div>
          <i className="bi bi-sun-fill"></i>
          <i className="bi bi-chat-left-text-fill"></i>
          <i className="bi bi-bell-fill"></i>
          <i className="bi bi-question-circle-fill"></i>
          <div className="dropdown">
            {" "}
            {/* not using select and option tags because option tag cannot be styled */}
            <button
              className="px-3 btn btn-secondary dropdown-toggle bg-secondary-subtle text-dark border-0"
              type="button"
              data-bs-toggle="dropdown"
            >
              {authCtx.currentUser.username}
            </button>
            <ul className="dropdown-menu bg-secondary-subtle">
              <li>
                <a className="dropdown-item" href="/">
                  {authCtx.currentUser.username}
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="/"
                  onClick={(e) => {
                    authCtx.logout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
