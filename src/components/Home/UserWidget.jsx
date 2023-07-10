import classes from "./UserWidget.module.css";

const UserWidget = () => {
  return (
    <div className={classes['user-widget'] + ' me-5 px-4 py-3'} >
      <img
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
      />
      <h5>Apple Icecream</h5>
      <i className="bi bi-person-gear"></i>
      <h6>0 friends</h6>
      <hr />
      <i class="bi bi-geo-alt"></i>
      <span>Somewhere out there, California</span>
      <i class="bi bi-briefcase"></i>
      <span>Some Degenerate</span>
      <hr />
      <span>Who's viewed your profile</span>
      <span>1142</span>
      <span>Impressions of your post</span>
      <span>6341</span>
      <hr />
      <h6>Social Profiles</h6>
      <i class="bi bi-twitter"></i>
      <span>Twitter</span>
      <i class="bi bi-linkedin"></i>
      <span>LinkedIn</span>
    </div>
  );
};

export default UserWidget;
