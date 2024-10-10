import React, { createContext, useState, useEffect } from 'react';


import dynamic from 'next/dynamic'
import { importRemote } from "module-federation-import-remote";

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  const [activeIndexes, setActiveIndexes] = useState([]);





  useEffect(() => {



  }, [])




  return (
    <SidebarContext.Provider value={{ sideBarOpen, setSideBarOpen, activeIndex, setActiveIndex, activeSubIndex, setActiveSubIndex, activeIndexes, setActiveIndexes }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
