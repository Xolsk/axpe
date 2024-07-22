import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";
import { useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useViewContext } from "../../contexts/ViewContext";
import { useState, useEffect } from "react";

export default function MainNavigation() {
  const navigate = useNavigate();
  const { favoriteCounter } = useViewContext();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`${classes.header} ${
        showHeader ? classes.headerVisible : classes.headerHidden
      }`}
      data-test="navigation-header"
    >
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
