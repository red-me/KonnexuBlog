'use client'
import React, { useContext } from "react";
import dynamic from 'next/dynamic'
import { injectScript } from '@module-federation/utilities';
import { importRemote } from "module-federation-import-remote";
import { useRouter } from 'next/router';
import * as MaterialTailwindControls from "@material-tailwind/react";
import ErrorBoundary from '../../components/layout/ErrorBoundary'
import AuthContext from '../../context/AuthContext'

const Page = ({ params }) => {
    /* const router = useRouter();
    const { app } = router.query; */
    const { user, isLoading } = useContext(AuthContext)

    const DynamicApp = dynamic(() => importRemote({ url: "http://localhost:9002", scope: 'DEV', module: 'App' }), { ssr: false })



    const props = {
        path: ['Some', 'Items', 'Here'],
        controls: MaterialTailwindControls,
        user: !user || isLoading ? { firstName: '', lastName: '' } : user.profile,
        data: { message: 'Greetings to all!', photos: ["https://picsum.photos/600/400", "https://picsum.photos/600/400", "https://picsum.photos/600/400"] }
    }


    return (
        <ErrorBoundary errorComponent={<div>Ooops.. Something Went Wrong.</div>}>
            <React.Suspense fallback={<div>Loading App...</div>}>
                <DynamicApp {...props} > </DynamicApp>
            </React.Suspense>
        </ErrorBoundary>)
};
export default Page;