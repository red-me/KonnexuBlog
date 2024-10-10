import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";

import AuthContext from '../context/AuthContext'
import SidebarContext from '../context/SidebarContext'

import { useRouter } from 'next/navigation';


export default function Body({ children }) {

  const router = useRouter();


  const { user, logout } = useContext(AuthContext)
  const { sideBarOpen, setSideBarOpen } = useContext(SidebarContext)



  const [showSidebar, setShowSidebar] = useState(true);


  return (
    <div className={`overflow-auto fixed top-16 p-4  z-40  h-[calc(100vh-4rem)] transition-all  ${sideBarOpen ? "left-64 w-[calc(100vw-16rem)]" : "left-0 w-[calc(100vw)]"} `}>
    {/* <div className="flex justify-end ">This is the body</div> */}
      {children}
    </div>
  );
}