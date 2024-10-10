'use client'
import { Inter } from "next/font/google";
import "../../../globals.css";

const inter = Inter({ subsets: ["latin"] });

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


import { AdminAuthProvider } from '../../../../context/admincp/AdminAuthContext'
import { ThemeProvider } from "@material-tailwind/react";

import { SidebarProvider } from '../../../../context/admincp/SidebarContext'
import { AppearanceProvider } from '../../../../context/admincp/AppearanceContext'
import Sidebar from "../../../../components/admincp/Layout/Sidebar";
import Header from "../../../../components/admincp/Layout/Header";
import Body from "../../../../components/admincp/Layout/Body";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({ children }) {



  return (
    <AdminAuthProvider>
      <ThemeProvider>
        <SidebarProvider>

          <html lang="en" className="xxdark">
            <body className={`${roboto.className} blue-gray-500 dark:bg-blue-gray-800`}>

              <Header></Header>
              <Sidebar></Sidebar>
              <Body>
                <AppearanceProvider>
                  {children}
                </AppearanceProvider>
                <ToastContainer></ToastContainer>
              </Body>
            </body>
          </html>

        </SidebarProvider>
      </ThemeProvider>
    </AdminAuthProvider>
  );
}
