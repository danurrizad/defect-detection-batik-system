import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserAndUpdateStorage = (data) => {
    setUser(data);
    localStorage.setItem('userDataContext', JSON.stringify(data)); // Simpan sebagai JSON string
  };

  return (
    <UserContext.Provider value={{ user, setUserAndUpdateStorage }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
