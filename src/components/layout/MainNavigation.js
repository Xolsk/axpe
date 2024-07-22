import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";
import { useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useViewContext } from "../../contexts/ViewContext";

export default function MainNavigation() {
  const navigate = useNavigate();
  const { favoriteCounter } = useViewContext();
  return (
    <header className={classes.header} data-test="navigation-header">
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <a href="#" onClick={() => navigate(ALL_MEETUP_PAGE)}>
              All Meetups
            </a>
          </li>

          <li>
            <a href="#" onClick={() => navigate(NEW_MEETUP_PAGE)}>
              Add New Meetup
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigate(FAVORITES_PAGE)}>
              My Favorites
              <span className={classes.badge}>{favoriteCounter}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
