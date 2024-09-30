import {NavLink} from "react-router-dom"

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" end className={({isActive}) => isActive ? classes.active : undefined}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/events" end className={({isActive}) => isActive ? classes.active : undefined}>events</NavLink>
          </li>
          <li>
            <NavLink to="/events/new"  className={({isActive}) => isActive ? classes.active : undefined}>new event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
