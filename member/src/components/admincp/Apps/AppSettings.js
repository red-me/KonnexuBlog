import React, { useContext, useEffect, useState } from 'react'

import AppContext from '../../../context/admincp/AppContext'
import AdminAuthContext from '../../../context/admincp/AdminAuthContext'

import PostContext from '../../../context/PostContext'


import dynamic from 'next/dynamic'
import { importRemote } from "module-federation-import-remote";

import * as MaterialTailwindControls from "@material-tailwind/react";
// import common components that will be used by apps
import FileUploadComponent from "../../../components/BasicFileUploadComponent"
import SelectOne from "../../../components/SelectOne"
import SelectMultiple from "../../../components/SelectMultiple"


import { useRouter } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';
import * as Toastify from 'react-toastify';


import { useFormik } from 'formik'

String.prototype.toProperCase = function () {
    return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1, txt.length - 1).toLowerCase(); });
};

function Page(props) {

    const router = useRouter();

    // [installed,appName,...]
    const { path } = props
    const { query, count, mutate, isLoading, createId } = useContext(AppContext)


    const { query: queryPost, count: countPost, mutate: mutatePost, isLoading: isLoadingPost } = useContext(PostContext)

    const { user } = useContext(AdminAuthContext)
    const { ToastContainer } = Toastify
    const [appConfig, setAppConfig] = useState(null)

    const [AppComponent, setAppComponent] = useState(<div></div>)

    useEffect(() => {
        query({ where: { name: path[1].toLowerCase() } }).then(list => {
            if (list && list.length > 0) {
                const app = list[0]
                setAppConfig(app)

            }

        })



    }, [])

    /*  useEffect(() => {
         if (appConfig) {
             setAppComponent(dynamic(() => importRemote({ url: app.url, scope: app.scope, module: 'Settings' }), { loading: () => Preloader, ssr: false }))
         }
 
     }, [appConfig]) */



    const Preloader = () => {
        return <div className="flex justify-center">
            <Spinner></Spinner>
        </div>
    }

    const appProps = {
        path: ['admincp', 'apps', 'installed', ...path],
        controls: MaterialTailwindControls,
        components: { FileUploadComponent, SelectOne, SelectMultiple, Toastify },
        user: user,
        app: appConfig,
        hostReact: React,
        router,
        query,
        mutate,
        isLoading,
        queryPost,
        countPost,
        mutatePost,
        isLoadingPost,
        useFormik,
        createId
    }

    const DynamicApp = appConfig ? dynamic(() => importRemote({ url: appConfig.url, scope: appConfig.scope, module: 'Settings' }).catch(err => {
        return () => <p>oops... this failed to load</p>
    }), { loading: () => Preloader, ssr: false }) : null;

    return (
        <>

            {appConfig && <React.Suspense fallback={<div>Unable to Load...</div>}><DynamicApp {...appProps}></DynamicApp>
            </React.Suspense>}

            <ToastContainer></ToastContainer>

        </>
    )
}

export default Page