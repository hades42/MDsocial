import React from "react";
import { Link } from "react-router-dom";
import classes from "./IntroSection.module.css";

const IntroSection = () => {
  return (
    <section className={`${classes.sectionWrapper}`}>
      <div className={`${classes.coverItemContainer}`}>
        <div className={`${classes.coverLetter}`}>W</div>
        <div className={`${classes.sectionIntro}`}>
          <h2>Welcome to poemSocial</h2>
          <h2>Introduction to Markdown</h2>
        </div>
        <div className={`${classes.sectionAuthor}`}>By Van Nguyen</div>
        <Link to={`/poems/0`} className={`${classes.readingBtn}`}>
          Read On
        </Link>
      </div>
    </section>
  );
};

export default IntroSection;
