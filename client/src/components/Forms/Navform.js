import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Navform = () => {
  const history = useHistory();
  const [formData, setFormData] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push(`/${formData}`);
    setFormData('');
  };

  const handleOnChange = (e) => {
    setFormData(e.target.value);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type='text'
        name='search'
        placeholder='Search for Name or National ID'
        className='Navbar-form'
        value={formData}
        onChange={handleOnChange}
      />
      <button type='submit'>S</button>
    </form>
  );
};

export default Navform;
