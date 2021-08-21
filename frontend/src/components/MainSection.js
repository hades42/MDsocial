import React, { useEffect, useState } from "react";
import Poem from "./Poem";
import axios from "axios";
import classes from "./MainSection.module.css";
const MainSection = () => {
  const [listPoem, setListPoem] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          bob: "Bobalooba",
        },
      };
      const { data } = await axios.get(
        "https://shielded-spire-87442.herokuapp.com/api/poems",
        config
      );
      console.log(data);
      setListPoem(data);
    };
    fetchData();
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h3>Latest stories</h3>
      </div>
      <div className={classes.content}>
        {listPoem.map((p) => (
          <Poem key={p.id} poem={p}></Poem>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
