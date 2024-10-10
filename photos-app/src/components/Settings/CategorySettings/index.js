import React from 'react'
import SettingRow from "../SettingRow"


const EditCategoryButton = (props) => {
    const { hostReact, controls, categoryId, menuItemClassName = 'text-white', editAction, deleteAction, ...menuProps } = props
    const ControlsSource = controls;
    const {
        Menu,
        MenuHandler,
        MenuList,
        MenuItem, } = ControlsSource



    const [isHovered, setIsHovered] = hostReact.useState(false)


    return (
        <>
            <Menu {...menuProps}>
                <MenuHandler>
                    <div className={["w-8 h-8 cursor-pointer", menuItemClassName].join(' ')}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        }
                    </div>
                </MenuHandler>
                <MenuList className="px-0 py-1">
                    <MenuItem className='rounded-none' onClick={(e) => { editAction(e, { categoryId }) }} >
                        <div className='flex flex-row justify-start items-center gap-4 mx-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg><span>Edit</span></div>
                    </MenuItem>
                    <MenuItem className='rounded-none' onClick={(e) => { deleteAction(e, categoryId) }}>
                        <div className='flex flex-row justify-start items-center gap-4 mx-3' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <span>Delete</span></div>
                    </MenuItem>
                </MenuList>
            </Menu>

        </>
    )
}

const CreateCategoryDialog = (props) => {


    const { visible, hostReact, closeAction, createId, category, categories, updateAction } = props



    const [hideForm, setHideForm] = hostReact.useState(true)
    const [error, setError] = hostReact.useState('')
    const [categoryName, setCategoryName] = hostReact.useState('')



    const validateCategory = (name) => {

        let error = ""
        if (name.length === 0) {
            error = "1";
            setError('Category Name must not be empty.')
        }
        if (name.length > 50) {
            error = "2";
            setError('Category Name must not be longer than 50 characters.')
        }
        let duplicateExists = categories.find(l => {
            return l.name === name
        })

        if (duplicateExists) {
            error = "3";
            setError("This Category name already exists.");
        }

        /*  if (error.length > 0)
             showToast('error', error) */

        return error.length === 0

    }
    const executeUpdate = () => {
        if (validateCategory(categoryName)) {

            updateAction(createId(), categoryName, "create");
            setCategoryName("")
        }
    }

    hostReact.useEffect(() => {

        if (visible === true) {
            // document.body.style.overflow = 'hidden';
            setHideForm(false)
        }
        else {
            setTimeout(() => {
                setHideForm(true)
            }, 1000);

            /*  if (visible === false) {
                 document.body.style.overflow = 'unset';
             } */
        }

        return () => {
            /*  if (visible === false) {
                 document.body.style.overflow = 'unset';
             } */
        }

    }, [visible])

    return <>

        <>
            <div id="small-modal-backdrop" tabindex="-1" style={{ zIndex: 10, background: "#333333cc", display: visible ? "block" : "none", opacity: visible ? 1 : 0 }} className={` fixed top-0 transition-all  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}></div>
            <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", top: visible ? "0%" : "-100%", opacity: visible ? 1 : 0 }} className={` fixed transition-all  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div class="relative w-full max-w-md max-h-full items-center justify-center">
                    <div class="flex flex-col  gap-2">
                        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                                    Create Category
                                </h1>
                                <button type="button" onClick={() => { if (closeAction) closeAction() }} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-5 md:p-5 space-y-4">


                                <input
                                    onChange={(e) => { setCategoryName(e.target.value.trim()) }}
                                    onKeyDown={(e) => (
                                        e.key === 'Enter' ? executeUpdate() : null
                                    )}
                                    value={categoryName}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category Name" required="" />


                                <div className='text-red-600 text-sm h-32'>{error}</div>

                            </div>
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                                <button type="button" onClick={() => { executeUpdate() }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button type="button" onClick={() => { if (closeAction) closeAction() }} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    </>
}
const EditCategoryDialog = (props) => {


    const { visible, hostReact, closeAction, category, categories, showToast, updateAction } = props



    const [hideForm, setHideForm] = hostReact.useState(true)
    const [error, setError] = hostReact.useState('')
    const [categoryName, setCategoryName] = hostReact.useState(category?.name)

    const [slowVisible, setSlowVisible] = hostReact.useState(false)

    hostReact.useEffect(() => {
        if (category) {
            setCategoryName(category.name)
        }
    }, [category])


    const validateCategory = (id, name) => {

        let error = ""
        if (name.length === 0) {
            error = "1";
            setError('Category Name must not be empty.')
        }
        if (name.length > 50) {
            error = "2";
            setError('Category Name must not be longer than 50 characters.')
        }
        let duplicateExists = categories.find(l => {
            return l.id !== id && l.name === name
        })

        if (duplicateExists) {
            error = "3";
            setError("This Category name already exists.");
        }

        /*  if (error.length > 0)
             showToast('error', error) */

        return error.length === 0

    }
    const executeUpdate = () => {
        if (validateCategory(category?.id, categoryName)) {
            updateAction(category?.id, categoryName, "update");
            setError('')
        }
    }

    hostReact.useEffect(() => {

        if (visible === true) {
            // document.body.style.overflow = 'hidden';
            setHideForm(false)
        }
        else {
            setTimeout(() => {
                setHideForm(true)
            }, 1000);

            /*  if (visible === false) {
                 document.body.style.overflow = 'unset';
             } */
        }

        return () => {
            /*  if (visible === false) {
                 document.body.style.overflow = 'unset';
             } */
        }

    }, [visible])

    return <>

        <>
            <div id="small-modal-backdrop" tabindex="-1" style={{ zIndex: 10, background: "#333333cc", display: visible ? "block" : "none", opacity: visible ? 1 : 0, }} className={` fixed top-0 transition-all  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}></div>
            <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", display: hideForm ? 'none' : '', top: visible ? "0%" : "-100%", opacity: visible ? 1 : 0, }} className={` fixed transition-all  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div class="relative w-full max-w-md max-h-full items-center justify-center">
                    <div class="flex flex-col  gap-2">
                        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                                    Edit Category
                                </h1>
                                <button type="button" onClick={() => { if (closeAction) closeAction() }} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-5 md:p-5 space-y-4">


                                <input
                                    onChange={(e) => { setCategoryName(e.target.value.trim()) }}
                                    onClick={() => { setError('') }}
                                    onKeyDown={(e) => (
                                        e.key === 'Enter' ? executeUpdate() : null
                                    )}
                                    value={categoryName}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category Name" required="" />


                                <div className='text-red-600 text-sm h-32'>{error}</div>

                            </div>
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                                <button type="button" onClick={() => { executeUpdate() }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button type="button" onClick={() => { if (closeAction) closeAction() }} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    </>
}
const DeleteCategoryDialog = (props) => {


    const { visible, hostReact, closeAction, category, updateAction } = props

    const { Button } = props.controls

    const [hideForm, setHideForm] = hostReact.useState(true)

    const [categoryName, setCategoryName] = hostReact.useState(category?.name)
    const [message] = hostReact.useState('WARNING: This effect is irreversible. Press the delete button to confirm action.')

    hostReact.useEffect(() => {
        if (category) {
            setCategoryName(category.name)
        }
    }, [category])



    const executeDelete = () => {

        updateAction(category?.id, categoryName, "delete");

    }

    hostReact.useEffect(() => {

        if (visible === true) {
            // document.body.style.overflow = 'hidden';
            setHideForm(false)
        }
        else {
            setTimeout(() => {
                setHideForm(true)
            }, 1000);

            /*  if (visible === false) {
                 document.body.style.overflow = 'unset';
             } */
        }

        return () => {
            /*  if (visible === false) {
                 document.body.style.overflow = 'unset';
             } */
        }

    }, [visible])

    return <>

        <>
            <div id="small-modal-backdrop" tabindex="-1" style={{ zIndex: 10, background: "#333333cc", display: visible ? "block" : "none", opacity: visible ? 1 : 0, }} className={` fixed top-0 transition-all  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}></div>
            <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", display: hideForm ? 'none' : '', top: visible ? "0%" : "-100%", opacity: visible ? 1 : 0, }} className={` fixed transition-all  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div class="relative w-full max-w-md max-h-full items-center justify-center">
                    <div class="flex flex-col  gap-2">
                        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                                    Delete Category
                                </h1>
                                <button type="button" onClick={() => { if (closeAction) closeAction() }} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-5 md:p-5 space-y-4">


                                <div className="flex flex-row justify-center text-gray-900 text-lg rounded-lg  block w-full p-2.5  dark:text-white">
                                    <span> {categoryName}</span>
                                </div>


                                <div style={{ color: "rgb(220 38 38)" }} className='text-red-600 text-sm h-32'>{message}</div>

                            </div>
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                                <Button color="red" size="sm" onClick={() => { executeDelete() }} >Delete</Button>
                                <Button size="sm" variant="outline" type="button" onClick={() => { if (closeAction) closeAction() }} >Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    </>
}

function index(props) {

    const { app, hostReact, mutate, query, isLoading, queryPost, createId } = props



    const { Switch, Input, Button, Spinner } = props.controls;
    const { Toastify } = props.components;
    const { Bounce, toast } = Toastify;

    const showToast = (type, message) => {
        toast[type](message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const settings = app.settings;

    const [isChanged, setIsChanged] = hostReact.useState(false);

    const [categories, dispatch] = hostReact.useReducer((state, action) => {
        setIsChanged(true)
        if (action.type === "create") {

            const newState = [...state, { id: action.id, name: action.value, active: true }]

            return newState
        }
        else if (action.type === "update") {
            return state.map(s => {
                if (s.id === action.id) return { ...s, [action.field]: action.value }
                else return s;
            })
        }
        else if (action.type === "delete") {
            return state.filter(s => {
                return s.id !== action.id
            })
        }
        /* else if (action.type === "replace") {
            return { ...state, [action.field]: action.value }
        } */

        return state;// no change if we do not know what kind of dispatch this is.


    }, app.settings.categories)


    const TotalPhotoCount = ({ appName, categoryId, query, hostReact, Spinner }) => {

        const { useState, useEffect } = hostReact

        const [count, setCount] = useState(0);
        const [loading, setLoading] = useState(false);


        useEffect(() => {
            if (appName && query && categoryId) {
                setLoading(true)
                // setTimeout(
                query('post', {
                    where: {
                        type: appName,
                        content: {
                            path: '$.photos[*].categories[*]',
                            array_contains: categoryId,
                        }
                    }
                }).then(posts => {

                    setLoading(false)
                    if (posts && posts.length) {
                        setCount(posts.length)
                    }
                })

                //   , 5000)
            }

        }, [appName, query, categoryId])


        return (<><div className='font-base flex flex-row justify-start items-center h-4 '><span>Total Photos:</span> {loading ? <Spinner className="h-4 w-4"></Spinner> : <span >{count}</span>} </div></>)
    }


    const saveSettings = () => {
        const newSettings = { ...settings, categories: categories }

        mutate('update', {
            where: { id: app.id },
            data: { settings: newSettings }
        }).then(result => {
            setIsChanged(false);
            if (result.id) {
                toast.success('Categories updated successfully.', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    /*  onClose: () => { closeAction() }, */
                });

            }
            else toast.error('Failed to update.', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
    }
    //const categories = app.settings.categories || [];
    //const [localCategories, setLocalCategories] = hostReact.useState(categories)

    hostReact.useEffect(() => {

        if (isChanged === true) {
            //save changes
            saveSettings();
        }
    }, [isChanged])

    const [showCreateDialog, setShowCreateDialog] = hostReact.useState(false)
    const [createCategory, setCreateCategory] = hostReact.useState(null)

    const [showEditDialog, setShowEditDialog] = hostReact.useState(false)

    const [editCategory, setEditCategory] = hostReact.useState(null)
    const editAction = (e, category) => {
        setEditCategory(category);
    }

    const newAction = () => {
        setCreateCategory({ id: createId(), name: '' });
    }

    const [showDeleteDialog, setShowDeleteDialog] = hostReact.useState(false)
    const [deleteCategory, setDeleteCategory] = hostReact.useState(null)

    const deleteAction = (e, category) => {
        setDeleteCategory(category);
    }


    const closeAction = () => {
        setEditCategory(null);
        setDeleteCategory(null);
        setCreateCategory(null);
    }
    const updateAction = (id, name, type) => {

        dispatch({ id: id, field: 'name', value: name, type: type })
    }

    hostReact.useEffect(() => {
        if (editCategory) {
            setShowEditDialog(true)
        } else { setShowEditDialog(false) }
    }, [editCategory])

    hostReact.useEffect(() => {
        if (deleteCategory) {
            setShowDeleteDialog(true)
        } else { setShowDeleteDialog(false) }
    }, [deleteCategory])

    hostReact.useEffect(() => {
        if (createCategory) {
            setShowCreateDialog(true)
        } else { setShowCreateDialog(false) }
    }, [createCategory])


    return (
        <div className='p-4  flex flex-col gap-4'>
            <div className='flex flex-row items-center gap-4 bg-gray-50 p-6 rounded shadow-sm  justify-end'>
                <Button color="blue" size="medium" onClick={() => { newAction() }}
                    className="flex flex-row gap-3 items-center rounded-full px-3 pr-4" variant="gradient">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span> New Category</span>
                </Button>
            </div>

            {app && hostReact && queryPost && Spinner && categories !== null && categories.map((cat, index) => {
                return <SettingRow type={1} label={cat.name}
                    description={<div className='flex flex-row gap-2 items-center justify-start  gap-4' >

                        <div className='flex flex-row justify-start items-center'>
                            <TotalPhotoCount appName={app.name} categoryId={cat.id} query={queryPost} hostReact={hostReact} Spinner={Spinner}></TotalPhotoCount>

                        </div>

                        <EditCategoryButton {...props} categoryId={cat.id} placement={"right"} menuItemClassName={"text-black"} editAction={(e) => { editAction(e, cat) }} deleteAction={(e) => { deleteAction(e, cat) }}></EditCategoryButton>


                    </div>}
                >
                    <div className='flex flex-row h-16 gap-3'>

                        <Switch checked={cat.active} onChange={() => { dispatch({ id: cat.id, field: 'active', value: !cat.active, type: 'update' }) }}></Switch>
                    </div>
                </SettingRow >

            })}

            <CreateCategoryDialog  {...props} visible={showCreateDialog} hostReact={props.hostReact} closeAction={closeAction} createId={createId} category={createCategory} categories={categories} showToast={showToast} updateAction={updateAction}  ></CreateCategoryDialog>
            <EditCategoryDialog  {...props} visible={showEditDialog} hostReact={props.hostReact} closeAction={closeAction} category={editCategory} categories={categories} showToast={showToast} updateAction={updateAction}  ></EditCategoryDialog>
            <DeleteCategoryDialog {...props} visible={showDeleteDialog} hostReact={props.hostReact} closeAction={closeAction} category={deleteCategory} categories={categories} showToast={showToast} updateAction={updateAction}  ></DeleteCategoryDialog>



        </div>
    )
}

export default index