'use client'
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


/* import Themed from "./themed"; */
/* export const metadata = {
  title: "Konnexu",
  description: "This page is for showing Tailwind Material UI", 
};*/

import { ThemeProvider, Spinner } from "@material-tailwind/react";
import { AppThemeProvider } from '../../context/AppThemeContext'
import { AuthProvider } from '../../context/AuthContext'
import { UserProvider } from '../../context/UserContext'
import { PostProvider } from '../../context/PostContext'
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useContext, useEffect, useState } from "react";
import AppThemeContext from '../../context/AppThemeContext'
import { AppearanceProvider } from '../../context/admincp/AppearanceContext'


const Preloader = () => {
  return <body className={`${roboto.className} `}  >
    <div className={` h-lvh flex-grow flex flex-row justify-center items-center `} >
      <Spinner className="h-16 w-16" ></Spinner>
    </div>
  </body>
}

const Body = ({ children }) => {
  const { theme } = useContext(AppThemeContext)
  /*   useEffect(() => {
      document.body.style = { ...document.body.style, ...theme.data.background.style }
  
  
    }, [theme]) */

  const [appBackground, setAppBackground] = useState('')
  useEffect(() => {
    if (theme) {
      /*  if (theme.brandLogoUrl && theme.brandLogoUrl.length > 0) {
           setAppLogo(theme.brandLogoUrl)
       } */
      if (theme.brandBackgroundPhotoUrl && theme.brandBackgroundPhotoUrl.length > 0) {
        setAppBackground(theme.brandBackgroundPhotoUrl)
      }
      /*  if (theme.data.button_primary) {
           setButtonProps({ ...theme.data.button_primary, className: `w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${theme.data.button_primary.className}` })
       }
*/

    }

  }, [theme])

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const bodyClassName = theme?.data.background.className
  return <><html lang="en" suppressHydrationWarning={true} >{theme && isMounted && <body className={`${roboto.className} h-full m-0 flex flex-col ${bodyClassName || ''}`}
    style={theme ? theme.data.background.style : {}} >

    <div className={`mBody h-lvh flex-grow flex flex-col `} >
      {/* {appBackground != '' && <img class={`object-fill w-full h-full fixed top-0 -z-50 blur-lg opacity-45`} src={appBackground}></img>} */}
      <Header ></Header>
      <main className="flex-grow">
        {children}
      </main>
      <Footer></Footer>
    </div>

  </body>}
  </html></>
}

export default function RootLayout({ children }) {

  return (

    <AppThemeProvider>
      <AppearanceProvider>
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <PostProvider>
                <Body >{children}</Body>
              </PostProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </AppThemeProvider>
  );
}
