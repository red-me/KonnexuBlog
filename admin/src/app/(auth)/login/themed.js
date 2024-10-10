"use client";
import { ThemeProvider } from "@material-tailwind/react";
/* import { AuthProvider } from '../../../context/AuthContext' */
import React from "react";


export default function themed({ children }) {
  return (
    <html lang="en" className="">
      <body className="blue-gray-50 dark:to-blue-gray-900" >
        <ThemeProvider>
       
            {children}

        </ThemeProvider>
      </body>

    </html>
  );
}
