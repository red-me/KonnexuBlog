import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createId } from '@paralleldrive/cuid2';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const AppearanceContext = createContext();

export const AppearanceProvider = ({ children }) => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [themes, setThemes] = useState([]);
  const [themesIsLoading, setThemesIsLoading] = useState(null);


  const [currentTheme, setCurrentTheme] = useState(null)
  const router = useRouter();
  const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : '';


  const [menus, setMenus] = useState([]);
  const [menusIsLoading, setMenusIsLoading] = useState(null);

  const [pages, setPages] = useState([]);
  const [pagesIsLoading, setPagesIsLoading] = useState(null);




  const Themes = {

    count: async (query) => {

      setThemesIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setThemesIsLoading(false)
        }


        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/theme/count`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        setThemesIsLoading(false)
        return data
      } catch (error) {
        setThemesIsLoading(false)
        setIsError(error)
        return null

      }

    },
    query: async (query) => {

      setThemesIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setThemesIsLoading(false)
        }


        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/theme/query`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        setThemesIsLoading(false)
        return data
      } catch (error) {
        setThemesIsLoading(false)
        setIsError(error)
        return null

      }

    },

    queryGetDefaultTheme: async () => {

      setThemesIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setThemesIsLoading(false)
        }


        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/theme/default`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        setThemesIsLoading(false)
        return data
      } catch (error) {
        setThemesIsLoading(false)
        setIsError(error)
        return null

      }

    },

    queryGetCurrentTheme: async () => {

      setThemesIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setThemesIsLoading(false)
          return null;
        }


        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/theme/current`, {
          headers: { Authorization: `Bearer ${token}` }
        },);

        const data = await res.json();
        setThemesIsLoading(false)
        return data
      } catch (error) {
        setThemesIsLoading(false)
        setIsError(error)
        return null

      }

    },

    //*/
    mutate: async (type, query) => {

      try {



        //const token = localStorage && localStorage.getItem('token') || '';
        //const token='NONE-FOR_NOW'

        if (token.length == 0) {
          setIsError('Not Authorized.');
          setThemesIsLoading(false)
        }

        const res = await fetch(`${NEXT_URL}/api/theme/mutate`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ type, query }),
        });

        const data = await res.json();
        setThemesIsLoading(false)
        return data
      } catch (error) {
        setThemesIsLoading(false)
        setIsError(error)
        return null
      }

    },

    setActiveTheme: async (themeId, previousId) => {
      try {



        //const token = localStorage && localStorage.getItem('token') || '';
        //const token='NONE-FOR_NOW'

        if (token.length == 0) {
          setIsError('Not Authorized.');
          setThemesIsLoading(false)
        }

        const res = await fetch(`${NEXT_URL}/api/theme/use`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ id: themeId, previousId }),
        });

        const data = await res.json();
        setThemesIsLoading(false)
        return data
      } catch (error) {
        setThemesIsLoading(false)
        setIsError(error)
        return null
      }
    },



  }


  const Menus = {

    count: async (query) => {

      setMenusIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setMenusIsLoading(false)
        }


        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/menu/count`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        setMenusIsLoading(false)
        return data
      } catch (error) {
        setMenusIsLoading(false)
        setIsError(error)
        return null

      }

    },
    query: async (query) => {

      setMenusIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setMenusIsLoading(false)
        }


        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/menu/query`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        setMenusIsLoading(false)
        return data
      } catch (error) {
        setMenusIsLoading(false)
        setIsError(error)
        return null

      }

    },

    queryGetDefaultMenu: async () => {

      setMenusIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setMenusIsLoading(false)
        }


        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/menu/default`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        setMenusIsLoading(false)
        return data
      } catch (error) {
        setMenusIsLoading(false)
        setIsError(error)
        return null

      }

    },

    //*/
    mutate: async (type, query) => {

      try {



        //const token = localStorage && localStorage.getItem('token') || '';
        //const token='NONE-FOR_NOW'

        if (token.length == 0) {
          setIsError('Not Authorized.');
          setMenusIsLoading(false)
        }

        const res = await fetch(`${NEXT_URL}/api/menu/mutate`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ type, query }),
        });

        const data = await res.json();
        setMenusIsLoading(false)
        return data
      } catch (error) {
        setMenusIsLoading(false)
        setIsError(error)
        return null
      }

    },



  }

  const Pages = {

    count: async (query) => {

      setPagesIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setPagesIsLoading(false)
        }

        let q = { where: { type: 'page' } }

        if (query.where) {

          q = { ...query, where: { ...query.where, type: 'page' } }
        }
        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/post/count`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ document: 'post', query: q }),
        });

        const data = await res.json();
        setPagesIsLoading(false)
        return data
      } catch (error) {
        setPagesIsLoading(false)
        setIsError(error)
        return null

      }

    },
    query: async (query) => {

      setPagesIsLoading(true)
      setIsError(null)
      try {


        if (token.length == 0) {
          setIsError('Not Authorized.');
          setPagesIsLoading(false)
        }

        let q = { where: { type: 'page' } }

        if (query.where) {

          q = { ...query, where: { ...query.where, type: 'page' } }
        } else q = query

        //const token='NONE-FOR_NOW'
        const res = await fetch(`${NEXT_URL}/api/post/query`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ document: 'post', query }),
        });

        const data = await res.json();
        setPagesIsLoading(false)
        return data
      } catch (error) {
        setPagesIsLoading(false)
        setIsError(error)
        return null

      }

    },


    //*/
    mutate: async (type, query) => {

      try {



        //const token = localStorage && localStorage.getItem('token') || '';
        //const token='NONE-FOR_NOW'

        if (token.length == 0) {
          setIsError('Not Authorized.');
          setPagesIsLoading(false)
        }

        let q = { where: { type: 'page' } }

        if (query.where) {

          q = { ...query, where: { ...query.where, type: 'page' } }
        } else q = query

        const res = await fetch(`${NEXT_URL}/api/post/mutate`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', },
          body: JSON.stringify({ document: 'post', type, query: q }),
        });

        const data = await res.json();
        setPagesIsLoading(false)
        return data
      } catch (error) {
        setPagesIsLoading(false)
        setIsError(error)
        return null
      }

    },



  }




  useEffect(() => {


    Themes.queryGetCurrentTheme().then(theme => {
      setCurrentTheme(theme)
    })

    loadThemes(0)

    loadMenus()

    loadPages()


  }, [])


  const loadThemes = async () => {
    await Themes.query({ where: { deleted: false } }).then(themes => {
      setThemes(themes)
    })
  }


  const applyTheme = async (themeId, previousId) => {
    const updated = await Themes.setActiveTheme(themeId, previousId);
    if (updated.id) {
      const currentTheme = await Themes.queryGetCurrentTheme();
      setCurrentTheme(currentTheme)
    }
  }

  const createTheme = async (data) => {
    const { id, createdAt, updatedAt, ...otherData } = data
    return await Themes.mutate('create', {
      data: otherData
    })
  }

  const updateTheme = async (data) => {
    const { id, createdAt, updatedAt, ...otherData } = data
    return await Themes.mutate('update', {
      where: { id }, data: otherData
    })
  }

  const deleteTheme = async (themeId) => {

    return await Themes.mutate('update', {
      where: { id: themeId }, data: { deleted: true }
    })
  }


  const loadMenus = async () => {
    await Menus.query({ where: { deleted: false } }).then(menus => {
      setMenus(menus)
    })
  }


  const createMenu = async (data) => {
    const { id, createdAt, updatedAt, ...otherData } = data
    return await Menus.mutate('create', {
      data: otherData
    })
  }

  const updateMenu = async (data) => {
    const { id, createdAt, updatedAt, ...otherData } = data
    return await Menus.mutate('update', {
      where: { id }, data: otherData
    })
  }

  const deleteMenu = async (menuId) => {

    return await Menus.mutate('update', {
      where: { id: menuId }, data: { deleted: true }
    })
  }

  //Pages
  const loadPages = async () => {
    await Pages.query({ where: { type: 'page' } }).then(pages => {
      setPages(pages)
    })
  }

  const getPage = async (id) => {
    const pages = await Pages.query({ where: { id: id, type: 'page' } })
    if (pages.length) return pages[0]
    else return null;
  }



  const createPage = async (data) => {
    const { id, createdAt, updatedAt, ...otherData } = data
    return await Pages.mutate('create', {
      data: otherData
    })
  }

  const updatePage = async (data) => {
    const { id, createdAt, updatedAt, ...otherData } = data
    return await Pages.mutate('update', {
      where: { id }, data: otherData
    })
  }

  const deletePage = async (pageId) => {

    return await Pages.mutate('update', {
      where: { id: pageId }, data: { deleted: true }
    })
  }



  return (
    <AppearanceContext.Provider value={{
      isLoading, createId,
      themes, currentTheme, loadThemes, applyTheme, createTheme, deleteTheme, updateTheme, themesIsLoading,
      menus, loadMenus, createMenu, updateMenu, deleteMenu, menusIsLoading,
      pages, loadPages, createPage, updatePage, deletePage, getPage, pagesIsLoading
    }}>
      {children}
    </AppearanceContext.Provider>
  );
};

export default AppearanceContext;
