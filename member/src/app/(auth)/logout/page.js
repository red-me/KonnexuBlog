
'use client'
import React, { useContext, useEffect } from "react"
import  AuthContext  from '../../../context/AuthContext'
import { useRouter } from 'next/navigation';
export default function Page({ params }) {

    const { logout, error, user, isLoading } = useContext(AuthContext)
    const router = useRouter();
    useEffect(() => {
        logout()

        router.push('/login');
    }, [])




    return (

        <>You have been logged-out. Redirecting to Login page...</>

    );
}