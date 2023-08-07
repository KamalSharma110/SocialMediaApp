import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Modal from "../components/Modal/Modal";
import { getFriends } from "../api/api";
import AuthContext from "./auth-context";

const FriendsContext = React.createContext({
  friends: [],
  addFriend: () => {},
  removeFriend: () => {},
});

export const FriendsContextProvider = (props) => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.isLoggedIn)
      (async () => {
        try {
          const response = await getFriends();
          setFriends(response.friends);
        } catch (error) {
          setError(error);
        }
      })();
  }, [authCtx.isLoggedIn]);

  const removeFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.friendId !== id);
    setFriends([...updatedFriends]);
  };

  const addFriend = (id, username, image) => {
    setFriends([
      ...friends,
      { friendId: id, friendUsername: username, friendImage: image },
    ]);
  };

  return (
    <>
      <FriendsContext.Provider value={{ friends, addFriend, removeFriend }}>
        {props.children}
      </FriendsContext.Provider>
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

export default FriendsContext;
