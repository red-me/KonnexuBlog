import React, { useContext } from 'react'
import NavBarPreview from "./NavBarPreview";

import AuthContext from '../../../../context/admincp/AdminAuthContext'
import { IconButton, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import ProfileMenuPreview from './ProfileMenuPreview';



function HeaderPreview(props) {
    const { user, initialLoading, statusText, logout } = useContext(AuthContext)
    const { theme } = props
    const brandLogoUrl = theme.brandLogoUrl
    return (
        <header className={theme.data.header.className} style={theme.data.header.style}>
            <div className={theme.data.header_list.className}>
                <div className=" w-full  flex items-center justify-between px-2">
                    <div className="flex items-center gap-x-1  justify-start">
                        <Typography

                            className="mr-4 cursor-pointer py-1.5 font-medium "
                        >
                            <Link href='#' className="items-center  text-black-900 dark:text-white w-44"><img className="h-[32px] mr-2 inline-block" src={`${brandLogoUrl || '/xmindlogo.png'}  `} alt="logo" /></Link>

                        </Typography>

                    </div>

                    <div className="flex items-center gap-x-1   justify-end scale-75">
                        {/*  <Button variant="text" size="sm" className="hidden lg:inline-block">
            <span>{user && user.email}</span>
          </Button> */}
                        <div className="flex gap-2 ">

                        <div className="p-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path strokeLineCap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>

                            </div>

                            <div className="p-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLineCap="round" strokeLineJoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>

                            </div>
                            <div className="p-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLineCap="round" strokeLineJoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>

                            </div>
                        </div>

                        <div className="flex items-center  gap-x-1  ">

                            <ProfileMenuPreview user={user} logout={() => { }}></ProfileMenuPreview>
                        </div>
                    </div>

                </div>
            </div>
            <NavBarPreview theme={theme}></NavBarPreview>
        </header>
    )
}

export default HeaderPreview