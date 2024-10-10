"use client";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from '../../context/AuthContext'
import { UserProvider } from '../../context/UserContext'
import { PostProvider } from '../../context/PostContext'
import React from "react";


export default function themed({ children }) {
  return (
    <html lang="en">
      <body className="blue-gray-50" >
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
