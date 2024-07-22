import { render, screen, waitFor } from "@testing-library/react";
import MeetupsPage from "./MeetupsPage";
import { useFetch } from "../util-hooks/useFetch";
import { useViewContext } from "../contexts/ViewContext";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../util-hooks/useFetch");
jest.mock("../contexts/ViewContext");
jest.mock("../components/meetups/MeetupItem", () => ({ meetupItem }) => (
  <div>{meetupItem.title}</div>
));

// Mock CSS module
jest.mock("../components/meetups/MeetupList.module.css", () => ({
  list: "mocked-list-class",
}));

describe("MeetupsPage", () => {
  const updateFavoriteCounterMock = jest.fn();

  beforeEach(() => {
    useViewContext.mockReturnValue({
      updateFavoriteCounter: updateFavoriteCounterMock,
    });
  });

  test("renders loading state initially", () => {
    useFetch.mockReturnValue({ data: null, error: null, refetch: jest.fn() });

    render(<MeetupsPage title="All meetups" />);

    expect(screen.getByText("Loading...")).toBeVisible();
  });

  test("renders error state", () => {
    useFetch.mockReturnValue({ data: null, error: true, refetch: jest.fn() });

    render(<MeetupsPage title="All meetups" />);

    expect(screen.getByText("Oops something went wrong")).toBeVisible();
  });

  test("renders meetups when data is available", async () => {
    const mockData = [
      { id: 1, title: "Meetup 1", favorited: false },
      { id: 2, title: "Meetup 2", favorited: true },
    ];
    useFetch.mockReturnValue({
      data: mockData,
      error: null,
      refetch: jest.fn(),
    });

    render(<MeetupsPage title="All meetups" />);

    await waitFor(() => {
      expect(screen.getByText("Meetup 1")).toBeVisible();
      expect(screen.getByText("Meetup 2")).toBeVisible();
    });
  });

  test("renders filtered meetups when filterBy is applied", async () => {
    const mockData = [
      { id: 1, title: "Meetup 1", favorited: false },
      { id: 2, title: "Meetup 2", favorited: true },
    ];
    useFetch.mockReturnValue({
      data: mockData,
      error: null,
      refetch: jest.fn(),
    });

    render(<MeetupsPage title="Favorited meetups" filterBy="favorited" />);

    await waitFor(() => {
      expect(screen.queryByText("Meetup 1")).not.toBeInTheDocument();
      expect(screen.getByText("Meetup 2")).toBeVisible();
    });
  });

  test('renders "No available meetups here!" when no meetups match filter', async () => {
    const mockData = [
      { id: 1, title: "Meetup 1", favorited: false },
      { id: 2, title: "Meetup 2", favorited: false },
    ];
    useFetch.mockReturnValue({
      data: mockData,
      error: null,
      refetch: jest.fn(),
    });

    render(<MeetupsPage title="Favorited meetups" filterBy="favorited" />);

    await waitFor(() => {
      expect(screen.getByText("No available meetups here!")).toBeVisible();
    });
  });
});
