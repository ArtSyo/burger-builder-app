import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.response.use((req) => {
      setError(null);
      return req;
    });
    const responsetInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responsetInterceptor);
      };
    }, [requestInterceptor, responsetInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrapperComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
