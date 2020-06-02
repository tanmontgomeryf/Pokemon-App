import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { notLandingPage, login } from '../../redux';
import { Redirect } from 'react-router-dom';
import './LoginStyles.css';

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
      <form onSubmit={(e) => handleOnSubmit(e)}>
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
        <input type='submit' value='Login' className='buttons type-primary' />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { notLandingPage, login })(Login);
