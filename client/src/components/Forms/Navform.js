import React, { useState, memo } from 'react';
import { useHistory } from 'react-router-dom';

const Navform = () => {
  const history = useHistory();
  const [formData, setFormData] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push(`/${formData.toLowerCase()}`);
    setToggle(false);
    setFormData('');
  };

  const handleOnChange = (e) => {
    setFormData(e.target.value);
  };

  const handleClick = () => {
    setToggle(!toggle);
    setFormData('');
  };
  return (
    <div className='Navbar-form'>
      <div className={`Navbar-formInput ${toggle ? null : 'close'}`}>
        <form onSubmit={handleOnSubmit}>
          <input
            type='text'
            name='search'
            placeholder='Pokemon Search...'
            value={formData}
            onChange={handleOnChange}
          />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
      <i className={`fas fa-search icon`} onClick={handleClick}></i>
      <i
        className={`fa fa-close icon ${toggle ? null : 'close'}`}
        onClick={handleClick}
      ></i>
    </div>
  );
};

export default memo(Navform);
