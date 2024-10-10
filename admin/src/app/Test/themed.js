"use client";
import { ThemeProvider } from "@material-tailwind/react";

import React from "react";
import { Button, Card } from "@material-tailwind/react";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import { AuthProvider } from '../../context/AuthContext'
export default function themed({ children }) {
  return (
   
        <ThemeProvider>
          <AuthProvider>
            <div className="h-screen flex flex-col ">
              <header className="flex bg-deep-orange-300  w-full shadow-xs "><NavBar></NavBar></header>
             {children}


              <footer className="flex h-5 "><Footer></Footer></footer>
            </div>

          </AuthProvider>
        </ThemeProvider>
     
  );
}
