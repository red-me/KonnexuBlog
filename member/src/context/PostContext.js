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
  const [isUpdatingPost, setIsUpdatingPost] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const router = useRouter();
  const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : '';

  useEffect(() => {

    getLatestActivities()

  }, [])



  // Get Latest Activity/ The Activity Feed
  // ================================================
  const getLatestActivities = async () => {
    setIsLoading(true);
    //const token = localStorage.getItem('token') || '';

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

  const query = async (document, query) => {



    // const token = localStorage && localStorage.getItem('token') || '';
    if (token.length == 0) {
      throw (new Error('Not Authorized.'))
    }


    //const token='NONE-FOR_NOW'
    const res = await fetch(`${NEXT_URL}/api/post/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
      body: JSON.stringify({ document, query }),
    });

    const data = await res.json();

    return data


  }

  const query2 = (document, query) => {



    // const token = localStorage && localStorage.getItem('token') || '';
    if (token.length == 0) {
      throw (new Error('Not Authorized.'))
    }


    //const token='NONE-FOR_NOW'
   fetch(`${NEXT_URL}/api/post/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
      body: JSON.stringify({ document, query }),
    }).then(res => {

      res.json().then(data => {
        return data
      })
    });


  }

  //*/
  const mutate = async (document, type, query) => {



    //const token = localStorage && localStorage.getItem('token') || '';
    //const token='NONE-FOR_NOW'
    if (token.length == 0) {
      throw (new Error('Not Authorized'))
    }
    const res = await fetch(`${NEXT_URL}/api/post/mutate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
      body: JSON.stringify({ document, type, query }),
    });

    const data = await res.json();

    return data


  }


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

  // Create Post
  // =====================================

  const create = async ({ title, type, content, authorEmail }) => {
    try {
      setIsCreatingPost(true)

      // const token = localStorage.getItem('token') || '';

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

  // Update Post
  // =====================================

  const update = async ({ id, title, type, content, authorEmail }) => {
    try {
      setIsUpdatingPost(true)

      //const token = localStorage.getItem('token') || '';

      if (token.length == 0) {
        router.push('/login');
        //setUser(null);
      }


      const res = await fetch(`${NEXT_URL}/api/post`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ title, type, content, authorEmail }),
      });

      const updatedPost = await res.json();

      // this will only update the item in current list of posts if the item is part of the list.
      setPosts(posts => {
        // Object.assign would also work
        return posts.map((post) => {
          return post.id == updatedPost.id
            ? updatedPost
            : post;
        });
      });



      /*  setActivitiess(activities => {
         // Object.assign would also work
         return [newData, ...activities];
       }); */
      setIsUpdatingPost(false)

      return updatedPost

    }
    catch (error) {
      console.error('error creating post');
    }
    finally {
      setIsUpdatingPost(false)
    }

  };

  const count = async (document, query) => {
    if (token.length == 0) {
      throw (new Error('Not Authorized.'))
    }

    const res = await fetch(`${NEXT_URL}/api/post/count`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
      body: JSON.stringify({ document, query }),
    });

    const data = await res.json();

    return data
  }


  return (
    <PostContext.Provider value={{ activities, posts, isError, isLoading, create, update, isCreatingPost, isUpdatingPost, query,query2, mutate, count }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
