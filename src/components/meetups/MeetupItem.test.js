/* eslint-disable testing-library/no-debugging-utils */
import { shallow } from "enzyme";
import MeetupItem from "./MeetupItem";

test("<MeetupItem/> renders without crashing", () => {
  const wrapper = shallow(
    <MeetupItem
      meetupItem={{
        id: "m1",
        title: "This is a first meetup",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
        address: "Meetupstreet 5, 12345 Meetup City",
        description:
          "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
      }}
    />
  );
  expect(wrapper.exists()).toBe(true);
});
