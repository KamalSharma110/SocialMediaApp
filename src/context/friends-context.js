import React, { useEffect, useState } from "react";
import { getFriends } from "../api/api";

const FriendsContext = React.createContext({
  friends: [],
  addFriend: () => {},
  removeFriend: () => {},
});

export const FriendsContextProvider = (props) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getFriends();
      setFriends(response.friends);
    })();
  }, []);

  const removeFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.friendId !== id);
    setFriends(updatedFriends);
  };

  const addFriend = (id, username) => {
    setFriends([...friends, { friendId: id, friendUsername: username }]);
  };

  return (
    <FriendsContext.Provider value={{ friends, addFriend, removeFriend }}>
      {props.children}
    </FriendsContext.Provider>
  );
};

export default FriendsContext;
