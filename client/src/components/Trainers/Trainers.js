import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsersData, notLandingPage } from '../../redux';
import { userFirst } from '../../helpers';
import Loader from '../Layouts/Loader';
import TrainersItem from './TrainersItem';
import './TrainersStyles.css';

const Trainers = ({
  users: { users, isLoading },
  auth: { isAuthenticated, user },
  notLandingPage,
  fetchUsersData,
}) => {
  const history = useHistory();
  const handleClick = () => history.goBack();
  useEffect(() => {
    notLandingPage();
    fetchUsersData();
  }, [fetchUsersData, notLandingPage]);
  return isLoading || users === null ? (
    <Loader />
  ) : (
    <div className='Trainers'>
      <div
        onClick={handleClick}
        className='buttons type-primary button-trainers'
      >
        Go Back
      </div>
      <div className='Trainers-group'>
        {isAuthenticated
          ? userFirst(users, user.username).map((user) => (
              <TrainersItem key={user._id} user={user} />
            ))
          : users.map((user) => <TrainersItem key={user._id} user={user} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchUsersData, notLandingPage })(
  Trainers
);
