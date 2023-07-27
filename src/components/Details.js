import React from "react";
import classes from "./Products.module.css";

const Details = (props) => {
  return (
    <div className={classes.product}>
      <div className={classes.thumbnailContainer}>
        <img
          src={props.thumbnail}
          className={classes.thumbnail}
          alt="Product Thumbnail"
        />
      </div>
      <h2 className={classes.title}>{props.title}</h2>
      <h3 className={classes.description}>{props.desc}</h3>
      <p className={classes.price}>{props.price}</p>
    </div>
  );
};

export default Details;