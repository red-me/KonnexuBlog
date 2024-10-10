import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [statusText, setStatusText] = useState('...');
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [initialLoading, setInitialLoading] = useState(false);

  const router = useRouter();




  // Update user
  // =====================================
  const updateUser = async ({ id, firstName, lastName, name, email }) => {
    setIsLoading(true);
    setIsError(null);

    let success = false;
    try {

      const token = localStorage.getItem('token') || '';

      if (token.length == 0) {
        router.push('/login');
        //setUser(null);
      }

      const res = await fetch(`${NEXT_URL}/api/user/update`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ id, firstName, lastName, name, email }),
      });

      const responseData = await res.json();

      if (responseData.id) {
        setUser(responseData);
        success = true;
      } else {
        setIsError(responseData.error || 'Unknown error. try again later.');

        success = false;
      }
      setIsLoading(false);

      return success;
    }
    catch (e) {
      setIsLoading(false);
      setIsError(e.message);

    }
  };

  //change password
  const updatePassword = async ({ id, oldPassword, newPassword, tries = 0 }) => {
    setIsLoading(true);
    setIsError(null);
    let success = false;
    try {

      const token = localStorage.getItem('token') || '';

      if (token.length == 0) {
        router.push('/login');
        //setUser(null);
      }

      const res = await fetch(`${NEXT_URL}/api/user/updatepassword`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ id, oldPassword, newPassword, tries }),
      });

      const responseData = await res.json();

      if (responseData.id) {
        //dont update user data..
        //setUser(responseData);
        setIsError(null);
        success = true;
      } else {
        setIsError(responseData.error || 'Unknown error. try again later.');
        success = false

      }
      setIsLoading(false);
    }
    catch (e) {
      setIsLoading(false);
      setIsError(e.message);
      success=false

    }
    return success
  };

  // gte user by name
  // ================================================
  const getUserByName = async (name) => {
    if (initialLoading) return;

    setInitialLoading(true);
    setStatusText('Checking user...')
    const token = localStorage.getItem('token') || '';

    if (token.length == 0) {
      router.push('/login');
      //setUser(null);
    }

    const res = await fetch(`${NEXT_URL}/api/user/name/${name}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
    setInitialLoading(false);
    setStatusText('Checking user...Done.')
    if (responseData.id) {
      setUser(responseData);
    } else {

      setUser(null);

    }
  };


  // gte user by id
  // ================================================
  const getUserById = async (id) => {
    if (initialLoading) return;

    setInitialLoading(true);
    setStatusText('Checking user...')
    const token = localStorage.getItem('token') || '';

    if (token.length == 0) {
      router.push('/login');
      //setUser(null);
    }

    const res = await fetch(`${NEXT_URL}/api/user/${parseInt(id)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
    setInitialLoading(false);
    setStatusText('Checking user...Done.')
    if (responseData.id) {
      setUser(responseData);
    } else {

      setUser(null);

    }
  };


  return (
    <UserContext.Provider value={{ user, isError, isLoading, getUserByName, getUserById, statusText, updateUser, updatePassword }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
