import React, { useEffect } from 'react';
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
  useEffect(() => {
    notLandingPage();
    fetchUsersData();
  }, [fetchUsersData, notLandingPage]);
  return isLoading || users === null ? (
    <Loader />
  ) : (
    <div className='Trainers'>
      {isAuthenticated
        ? userFirst(users, user.username).map((user) => (
            <TrainersItem key={user._id} user={user} />
          ))
        : users.map((user) => <TrainersItem key={user._id} user={user} />)}
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
