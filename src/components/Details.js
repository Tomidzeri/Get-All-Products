import React from "react";
import classes from "./Products.module.css";

const Details = (props) => {

  return (
    <div className={classes.product}>
      <h2>{props.title}</h2>
      <img src={props.thumbnail} className={classes.thumbnail} alt="Product Thumbnail" />
      <h3>{props.desc}</h3>
      <p>{props.price}</p>
    </div>
  );
};

export default Details;