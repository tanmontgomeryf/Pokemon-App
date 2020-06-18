import React from 'react';
import { connect } from 'react-redux';
import './AlertStyles.css';

const Alert = ({ alerts }) =>
  alerts.length > 0 && (
    <div className='Alert'>
      {alerts.map((alert, i) => (
        <div key={i} className={`Alert-alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </div>
  );

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
