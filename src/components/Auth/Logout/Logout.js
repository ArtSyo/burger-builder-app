import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authLogout } from '../../../store/actions/auth';

const Logout = (props) => {
  const { authLogout } = props;

  useEffect(() => {
    authLogout();
  }, [authLogout]);
  return <Redirect to="/" />;
};

export default connect(null, { authLogout })(Logout);
