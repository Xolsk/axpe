import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MeetupItem from "./MeetupItem";
import { useFetch } from "../../util-hooks/useFetch";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../util-hooks/useFetch");
jest.mock("../ui/Card", () => ({ children }) => <div>{children}</div>);

const mockRefetch = jest.fn();

const mockMeetupItem = {
  id: 1,
  title: "Test Meetup",
  address: "123 Test St",
  description: "This is a test meetup",
  image: "test.jpg",
  favorited: false,
};

describe("MeetupItem", () => {
  beforeEach(() => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders MeetupItem component", () => {
    render(<MeetupItem meetupItem={mockMeetupItem} refetch={mockRefetch} />);

    expect(screen.getByText("Test Meetup")).toBeInTheDocument();
    expect(screen.getByText("123 Test St")).toBeInTheDocument();
    expect(screen.getByText("This is a test meetup")).toBeInTheDocument();
    expect(screen.getByAltText("Test Meetup")).toBeInTheDocument();
  });

  test("handles favoriting interaction", async () => {
    useFetch.mockReturnValueOnce({
      data: { ...mockMeetupItem, favorited: true },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      clear: jest.fn(),
    });

    render(<MeetupItem meetupItem={mockMeetupItem} refetch={mockRefetch} />);

    const button = screen.getByText("Add to favorites");
    fireEvent.click(button);

    expect(useFetch).toHaveBeenCalledWith(
      "http://localhost:3001/meetups/1",
      expect.objectContaining({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...mockMeetupItem, favorited: true }),
      })
    );

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test("displays loading state during fetch", async () => {
    useFetch.mockReturnValueOnce({
      data: "mock",
      isLoading: true,
      error: null,
      refetch: jest.fn(),
      clear: jest.fn(),
    });

    render(<MeetupItem meetupItem={mockMeetupItem} refetch={mockRefetch} />);

    expect(await screen.findByText("loading...")).toBeInTheDocument();
  });

  test("displays error state during fetch", async () => {
    useFetch.mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: true,
      refetch: jest.fn(),
    });

    render(<MeetupItem meetupItem={mockMeetupItem} refetch={mockRefetch} />);

    expect(
      await screen.findByText("something went wrong favoriting, please try")
    ).toBeInTheDocument();
  });
});
