import { useContext, useRef, useState } from "react";

import styles from "./AuthForm.module.css";
import { login, signup } from "../../api/api";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState({});

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  let classes = styles["auth-form__img"];
  if (showLogin)
    classes +=
      " " +
      styles["auth-form__img--change-order"] +
      " " +
      styles["auth-form__img--change-img"];

  const clickHandler = () => {
    setShowLogin((prevState) => !prevState);
    setError({});
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      if (showLogin) {
        const { token, currentUser } = await login(body);
        authCtx.login(token, currentUser);
        navigate('/home');
      } else {
        body.name = nameRef.current.value;
        body.email = emailRef.current.value;
        await signup(body);
        setShowLogin(true);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section className={styles["auth-background"] + ' row g-0 align-items-center justify-content-center'}>
      <div className={styles["auth-form"] + ' row g-0 col-12'}>
        <div className="col-md-6 col-12">
          <h1>{showLogin ? "Login" : "Register"}</h1>
          <form
            method="post"
            noValidate
            onSubmit={(event) => submitHandler(event)}
          >
            <input type="text" placeholder="Username" ref={usernameRef} />
            {"username" in error && (
              <span className={styles.error}>{error["username"]}</span>
            )}

            {!showLogin && (
              <input type="email" placeholder="Email" ref={emailRef} />
            )}
            {"email" in error && (
              <span className={styles.error}>{error["email"]}</span>
            )}

            <input type="password" placeholder="Password" ref={passwordRef} />
            {"password" in error && (
              <span className={styles.error}>{error["password"]}</span>
            )}

            {!showLogin && (
              <input type="text" placeholder="Your Name" ref={nameRef} />
            )}
            {error.hasOwnProperty("name") && (
              <span className={styles.error}>{error["name"]}</span>
            )}

            <button type="submit">{showLogin ? "Login" : "Register"}</button>
          </form>
        </div>
        <div className={classes + ' col-md-6 col-12'}>
          <h1>Connectify</h1>
          <p>
          Welcome to Connectify - where connections thrive and stories unite. Join a vibrant community of like-minded individuals, sharing moments, ideas, and experiences. Your journey begins here.
          </p>
          <p>
            {showLogin ? "Don't have an account?" : "Do you have an account?"}
          </p>
          <button onClick={clickHandler}>
            {showLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
