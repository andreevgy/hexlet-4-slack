import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUser(userData);
    }
  }, []);
  const logIn = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/login');
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <UserContext.Provider value={{
      logIn, getAuthHeader, user, logOut,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
