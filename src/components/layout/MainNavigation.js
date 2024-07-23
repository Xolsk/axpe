import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";
import classes from "./MainNavigation.module.css";
import { useViewContext } from "../../contexts/ViewContext";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export default function MainNavigation() {
  const { favoriteCounter } = useViewContext();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, setShowHeader]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, handleScroll]);

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
            <Link to={ALL_MEETUP_PAGE}>All Meetups</Link>
          </li>

          <li>
            <Link to={NEW_MEETUP_PAGE}>Add New Meetup</Link>
          </li>
          <li>
            <Link to={FAVORITES_PAGE}>
              My Favorites
              <span className={classes.badge}>{favoriteCounter}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
