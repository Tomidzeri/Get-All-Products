import React, { useState } from "react";
const SortProducts = ({ products, dispatch }) => {
  const [sortingOption, setSortingOption] = useState("");
  const [sortingOrder, setSortingOrder] = useState("ascending");

  const handleSort = (option) => {
    if (!products || products.length === 0) {
      return;
    }

    let updatedSortingOrder = "ascending";

    if (option === sortingOption) {
      updatedSortingOrder =
        sortingOrder === "ascending" ? "descending" : "ascending";
    }

    let sortedProducts = [...products];

    if (option === "price-asc") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (option === "price-desc") {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (option === "title-asc") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "title-desc") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (updatedSortingOrder === "descending") {
      sortedProducts.reverse();
    }

    dispatch({ type: "UPDATE_PRODUCTS", payload: sortedProducts });
    setSortingOption(option);
    setSortingOrder(updatedSortingOrder);
  };

  return (
    <div>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortingOption}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="">Select an option</option>
        <option value="price-asc">Price - Ascending</option>
        <option value="price-desc">Price - Descending</option>
        <option value="title-asc">Title - Ascending</option>
        <option value="title-desc">Title - Descending</option>
      </select>
    </div>
  );
};

export default SortProducts;
