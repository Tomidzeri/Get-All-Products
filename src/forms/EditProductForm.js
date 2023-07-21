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
    if (!title.trim() || !desc.trim() || parseFloat(price) <= 0.01) {
      setError("Fields are empty or the price is not typed in correctly.");
      return;
    }

    const editedProduct = {
      ...product,
      title,
      desc,
      price: `${parseFloat(price).toFixed(2)}$`, 
    };
    dispatch({ type: "EDIT_PRODUCT", payload: editedProduct });
    onSave();
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value.replace(/\$/g, "");
    const newPrice =
      inputValue === "" || /^\d+$/.test(inputValue) ? inputValue : price;
    setPrice(newPrice);
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
        value={price}
        onChange={handlePriceChange}
        placeholder="Price"
      />
      {error && <p className={classes.error}>{error}</p>} 
      <button onClick={handleEditProduct}>Save Changes</button>
    </div>
  );
};

export default EditProductForm;
