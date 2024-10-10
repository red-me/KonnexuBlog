import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createId } from '@paralleldrive/cuid2';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const router = useRouter();
  const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : '';



  

  const count = async (query) => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/app/count`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      setIsError(error)
      return null

    }

  }

  const query = async (query) => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/app/query`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      setIsError(error)
      return null

    }

  }

  //*/
  const mutate = async (type, query) => {

    try {



      //const token = localStorage && localStorage.getItem('token') || '';
      //const token='NONE-FOR_NOW'

      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }

      const res = await fetch(`${NEXT_URL}/api/app/mutate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ type, query }),
      });

      const data = await res.json();
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      setIsError(error)
      return null
    }

  }

  




  return (
    <AppContext.Provider value={{ count, query, mutate, isLoading,createId }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
