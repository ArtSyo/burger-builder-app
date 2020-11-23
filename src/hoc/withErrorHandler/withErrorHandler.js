import React from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };

    _isMounted;

    componentDidMount() {
      this._isMounted = true;

      this.requestInterceptor = axios.interceptors.response.use((req) => {
        if (this._isMounted) {
          this.setState({
            error: null,
          });
        }
        return req;
      });
      this.responsetInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          if (this._isMounted) {
            this.setState({
              error: error,
            });
          }
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responsetInterceptor);
      this._isMounted = false;
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
