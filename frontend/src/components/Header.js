import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className={classes.header}>
      <div className={`padUp container ${classes.container}`}>
        <div>
          <Link className={classes.logo} to={`/`}>
            poemSocial
          </Link>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.addPoem}>
            <Link classes={classes.link} to={"/createPoem"}>
              Add new Poem
            </Link>
          </div>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
              <NavDropdown.Item onClick={logoutHandler}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <div className={classes.signIn}>
              <Link classes={classes.signIn} to={"/login"}>
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
