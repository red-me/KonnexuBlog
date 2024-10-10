'use client'
import React, { useContext } from "react";
import dynamic from 'next/dynamic'

import AdminAuthContext from "../../../../../../context/admincp/AdminAuthContext"
import { UserProvider } from '../../../../../../context/admincp/UserContext'

import PageHeader from "../../../../../../components/admincp/Page/PageHeader"
import PageBody from "../../../../../../components/admincp/Page/PageBody"
import { Spinner } from "@material-tailwind/react";




export default function Page({ params: { type } }) {

  const { user } = useContext(AdminAuthContext)

  const Preloader = () => {
    return <div className="flex justify-center">
      <Spinner></Spinner>

    </div>
  }

  

  const typeToComponentMap = {
    "browse": dynamic(() => import('../../../../../../components/admincp/Users/UserList'), { loading: () => Preloader, ssr: false }),
    "browse/$": dynamic(() => import('../../../../../../components/admincp/Users/EditUser'), { loading: () => Preloader, ssr: false }),
    "groups": dynamic(() => import('../../../../../../components/admincp/Users/UserGroupList'), { loading: () => Preloader, ssr: false }),
    "groups/settings": dynamic(() => import('../../../../../../components/admincp/Users/UserGroupSettings'), { loading: () => Preloader, ssr: false }),
  }

  const typeS = (type.length > 2 ? type.slice(0, 2) : type).map(p=>p.replace( /\d+/, '$') ).join('/')


  const Listing = typeToComponentMap[typeS]

  return (
    <>
      <UserProvider>
        <PageHeader slugs={['Members', ...type]}></PageHeader>
        <PageBody >
          <Listing></Listing>
        </PageBody>
      </UserProvider>
    </>
  );
}
