'use client'
import { Inter } from "next/font/google";
import "../../../../globals.css";

const inter = Inter({ subsets: ["latin"] });


import { AdminAuthProvider } from '../../../../../context/admincp/AdminAuthContext'
import { ThemeProvider } from "@material-tailwind/react";


export default function RootLayout({ children }) {
  return (
    <><AdminAuthProvider>
      <ThemeProvider>
        <div className="bg-blue-gray-500">
          {children}

        </div>
      </ThemeProvider>
    </AdminAuthProvider></>
  );
}
