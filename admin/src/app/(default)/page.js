'use client'
import React, { useContext, useEffect } from "react";

import SidebarContext from '../../context/SidebarContext'
  


export default function Home() {

  const { setActiveIndex } = useContext(SidebarContext)

  useEffect(() => {
  
    setActiveIndex(1)
    
  }, [])
  
  return (
    <>
      Dashboard

    </>
  );
}
