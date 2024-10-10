import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [activities, setActivitiess] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const router = useRouter();


  useEffect(() => {

    getLatestActivities()

  }, [])


  
  // Get Latest Activity/ The Activity Feed
  // ================================================
  const getLatestActivities = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token') || '';

    if (token.length == 0) {
      router.push('/login');
      //setUser(null);
    }

    const res = await fetch(`${NEXT_URL}/api/feed`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();

    if (responseData.length) {
      setActivitiess(responseData);
    }

    setIsLoading(false);

  };


  // Get Latest Posts
  // ================================================
  const getLatestPosts = async () => {
    setIsLoading(true);
   

    const res = await fetch(`${NEXT_URL}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const responseData = await res.json();

    if (responseData.length) {
      setPosts(responseData);
    }

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
    <PostContext.Provider value={{ activities, posts, isError, isLoading, createPost , isCreatingPost}}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
