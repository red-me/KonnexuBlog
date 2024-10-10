import React, { createContext, useState, useEffect } from 'react';


import dynamic from 'next/dynamic'
import { importRemote } from "module-federation-import-remote";

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const AppsContext = createContext();

export const AppsProvider = ({ children }) => {
  const [apps, setApps] = useState(null);

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percentageLoaded, setPercentageLoaded] = useState(0);

  const [appCount, setAppCount] = useState(0)
  const [appLoadedCount, setAppLoadedCount] = useState(0)
  const [loadPercentage, setLoadPercentage] = useState(0)

  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {

  /*   if (isInitialized == false) loadApps() */

  }, [])



  useEffect(() => {

    const newValue = parseInt(appLoadedCount / appCount) * 100
    setLoadPercentage(isNaN(newValue) ? 0 : newValue);
    return () => {
      setLoadPercentage(0)
    }

  }, [appCount, appLoadedCount])


  // Get Load Apps
  // ================================================
  const loadApps = async () => {

    if (isLoading == true) return;
    setIsLoading(true);

    const photoAppUrl = NEXT_URL.includes("localhost")?"http://localhost:9002": `${NEXT_URL}/files/apps/photos`;

    const _apps = [
      { url: photoAppUrl, scope: 'DEV', module: 'Main' },
      { url: photoAppUrl, scope: 'DEV', module: 'App' },
      { url: photoAppUrl, scope: 'DEV', module: 'Sidebar' },
      { url: photoAppUrl, scope: 'DEV', module: 'AddPhoto' },


      /* ,
      {
        url: `${NEXT_URL}/files/apps/photos`, scope: 'PHOTOS', module: 'Main'
      } */
    ]

    //preload the apps/
    /* apps.forEach(app => {
      importRemote(app)
    }) */;
    setAppCount(_apps.length);
    setAppLoadedCount(0);
    for (var app in _apps) {
      const appconfig = _apps[app]
      try {

        await importRemote(appconfig)
        setTimeout(() => {
          setAppLoadedCount(prev => {
            return prev + 1
          });
        }, 3000 * (appLoadedCount + 1));


      } catch (error) {
        console.log(error)
      }


    }






    //todo get apps info from backend..
    /*  const res = await fetch(`${NEXT_URL}/api/posts`, {
       headers: { Authorization: `Bearer ${token}` }
     });
     const responseData = await res.json();
 
     if (responseData.length) {
       setPosts(responseData);
     } */



    setIsLoading(false);
    setIsInitialized(true)

  };

  // Logout user
  // =====================================


  const create = async ({ title, type, content, authorEmail }) => {
    try {
      setIsCreatingPost(true)

      const token = localStorage.getItem('token') || '';

      if (token.length == 0) {
        router.push('/login');
        //setUser(null);
      }


      const res = await fetch(`${NEXT_URL}/api/post`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
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
    <AppsContext.Provider value={{
      apps, appCount,
      appLoadedCount, loadPercentage, isError, isLoading
    }}>
      {children}
    </AppsContext.Provider>
  );
};

export default AppsContext;
