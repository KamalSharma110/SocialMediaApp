import { useContext } from "react";

import AuthContext from "../../context/auth-context";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.navbar + ' mb-4'}>
      <nav>
        <div>
          <h1 className="fs-2 fw-bold mb-0">Sociopedia</h1>
          <div>
            <input type="search" placeholder="Search..." />
            <i className="bi bi-search"></i>
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
                    // e.preventDefault();
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
