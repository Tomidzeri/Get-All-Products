import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import classes from "./AdditDet.module.css";

const AdditionalProductDetailsPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        setProductDetails(data);
      })
      .catch((error) => {
        alert("Error fetching product details.");
      });
  }, [id]);

  if (!productDetails) {
    return <p>Loading product details...</p>;
  }
  return (
    <>
      <div className={classes.product}>
        <h2>{productDetails.title}</h2>
        <img src={productDetails.thumbnail} alt="Product Thumbnail" />
        <h3>{productDetails.desc}</h3>
        <p className={classes.price}>{productDetails.price + "$"}</p>
        <ul>
          <p className={classes.additional_info}>Additional Info:</p>
          <li>
            <p>
              Discount Percentage: {productDetails.discountPercentage + "%"}
            </p>
            <p>Rating: {productDetails.rating}</p>
            <p>Stock: {productDetails.stock + "pcs"}</p>
            <p>Brand: {productDetails.brand}</p>
            <p>Category: {productDetails.category}</p>
          </li>
        </ul>
        {productDetails.images.map((image, index) => (
          <img key={index} src={image} alt={`${index + 1}`} />
        ))}
      </div>
      <div className={classes.go_back}>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    </>
  );
};

export default AdditionalProductDetailsPage;
