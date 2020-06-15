import React from 'react';
import { totalTeamPower } from '../../helpers';

const TrainerMain = ({ users, auth, handleUserDelete }) => {
  return (
    <div className='TrainerMain'>
      <h4>Trainer Details</h4>
      <div>
        <h4>Trainer:</h4>
        <p className='Trainer-cardTitle'>{users.user.username}</p>
      </div>
      <div>
        <h4>Trainer Id:</h4>
        <p>{users.user._id}</p>
      </div>
      <div>
        <h4>Team Power:</h4>
        <p>{totalTeamPower(users.user.pokemonTeam)}</p>
      </div>
      {!users.isLoading &&
        users.user !== null &&
        auth.user !== null &&
        users.user._id === auth.user._id && (
          <button
            className='buttons type-danger button-delete'
            onClick={handleUserDelete}
          >
            Delete User
          </button>
        )}
    </div>
  );
};

export default TrainerMain;
