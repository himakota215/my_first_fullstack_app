import React, { useState } from 'react';

function RegisterForm() {
  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/register',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            'Registration failed'
        );
      }

      setMessage(
        'Registration Successful!'
      );

      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {message && (
        <p style={{ color: 'green' }}>
          {message}
        </p>
      )}

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
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
        Register
      </button>
    </form>
  );
}

export default RegisterForm;