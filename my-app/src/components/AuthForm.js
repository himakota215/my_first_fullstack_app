import React, { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 350px;
  margin: 20px auto;
  background-color: #f9f9f9;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: ${props => props.primary ? "#007bff" : '#6c757d'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? "#0056b3" : '#5a6268'};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

function AuthForm({ onSubmit, initialError = '' }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(initialError);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const result = await onSubmit({ username, password });
    if (result && result.error) {
      setError(result.error);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h3>Login</h3>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputGroup>
        <Label htmlFor='username'>Username:</Label>
        <Input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor='password'>Password:</Label>
        <Input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </InputGroup>
      <Button type='submit' primary>Login</Button>
    </FormWrapper>
  );
}

export default AuthForm;