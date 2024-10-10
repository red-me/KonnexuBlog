import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";

import AuthContext from '../context/AuthContext'
import SidebarContext from '../context/SidebarContext'

import { useRouter } from 'next/navigation';


export default function Header() {

  const router = useRouter();


  const { user, logout } = useContext(AuthContext)
  const { sideBarOpen, setSideBarOpen } = useContext(SidebarContext)



  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setSideBarOpen(showSidebar)

  }, [showSidebar])

  const BurgerMenu = () => {
    return <>
      <svg
        onClick={() => setShowSidebar(prev => !prev)}
        className="flex items-center cursor-pointer "
        fill="#2563EB"
        viewBox="0 0 100 80"
        width="20"
        height="20"
      >
        <rect width="100" height="10"></rect>
        <rect y="30" width="100" height="10"></rect>
        <rect y="60" width="100" height="10"></rect>
      </svg></>
  }



  return (
    <div className="mb-2 flex items-center gap-4 p-4 h-16 bg-gray-50">
      <BurgerMenu></BurgerMenu>
      <img src="/xmindlogo.png" alt="brand" className="h-4 w-4" />
      <Typography variant="h6" color="blue-gray">
        Konnexu Admin
      </Typography>
    </div>
  );
}