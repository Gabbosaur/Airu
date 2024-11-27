'use client';

import {
  Button,
  TextInput,
  Form,
} from '@carbon/react';
import { useState } from 'react';
import { login } from './requests';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', { username, password });
    
    login(username, password)
      .then((response) => {
        console.log('Login successful', response);
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
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
          <Button type="submit" style={styles.button}>Login</Button>
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
    maxWidth: '400px', // Limit the form width for a nice layout
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column', // Stack the items vertically
    gap: '16px', // Add space between form elements
  },
  input: {
    marginBottom: '16px', // Space between inputs
  },
  button: {
    marginTop: '16px', // Space above the button
  },

  // Responsive Styles
  '@media (max-width: 600px)': {
    container: {
      padding: '10px',
    },
    formContainer: {
      padding: '15px',
      width: '100%',
      maxWidth: '100%', // Form can take full width on small screens
    },
    form: {
      gap: '12px', // Reduce the space between form elements on smaller screens
    },
    input: {
      marginBottom: '12px', // Adjust margin between inputs
    },
    button: {
      marginTop: '12px', // Adjust space above the button
    },
  },

  '@media (max-width: 400px)': {
    container: {
      padding: '5px', // Smaller padding for even smaller screens
    },
    formContainer: {
      padding: '10px', // Reduce padding further
    },
    form: {
      gap: '10px', // Further reduce gap between form elements
    },
  },
};

export default LoginPage;
