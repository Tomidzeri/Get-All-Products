import React, { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./EditForm.module.css";

const EditProductForm = ({ product, onSave }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [price, setPrice] = useState(
    product.price.endsWith("$") ? product.price.slice(0, -1) : product.price
  );
  const [error, setError] = useState("");

  const handleEditProduct = () => {
    const parsedPrice = parseFloat(price);

    if (
      !title.trim() ||
      !desc.trim() ||
      isNaN(parsedPrice) ||
      parsedPrice <= 0.01
    ) {
      alert("Please fill in all the fields with values above 0.01.");
      return;
    }

    const editedProduct = {
      ...product,
      title,
      desc,
      price: `${parsedPrice.toFixed(2)}$`, 
    };
    dispatch({ type: "EDIT_PRODUCT", payload: editedProduct });
    onSave();
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value.replace(/\$/g, "");
    const newPrice = /^\d*\.?\d{0,2}$/.test(inputValue) ? inputValue : price;
    setPrice(newPrice);
    setError("");
  };

  return (
    <div className={classes.form}>
      <p>Title</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <p>Description</p>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />
      <p>Price</p>
      <input
        type="text"
        value={`${parseFloat(price).toFixed(0)}$`} // Display without decimals
        onChange={handlePriceChange}
        placeholder="Price"
      />
      {error && <p className={classes.error}>{error}</p>}
      <button onClick={handleEditProduct}>Save Changes</button>
    </div>
  );
};

export default EditProductForm;
