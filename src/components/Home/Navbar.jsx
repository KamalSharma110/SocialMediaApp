import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactDOM from "react-dom";

import Modal from "../Modal/Modal";
import classes from "./Navbar.module.css";
import AuthContext from "../../context/auth-context";
import PostsContext from "../../context/posts-context";
import { getPostsOfUser, getPosts, searchQuery } from "../../api/api.js";

let initialPosts;
const Navbar = () => {
  const darkMode = JSON.parse(localStorage.getItem("DarkMode") || "false");
  const inputRef = useRef();
  const params = useParams();
  const navigate = useNavigate();

  const postCtx = useContext(PostsContext);
  const authCtx = useContext(AuthContext);

  const [allowSearch, setAllowSearch] = useState(false);
  const [isDarkMode, setDarkMode] = useState(darkMode);
  const [error, setError] = useState(null);

  const { setPosts } = postCtx;
  const { isLoggedIn } = authCtx;
  const userId = params.userId;

  useEffect(() => {
    if (isLoggedIn) {
      toggleDarkMode(darkMode);
      (async () => {
        try {
          let response;
          if (userId) response = await getPostsOfUser(userId);
          else response = await getPosts();
          initialPosts = response.posts;
          setPosts(response.posts);
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, [userId, isLoggedIn, darkMode, setPosts]);

  const submitHandler = async () => {
    try {
      const response = await searchQuery({
        searchText: inputRef.current.value,
      });
      const ids = response.ids || [];
      setPosts([...initialPosts.filter((post) => ids?.includes(post._id))]);
    } catch (err) {
      setError(err);
    }
  };

  const inputChangeHandler = (e) => {
    if (e.target.value === "") {
      setPosts(initialPosts);
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }
  };

  const toggleDarkMode = (prevTheme = undefined) => {
    const root = document.getElementById("root");
    const result = root.classList.toggle('darkmode', prevTheme);
    localStorage.setItem("DarkMode", result);
    setDarkMode(result);
  };

  const toggleMenu = () => {
    document.querySelector('nav > div:nth-of-type(2)').classList.toggle(classes['d-flex']);
  };

  return (
    <>
      <header className={classes.navbar + " mb-4 g-0 row"}>
        <nav className="col-12 m-auto">
          <div>
            <Link to="/home" className="fs-2 fw-bold mb-0">
              Connectify
            </Link>
            <div>
              <input
                type="text"
                placeholder="Search posts..."
                onChange={inputChangeHandler}
                ref={inputRef}
              />
              <button
                onClick={submitHandler}
                style={{ visibility: allowSearch ? "visible" : "hidden" }}
              >
                <i className="bi bi-search cursor"></i>
              </button>
            </div>
          </div>
          <i className="bi bi-list cursor" onClick={toggleMenu}></i>
          <div>
            <i className="bi bi-x cursor" onClick={toggleMenu}></i>
            <i
              className={`bi bi-${isDarkMode ? "sun" : "moon-stars"}-fill cursor`}
              onClick={() => toggleDarkMode()}
            ></i>
            <i className="bi bi-chat-left-text-fill"></i>
            <i className="bi bi-bell-fill"></i>
            <i className="bi bi-question-circle-fill"></i>
            <div className="dropdown">
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
                  <Link className="dropdown-item" to={`/home/profile/${authCtx.currentUser.id}`}>
                    {authCtx.currentUser.username}
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/"
                    onClick={(e) => {
                      authCtx.logout();
                      navigate('/auth');
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
      {ReactDOM.createPortal(
        <Modal
          showModal={!!error}
          setShowModal={setError}
          title="An error occured"
        >
          <p>{error?.message}</p>
        </Modal>,
        document.getElementById("root")
      )}
    </>
  );
};

export default Navbar;
