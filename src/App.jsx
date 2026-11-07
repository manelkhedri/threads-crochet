
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from './features/productsSlice';

import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const { status, error } = useSelector(
    (state) => state.products
  );

  // Fetch products when the website opens
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="store-header">
        <img
          src={`${import.meta.env.BASE_URL}logo.jpg`}
          alt="THREADS CROCHET LOGO"
          className="store-logo"
        />

        <div className="header-text">
          <h1>GOLDEN HANDS</h1>
          <p>Handemade with love, crafted stitch by stitch.</p>
        </div>
      </header>

      <main>
        <CartSummary />

        {status === 'loading' && (
          <p>Loading products...</p>
        )}

        {status === 'failed' && (
          <p>Error loading products: {error}</p>
        )}

        {status === 'succeeded' && (
          <ProductList />
        )}
      </main>
    </div>
  );
}

export default App;


