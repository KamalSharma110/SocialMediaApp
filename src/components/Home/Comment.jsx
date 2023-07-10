import Moment from 'react-moment';

import classes from './Comment.module.css';

const Comment = ({username, text, createdAt}) => {
  return (
    <div className={classes.comment + ' mb-3'}>
      <img
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="comment_profile_picture"
      />
      <h5>{ username }</h5>
      <Moment fromNow>{ createdAt }</Moment>
      <p className='mb-0'>{ text }</p>
    </div>
  );
};

export default Comment;
