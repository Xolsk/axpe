import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NewMeetupForm from "./NewMeetupForm";
import "@testing-library/jest-dom/extend-expect";

const mockSubmit = jest.fn();
jest.mock("../../util-hooks/useFetch", () => ({
  useFetch: () => ({
    data: null,
    error: null,
    execute: mockSubmit,
    isLoading: false,
    clear: jest.fn(),
  }),
}));

test("renders NewMeetupForm and allows input changes", () => {
  render(
    <Router>
      <NewMeetupForm />
    </Router>
  );

  // Check if the form inputs are rendered
  expect(screen.getByLabelText(/Meetup Title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Meetup Image/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();

  // Simulate input changes
  fireEvent.change(screen.getByLabelText(/Meetup Title/i), {
    target: { value: "New Title" },
  });
  fireEvent.change(screen.getByLabelText(/Meetup Image/i), {
    target: { value: "http://newimage.com" },
  });
  fireEvent.change(screen.getByLabelText(/Address/i), {
    target: { value: "New Address" },
  });
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: "New Description" },
  });

  // Verify the input values
  expect(screen.getByLabelText(/Meetup Title/i).value).toBe("New Title");
  expect(screen.getByLabelText(/Meetup Image/i).value).toBe(
    "http://newimage.com"
  );
  expect(screen.getByLabelText(/Address/i).value).toBe("New Address");
  expect(screen.getByLabelText(/Description/i).value).toBe("New Description");
});

test("submits the form with correct data", () => {
  const { submit } = require("../../util-hooks/useFetch").useFetch();

  render(
    <Router>
      <NewMeetupForm />
    </Router>
  );

  // Simulate input changes
  fireEvent.change(screen.getByLabelText(/Meetup Title/i), {
    target: { value: "New Title" },
  });
  fireEvent.change(screen.getByLabelText(/Meetup Image/i), {
    target: { value: "http://newimage.com" },
  });
  fireEvent.change(screen.getByLabelText(/Address/i), {
    target: { value: "New Address" },
  });
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: "New Description" },
  });

  // Simulate form submission
  fireEvent.submit(screen.getByRole("button", { name: /Add Meetup/i }));

  // Verify if submit function is called with correct data
  expect(mockSubmit).toHaveBeenCalledWith({
    body: JSON.stringify({
      title: "New Title",
      image: "http://newimage.com",
      description: "New Description",
      address: "New Address",
    }),
  });
});
