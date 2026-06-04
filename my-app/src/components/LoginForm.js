import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/login',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Login failed'
        );
      }

      localStorage.setItem(
        'access_token',
        data.access_token
      );

      onLogin(data.access_token);

      alert('Login Successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <div>
        <label>Username</label>

        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />
      </div>

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;