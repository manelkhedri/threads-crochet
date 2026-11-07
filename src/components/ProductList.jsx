
import { useState } from 'react';
import { useSelector } from 'react-redux';

import ProductCard from './ProductCard';
import SearchBar from './SearchBar';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get products from Redux store
  const products = useSelector((state) => state.products.items);

  // Extract categories from products
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Search and filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="products-section">
      <h2>Our Crochet Collection</h2>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <p>{filteredProducts.length} products found</p>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No products found. Try another search.</p>
        )}
      </div>
    </section>
  );
}

export default ProductList;


