import MeetupsPage from "./pages/MeetupsPage";
import NewMeetupsPage from "./pages/NewMeetup";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NEW_MEETUP_PAGE, FAVORITES_PAGE } from "./utils/constants";
import { ViewContextProvider } from "./contexts/ViewContext";

function App() {
  return (
    <BrowserRouter>
      <div data-test="app">
        <div>
          <ViewContextProvider>
            <MainNavigation />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MeetupsPage title="All meetups" />} />
                <Route path={NEW_MEETUP_PAGE} element={<NewMeetupsPage />} />
                <Route
                  path={FAVORITES_PAGE}
                  element={
                    <MeetupsPage
                      filterBy="favorited"
                      title="Favorited meetups"
                    />
                  }
                />
                <Route path="*" element={<div>NOT FOUND</div>} />
              </Route>
            </Routes>
          </ViewContextProvider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
