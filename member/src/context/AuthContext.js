'user client'
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [statusText, setStatusText] = useState('...');
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [initialLoading, setInitialLoading] = useState(false);

  const router = useRouter();


  useEffect(() => {

    router.prefetch("/login")
    checkUserLoggedIn()


  }, [])


  // Login user
  // =====================================
  const login = async ({ email, password }) => {
    setIsLoading(true);
    setIsError(null);
    var success=false;
    try {
      const res = await fetch(`${NEXT_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const rdata = await res.json();

      if (rdata.token) {
        localStorage.setItem('token', rdata.token)
        // await checkUserLoggedIn()
        setUser(rdata.user)
        setIsLoading(false);
        setIsError(null);
        success=true;

        router.push('/');
      } else {
        setIsLoading(false);
        setIsError(rdata.error);
        success=false;
        // setIsError(null);
      }
    }
    catch (e) {
      setIsLoading(false);
      setIsError(e.error);
      setIsError(null);
      success=false;
    }
    return success;
  };

  // Check if user is logged in
  // ================================================
  const checkUserLoggedIn = async () => {
    if (initialLoading) return;

    setInitialLoading(true);
    setStatusText('Checking user...')
    const token = localStorage.getItem('token') || '';

    if (token.length == 0) {
      router.push('/login');
      //setUser(null);
    }

    const res = await fetch(`${NEXT_URL}/api/user/current`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();
    setInitialLoading(false);
    setStatusText('Checking user...Done.')
    if (responseData.id) {
      setUser(responseData);
    } else {
      router.push('/login');
      setUser(null);

    }
  };

  // Logout user
  // =====================================

  const logout = async () => {
    setIsLoading(true);

    localStorage.setItem('token', '')
    setUser(null);
    router.push('/login');
    setIsLoading(false);


    fetch(`${NEXT_URL}/api/user/logout`, {
      method: 'POST',
    }).catch((error) => {
      setIsLoading(false);
      console.error('error logging out user');
    });
  };

  return (
    <AuthContext.Provider value={{ user, isError, initialLoading, isLoading, login, logout, checkUserLoggedIn, statusText }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
