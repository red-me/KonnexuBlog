import React, { useContext, useEffect, useRef, useState } from 'react'
import AppearanceContext from '../../../../context/admincp/AppearanceContext'
import MenuDetail from './MenuDetail'
import { Button } from '@material-tailwind/react'
import * as icons from "@heroicons/react/24/outline";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const index = () => {



    
    const { menus, loadMenus, createMenu } = useContext(AppearanceContext)
    const [hasNewRecord, setHasNewRecord] = useState(null)
    const testRef = useRef();

    /*  useEffect(() => {
         if(menus){
             if(menus.find(m=>m.id==))
         }
         testRef.current.focus();
      }, [menus]);
  */
    const createEmptyMenu = async () => {

        const newMenuData = {
            name: `Menu-${Date.now()}`, description: ``, data: []
        }
        const newMenu = await createMenu(newMenuData)
        if (newMenu.id) {
            loadMenus().then(() => {
                //router.push([...props.path, newTheme.id].join("/"))
                setHasNewRecord(newMenu.id)
            })

        }
    }



    return (
        <div className='flex flex-col gap-4 w-full p-4'>
            <h1 className='text-white font-bold text-2xl '>Menu Manager</h1>
           {/*  <DndProvider backend={HTML5Backend}> */}
            <div className="shadow bg-white border rounded-lg min-h-64 flex flex-col h-full gap-4 p-4">
               {/*  <div className='flex flex-row w-full justify-end items-center'> <Button color='blue' size='sm' className='rounded-full' variant='gradient' onClick={() => { createEmptyMenu() }}>New Menu</Button></div> */}
                <div className='flex flex-col w-full gap-4'>
                    
                    {menus && menus.map(menu => <MenuDetail menu={menu}></MenuDetail>)}

                </div>

            </div>
         {/*    </DndProvider> */}
        </div>
    )
}

export default index