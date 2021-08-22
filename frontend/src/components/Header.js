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
          <Link classes={classes.link} to={"/createPoem"}>
            Add new Poem
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
