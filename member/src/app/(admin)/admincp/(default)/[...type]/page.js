'use client'


import React, { useContext } from "react";


import AdminAuthContext from "../../../../../context/admincp/AdminAuthContext"

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {

  const { user } = useContext(AdminAuthContext)

  return (
    <>

      Appearance
    </>
  );
}
