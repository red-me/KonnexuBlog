"use client";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from '../../../context/AuthContext'
import React from "react";


export default function themed({ children }) {
  return (
    <html lang="en">
      <body >
        <ThemeProvider>
          <AuthProvider>

            {children}

          </AuthProvider>
        </ThemeProvider>
      </body>

    </html>
  );
}
