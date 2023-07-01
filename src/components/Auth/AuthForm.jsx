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
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section className={styles["auth-background"]}>
      <div className={styles["auth-form"]}>
        <div>
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
        <div className={classes}>
          <h1>Sociopedia</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            alias debitis magnam illum vel facere iste aspernatur. Error quia,
            dolores, ratione assumenda laborum quos harum blanditiis fugit
            fugiat incidunt facilis.
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
