import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div data-test="app">
        <div>
          <MainNavigation />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<AllMeetupsPage />} />
              <Route path="new" element={<NewMeetupsPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="*" element={<div>NOT FOUND</div>} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
