import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";

export default function MeetupItem(props) {
  const {meetupItem} = props

  return (
    <li className={classes.item} data-test='meet-up-item'>
      <Card>
        <div className={classes.image}>
          <img src={meetupItem.image} alt={meetupItem.title} />
        </div>
        <div className={classes.content}>
          <h3>{meetupItem.title}</h3>
          <address>{meetupItem.address}</address>
          <p>{meetupItem.description}</p>
        </div>
        <div className={classes.actions}>
          <button>Add to favorites</button>
        </div>
      </Card>
    </li>
  );
}



