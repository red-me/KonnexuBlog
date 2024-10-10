'use client'


import React, { useContext, useState } from "react";

import dynamic from 'next/dynamic'
import { importRemote } from "module-federation-import-remote";

import { Spinner } from "@material-tailwind/react";



import PageHeader from "../../../../../../components/admincp/Page/PageHeader"
import PageBody from "../../../../../../components/admincp/Page/PageBody"

import AdminAuthContext from "../../../../../../context/admincp/AdminAuthContext"
import { AppProvider } from '../../../../../../context/admincp/AppContext'
import { PostProvider } from '../../../../../../context/PostContext'



import AppList from "../../../../../../components/admincp/Apps/AppList"
import Uploaded from "../../../../../../components/admincp/Apps/Uploaded"
import AppSettings from "../../../../../../components/admincp/Apps/AppSettings"
import Store from "../../../../../../components/admincp/Apps/Store"
import History from "../../../../../../components/admincp/Apps/History"


const NEXT_URL = process.env.NEXT_PUBLIC_API_URL




export default function Home({ params: { slug } }) {

  const { user } = useContext(AdminAuthContext)

  const listType = slug[0].toLowerCase()

  const Preloader = () => {
    return <div className="flex justify-center ">
      <Spinner></Spinner>
    </div>
  }


  const props = {

    path: slug,
    hostReact: React,

  }

  return (
    <>
      <AppProvider>
        <PostProvider>
          <PageHeader slugs={['Apps', ...slug]}></PageHeader>
          <PageBody >
            {listType == 'installed' && slug.length == 1 && <AppList {...props}></AppList>}
            {listType == 'installed' && slug.length > 1 && <AppSettings {...props}></AppSettings>}
            {listType == 'store' && <Store {...props}></Store>}
            {listType == 'history' && <History {...props}></History>}
            {listType == 'uploaded' && <Uploaded {...props}></Uploaded>}

          </PageBody>
        </PostProvider>
      </AppProvider>
    </>
  );
}
