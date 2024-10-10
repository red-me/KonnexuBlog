import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Typography,
} from "@material-tailwind/react";

import AdminAuthContext from '../../../context/admincp/AdminAuthContext'
import SidebarContext from '../../../context/admincp/SidebarContext'
import { Divide, Divide as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/navigation';


export default function Header() {

  const router = useRouter();


  const { user, logout, initialLoading } = useContext(AdminAuthContext)
  const { sideBarOpen, setSideBarOpen } = useContext(SidebarContext)



  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setShowSidebar(sideBarOpen)

  }, [sideBarOpen])

  const BurgerMenu = () => {
    return <>
      <Divide size={16}
        toggled={sideBarOpen }
        toggle={setShowSidebar}
        onToggle={toggled => {

          setSideBarOpen(p=>!p)

        }}
      ></Divide>
      {/* <svg
        onClick={() => setShowSidebar(prev => !prev)}
        className="flex items-center cursor-pointer text-deep-orange-500"
        fill="currentColor"
        viewBox="0 0 100 80"
        width="20"
        height="20"
      >
        <rect width="100" height="10"></rect>
        <rect y="30" width="100" height="10"></rect>
        <rect y="60" width="100" height="10"></rect>
      </svg>*/}</>
  }



  return (<><header><div className="mb-2 flex justify-between gap-4 p-2 h-16 bg-gray-50">
    <div className="flex flex-row gap-4 items-center"><BurgerMenu></BurgerMenu>
      <img src="/xmindlogo.png" alt="brand" className="h-4 w-4" />
      <Typography variant="h6" color="blue-gray">
        Konnexu Admin
      </Typography>
    </div>

    <div className="flex gap-6">

      {user ? <div className="flex items-center gap-3  border-r border-r-gray-300 pr-6">
        <Avatar className={"w-8 h-8  shadow-sm ring-1"} src={user.profile.avatar} alt={user.name ? user.name.substring(0, 2) : `${user.profile.firstName[0]}${user.profile.lastName[0]}`} />
        <div >
          <Typography variant="small" className="text-gray-600 font-semibold text-xs" >{user.profile.displayName.length > 0 ? user.profile.displayName : (user.name ? user.name : `${user.profile.firstName}`)}</Typography>
          <Typography variant="small" color="gray" className="font-normal  text-xs text-gray-600">
            {user.userGroup ? user.userGroup.name : user.role}
          </Typography>
        </div>
      </div> :
        <div className="flex items-center flex-row justify-end gap-3 animate-pulse border-r border-r-gray-300 pr-6">
          <Typography as="div" variant="h1" className="h-8 w-8  rounded-full bg-gray-300 border-2 "></Typography>
          <div className="flex flex-col items-stretch  gap-1">
            <Typography variant="paragraph" className="rounded-full bg-gray-300 font-semibold text-xs w-40 h-3" >&nbsp;</Typography>
            <Typography variant="paragraph" color="gray" className="font-normal h-2 w-32 text-xs text-gray-600 rounded-full bg-gray-300">
              &nbsp;
            </Typography>
          </div>
        </div>
      }
      <Button variant="gradient" size="sm" className=" mr-4 flex items-center gap-2" onClick={() => router.push("/")}>

        <span>View Site</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </Button>
    </div>

  </div></header>
  </>)
}