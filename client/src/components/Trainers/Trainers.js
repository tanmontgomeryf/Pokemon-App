import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersData, notLandingPage } from '../../redux';
import Loader from '../Layouts/Loader';
import TrainersItem from './TrainersItem';

const Trainers = ({
  users: { users, isLoading },
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
    <div>
      {users.map((user) => (
        <TrainersItem key={user._id} user={user} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { fetchUsersData, notLandingPage })(
  Trainers
);
