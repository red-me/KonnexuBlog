"use client"
import { Inter } from "next/font/google";
import ".././../globals.css";

const inter = Inter({ subsets: ["latin"] });

import Themed from "./themed";
/* export const metadata = {
  title: "Konnexu - Login",
  description: "This page is for showing Tailwind Material UI",
}; */

import { AppThemeProvider } from '../../../context/AppThemeContext'

export default function RootLayout({ children }) {
  return (
    <AppThemeProvider>


      <Themed >

        {children}

      </Themed>

    </AppThemeProvider>
  );
}
