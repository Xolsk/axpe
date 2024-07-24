import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";
import classes from "./MainNavigation.module.css"; // Assuming you have CSS Modules enabled
import { useViewContext } from "../../contexts/ViewContext";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function MainNavigation() {
  const { favoriteCounter } = useViewContext();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowHeader(false);
      setMenuOpen(false);
    } else {
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <header
      className={`${classes.header} ${
        showHeader ? classes.headerVisible : classes.headerHidden
      }`}
      data-test="navigation-header"
    >
      <div className={classes.logo}>React Meetups</div>
      <FaBars className={classes.burgerIcon} onClick={toggleMenu} />
      <nav className={`${classes.nav} ${menuOpen ? classes.open : ""}`}>
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
