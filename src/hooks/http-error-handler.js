import { useState, useEffect } from 'react';

export default function HttpErrorHandler(httpClient) {
  const { interceptors } = httpClient;
  const [error, setError] = useState(null);

  const requestInterceptor = interceptors.response.use((req) => {
    setError(null);
    return req;
  });
  const responsetInterceptor = interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      interceptors.request.eject(requestInterceptor);
      interceptors.response.eject(responsetInterceptor);
    };
  }, [requestInterceptor, responsetInterceptor, interceptors]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
}
