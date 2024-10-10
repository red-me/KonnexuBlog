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

  const menu = [
    {
      itemIndex: 1,
      label: 'Dashboard',
      icon: "PresentationChartBarIcon",
      url: '/admincp'
    },
    {
      itemIndex: 2,
      label: 'Others',
      icon: "PresentationChartBarIcon",
      url: '/admincp/others'
    },
    {
      itemIndex: 3,
      label: 'Apps',
      icon: "ShoppingBagIcon",
      url: '/admincp/apps',
      children: [
        { itemIndex: 301, label: "Installed", url: '/admincp/apps/installed' },
        { itemIndex: 302, label: "Uploaded", url: '/admincp/apps/uploaded' },
        { itemIndex: 303, label: "Find Apps", url: '/admincp/apps/store' },
        { itemIndex: 304, label: "Purchase History", url: '/admincp/apps/purchase-history' },
      ]
    },
    {
      itemIndex: 4,
      label: 'Appearance',
      icon: "PaintBrushIcon",
      url: '/admincp/appearance',
      children: [
        { itemIndex: 401, label: "Themes", url: '/admincp/appearance/themes' },
        { itemIndex: 402, label: "Menus", url: '/admincp/appearance/menus' },
        { itemIndex: 403, label: "Blocks", url: '/admincp/appearance/blocks' },
        { itemIndex: 404, label: "Pages", url: '/admincp/appearance/pages' },
      ]
    },
    {
      itemIndex: 5,
      label: 'Members',
      icon: "UserCircleIcon",
      url: '/admincp/users',
      children: [
        { itemIndex: 501, label: "Browse Users", url: '/admincp/users/browse' },
        { itemIndex: 502, label: "Manage User Groups", url: '/admincp/users/groups' },
        { itemIndex: 503, label: "User Group Settings", url: '/admincp/users/groups/settings' }
      ]
    },
    {
      itemIndex: 6,
      divider: true
    },
    {
      itemIndex: 7,
      label: 'Logout',
      icon: "PowerIcon",
      action: "logout"
    },


  ]



  useEffect(() => {

    //todo: autodetect selected from url

  }, [])




  return (
    <SidebarContext.Provider value={{ menu, sideBarOpen, setSideBarOpen, activeIndex, setActiveIndex, activeSubIndex, setActiveSubIndex, activeIndexes, setActiveIndexes }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
