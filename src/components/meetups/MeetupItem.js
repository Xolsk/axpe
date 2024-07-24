import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useState, useEffect, memo } from "react";
import { useFetch } from "../../util-hooks/useFetch";

function MeetupItem(props) {
  const { meetupItem, refetch } = props;
  const [fetchId, setFetchId] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
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

  useEffect(() => {
    if (data !== null) {
      console.log(data);
      refetch();
      setFetchId(null);
    }
  }, [data, refetch]);

  const handleFavoriting = () => {
    console.log("WTF");
    setFetchId(meetupItem.id);
  };

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <li className={classes.item} data-test="meet-up-item">
      <Card>
        <div className={classes.image}>
          {imageLoading && <div className={classes.loader}>Loading...</div>}
          {imageError && <div className={classes.error}>Image not found</div>}
          <img
            src={meetupItem.image}
            alt={meetupItem.title}
            onLoad={handleImageLoaded}
            onError={handleImageError}
            className={imageLoading || imageError ? classes.hiddenImage : ""}
          />
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
        {error && <div>something went wrong favoriting, please try</div>}
        {isLoading && <div>loading...</div>}
      </Card>
    </li>
  );
}

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.meetupItem.id === nextProps.meetupItem.id &&
    prevProps.meetupItem.favorited === nextProps.meetupItem.favorited &&
    prevProps.meetupItem.image === nextProps.meetupItem.image &&
    prevProps.meetupItem.title === nextProps.meetupItem.title &&
    prevProps.meetupItem.address === nextProps.meetupItem.address &&
    prevProps.meetupItem.description === nextProps.meetupItem.description
  );
};

export default memo(MeetupItem, areEqual);
