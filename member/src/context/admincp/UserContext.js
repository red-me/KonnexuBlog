import React, { createContext, useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL
import { Bounce, toast } from 'react-toastify';
const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const router = useRouter();
  const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : '';



  //users

  const countUsers = async (query) => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/user/count`, {
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

  const queryUsers = async (query) => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/user/query`, {
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
  const mutateUsers = async (type, query) => {

    try {



      //const token = localStorage && localStorage.getItem('token') || '';
      //const token='NONE-FOR_NOW'

      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }

      const res = await fetch(`${NEXT_URL}/api/user/mutate`, {
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


  const getUser = (filter) => {

   return  queryUsers({
      where: filter,
      select: {
        id: true,
        email: true,
        name: true,
        active: true,
        role: true,
        profile: true,
        userGroup: true,
        createdAt: true,
        updatedAt: true,
        lastActivity: true,
        lastIPAddress: true
      }
    }).then(results => {
      if (results && results.length) return results[0]
      else return null
    })
  }

  const updateUser = (id, data) => {

    mutateUsers('update', { where: { id }, data }).then(results => {
      if (results && results.id) return results
      else return null
    })
  }

  //userGroups

  const userGroupsInitialState = {
    defaultUserGroupList: [],
    customUserGroupList: []
  }

  const groupListReducer = (state, action) => {
    const { defaultUserGroupList, customUserGroupList } = state;
    switch (action.type) {

      case 'LOAD_LIST':
        return { ...state, [action.payload.id]: action.payload.data };
      case 'ADD_ITEM':

        return { defaultUserGroupList, ["customUserGroupList"]: [...customUserGroupList, action.payload.data] };

      case 'UPDATE_ITEM':



        if (action.payload.data.isDefault)
          return {
            defaultUserGroupList: defaultUserGroupList.map(d => {
              if (d.id == action.payload.data.id) return action.payload.data
              else return d;
            }),
            customUserGroupList
          }
        else
          return {
            defaultUserGroupList,
            customUserGroupList: customUserGroupList.map(d => {
              if (d.id == action.payload.data.id) return action.payload.data
              else return d;
            })
          }

      default:
        return state;
    }
  };


  const [userGroups, dispatch] = useReducer(groupListReducer, userGroupsInitialState);



  useEffect(() => {
    loadDefaultList();
    loadCustomList();

  }, [])

  const loadDefaultList = () => {
    queryUserGroups({
      include: { users: true },
      where: { isDefault: true },

      /* skip: pageIndex * pageSize,
      take: pageSize, */
    }).then(data => {
      dispatch({
        type: 'LOAD_LIST',
        payload: {
          id: 'defaultUserGroupList',
          data: data.map(ug => { return { ...ug, selected: false } }),
        }
      });

    })
  }

  const loadCustomList = () => {
    queryUserGroups({
      include: { users: true },
      where: { isDefault: false },

      /* skip: pageIndex * pageSize,
      take: pageSize, */
    }).then(data => {
      dispatch({
        type: 'LOAD_LIST',
        payload: {
          id: 'customUserGroupList',
          data: data.map(ug => { return { ...ug, selected: false } }),
        }
      });

    })
  }


  const countUserGroups = async (query) => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/usergroups/count`, {
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

  const queryUserGroups = async (query) => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/usergroups/query`, {
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


  const mutateUserGroups = async (type, query) => {

    try {



      //const token = localStorage && localStorage.getItem('token') || '';
      //const token='NONE-FOR_NOW'

      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }

      const res = await fetch(`${NEXT_URL}/api/usergroups/mutate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ type, query }),
      });

      const data = await res.json();
      setIsLoading(false)

      if (data.id)
        toast.success(`User Group ${type}d successfully.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

      return data
    } catch (error) {
      setIsLoading(false)
      setIsError(error)
      return null
    }

  }

  const createUserGroup = (name) => {
    if (name.length == 0) {
      setIsError("Name is required.")
      return false;
    }
    else
      if (userGroups.defaultUserGroupList.find(ug => ug.name === name)) {
        setIsError("This name already exists in the Default User Groups.")
        return false;
      } else
        if (userGroups.customUserGroupList.find(ug => ug.name === name)) {
          setIsError("This name already exists in the Custom User Groups.")
          return false;
        }
        else {
          setIsLoading(true)
          mutateUserGroups("create", { data: { name, isDefault: false, } }).then(data => {
            setIsLoading(true)
            if (data.id) {
              dispatch({
                type: 'ADD_ITEM',
                payload: {

                  data: { ...data, selected: false },
                }
              });
              return true
            }
            else {
              setIsError("Could not complete the request.")
              return false;
            }
          })
        }
  }

  const updateUserGroup = (data) => {
    if (data.name.length == 0) {
      setIsError("Name is required.")
      return false;
    }
    else
      if (userGroups.defaultUserGroupList.find(ug => ug.name === data.name && ug.id !== data.id)) {
        setIsError("This name already exists in the Default User Groups.")
        return false;
      } else
        if (userGroups.customUserGroupList.find(ug => ug.name === data.name && ug.id !== data.id)) {
          setIsError("This name already exists in the Custom User Groups.")
          return false;
        }
        else {
          setIsLoading(true)
          const { id, ...updateData } = data
          mutateUserGroups("update", { where: { id: data.id }, data: { ...updateData } }).then(data => {
            setIsLoading(true)
            if (data.id) {
              dispatch({
                type: 'UPDATE_ITEM',
                payload: {

                  data: { ...data, selected: false },
                }
              });
              return true
            }
            else {
              setIsError("Could not complete the request.")
              return false;
            }
          })
        }
  }

  const deleteUserGroup = async (type, query) => {

    try {



      //const token = localStorage && localStorage.getItem('token') || '';
      //const token='NONE-FOR_NOW'

      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }

      const res = await fetch(`${NEXT_URL}/api/usergroups/delete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setIsLoading(false)

      if (data.id)
        toast.success(`User Group ${type}d successfully.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

      return data
    } catch (error) {
      setIsLoading(false)
      setIsError(error)
      return null
    }

  }

  const clearError = () => { setIsError(null) }



  return (
    <UserContext.Provider value={{ countUsers, queryUsers, mutateUsers, countUserGroups, queryUserGroups, mutateUserGroups, isError, isLoading, userGroups, createUserGroup, clearError, updateUserGroup, deleteUserGroup, getUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
