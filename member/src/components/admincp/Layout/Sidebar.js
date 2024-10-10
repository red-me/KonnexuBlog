'use client'
import React, { useContext, lazy, Suspense, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PaintBrushIcon
} from "@heroicons/react/24/solid";

import
  * as solidIcons
  from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,

  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import AdminAuthContext from '../../../context/admincp/AdminAuthContext'
import SidebarContext from '../../../context/admincp/SidebarContext'
import Link from "next/link";

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export default function Sidebar() {

  const router = useRouter();
  const pathname = usePathname()

  const { user, logout } = useContext(AdminAuthContext)
  const { menu, sideBarOpen, activeIndex, setActiveIndex, activeSubIndex, setActiveSubIndex, activeIndexes, setActiveIndexes } = useContext(SidebarContext)

  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const actions = {
    logout
  }

  const toggleActiveIndexes = (value) => {
    //setActiveIndex(value);
    const index = activeIndexes.indexOf(value);
    if (index > -1) {


      const firstArr = activeIndexes.slice(0, index);
      const secondArr = activeIndexes.slice(index + 1);
      const newArray = [...firstArr, ...secondArr]

      setActiveIndexes(newArray);

    }
    else {


      setActiveIndexes(prev => [...new Set([...prev, value])]);
    }
  }

  const handleOpen = (value) => {

    toggleActiveIndexes(value)



    // setActiveIndex(value);
    //setActiveSubIndex(0)
  };

  const isOpen = (index) => {
    return activeIndexes.indexOf(index) > -1
  }
  const handleOpenUrl = (index, url) => {
    setActiveIndex(index);
    setActiveSubIndex(0)
    //if (activeIndexes.indexOf(index) == -1) toggleActiveIndexes(index);
    router.push(url)

  };

  const handleOpenUrlFromChild = (index, subIndex, url) => {
    setActiveIndex(index);
    if (activeIndexes.indexOf(index) == -1) toggleActiveIndexes(index);
    setActiveSubIndex(subIndex)
    router.push(url)

  };

  useEffect(() => {

    setOpen(activeIndex)


  }, [activeIndex])


  useEffect(() => {
    console.log(sideBarOpen)


  }, [sideBarOpen])


  useEffect(() => {
    menu.forEach(m => {


      if (m.children) {
        if (m.url && pathname.startsWith(m.url)) {
          setActiveIndex(m.itemIndex)
        }

        m.children.forEach(c => {
          if (pathname.startsWith(c.url)) {
            if (activeIndexes.indexOf(m.itemIndex) == -1) toggleActiveIndexes(m.itemIndex);

            setActiveIndex(m.itemIndex)
            //setOpen(m.itemIndex)
            setActiveSubIndex(c.itemIndex)
          }
        })
      }
      else if (m.url && m.url === pathname) {
        setActiveIndex(m.itemIndex)
      }

    });
  }, [])




  const MenuItemSingleUrl = ({ itemIndex, label, icon, url }) => {

    if (!icon) return <></>
    const IconComponent = solidIcons[icon] /* lazy(() => import(`@heroicons/react/24/solid/${icon}`)); */
    const loader = () => {
      return <div role="status">
        <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">...</span>
      </div>
    }
    return <ListItem onClick={() => handleOpenUrl(itemIndex, url)} selected={isOpen(itemIndex)} className={`${activeIndex == itemIndex ? 'bg-blue-500 text-white' : ''} group rounded-none py-3 px-3 text-sm font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white`}>
      <ListItemPrefix>
        <Suspense fallback={loader}>
          <IconComponent className={`h-5 w-5 ${activeIndex == itemIndex ? 'text-white' : ''}`} />
        </Suspense>

      </ListItemPrefix>
      <div className={`${activeIndex == itemIndex ? 'text-white' : ''}`} >{label}</div>
      {/*   <ListItemSuffix>
        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
      </ListItemSuffix> */}
    </ListItem>
  }
  const MenuItemGroupUrl = ({ itemIndex, label, icon, children }) => {

    if (!icon) return <></>
    const IconComponent = solidIcons[icon] /* lazy(() => import(`@heroicons/react/24/solid/${icon}`)); */
    const loader = () => {
      return <div role="status">
        <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">...</span>
      </div>
    }
    return <><ListItem onClick={() => handleOpen(itemIndex)} selected={isOpen(itemIndex)} className={`${activeIndex == itemIndex ? 'bg-blue-500 text-white' : ''} group rounded-none py-3 px-3 text-sm font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white`}>
      <ListItemPrefix>
        <Suspense fallback={loader}>
          <IconComponent className={`h-5 w-5 ${activeIndex == itemIndex ? 'text-white' : ''}`} />
        </Suspense>

      </ListItemPrefix>
      <div className={`${activeIndex == itemIndex ? 'text-white' : ''}`} >{label}</div>
      <ListItemSuffix>
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${isOpen(itemIndex) ? "rotate-180" : ""} ${activeIndex == itemIndex ? 'text-white' : ''}`}
        />

      </ListItemSuffix>
    </ListItem>
      {isOpen(itemIndex) && <div>
        <List className="p-0 rounded-none "  >
          {children.map(child => <ListItem className="text-xs rounded-none" selected={activeSubIndex === child.itemIndex} onClick={() => handleOpenUrlFromChild(itemIndex, child.itemIndex, child.url)}>
            {/* <ListItemPrefix>
              <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
            </ListItemPrefix> */}
            <div className="ps-9">{child.label}</div>
            {/* <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix> */}
          </ListItem>)}
        </List>
      </div>}
    </>
  }
  const MenuItemDivider = ({ }) => {


    return <hr className="my-2 border-blue-gray-50" />
  }
  const MenuItemGroup = ({ itemIndex, label, icon, children }) => {

    //const IconComponent = lazy(() => import(`@heroicons/react/24/solid/${icon}`));
    const IconComponent = solidIcons[icon] /* lazy(() => import(`@heroicons/react/24/solid/${icon}`)); */
    const loader = () => {
      return <div role="status">
        <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">...</span>
      </div>
    }
    return <Accordion
      animate={false}
      open={open === itemIndex}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${open === itemIndex ? "rotate-180" : ""}`}
        />
      }
    >
      <ListItem className="p-0 rounded-none " selected={open === itemIndex}>
        <AccordionHeader onClick={() => handleOpen(open === itemIndex ? 0 : itemIndex)} className={`${open === itemIndex ? 'bg-blue-500 text-white' : ''} border-b-0 group rounded-none py-2 px-3 text-sm font-normal text-blue-gray-700 active:bg-blue-500 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white`}>
          <ListItemPrefix>
            <ShoppingBagIcon className={`h-5 w-5 ${open === itemIndex ? 'text-white' : ''}`} />
          </ListItemPrefix>
          <Typography className={`${open === itemIndex ? 'text-white' : ''}  mr-auto font-normal text-sm `}>
            {label}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1 ">

        <List className="p-0 rounded-none py-1"  >
          {children.map(child => <ListItem className="text-xs" selected={activeSubIndex === child.itemIndex} onClick={() => handleOpenUrlFromChild(itemIndex, child.itemIndex, child.url)}>
            <ListItemPrefix>
              <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
            </ListItemPrefix>
            <div>{child.label}</div>
            {/* <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix> */}
          </ListItem>)}
        </List>
      </AccordionBody>
    </Accordion>
  }

  const MenuItemSingleAction = ({ itemIndex, label, icon, action }) => {

    //const IconComponent = lazy(() => import(`@heroicons/react/24/solid/${icon}`));
    const IconComponent = solidIcons[icon] /* lazy(() => import(`@heroicons/react/24/solid/${icon}`)); */
    const loader = () => {
      return <div role="status">
        <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        <span className="sr-only">...</span>
      </div>
    }
    return <ListItem onClick={() => { actions[action]() }} className="font-normal text-sm " >
      <ListItemPrefix>
        <Suspense fallback={loader}>
          <IconComponent className="h-5 w-5 font-normal text-sm " />
        </Suspense>
      </ListItemPrefix>
      {label}
    </ListItem>
  }

  const MenuListItems = () => {
    return <List className="p-0 gap-0">{menu.map(item => {

      if (item.divider) return <MenuItemDivider></MenuItemDivider>
      else if (item.url && !item.children) return <MenuItemSingleUrl {...item} ></MenuItemSingleUrl>
      else if (item.children) return <MenuItemGroupUrl {...item} ></MenuItemGroupUrl>
      else if (item.action) return <MenuItemSingleAction {...item} ></MenuItemSingleAction>
      else return <></>
    })}</List>
  }


  return (
    <>{<aside id="default-sidebar" className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] transition-transform  ${sideBarOpen ? "translate-x-0 sm:translate-x-0" : "-translate-x-full sm:-translate-x-full"} `} aria-label="Sidebar">
      <Card className="h-[calc(100vh-4rem)] w-full max-w-[20rem] p-0 m-0  shadow-xl shadow-blue-gray-900/5 rounded-none !text-sm dark:bg-gray-900 text-white">
        {/*  <h1 className="text-black">test {pathname}</h1>
        <p className="text-black">activeIndex: {activeIndex}</p> */}
        {<MenuListItems></MenuListItems>}

      </Card>
    </aside>}</>



  );
}