'use client'


import React, { useContext } from "react";


import AdminAuthContext from "../../../../../../context/admincp/AdminAuthContext"

import PageHeader from "../../../../../../components/admincp/Page/PageHeader"
import PageBody from "../../../../../../components/admincp/Page/PageBody"
import Themes from "../../../../../../components/admincp/Appearance/Themes"
import EditTheme from "../../../../../../components/admincp/Appearance/Themes/EditTheme"

import Menus from "../../../../../../components/admincp/Appearance/Menus"
import Pages from "../../../../../../components/admincp/Appearance/Pages"


export default function Page({ params: { slug } }) {

  const { user } = useContext(AdminAuthContext)

  const listType = slug[0].toLowerCase()

  const Preloader = () => {
    return <div className="flex justify-center ">
      <Spinner></Spinner>
    </div>
  }

  const props = {

    path: slug,
   
  }

  return (
    <>
      <PageHeader slugs={['Appearance', ...slug]}></PageHeader>
      <PageBody >
        {listType == 'themes' && slug.length == 1 && <Themes {...props}></Themes>}
        {listType == 'themes' && slug.length > 1 && <EditTheme {...props}></EditTheme>}
        {listType == 'menus' && slug.length == 1 && <Menus {...props}></Menus>}
        {listType == 'pages' && <Pages {...props}></Pages>}
      </PageBody>

    </>
  );
}
