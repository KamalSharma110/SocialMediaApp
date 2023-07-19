import React, { useContext, useEffect, useState } from "react";
import { getFriends } from "../api/api";
import AuthContext from "./auth-context";

const FriendsContext = React.createContext({
  friends: [],
  addFriend: () => {},
  removeFriend: () => {},
});

export const FriendsContextProvider = (props) => {
  const [friends, setFriends] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if(authCtx.isLoggedIn)
      (async () => {
        const response = await getFriends();
        setFriends(response.friends);
      })();
  }, [authCtx.isLoggedIn]);

  const removeFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.friendId !== id);
    setFriends(updatedFriends);
  };

  const addFriend = (id, username, image) => {
    setFriends([...friends, { friendId: id, friendUsername: username, friendImage: image }]);
  };

  return (
    <FriendsContext.Provider value={{ friends, addFriend, removeFriend }}>
      {props.children}
    </FriendsContext.Provider>
  );
};

export default FriendsContext;
