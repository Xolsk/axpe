import MeetupItem from "../components/meetups/MeetupItem";
import classes from "./../components/meetups/MeetupList.module.css";
import { useFetch } from "../util-hooks/useFetch";

export default function AllMeetupsPage() {
  const { data, error } = useFetch("/data.json");

  if (error) {
    return <p>Oops something went wrong</p>;
  }

  if (data !== null) {
    return (
      <section>
        <h1>All Meetups</h1>
        <ul className={classes.list}>
          {data.map((item) => (
            <MeetupItem meetupItem={item} key={item.id} />
          ))}
        </ul>
      </section>
    );
  }
  return <p>Loading...</p>;
}
