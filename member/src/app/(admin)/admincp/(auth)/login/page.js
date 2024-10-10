
'use client'
import React from "react"
import AdminAuthContext, { AdminAuthProvider } from '../../../../../context/admincp/AdminAuthContext'
import LoginForm from '../../../../../components/admincp/LoginForm'
export default function Page({ params }) {

    return (
        <>

            <LoginForm></LoginForm>

        </>
    );
}