import React, { useState } from "react";
import { useDispatch } from "react-redux";

import defaultThumbnail from "../thumbnail/dummy.png";
import classes from "./AddForm.module.css";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(defaultThumbnail);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleAddProduct = () => {
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

    const newProduct = {
      id: Date.now(),
      title,
      desc,
      price: `${parsedPrice}$`,
      thumbnail, 
    };
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    setTitle("");
    setDesc("");
    setPrice("");
    setThumbnail(defaultThumbnail); 
    setShowForm(false);
  };

  const handleCancel = () => {
    setTitle("");
    setDesc("");
    setPrice("");
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div>
        <button onClick={handleShowForm}>Add New Product Item</button>
      </div>
    );
  }

  return (
    <div className={classes.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <div>
        <button onClick={handleAddProduct}>Add</button>
        <button onClick={handleCancel}>Exit</button>
      </div>
    </div>
  );
};

export default AddProductForm;
