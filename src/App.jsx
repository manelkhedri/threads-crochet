

import { useEffect, useState } from 'react';
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

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(sessionStorage.getItem('token'))
  );

  // Receive Google login token
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.hash.slice(1)
    );

    const token = params.get('token');

    if (token) {
      sessionStorage.setItem('token', token);
      setIsLoggedIn(true);

      // Remove token from the browser address
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
  }, []);

  // Fetch products when the website opens
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleGoogleLogin = () => {
    window.location.href =
      'http://localhost:3000/api/auth/google';
  };

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

        <div className="auth-section">
          {isLoggedIn ? (
  <div>
    <p>Logged in with Google ✓</p>

    <button
      onClick={() => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
      }}
    >
      Logout
    </button>
  </div>
) : (
  <button onClick={handleGoogleLogin}>
    Sign in with Google
  </button>
)}
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



