import React, { useContext, useEffect, useReducer, useState } from 'react'

import { Bounce, toast, ToastContainer } from 'react-toastify';
import AppearanceContext from '../../../../../context/admincp/AppearanceContext'
import SidebarContext from '../../../../../context/admincp/SidebarContext'
import { useRouter } from 'next/navigation';
import { Button, ButtonGroup, Carousel, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import SettingRow from '../../../Common/SettingRow'
import tailwindCSS from '../tailwindCSS'
import domStyleProperties from "../domStyleProperties"
import DomStyleSelector from "../DomStyleSelector"
import PictureUploader from '../../../Common/InputControls/PictureUploader';
import ThemePreview from '../ThemePreview';

/**
 * 
 * @param {string} s any string
 * @example rAndOmCase
 * @returns {string} The Proper Case version of the string: RandomCase
 */
const toProperCase = (s) => {
    return s.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(); });
};
/**
 * 
 * @param {string} s This assumes s is a string of words separated by spaces
 * @example "Begin component Initialization"
 * @returns {string} the camel case version of the string : "beginComponentInitialization"
 */
const toCamelCase = (s) => {
    if (s.trim().indexOf(' ') > -1) {
        const toProperCase = (s) => {
            return s.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(); });
        };
        const t = s.split(' ').map((s, i) => {
            return i == 0 ? s.toLowerCase() : toProperCase(s)
        }).join('')

        return t;
    }
    else return s;
}

/**
 * 
 * @param {string} s string in snake_case
 * @returns {string} string in words: "Snake Case"
 */
const snakeCaseToWords = (s) => {
    return s.split("_").map(x => toProperCase(x)).join(' ');
}

const wordsToSnakeCase = (s) => {
    return s.trim().split(' ').map(x => x.toLowerCase(x)).join('_');
}

const ItemStyleEditor = ({ theme, id, set }) => {

    const [data, setData] = useState(theme.data[id] ? theme.data[id] : { style: {}, className: "" })

    const [newClassName, setNewClassName] = useState('')
    const [newStyleName, setNewStyleName] = useState('')
    const [newStyleValue, setNewStyleValue] = useState('')

    const setClassName = (v) => {
        setData(p => { return { ...p, className: v } })
    }
    const setStyle = (v) => {
        setData(p => { return { ...p, style: JSON.parse(v) } })
    }

    const acceptNewClassName = () => {

        if (newClassName.trim().length == 0) return;


        // if (newClassName.trim().split(" ").length > 0) return;
        //      setActiveIndexes(prev => [...new Set([...prev, value])]); 
        setData(p => { return { ...p, className: [...new Set([...p.className.trim().split(' '), newClassName])].join(' ') } })
        setNewClassName('')
    }



    const rejectNewClassName = () => {

        setNewClassName('')
    }

    const removeClassName = (c) => {

        //      setActiveIndexes(prev => [...new Set([...prev, value])]); 
        setData(p => { return { ...p, className: [...new Set([...p.className.trim().split(' ').filter(x => x != c)])].join(' ') } })

    }

    const removeStyle = (c) => {

        //      setActiveIndexes(prev => [...new Set([...prev, value])]); 
        // setData(p => { return { ...p, className: [...new Set([...p.className.trim().split(' ').filter(x => x != c)])].join(' ') } })
        setData(p => {

            const { style, ...otherProperties } = p

            let s = { ...style }
            /*  if (style[c]) {
                 delete style[c]
                 Reflect.deleteProperty(style, 'car2');
             } */
            delete s[c]

            return { ...otherProperties, style: s }
        })

    }

    useEffect(() => {
        if (data) {
            set(data)
        }
    }, [data])




    const acceptNewStyle = () => {

        if (newStyleName.trim().length == 0) return;
        if (newStyleValue.trim().length == 0) return;

        //todo: check for valid style property
        if (isDomStyle(newStyleName) == false) return;

        //      setActiveIndexes(prev => [...new Set([...prev, value])]); 
        setData(p => { return { ...p, style: { ...p.style, [toCamelCase(newStyleName)]: newStyleValue } } })
        setNewStyleName('')
        setNewStyleValue('')
    }
    const rejectNewStyle = () => {

        setNewStyleName('')
        setNewStyleValue('')
    }

    const updateStyle = (id, value) => {


        //      setActiveIndexes(prev => [...new Set([...prev, value])]); 
        setData(p => { return { ...p, style: { ...p.style, [id]: value } } })

    }



    const isTW = (c) => {

        if (c.indexOf(":") > -1) {
            const y = c.split(':');
            return ['sm', 'md', 'lg', 'xl', '2xl'].includes(y[0]) && tailwindCSS.indexOf(y[1]) > -1;
        }
        else
            return tailwindCSS.indexOf(c) > -1
    }

    const isTWTextColor = (c) => {
        const textColors = ["text-transparent", "text-black", "text-white",
            "text-slate-50", "text-slate-100", "text-slate-200", "text-slate-300", "text-slate-400", "text-slate-500", "text-slate-600", "text-slate-700", "text-slate-800", "text-slate-900", "text-slate-950",
            "text-gray-50", "text-gray-100", "text-gray-200", "text-gray-300", "text-gray-400", "text-gray-500", "text-gray-600", "text-gray-700", "text-gray-800", "text-gray-900", "text-gray-950",
            "text-zinc-50", "text-zinc-100", "text-zinc-200", "text-zinc-300", "text-zinc-400", "text-zinc-500", "text-zinc-600", "text-zinc-700", "text-zinc-800", "text-zinc-900", "text-zinc-950",
            "text-neutral-50", "text-neutral-100", "text-neutral-200", "text-neutral-300", "text-neutral-400", "text-neutral-500", "text-neutral-600", "text-neutral-700", "text-neutral-800", "text-neutral-900", "text-neutral-950",
            "text-stone-50", "text-stone-100", "text-stone-200", "text-stone-300", "text-stone-400", "text-stone-500", "text-stone-600", "text-stone-700", "text-stone-800", "text-stone-900", "text-stone-950",
            "text-red-50", "text-red-100", "text-red-200", "text-red-300", "text-red-400", "text-red-500", "text-red-600", "text-red-700", "text-red-800", "text-red-900", "text-red-950",
            "text-orange-50", "text-orange-100", "text-orange-200", "text-orange-300", "text-orange-400", "text-orange-500", "text-orange-600", "text-orange-700", "text-orange-800", "text-orange-900", "text-orange-950",
            "text-amber-50", "text-amber-100", "text-amber-200", "text-amber-300", "text-amber-400", "text-amber-500", "text-amber-600", "text-amber-700", "text-amber-800", "text-amber-900", "text-amber-950",
            "text-yellow-50", "text-yellow-100", "text-yellow-200", "text-yellow-300", "text-yellow-400", "text-yellow-500", "text-yellow-600", "text-yellow-700", "text-yellow-800", "text-yellow-900", "text-yellow-950",
            "text-lime-50", "text-lime-100", "text-lime-200", "text-lime-300", "text-lime-400", "text-lime-500", "text-lime-600", "text-lime-700", "text-lime-800", "text-lime-900", "text-lime-950",
            "text-green-50", "text-green-100", "text-green-200", "text-green-300", "text-green-400", "text-green-500", "text-green-600", "text-green-700", "text-green-800", "text-green-900", "text-green-950",
            "text-emerald-50", "text-emerald-100", "text-emerald-200", "text-emerald-300", "text-emerald-400", "text-emerald-500", "text-emerald-600", "text-emerald-700", "text-emerald-800", "text-emerald-900", "text-emerald-950",
            "text-teal-50", "text-teal-100", "text-teal-200", "text-teal-300", "text-teal-400", "text-teal-500", "text-teal-600", "text-teal-700", "text-teal-800", "text-teal-900", "text-teal-950",
            "text-cyan-50", "text-cyan-100", "text-cyan-200", "text-cyan-300", "text-cyan-400", "text-cyan-500", "text-cyan-600", "text-cyan-700", "text-cyan-800", "text-cyan-900", "text-cyan-950",
            "text-sky-50", "text-sky-100", "text-sky-200", "text-sky-300", "text-sky-400", "text-sky-500", "text-sky-600", "text-sky-700", "text-sky-800", "text-sky-900", "text-sky-950",
            "text-blue-50", "text-blue-100", "text-blue-200", "text-blue-300", "text-blue-400", "text-blue-500", "text-blue-600", "text-blue-700", "text-blue-800", "text-blue-900", "text-blue-950",
            "text-indigo-50", "text-indigo-100", "text-indigo-200", "text-indigo-300", "text-indigo-400", "text-indigo-500", "text-indigo-600", "text-indigo-700", "text-indigo-800", "text-indigo-900", "text-indigo-950",
            "text-violet-50", "text-violet-100", "text-violet-200", "text-violet-300", "text-violet-400", "text-violet-500", "text-violet-600", "text-violet-700", "text-violet-800", "text-violet-900", "text-violet-950",
            "text-purple-50", "text-purple-100", "text-purple-200", "text-purple-300", "text-purple-400", "text-purple-500", "text-purple-600", "text-purple-700", "text-purple-800", "text-purple-900", "text-purple-950",
            "text-fuchsia-50", "text-fuchsia-100", "text-fuchsia-200", "text-fuchsia-300", "text-fuchsia-400", "text-fuchsia-500", "text-fuchsia-600", "text-fuchsia-700", "text-fuchsia-800", "text-fuchsia-900", "text-fuchsia-950",
            "text-pink-50", "text-pink-100", "text-pink-200", "text-pink-300", "text-pink-400", "text-pink-500", "text-pink-600", "text-pink-700", "text-pink-800", "text-pink-900", "text-pink-950",
            "text-rose-50", "text-rose-100", "text-rose-200", "text-rose-300", "text-rose-400", "text-rose-500", "text-rose-600", "text-rose-700", "text-rose-800", "text-rose-900", "text-rose-950",];
        return textColors.includes(c)
    }

    const isDomStyle = (c) => {
        const y = domStyleProperties.findIndex(s => s.name == c) > -1
        return y;
    }

    const getDOMStyleDesc = (c) => {
        return domStyleProperties.find(s => s.name == c).description;
    }
    return <div className='flex flex-col gap-2 w-full'>
        <div className='flex flex-row justify-start items-center gap-0 '>
            <div className='flex w-32 p-3 py-5 border h-16  bg-gray-100 rounded-l justify-start text-left text-sm text-gray-800'>ClassName</div>
            <div className='flex w-full p-1 border border-gray-200  rounded-r gap-2 overflow-x-scroll py-3 h-16 items-center '  >
                {data.className && data.className.replace(/\s+/g, ' ').split(' ').map(c => <div className='bg-gray-100 shadow-sm rounded-full border pl-2 pr-1 py-1 text-xs flex flex-row gap-1 hover:shadow-md text-nowrap ' >
                    {isTW(c) && <span className='cursor-pointer justify-center items-center rounded-full bg-light-blue-600 text-white w-4 h-4 flex hover:shadow ' ><span title="This is a Tailwind class." className={"scale-75"}>tw</span></span>}
                    {(c.startsWith('bg-') || isTWTextColor(c)) && <div className={`w-4 h-4 border ${c.replace('text', 'bg')}`} ></div>}
                    <span className='text-nowrap'>{c}</span>
                    <span className='cursor-pointer justify-center items-center rounded-full bg-gray-600 text-white w-4 h-4 flex hover:shadow hover:bg-red-600' onClick={(e) => { removeClassName(c) }}>&times;</span></div>)}
                <input className='bg-gray-100 shadow-sm rounded-full border px-2 text-xs h-6' value={newClassName} onChange={(e) => { setNewClassName(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') acceptNewClassName();
                        else if (e.key === 'Escape') rejectNewClassName();
                    }}
                />

            </div>

        </div>
        <div className='flex flex-row justify-start items-center gap-0 '>
            <div className='flex w-32 p-3 py-5 border h-16  bg-gray-100 rounded-l justify-start text-left text-sm text-gray-800'>Style</div>
            <div className='flex w-full p-1 border border-gray-200  rounded-r gap-2 overflow-x-scroll py-3 h-16'  >
                {data.style && Object.keys(data.style).map(c => <div className='shadow-sm rounded-full bg-gray-100 border pl-2 pr-1 py-0 items-center text-xs flex flex-row gap-0 hover:shadow-md text-nowrap ' >
                    {isDomStyle(c) && <span className='cursor-pointer justify-center items-center rounded-full bg-light-green-600 text-white w-4 h-4 flex   hover:shadow ' ><span title={getDOMStyleDesc(c)} className={"scale-75"}>&#10003;</span></span>}
                    <span className='text-nowrap rounded-s-full border-r px-2'>{c}</span>
                    {['color', 'backgroundColor'].includes(c) && <div className='w-4 h-4 border mr-1' style={{ backgroundColor: data.style[c] }} ></div>}
                    <input className='px-2 text-nowrap rounded-e-full font-semibold flex flex-row gap-1' value={data.style[c]} onChange={(e) => { updateStyle(c, e.target.value.trim()) }} />
                    <span className='cursor-pointer justify-center items-center rounded-full bg-gray-600 hover:bg-red-600 text-white w-4 h-4 flex hover:shadow' onClick={(e) => { removeStyle(c) }}>&times;</span></div>)}
                <div className='flex flex-row'>{/* <input className={`${newStyleName.trim() == 0 ? 'bg-gray-100' : (isDomStyle(newStyleName) ? 'bg-green-100' : 'bg-red-100')}  bg-gray-100 shadow-sm rounded-l-full border px-2 text-xs h-6`} value={newStyleName} onChange={(e) => { setNewStyleName(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') acceptNewStyle();
                        else if (e.key === 'Escape') rejectNewStyle();
                    }}
                /> */}
                    <DomStyleSelector setSelectedValue={setNewStyleName} selectedValue={newStyleName} ></DomStyleSelector>
                    <input className='bg-gray-100 shadow-sm rounded-r-full border px-2 text-xs font-semibold h-6' value={newStyleValue} onChange={(e) => { setNewStyleValue(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') acceptNewStyle();
                            else if (e.key === 'Escape') rejectNewStyle();
                        }}
                    /></div>
            </div>

        </div>
    </div>
}

const index = ({ path }) => {
    const router = useRouter();
    const { themes, themeIsLoading, updateTheme, loadThemes } = useContext(AppearanceContext)
    const { setSideBarOpen } = useContext(SidebarContext)


    const [stheme, setTheme] = useState(null)
    const INITIAL_FIELD_VALUE = { style: {}, className: '' }
    const [theme, dispatch] = useReducer((state, action) => {



        switch (action.type) {
            case 'LOAD':
                return { ...state, ...action.value }
            case 'SET':
                return { ...state, [action.id]: action.value }

            case 'SET_DATA':

                const { data, ...other } = state
                const newState = { ...other, data: { ...data, [action.id]: action.value } }
                return newState;

            case 'UNSET_DATA':
                const { data: oldData, ...otherProperties } = state
                let newData = { ...oldData };
                delete newData[action.id]

                return { ...otherProperties, data: { ...newData } }

        }

        return state

    }, null)

    /* 
        useEffect(() => {
            setSideBarOpen(false)
    
            return () => {
                setSideBarOpen(true)
            }
        }, []) */

    useEffect(() => {
        if (theme) {

            console.info("THEME_CHANGED", theme)
        }


    }, [theme])


    const [isChanged, setIsChanged] = useState(false)
    const [isEditName, setIsEditName] = useState(false)

    useEffect(() => {
        if (themes) {
            const themeId = path[path.length - 1];
            const found = (themes.find(t => t.id === themeId))
            if (found) dispatch({ type: 'LOAD', value: found })
        }

        setSideBarOpen(false)

        return () => {
            setSideBarOpen(true)
        }

    }, [path, themes])


    const setName = (name) => {
        dispatch({ type: 'SET', id: 'name', value: name })
        setIsChanged(true)
    }

    const setDesc = (desc) => {
        dispatch({ type: 'SET', id: 'description', value: desc })
        setIsChanged(true)
    }

    const setField = (id, value) => {
        dispatch({ type: 'SET_DATA', id: id, value: value })
        setIsChanged(true)
    }

    //brandLogoUrl

    const setBrandLogoUrl = (url) => {
        dispatch({ type: 'SET', id: 'brandLogoUrl', value: url })
        setIsChanged(true)
    }
    const setBrandBackgroundPhotoUrl = (url) => {
        dispatch({ type: 'SET', id: 'brandBackgroundPhotoUrl', value: url })
        setIsChanged(true)
    }
 

    const [newStyleName, setNewStyleName] = useState('')
    const addNewItemStyle = () => {

        const snakedName = wordsToSnakeCase(newStyleName)
        if (theme.data[snakedName] !== undefined) {

            toast.error('This style already exists.', {
                toastId: 'theme_updated',
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            setField(snakedName, { style: {}, className: "" })
            setNewStyleName('')
        }


    }

    //UNSET_DATA
    const removeItemStyle = (id) => {
        dispatch({ type: 'UNSET_DATA', id: id })
        setIsChanged(true)
    }


    const rows = [
        { id: 'background', title: 'Background', description: "The outermost area of the page." },
        { id: 'header', title: 'Header', description: "The Header represents the section located on top of a page." },
        { id: 'header_list', title: 'Header List', description: "This list is located inside the Header and contains the clickable elements." },
        { id: 'navigation', title: 'Navigation', description: "Represents the navigation section located on top of a page." },
        { id: 'navigation_list', title: 'Navigation List', description: "This list is located inside the Navigation section and contains the clickable elements." }

    ]

    const saveSettings = () => {

        updateTheme(theme).then(result => {
            if (result.id) {
                toast.success('Theme updated', {
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
                loadThemes();
            }
        })
    }

    return (<>
        <div className="shadow bg-white border rounded-lg m-4 min-h-64 flex flex-col h-full">
            {theme && <>
                <div className='flex flex-row w-full h-screen'>


                    <div className='flex-col basis-1/2 w-1/2 h-screen'>
                        <div className='flex flex-row items-center gap-4 bg-gray-50 p-3  justify-between rounded-t-md'>
                            <div className='flex flex-row items-center gap-3 text-nowrap '>THEME NAME: {isEditName ? <input className="border shadow-inner p-1 w-full" maxLength={50} type='text' value={theme.name} onChange={(e) => setName(e.target.value)} onBlur={(e) => { setIsEditName(false) }} onKeyDown={(e) => (
                                e.key === 'Enter' ? setIsEditName(false) : null
                            )}></input>
                                : <div className="flex flex-row gap-1  p-1 w-96" onClick={(e) => { setIsEditName(true) }}><span>{theme.name}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z" clipRule="evenodd" />
                                    </svg>

                                </div>}
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <Button loading={themeIsLoading} className={`flex-none transition-all  ${isChanged ? 'opacity-1' : 'opacity-0'}`} size="small" variant="gradient" color="blue" onClick={(e) => { saveSettings() }}>Save Changes</Button>
                                <Button loading={themeIsLoading} className={`flex-none transition-all `} size="small" variant="gradient" color="blue-gray" onClick={(e) => { router.back() }}>Return</Button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 p-4 overflow-y-scroll overflow-x-hidden flex-grow h-[600px]'>
                            <SettingRow label={'Description'} description={'Describe this theme.'}
                                type={2} bottomDivider={false}
                            >
                                <textarea className='border shadow-inner w-full  resize-none p-1 h-28' value={theme.description} onChange={(e) => setDesc(e.target.value)} rows={4} maxLength={2000} ></textarea>

                            </SettingRow>

                            <div className='m-2 p-5 border-gray-200  flex flex-col gap-2 items-left w-full'>
                                <div><h3>Branding</h3></div>
                                <SettingRow label={'Brand Logo'} description={'This is the photo used for the app found on the header section. The ideal photo dimension is 144px by 32px.'}
                                    type={2} bottomDivider={false}>
                                    <div className={'w-full flex- flex-col gap-2'} >
                                        <div className={'w-full'} >
                                            <PictureUploader fileUrl={theme.brandLogoUrl} setFileUrl={setBrandLogoUrl} path={`themes/${theme.id}/logo`} ></PictureUploader>
                                        </div>
                                        {theme.brandLogoUrl && theme.brandLogoUrl.length > 0 && <div className='flex flex-row items-end justify-start mr-0 w-full p-4'>


                                            <Menu placement='bottom'>
                                                <MenuHandler>
                                                    <Button size='sm' title="CAUTION: Once saved, the values defined in this style can no longer be restored." variant='gradient' color='red' className='rounded px-4' >
                                                        Remove Logo
                                                    </Button>
                                                </MenuHandler>
                                                <MenuList className='outline-none' >
                                                    <div className='flex flex-row gap-3 justify-between items-center outline-none'>
                                                        <span>Press OK to confirm.</span><Button size='sm' title="Confirm remove action." variant='gradient' color='red' className='rounded-full scale-75' onClick={(e) => { setBrandLogoUrl('') }} >
                                                            OK
                                                        </Button>
                                                    </div>
                                                </MenuList>
                                            </Menu>
                                        </div>}
                                    </div>
                                </SettingRow>
                                <SettingRow label={'Login Screen Background Photo'} description={'This is the background photo used for the login screen.'}
                                    type={2} bottomDivider={false}>
                                    <div className={'w-full flex- flex-col gap-2'} >
                                        <div className={'w-full'} >
                                            <PictureUploader fileUrl={theme.brandBackgroundPhotoUrl} setFileUrl={setBrandBackgroundPhotoUrl} path={`themes/${theme.id}/background`} ></PictureUploader>
                                        </div>
                                        {theme.brandBackgroundPhotoUrl && theme.brandBackgroundPhotoUrl.length > 0 && <div className='flex flex-row items-end justify-start mr-0 w-full p-4'>


                                            <Menu placement='bottom'>
                                                <MenuHandler>
                                                    <Button size='sm' title="CAUTION: Once saved, the values defined in this style can no longer be restored." variant='gradient' color='red' className='rounded px-4' >
                                                        Remove Logo
                                                    </Button>
                                                </MenuHandler>
                                                <MenuList className='outline-none' >
                                                    <div className='flex flex-row gap-3 justify-between items-center outline-none'>
                                                        <span>Press OK to confirm.</span><Button size='sm' title="Confirm remove action." variant='gradient' color='red' className='rounded-full scale-75' onClick={(e) => { setBrandBackgroundPhotoUrl('') }} >
                                                            OK
                                                        </Button>
                                                    </div>
                                                </MenuList>
                                            </Menu>
                                        </div>}
                                    </div>
                                </SettingRow>

                            </div>
                            <div className='m-2 p-5 border-gray-200  flex flex-col gap-2 items-left w-full'>
                                <div><h3>Styles</h3></div>
                                {theme && Object.keys(theme.data).map(r => <SettingRow type={2} label={snakeCaseToWords(r)} description={''}>
                                    <div className='w-full flex flex-col gap-2 items-end'>
                                        <ItemStyleEditor theme={theme} id={r} set={(v) => setField(r, v)}></ItemStyleEditor>
                                        <div className='flex flex-row items-end justify-end mr-0 '>


                                            <Menu placement='bottom'>
                                                <MenuHandler>
                                                    <Button size='sm' title="CAUTION: Once saved, the values defined in this style can no longer be restored." variant='gradient' color='red' className='rounded px-4' >
                                                        Remove Style
                                                    </Button>
                                                </MenuHandler>
                                                <MenuList className='outline-none' >
                                                    <div className='flex flex-row gap-3 justify-between items-center outline-none'>
                                                        <span>Press OK to confirm.</span><Button size='sm' title="Confirm remove action." variant='gradient' color='red' className='rounded-full scale-75' onClick={(e) => { removeItemStyle(r) }} >
                                                            OK
                                                        </Button>
                                                    </div>
                                                </MenuList>
                                            </Menu>
                                        </div>
                                    </div>
                                </SettingRow>)}
                                <SettingRow label={'Add New Style'} description={'Add a new style item. Example: "Button Warning" = button_warning'}
                                    type={2} bottomDivider={false}>

                                    <div className={'w-full flex flex-row gap-3 items-center'} >
                                        <input className="border shadow-inner p-1 w-64" maxLength={50} type='text' value={newStyleName} onChange={(e) => setNewStyleName(e.target.value)} onBlur={(e) => { setNewStyleName(e.target.value) }} onKeyDown={(e) => (
                                            e.key === 'Enter' ? addNewItemStyle() : null
                                        )}></input> <Button loading={themeIsLoading} className={`flex-none transition-all  `} size="small" variant="gradient" color="blue" onClick={(e) => { addNewItemStyle() }}>Add</Button>
                                    </div>
                                </SettingRow>

                            </div>


                        </div>
                    </div>
                    <div className='m-2 p-5 border-gray-200  flex-col gap-2 items-left w-1/2'>
                        <div><h3>Preview</h3>
                            <ThemePreview theme={theme} clientHeight='200px'></ThemePreview>
                        </div>

                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </>
            }
        </div>
    </>)
}

export default index