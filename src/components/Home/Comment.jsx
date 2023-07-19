import Moment from 'react-moment';

import classes from './Comment.module.css';
import { BASE_URL } from '../../api/api';
import profilePlaceholder from "../../assets/profile-placeholder.png";

const Comment = ({username, text, createdAt, userImage}) => {
  return (
    <div className={classes.comment + ' mb-3'}>
      <img
        src={userImage ? BASE_URL + '/' + userImage : profilePlaceholder}
        alt="comment_profile_picture"
      />
      <h5>{ username }</h5>
      <Moment fromNow>{ createdAt }</Moment>
      <p className='mb-0'>{ text }</p>
    </div>
  );
};

export default Comment;
