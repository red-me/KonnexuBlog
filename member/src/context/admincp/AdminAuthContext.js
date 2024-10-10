'user client'
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [statusText, setStatusText] = useState('...');
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);

  const router = useRouter();
  //router.prefetch("/admincp/login")


  useEffect(() => {


    checkUserLoggedIn()


  }, [])

  useEffect(() => {

    localStorage.setItem('ka', JSON.stringify(user))

  }, [user])



  // Login user
  // =====================================
  const login = async ({ email, password }) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const res = await fetch(`${NEXT_URL}/api/user/adminlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const rdata = await res.json();

      if (rdata.token) {
        localStorage.setItem('token', rdata.token)
        localStorage.setItem('token-admin', rdata.token)

        // await checkUserLoggedIn()
        setUser(rdata.user)

        setIsLoading(false);
        setIsError(null);

        router.push('/admincp');

      } else {
        setIsLoading(false);
        setIsError(rdata.error);
        // setIsError(null);
      }
    }
    catch (e) {
      setIsLoading(false);
      setIsError(e.error);
      setIsError(null);
    }
  };

  // Check if user is logged in
  // ================================================
  const checkUserLoggedIn = async () => {
    if (initialLoading) return;

    console.clear();
    console.log('Checking admin user...');
    console.log('User', user);
    setInitialLoading(true);
    setStatusText('Checking user...')
    const token = localStorage.getItem('token-admin');

    if (token === null || token === undefined || token.length == 0) {
      router.push('/admincp/login');
      //setUser(null);
    }

    const res = await fetch(`${NEXT_URL}/api/user/current`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
    setInitialLoading(false);
    setStatusText('Checking user...Done.')
    if (responseData.id) {

      if (responseData.userGroup.name != 'Administrator') {
        router.push('/admincp/login');
        setUser(null);
      }
      setUser(responseData);

      console.log('Done checking admin user...');
      console.log('User', responseData);
    } else {
      router.push('/admincp/login');
      setUser(null);

    }
  };

  // Logout user
  // =====================================

  const logout = async () => {
    setIsLoading(true);
    localStorage.setItem('token-admin', null)

    setUser(null);
    setIsLoading(false);

    fetch(`${NEXT_URL}/api/user/logout`, {
      method: 'POST',
    }).catch((error) => {
      setIsLoading(false);
      console.error('error logging out user');
    });

    router.push('/admincp/login');

  };

  return (
    <AdminAuthContext.Provider value={{ user, isError, initialLoading, isLoading, login, logout, checkUserLoggedIn, statusText }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
