import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { notLandingPage, register, setAlert } from '../../redux';
import { Redirect, Link } from 'react-router-dom';
import './RegisterStyles.css';
import Alert from '../Layouts/Alert';

const Register = ({ isAuthenticated, notLandingPage, register, setAlert }) => {
  useEffect(() => {
    notLandingPage();
  }, [notLandingPage, isAuthenticated]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  if (isAuthenticated) return <Redirect to='/pokedex' />;

  const { username, email, password, password2 } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      register({ username, email, password });
      setFormData({ username: '', email: '', password: '', password2: '' });
    } else {
      setAlert('Passwords do not match', 'danger');
      setFormData({ ...formData, password: '', password2: '' });
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='Register'>
      <div className='Register-group'>
        <h4>Register</h4>
        <div className='Register-alert'>
          <Alert />
        </div>
        <form onSubmit={handleSubmit} className='Register-form'>
          <input
            type='text'
            name='username'
            placeholder='Name'
            onChange={handleOnChange}
            value={username}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='E-mail'
            onChange={handleOnChange}
            value={email}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleOnChange}
            value={password}
            minLength={6}
            required
          />
          <input
            type='password'
            name='password2'
            placeholder='Retype Password'
            onChange={handleOnChange}
            value={password2}
            minLength={6}
            required
          />
          <button type='submit' className='buttons type-primary'>
            Register
          </button>
        </form>
        <p>
          Do you have an account? <Link to='/login'>Login now</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { notLandingPage, register, setAlert })(
  Register
);
