import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(()=>{
  //       // console.log("setCsvDataAndUpdateStorage pada CSVDATAPROVIDER :", csvDataJson)
        
  // }, [csvDataJson])

  const setUserAndUpdateStorage = (data) => {
    // console.log("data:",data)
    setUser(data);
    localStorage.setItem('userDataContext', data); // Simpan sebagai JSON string
    console.log("User login :", user)
    // localStorage.setItem('csvDataJson', data); // Simpan sebagai JSON 
    // console.log("setCsvDataAndUpdateStorage pada CSVDATAPROVIDER :", csvDataJson)
  };

  return (
    <UserContext.Provider value={{ user, setUserAndUpdateStorage }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
