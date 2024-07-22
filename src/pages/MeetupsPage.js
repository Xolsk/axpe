import MeetupItem from "../components/meetups/MeetupItem";
import classes from "./../components/meetups/MeetupList.module.css";
import { useFetch } from "../util-hooks/useFetch";

export default function MeetupsPage(props) {
  const { filterBy } = props;
  console.log(filterBy, "ARRIBA");
  const { data, error, refetch } = useFetch("http://localhost:3001/meetups");

  if (error) {
    return <p>Oops something went wrong</p>;
  }
  if (data !== null) {
    const filteredData = filterBy
      ? data.filter((item) => item[filterBy] === true)
      : data;

    return (
      <section>
        <h1>All Meetups</h1>
        <ul className={classes.list}>
          {filteredData.map((item) => (
            <MeetupItem meetupItem={item} key={item.id} refetch={refetch} />
          ))}
        </ul>
      </section>
    );
  }
  return <p>Loading...</p>;
}
