'use client';

import { Button, TextInput, Form } from '@carbon/react';
import { loginReq } from './requests';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext/AuthProvider';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize the router
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { username, password });

    loginReq(username, password)
      .then((response) => {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        console.log('Login successful', response);
        const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
          const [name, value] = cookie.split('=').map((c) => c.trim());
          cookies[name] = value;
          return cookies;
        }, {});
        console.log('Cookies:', cookies);
        login();
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.iconContainer}>
          <img src="/favicon.ico" alt="App Icon" style={styles.icon} />
        </div>
        <Form onSubmit={handleSubmit} style={styles.form}>
          <TextInput
            id="username"
            labelText="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <TextInput
            id="password"
            labelText="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <Button type="submit" style={styles.button}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  icon: {
    width: '48px',
    height: '48px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
  },
  '@media (max-width: 600px)': {
    container: {
      padding: '10px',
    },
    formContainer: {
      padding: '15px',
      maxWidth: '100%',
    },
    form: {
      gap: '12px',
    },
    input: {
      marginBottom: '12px',
    },
    button: {
      marginTop: '12px',
    },
  },
  '@media (max-width: 400px)': {
    container: {
      padding: '5px',
    },
    formContainer: {
      padding: '10px',
    },
    form: {
      gap: '10px',
    },
  },
};

export default LoginPage;
