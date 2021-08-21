import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={classes.header}>
      <div className={`padUp container ${classes.container}`}>
        <div>
          <Link className={classes.logo} to={`/`}>
            poemSocial
          </Link>
        </div>
        <div className={classes.addPoem}>
          <h5>Add new Poem</h5>
        </div>
      </div>
    </header>
  );
};

export default Header;
