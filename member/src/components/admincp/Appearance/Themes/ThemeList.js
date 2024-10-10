import {
    Button, Card, Chip, IconButton, Typography, Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from '@material-tailwind/react'
import React, { useContext, useState } from 'react'

import HeaderPreview from './HeaderPreview'
import MockBrowserWindow from "./MockBrowserWindow"
import { useRouter } from 'next/navigation';
import { toast, Bounce } from 'react-toastify';
import AppearanceContext from '../../../../context/admincp/AppearanceContext'
import ThemePreview from "./ThemePreview"
const ThemeInfoRow = ({ theme, index, path }) => {
    const router = useRouter();
    const { createTheme, currentTheme, deleteTheme, applyTheme, loadThemes } = useContext(AppearanceContext)
    const url = [...path, theme.id].join("/")
    const cloneTheme = async (theme) => {

        const { name, ...data } = theme
        const newTheme = { ...data, name: `${name} [${Date.now()}]` }
        const clonedTheme = await createTheme(newTheme)
        if (clonedTheme.id) {
            loadThemes().then(() => {
                router.push([...path, clonedTheme.id].join("/"))
            })

        }

    }


    const [isDeleting, setIsDeleting] = useState(false)


    const deleteThisTheme = async (themeId) => {
        setIsDeleting(true)

        const deletedTheme = await deleteTheme(themeId)
        if (deletedTheme.id) {
            toast.success('Theme deleted', {
                toastId: 'theme_updated',
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            loadThemes()

        }
        setIsDeleting(false)

    }
    const palletClassName = 'flex gap-4 p-4 w-full flex-col  shadow-sm items-center text-center align-middle  text-xs'
    return <div className={`flex py-5 flex-row justify-stretch w-full ${index % 2 == 0 ? 'pb-1 border-b border-gray-200' : ''}`}>
        <div className='flex flex-col gap-2 justify-start items-left w-1/3 '>
            <div className={`flex flex-row justify-between items-center font-medium text-lg p-3 bg-gray-50`}> <div className='flex flex-row gap-2'><span>{theme.name}</span>
                {currentTheme?.id == theme.id && <Chip title='This is the active theme.' variant="gradient" color='green' size="sm" className='rounded-full w-6 h-6' value={<span>&#10003;</span>} />}
            </div>
                <div className='flex flex-row gap-2'>

                    {currentTheme?.id !== theme.id && <Button size='sm' title="Apply this theme." variant='gradient' color='green' className='rounded px-4' onClick={(e) => { applyTheme(theme.id, currentTheme.id) }}>
                        Use
                    </Button>}
                    <Button size='sm' variant='gradient' title='Edit this theme.' color='blue' className='rounded px-4' onClick={(e) => { router.push(url) }}>Edit</Button>
                    <Button size='sm' variant='gradient' title='Clone this theme.' color='indigo' className='rounded px-4' onClick={(e) => { cloneTheme(theme) }}>Clone</Button>
                    {currentTheme?.id !== theme.id &&

                        <Menu placement='bottom'>
                            <MenuHandler>
                                <Button size='sm' title="Delete this theme." loading={isDeleting} variant='gradient' color='red' className='rounded px-4' onClick={(e) => { applyTheme(theme.id, currentTheme.id) }}>
                                    Delete
                                </Button>
                            </MenuHandler>
                            <MenuList className=' outline-none'>
                                <div className='flex flex-row gap-3 justify-between items-center  outline-none'>
                                    <span>Press OK to confirm.</span><Button size='sm' title="Confirm delete action." loading={isDeleting} variant='gradient' color='red' className='rounded-full scale-75' onClick={(e) => { deleteThisTheme(theme.id) }}>
                                        OK
                                    </Button>
                                </div>
                            </MenuList>
                        </Menu>

                    }
                </div>
            </div>

            <div className={`flex flex-col gap-2 font-thin text-sm p-3 text-gray-800`}><div className='font-semibold pr-2'>Description</div><p className='p-1'>{theme.description}</p></div>

        </div>
        <div className='flex gap-2 justify-start items-start p-2   flex-grow '>
            <ThemePreview theme={theme}></ThemePreview>
            {/* <div className='flex gap-2 justify-start items-start p-2   flex-grow'></div> */}

        </div>

    </div>
}


const ThemeList = ({ path }) => {

    const { themes } = useContext(AppearanceContext)
    return (


        <div className='p-3 w-full'>
            {themes && themes.map((theme, index) => <ThemeInfoRow theme={theme} index={index} path={path} ></ThemeInfoRow>)}
        </div>
    )
}

export default ThemeList