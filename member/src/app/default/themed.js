"use client";
import { ThemeProvider } from "@material-tailwind/react";

import React, { useContext } from "react";
import { Button, Card } from "@material-tailwind/react";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import { AuthProvider } from '../../context/AuthContext'
import { PostProvider } from '../../context/PostContext'
export default function themed({ children }) {

  return (


    <AuthProvider>
      <ThemeProvider>
        <PostProvider>


          {children}

        </PostProvider>
      </ThemeProvider>
    </AuthProvider>


  );
}
