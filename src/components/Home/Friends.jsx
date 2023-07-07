import classes from './Friends.module.css';
import Friend from "./Friend";
import { useContext } from 'react';
import FriendsContext from '../../context/friends-context';

const Friends = () => {
  const frCtx = useContext(FriendsContext);

  return (
    <div className={classes['friends-container'] + ' ms-5 px-4 py-3'}>
      <h4 className="fs-6 mb-3">Friends List</h4>
      <ul>
        {frCtx.friends.map((friend) => (
          <li key={friend.friendId}>
            <Friend userId={friend.friendId} username={friend.friendUsername} isFriend={true}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
