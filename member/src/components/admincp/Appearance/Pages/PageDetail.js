import React, { useCallback, useContext, useReducer, useRef, useState } from 'react'
import AppearanceContext from '../../../../context/admincp/AppearanceContext'
import { Button, IconButton, Menu, MenuHandler, PageSection, MenuList, Switch, iconButton } from '@material-tailwind/react'

import { useEffect } from 'react';
import * as icons from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';
import { parse } from 'path';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { setTimeout } from 'timers';


const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

const PageDetail = ({ path }) => {
    const router = useRouter();
    const { updatePage, loadPages, getPage } = useContext(AppearanceContext)

    const [hasChanged, setHasChanged] = useState(false)
    const [hasContentChanged, setHasContentChanged] = useState(false)

    const [page, setPage] = useState(null)



    const [localPage, dispatch] = useReducer((state, action) => {


        switch (action.type) {
            case 'LOAD':
                setHasChanged(false)
                return { ...state, ...action.value }
            case 'SET':
                setHasChanged(true)
                return { ...state, [action.id]: action.value }


            case 'SET_URL':

                const { content: { data: oldData }, ...otherFields } = state
                const newStateWithUrl = { ...otherFields, content: { data: oldData, url: action.value } }

                return newStateWithUrl;


            case 'SET_CONTENT':

                const { content: { url }, ...other } = state
                const newStateWithContent = { ...other, content: { url, data: action.value } }
                return newStateWithContent;
            /* case 'SET_DATA':

                const { data, ...other } = state
                const newState = { ...other, data: { ...data, [action.id]: action.value } }
                return newState; */

            /*  case 'UNSET_DATA':
                 const { data: oldData, ...otherProperties } = state
                 let newData = { ...oldData };
                 delete newData[action.id]
 
                 return { ...otherProperties, data: { ...newData } } */

        }

        return state

    }, null)


    useEffect(() => {
        if (path && path.length && path.length > 1) {
            const idFromPath = parseInt(path[1])

            getPage(idFromPath).then(page => {
                // setPage(page)

                dispatch({ type: 'LOAD', value: page })

            })

        }
    }, [path])

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('')




    const acceptNewTitle = () => {

        dispatch({ type: 'SET', id: 'title', value: title })

    }

    const rejectNewTitle = () => {
        setTitle(localPage.title)
    }


    const acceptNewDesc = () => {

        dispatch({ type: 'SET', id: 'description', value: desc })


    }

    const rejectNewDesc = () => {
        setDesc(localPage.description)
    }


    const acceptNewUrl = () => {

        dispatch({ type: 'SET_URL', value: url })


    }

    const rejectNewUrl = () => {
        setUrl(localPage.content.url)
    }


    const saveChanges = () => {
        if (localPage && hasChanged) {
            /*  setName(localPage.name)
             setDesc(localPage.description) */

            /*   if (hasContentChanged) {
                  dispatch({ type: 'SET_CONTENT', value: content })
  
              } */

            updatePage(localPage).then(result => {
                if (result.id) {
                    //setHasChanged(false)
                    loadPages()
                }
            })
        }
    }

    const publish = () => {
        if (localPage) {


            /*  setName(localPage.name)
             setDesc(localPage.description) */
            updatePage({ ...localPage, published: !localPage.published }).then(result => {
                if (result.id) {
                    //setHasChanged(false)
                    dispatch({ type: 'LOAD', value: result })
                }
            })
        }
    }


    useEffect(() => {
        if (page) {
            dispatch({ type: 'LOAD', value: page })
        }


    }, [page])
    useEffect(() => {
        if (localPage) {
            setTitle(localPage.title)
            setDesc(localPage.description)
            setUrl(localPage.content.url)
            setContent(localPage.content.data)
        }


    }, [localPage])

    /* 
        const setContentHTML = (value) => {
    
            if (!hasContentChanged) setHasContentChanged(true)
            // dispatch({ type: 'SET_CONTENT', value: value })
            setContent(value)
    
        } */

    // Log mouse coordinates when user stops clicking 250ms
    const handleOnChange = debounce((content) => {
        dispatch({ type: 'SET_CONTENT', value: content })
        setHasChanged(true)
    }, 250);

    /* useEffect(() => {
        if (hasContentChanged) {
            setHasChanged(true)
            setTimeout(() => {
                dispatch({ type: 'SET_CONTENT', value: content })
            }, 1000)
        }
    }, [hasContentChanged]) */


    /*  const updateContent = () => {
         if (hasContentChanged) {
 
             dispatch({ type: 'SET_CONTENT', value: content })
         }
     } */


    const addPageSection = () => {
        const nextId = page.data.length == 0 ? 1 : Math.max(page.data.map(m => parseInt(m.position))) + 1;
        const newData = { ...localPage, data: [...page.data, { name: `PageSection${Date.now()}`, url: '', active: true, icon: '', position: isNaN(nextId) ? 1 : nextId, }] }
        updatePage(newData).then(result => {
            if (result.id) {
                //setHasChanged(false)
                loadPages()
            }
        })

    }


    const revert = () => {
        if (page) {
            dispatch({ type: 'LOAD', value: page })
        }
    }
    const cancel = () => { router.back() }


    /*  const [menuItems, setPageSections] = useState([])
 
     useEffect(() => {
         if (localPage) {
             setPageSections(localPage.data)
         }
 
     }, [localPage]) */

    return (<>

        {localPage && <div className='flex flex-col gap-4 w-full p-4'>
            <h1 className='text-white font-bold text-2xl flex flex-row justify-between items-center'><span>Edit Page</span>
                <div className='flex flex-row gap-2 justify-evenly'>
                    {/*  <Button color='indigo' size='sm' onClick={() => { addPageSection() }}>Add Page Item</Button> */}
                    {localPage && <Button color='yellow' size='sm' onClick={() => { publish() }}>{localPage.published ? 'Unp' : 'P'}ublish</Button>}
                    {hasChanged && <><Button color='green' variant='gradient' size='sm' onClick={() => { saveChanges() }}>Save Changes</Button>
                        <Button color='red' variant='gradient' size='sm' onClick={() => { revert() }}>Revert</Button></>}
                    <Button color='orange' size='sm' onClick={() => { cancel() }}>Return</Button>
                </div></h1>
            <div className="shadow bg-white border rounded-lg min-h-64 flex flex-row h-full p-4">
                <div className='flex flex-col w-9/12 shadow-sm rounded-l-md bg-gray-50'>
                    <EditorToolbar />
                    <ReactQuill
                        theme="snow"
                        value={localPage.content.data}
                        onChange={handleOnChange}
                        placeholder={"Write something awesome..."}
                        modules={modules}
                        formats={formats}
                        className='min-h-96'

                    />

                </div>
                <div className='flex flex-col w-3/12 shadow-sm rounded-r-md bg-gray-100 p-2 '>
                    <div className='flex flex-col justify-start items-center rounded-sm p-2 '>
                        <div className='flex flex-col justify-start items-center gap-2  w-full'>

                            <label htmlFor="name" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md w-full">Title</label>
                            <input type="text"
                                onClick={() => { }}
                                onBlur={(e) => { acceptNewTitle() }}
                                onKeyDown={(e) => { e.key === 'Enter' ? acceptNewTitle() : e.key === 'Escape' ? rejectNewTitle() : null }}
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                maxLength={200}
                                className="outline-none  bg-white  border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name of Page" required="" />
                        </div>

                    </div>
                    {/* <div className='flex flex-row justify-between items-center rounded-sm p-2 '>
                        <div className='flex flex-col justify-start items-center gap-2  w-full'>

                            <label htmlFor="name" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md  w-full">Description</label>
                            <textarea
                                rows={4}
                                onClick={() => { }}
                                onKeyDown={(e) => { e.key === 'Enter' ? acceptNewDesc() : e.key === 'Escape' ? rejectNewDesc() : null }}
                                onBlur={(e) => { acceptNewDesc() }}
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                                maxLength={2000}
                                className="resize-none outline-none  bg-white border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description of Page" required="" />
                        </div>

                    </div> */}
                    <div className='flex flex-col justify-start items-center rounded-sm p-2 '>
                        <div className='flex flex-col justify-start items-center gap-2  w-full'>

                            <label htmlFor="name" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md w-full">Url</label>
                            <input type="text"
                                onClick={() => { }}
                                onKeyDown={(e) => { e.key === 'Enter' ? acceptNewDesc() : e.key === 'Escape' ? rejectNewDesc() : null }}
                                onChange={(e) => setDesc(e.target.value)}
                                onBlur={(e) => { acceptNewDesc() }}
                                value={desc}
                                maxLength={200}
                                className="outline-none  bg-white  border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Url of Page" required="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
        }
    </>)
}

export default PageDetail