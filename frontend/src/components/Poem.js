import React from "react";
import classes from "./Poem.module.css";

const Poem = ({ poem }) => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h2 className={classes.title}>{poem.title}</h2>
        <div className={classes.author}>
          <p>By {poem.author}</p>
        </div>
        <div className={classes.coverLetter}>K</div>
      </div>
      <div className={classes.main}>
        <div className={classes.vote}>
          <div className={classes.upVote}>
            <i className="fas fa-chevron-up"></i>
          </div>
          <p>{poem.votes}</p>
          <div className={classes.downVote}>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        <div className={classes.content}>
          Credibly customize visionary niches before alternative services.
          Compellingly restore effective total linkage with sticky resources.
          Appropriately reconceptualize multifunctional leadership skills
          without turnkey outsourcing. Continually restore cross functional
          results through transparent models. Phosfluorescently seize 2.0
          leadership for viral content. Dynamically disseminate customer
          directed...
        </div>
      </div>
      <div className={classes.footer}>
        <button className={classes.readOn}>Read On</button>
      </div>
    </div>
  );
};
export default Poem;
