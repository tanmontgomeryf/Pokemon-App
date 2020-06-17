import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { notLandingPage, login } from '../../redux';
import { Redirect } from 'react-router-dom';
import './LoginStyles.css';
import Alert from '../Layouts/Alert';

const Login = ({ notLandingPage, login, isAuthenticated }) => {
  useEffect(() => {
    notLandingPage();
  }, [notLandingPage]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    login(formData);
    setFormData({ email: '', password: '' });
  };

  if (isAuthenticated) return <Redirect to='/pokedex' />;

  return (
    <div className='Login'>
      <div className='Login-group'>
        <h4>Login</h4>
        <div className='Login-alert'>
          <Alert />
        </div>
        <form onSubmit={(e) => handleOnSubmit(e)} className='Login-form'>
          <input
            type='email'
            name='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => handleOnChange(e)}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => handleOnChange(e)}
            minLength='6'
            required
          />
          <button type='submit' className='buttons type-primary'>
            Login
          </button>
        </form>
        <p>
          Not Registed? <Link to='/register'>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { notLandingPage, login })(Login);
