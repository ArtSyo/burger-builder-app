import { useState, useEffect } from 'react';

export default function HttpErrorHandler(httpClient) {
  const [error, setError] = useState(null);

  const requestInterceptor = httpClient.interceptors.response.use((req) => {
    setError(null);
    return req;
  });
  const responsetInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.response.eject(responsetInterceptor);
    };
  }, [requestInterceptor, responsetInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
}
