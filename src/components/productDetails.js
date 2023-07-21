import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./ProductList.module.css";

import EditProductForm from "../forms/EditProductForm";
import Details from "./Details";

const ProductDetails = () => {
  const products = useSelector((state) => state.products);
  const [visibleItems, setVisibleItems] = useState(9);
  const [editingProductId, setEditingProductId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch();

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
  };

  const handleDeleteProduct = (productId) => {
    dispatch({ type: "DELETE_PRODUCT", payload: productId });
  };

  const handleExtendList = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 9);
  };

  const handleShowLess = () => {
    setVisibleItems((prevVisibleItems) =>
      prevVisibleItems > 9 ? prevVisibleItems - 9 : 9
    );
  };

  const handleProductClick = (productId) => {
    if (products.find((product) => product.id === productId)) {
      setSelectedProductId(productId);
      setEditingProductId(null);
    } else {
      alert("No additional info available for this item.");
    }
  };

  return (
    <>
      <ul className={classes.product_list}>
        {products.slice(0, visibleItems).map((product) => (
          <li key={product.id}>
            {selectedProductId === product.id ? (
              <>
                <Details
                  key={product.id}
                  title={product.title}
                  thumbnail={product.thumbnail}
                  desc={product.desc}
                  price={product.price}
                />
                {editingProductId === product.id ? (
                  <EditProductForm
                    product={product}
                    onSave={() => setEditingProductId(null)}
                  />
                ) : (
                  <>
                    <div className={classes.buttons}>
                      <button onClick={() => handleEditProduct(product.id)}>
                        Edit
                      </button>
                      <button
                        className={classes.deleteBtn}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                      <Link to={`/product/${product.id}`}>
                        <button>View Details</button>
                      </Link>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div onClick={() => handleProductClick(product.id)}>
                <Details
                  key={product.id}
                  title={product.title}
                  thumbnail={product.thumbnail}
                  desc={product.desc}
                  price={product.price}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {visibleItems > 9 && <button onClick={handleShowLess}>Show Less</button>}
      {visibleItems < products.length && (
        <button onClick={handleExtendList}>Show More</button>
      )}
    </>
  );
};

export default ProductDetails;


