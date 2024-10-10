import React, { createContext, useState, useEffect } from 'react';


import dynamic from 'next/dynamic'
import { importRemote } from "module-federation-import-remote";

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const AppsContext = createContext();

export const AppsProvider = ({ children }) => {
  const [apps, setApps] = useState([]);
  
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  
  
  


  useEffect(() => {

    loadApps()

  }, [])


  
  // Get Load Apps
  // ================================================
  const loadApps = async () => {
    setIsLoading(true);
   

    //todo get apps info from backend..
   /*  const res = await fetch(`${NEXT_URL}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();

    if (responseData.length) {
      setPosts(responseData);
    } */



    setIsLoading(false);

  };

  // Logout user
  // =====================================

  
  const createPost = async ({ title, type, content, authorEmail }) => {
    try {
      setIsCreatingPost(true)

      const token = localStorage.getItem('token') || '';

      if (token.length == 0) {
        router.push('/login');
        //setUser(null);
      }


      const res = await fetch(`${NEXT_URL}/api/post`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json',},
        body: JSON.stringify({ title, type, content, authorEmail }),
      });

      const newData = await res.json();

      setPosts(posts => {
        // Object.assign would also work
        return [newData.post, ...posts];
      });
      setActivitiess(activities => {
        // Object.assign would also work
        return [newData, ...activities];
      });
      setIsCreatingPost(false)

    }
    catch (error) {
      console.error('error creating post');
    }
    finally {
      setIsCreatingPost(false)
    }

  };

  return (
    <AppsContext.Provider value={{ apps,  isError, isLoading}}>
      {children}
    </AppsContext.Provider>
  );
};

export default AppsContext;
