import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { notLandingPage } from '../../redux';
import './NotFoundStyles.css';

const NotFound = ({ notLandingPage, history }) => {
  const handleClick = () => history.goBack();
  useEffect(() => {
    notLandingPage();
  }, [notLandingPage]);
  return (
    <div className='NotFound'>
      <div
        onClick={handleClick}
        className='buttons type-primary button-trainers'
      >
        Go Back
      </div>
      <div>
        <h1>404 page not found</h1>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default connect(null, { notLandingPage })(NotFound);
