import React, { useContext, useEffect, useState } from 'react'




import AppearanceContext from '../../../../context/admincp/AppearanceContext'

import { Avatar, Button, Checkbox, Switch, Spinner } from '@material-tailwind/react'
import { useRouter } from 'next/navigation';
import ThemeList from './ThemeList';

const TH = ({ className, children }) => {
    return <th className={"border-b  border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm " + (className || '')}>{children}</th>
}




function index(props) {
    const router = useRouter();
    const { themes, currentTheme, applyTheme, createTheme, loadThemes, themeIsLoading } = useContext(AppearanceContext)

    const newTheme = async () => {

        const newName = `New Theme [${Date.now()}]`

        const styleItemNames = "header,header_list,background,navigation,navigation_list,navigation_item,navigation_item_icon,navigation_item_text,button_primary".split(',')


        const asStyleObject = styleItemNames.reduce((obj, item, index) => {
            obj[item] = { style:{}, className:'' };
            return obj;
          }, {});

        const newThemeData = {
            name: `${newName}`, description: `About ${newName}`, featured: false, brandLogoUrl: '', data: asStyleObject
        }
        const newTheme = await createTheme(newThemeData)
        if (newTheme.id) {
            loadThemes().then(() => {
                router.push([...props.path, newTheme.id].join("/"))
            })

        }

    }

    return (
        <div className="shadow bg-white border rounded-lg m-4 min-h-64 p-4 ">
            <div className='flex flex-row justify-between items-center'>
                <h2 className='font-bold'>Themes {themeIsLoading ? <Spinner className="h-6 w-6" color='blue'></Spinner> : <span>({themes.length})</span>}</h2>

                <Button className='rounded-full' color='blue' variant='gradient' onClick={(e) => { newTheme() }}>New Theme</Button>
            </div>

            {themes && <ThemeList themes={themes} currentTheme={currentTheme} createTheme={createTheme} applyTheme={applyTheme} loadThemes={loadThemes} path={props.path}></ThemeList>}
            <Spinner className={`absolute transition-all duration-300 z-50 mx-auto ${themeIsLoading?'top-36':'-top-full'}`}></Spinner>
        </div>
    )
}

export default index