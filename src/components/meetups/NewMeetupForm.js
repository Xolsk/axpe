import { useFetch } from "../../util-hooks/useFetch";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewMeetupForm() {
  const [title, setTitle] = useState("Title");
  const [image, setImage] = useState("http://defaultvalue.com");
  const [description, setDescription] = useState("Description");
  const [address, setAddress] = useState("address");
  const { data, error, execute, isLoading, clear } = useFetch(
    "http://localhost:3001/meetups/",
    "POST"
  );
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    execute({ body: JSON.stringify({ title, image, description, address }) });
  }

  useEffect(() => {
    if (data) {
      clear();
      navigate("/");
    }
  }, [data, clear, navigate]);

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            required
            id="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Add Meetup</button>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong, try again</div>}
      </form>
    </Card>
  );
}
