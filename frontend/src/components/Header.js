import React from "react";
import { Container } from "react-bootstrap";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <header className={classes.header}>
      <div className={`padUp container ${classes.container}`}>
        <div>
          <h3>poemSocial</h3>
        </div>
        <div className={classes.addPoem}>
          <h5>Add new Poem</h5>
        </div>
      </div>
    </header>
  );
};

export default Header;
