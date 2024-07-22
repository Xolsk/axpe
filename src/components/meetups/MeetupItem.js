import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useState, useEffect } from "react";
import { useFetch } from "../../util-hooks/useFetch";

export default function MeetupItem(props) {
  const { meetupItem, refetch } = props;
  const [fetchId, setFetchId] = useState(null);
  const { data, isLoading, error } = useFetch(
    fetchId !== null ? `http://localhost:3001/meetups/${fetchId}` : null,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...meetupItem, favorited: !meetupItem.favorited }),
    }
  );

  const handleFavoriting = () => {
    setFetchId(meetupItem.id);
  };

  useEffect(() => {
    if (data !== null) {
      refetch();
      setFetchId(null);
    }
  }, [data]);

  return (
    <li className={classes.item} data-test="meet-up-item">
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
          <button
            onClick={() => {
              handleFavoriting();
            }}
          >
            {meetupItem.favorited
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>
        {error && <div>something went wrong favoriting, please try again</div>}
      </Card>
    </li>
  );
}
