import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdditionalProductDetailsPage from "./components/AdditionalProductDetailPage";
import ProductDetails from "./components/productDetails";
import AddProductForm from "./forms/AddProductForm";
import SortProducts from "./forms/SortProducts";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); 
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products); 

  function fetchProductsHandler() {
    setLoading(true);

    fetch("https://dummyjson.com/products/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const transformedDetails = data.products.map((detailData) => ({
          id: detailData.id,
          title: detailData.title,
          thumbnail: detailData.thumbnail,
          desc: detailData.description,
          price: detailData.price + "$",
        }));

        dispatch({ type: "UPDATE_PRODUCTS", payload: transformedDetails });
        setLoading(false);
        setDataFetched(true); 
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }

  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <ProductListPage
                fetchProductsHandler={fetchProductsHandler}
                loading={loading}
                dataFetched={dataFetched} 
                products={products} 
                dispatch={dispatch} 
              />
            }
          />
          <Route
            path="/product/:id"
            element={<AdditionalProductDetailsPage />}
          />
          <Route path="/product/add" element={<AddProductForm />} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

function ProductListPage({
  fetchProductsHandler,
  loading,
  dataFetched, 
  products,
  dispatch,
}) {
  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!dataFetched && ( 
            <button onClick={fetchProductsHandler}>
              Fetch Products and Its Details
            </button>
          )}
          {dataFetched && <AddProductForm />} 
          {products.length > 0 && (
            <SortProducts products={products} dispatch={dispatch} />
          )}
          <section className="loading">
            <ProductDetails />
          </section>
        </>
      )}
    </section>
  );
}

export default App;
