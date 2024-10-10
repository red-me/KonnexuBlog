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

import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from '../../context/AuthContext'
import { UserProvider } from '../../context/UserContext'
import { PostProvider } from '../../context/PostContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} `} >

        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <PostProvider>
                {children}
              </PostProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>

      </body>

    </html>
  );
}
