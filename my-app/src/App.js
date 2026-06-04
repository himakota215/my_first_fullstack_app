import React, { useState } from 'react';
import ProductList from './components/ProductList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [token, setToken] =
    useState(
      localStorage.getItem(
        'access_token'
      )
    );

  return (
    <div>
      <h1>E-Commerce Store</h1>

      {!token ? (
        <>
          <LoginForm
            onLogin={setToken}
          />

          <hr />

          <RegisterForm />
        </>
      ) : (
        <>
          <p>
            Logged In Successfully
          </p>

          <ProductList />
        </>
      )}
    </div>
  );
}

export default App;