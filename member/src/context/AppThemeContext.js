
import React, { createContext, useState, useEffect } from 'react';
import { deepMap } from 'react-children-utilities';
import SelectOne from '../components/SelectOne';
const AppThemeContext = createContext();

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL


const sDEFAULT_THEME =
{
  id: 'DEFAULT',
  name: 'Default',
  data: {

    background: {
      className: ''
    },
    header: {
      style: {
        backgroundColor: "#ffffff",
        color: '#333333'
      },

      className: "flex flex-col w-full shadow-xs  transition-all duration-1000 ",
      list: {
        className: "flex flex-col w-full shadow-xs transition-all duration-1000 mx-auto max-w-screen-xl",
      }
    },
    navigation: {
      style: {

        color: '#ffffff',
        backgroundColor: "rgb(255 138 101)",

      },
      className: "mx-auto w-full  py-1  lg:py-1 max-w-max",
      list: {
        className: "w-full max-w-screen-xl ",
        style: {}
      },
      item: {
        style: {
          color: '#ffffff',
        },
        text: { style: { maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
        icon: { className: 'w-4 h-4 cursor-pointer shadow-sm' }
      },
    },
    Button: {
      primary: {
        style: {
          backgroundColor: "rgb(25 118 210)",
          color: '#ffffff'
        },
        className: "relative shadow-sm -mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      }
    }
  }

}


const EMPTY_THEME =
{
  id: 'EMPTY',
  name: 'Empty',
  data: {

    background: {
      className: ''
    },
    header: {
      style: {},

      className: "",
      list: {
        className: "",
      }
    },
    navigation: {
      style: {},
      className: '',
      list: {
        className: "",
        style: {}
      },
      item: {
        style: {},
        text: { style: {} },
        icon: { className: '' }
      },
    },
    Button: {
      primary: {
        style: {
          backgroundColor: "",
          color: ''
        },
        className: ""
      }
    }
  }

}





export const AppThemeProvider = ({ children }) => {

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [themes, setThemes] = useState([])
  const [DEFAULT_THEME, setDEFAULT_THEME] = useState(null)
  const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : '';
  const xthemes = [
    DEFAULT_THEME,
    {
      name: 'Green Pastures',
      background: {
        className: 'bg-green-300',
        style: { backgroundColor: 'rgb(247 254 231)' }
      },
      header: {
        style: {
          backgroundColor: "#ffffff",
          color: '#000000',

        },
        className: "flex flex-col w-full shadow-xs transition-all duration-1000 mx-auto w-full  max-w-max",
        list: {
          className: "flex flex-col w-full shadow-xs transition-all duration-1000 max-w-max",
        }

      },
      navigation: {
        style: {
          backgroundColor: "#059669",
          color: '#ffffff',
          maxWidth: '1920px'
        },
        className: "mx-auto w-full  py-2  lg:py-2 max-w-max",
        list: {
          className: "max-w-max",
          /*   style: { maxWidth: '1280px' } */
        },
        item: {
          style: {
            color: '#FDE68A'
          },
          icon: { className: 'w-6 h-6 ' },
          text: { style: { maxWidth: '1000px', color: '#FDE68A' } }
        },
      },
      Button: {
        primary: {
          style: {
            backgroundColor: "#059669",
            color: '#FDE68A'
          },
          className: "relative uppercase shadow-md -mt-10 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
        }
      },

    }
  ]
  let storedTheme = null;
  if (typeof window !== "undefined") {
    storedTheme = localStorage.getItem('appTheme') !== null ? JSON.parse(localStorage.getItem('appTheme')) : null
  }

  const [themeId, setThemeId] = useState(storedTheme ? storedTheme.id : null)
  const [theme, setTheme] = useState(storedTheme)

  const ThemeSwitcher = () => {
    return <div className={'w-48'}><SelectOne
      buttonProps={{
        className: 'max-h-6 shadow-md m-2 shadow-inner',
      }
      }
      items={themes}
      idField={"id"}
      textField={"name"}
      selectedValue={themeId}
      setSelectedValue={setThemeId}></SelectOne></div>
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
      const res = await fetch(`${NEXT_URL}/api/theme/query`, {
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

  const queryGetDefaultTheme = async () => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/theme/default`, {
        headers: { Authorization: `Bearer ${token}` }
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

  const queryGetCurrentTheme = async () => {

    setIsLoading(true)
    setIsError(null)
    try {


      if (token.length == 0) {
        setIsError('Not Authorized.');
        setIsLoading(false)
        return null;
      }


      //const token='NONE-FOR_NOW'
      const res = await fetch(`${NEXT_URL}/api/theme/current`, {
        headers: { Authorization: `Bearer ${token}` }
      },);

      const data = await res.json();
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      setIsError(error)
      return null

    }

  }



  useEffect(() => {


    storedTheme = localStorage.getItem('appTheme')

    if (storedTheme) {
      const t = JSON.parse(storedTheme)
      setTheme(t)
      // setThemeId(t.id)
    }



    queryGetCurrentTheme().then(stheme => {
      //if (theme && theme.id !== stheme.id) {
      setTheme(stheme)
      //}
    })


    queryGetDefaultTheme().then(theme => {
      setDEFAULT_THEME(theme)
    })


    query({ where: {} }).then(themes => {
      setThemes(themes)
    })

    /* storedTheme = localStorage.getItem('appTheme') !== null ? JSON.parse(localStorage.getItem('appTheme')) : DEFAULT_THEME
    if (!storedTheme) {
      setTheme(DEFAULT_THEME)
      setThemeId(DEFAULT_THEME.name)
    }
 */

  }, [])
  /* 
    useEffect(() => {
  
      if (theme) {
        localStorage.setItem('appThemeId', theme.id)
        //const selectedTheme = themes.find(t => t.id == themeId)
        //setTheme(selectedTheme)
  
      }
  
    }, [theme]) */

  useEffect(() => {
    if (theme) {
      localStorage.setItem('appTheme', JSON.stringify(theme))
      localStorage.setItem('appThemeId', theme.id)
    }

  }, [theme])




  const ThemedChildren = ({ children }) => (
    <>
      {deepMap(children, (child) => {

        const { style, className } = child.props
        const themeItemStyles = Object.keys(theme.data);
        let newChild = child
        if (className !== undefined) {
          themeItemStyles.forEach(id => {
            if (className && className.includes(`_kx_${id}`)) {
              /*  const newStyle = { ...style || null, ...theme.data[id].style }
               const newClassName = [...className, ...theme.data[id].className].join(" "); */
              newChild = React.cloneElement(child, { style: { ...style || null, ...theme.data[id].style }, className: (className || '') + " " + theme.data[id].className })

            }
          })
        }

        return newChild

      })}
    </>
  );


  const applyThemeElementStyle = (child, theme) => {

    const { style, className } = child.props
    const themeItemStyles = Object.keys(theme.data);
    let newChild = child
    themeItemStyles.forEach(id => {
      if (className && className.includes(`_kx_${id}`)) {
        /*  const newStyle = { ...style || null, ...theme.data[id].style }
         const newClassName = [...className, ...theme.data[id].className].join(" "); */
        newChild = React.cloneElement(child, { style: { ...style || null, ...theme.data[id].style }, className: (className || '') + " " + theme.data[id].className })

      }
    })

    return newChild
  }

  return (
    <AppThemeContext.Provider value={{ theme, DEFAULT_THEME, ThemeSwitcher, ThemedChildren }}>
      {children}
    </AppThemeContext.Provider>
  );
};
export default AppThemeContext;