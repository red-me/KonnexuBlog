
'use client'

import { router } from 'next/router'
import ActivityFeed from "../../components/pages/ActivityFeed"
import AppPage from "../../components/pages/AppPage"
import UserPage from "../../components/pages/UserPage"


import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Navbar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import PostContext from "../../context/PostContext";
import ReactHtmlParser from 'react-html-parser';
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * 
 * @param {Object} param0 
 * @param String[] param0.slug 
 * @returns {} a dynamic component.
 */

const InternalPage = ({ page }) => {
    return <> <div className="mx-auto w-full  max-w-screen-xl  flex gap-2 items-start flex-col justify-start ">
        <div className='flex flex-col w-full bg-white rounded p-6 mt-4'><div className='pb-4'><h1 className='text-2xl'>{page.title}</h1></div><div>{ReactHtmlParser(page.content.data)}</div></div></div></>
}

const InnerPage = ({ slug, currentUserId }) => {


    // TODO: must return in default page component. Define ActivityFeed as default page component child instead as per setting page?..
    if (slug == null) {
        //use default page
        return <ActivityFeed></ActivityFeed>
    }




    const name = slug[0].toLowerCase();





    //url:/app/x/y/z

    //if matches app names... todo: get app names from backend
    if (['helloapp', 'photos', 'test'].indexOf(name) > -1) {
        return <AppPage params={{ slug }} > </AppPage>
    }


    //url: user/x/y/z

    if (['user'].indexOf(name) > -1) {
        return <UserPage params={{ slug }} currentUserId={currentUserId}> </UserPage>
    }

    // lastly, user names

    return <UserPage params={{ slug }} currentUserId={currentUserId}> </UserPage>



    /* return (
        <>
            {slug}
        </>
    ); */
}

export default function Page({ params: { slug } }) {
    const { user, initialLoading, checkUserLoggedIn } = useContext(AuthContext)

    const [isInternalPage, setIsInternalPage] = useState(false)

    const [pageData, setPageData] = useState(null)

    const { query } = useContext(PostContext)
    useEffect(() => {
        if (slug && slug.length > 0) {
            query('post', { where: { type: 'page', published: true, description: slug[0].toLowerCase() } }).then(pages => {

                if (pages && pages.length) {

                    // if it matches a Page app url
                    setPageData(pages[0])

                }
            })
        }
    }, [slug])

    useEffect(() => {
        if (pageData) {
            setIsInternalPage(true)
        }
    }, [pageData])


    return (
        <>
            {isInternalPage ? <InternalPage page={pageData}></InternalPage> :
                <InnerPage slug={slug} currentUserId={user ? user.id : null}></InnerPage>}
        </>)
}