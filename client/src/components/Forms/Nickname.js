import React, { useState, memo } from 'react';
import { editNickName } from '../../redux';
import { useDispatch } from 'react-redux';
import './NicknameStyles.css';

const Nickname = ({ nickname, pokemonId, currentUserId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(`${nickname}`);
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editNickName(currentUserId, pokemonId, formData));
    setToggle(!toggle);
  };

  const handleToggle = () => {
    setToggle(!toggle);
    setFormData(`${nickname}`);
  };

  const handleOnChange = (e) => {
    setFormData(e.target.value);
  };

  return toggle ? (
    <div>
      <form onSubmit={handleSubmit} className='Nickname'>
        <input
          type='text'
          value={formData}
          onChange={handleOnChange}
          minLength='1'
          maxLength='11'
          required
        />
        <button type='submit'>✓</button>
        <button onClick={handleToggle}>x</button>
      </form>
    </div>
  ) : (
    <div className='Nickname'>
      <h4>{nickname}</h4>
      <button onClick={handleToggle}>
        <i className='fas fa-pen'></i>
      </button>
    </div>
  );
};

export default memo(Nickname);
