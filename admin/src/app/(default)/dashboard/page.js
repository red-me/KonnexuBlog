'use client'


import React, { useContext } from "react";


import AuthContext from "../../../context/AuthContext";

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {

  const { user } = useContext(AuthContext)

  return (
    <>

      Dashboard
    </>
  );
}
