'use client'
import React, { useContext } from "react";
import dynamic from 'next/dynamic'
import { injectScript } from '@module-federation/utilities';
import { importRemote } from "module-federation-import-remote";
import { useRouter } from 'next/navigation';

import * as MaterialTailwindControls from "@material-tailwind/react";
import ErrorBoundary from '../../components/layout/ErrorBoundary'
import AuthContext from '../../context/AuthContext'
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import PostContext from '../../context/PostContext'

   

// import common components that will be used by apps
import FileUploadComponent from "../../components/SimpleFileUploadComponent"

const Page = ({ params }) => {
    const router = useRouter();
    const { query } = useContext(PostContext)
    const { user, isLoading } = useContext(AuthContext)

    const DynamicApp = dynamic(() => importRemote({ url: "http://localhost:9002", scope: 'DEV', module: 'Main' }), { ssr: false })



    const props = {
        path: ['Test' /* 1st item will be the app root url. */ ],
        controls: MaterialTailwindControls,
        components: { FileUploadComponent },
        user: !user || isLoading ? { firstName: '', lastName: '' } : user.profile,
        data: { message: 'Greetings to all!', photos: ["https://picsum.photos/600/400", "https://picsum.photos/600/400", "https://picsum.photos/600/400"], },
        app: { settings: { categories: ["a", "b", "c"] } },
        hostReact: React,
        router,
        query
    }

    


    return (<>{
        user ?
            <div className="h-screen flex flex-col ">
                <header className="flex bg-deep-orange-300  w-full shadow-xs" > <NavBar></NavBar></header >

                <main className="mx-auto w-full px-4 py-2 lg:px-8 lg:py-2 max-w-screen-2xl ">

                    <ErrorBoundary errorComponent={<div>Ooops.. Something Went Wrong.</div>}>
                        <React.Suspense fallback={<div>Loading App...</div>}>
                            <DynamicApp {...props} > </DynamicApp>
                        </React.Suspense>
                    </ErrorBoundary>
                </main>


                <Footer></Footer>
            </div>
            :
            <div className="text-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
    }</>

    )
};
export default Page;