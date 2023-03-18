import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.id
  };

  const [token, setToken] = useState(getToken());

  const saveToken = user => {
    sessionStorage.setItem('token', JSON.stringify(user));
    setToken(user.id);
  };

  return {
    setToken: saveToken,
    token
  }
}
