import React from 'react'

import UserContext from '../../../context/admincp/UserContext'

function CreateUserGroupDialog(props) {
    const { createUserGroup, isLoading, isError, clearError } = React.useContext(UserContext)


    const [userGroupName, setUserGroupName] = React.useState('')
    const { visible, setVisible } = props
    const [hideForm, setHideForm] = React.useState(true)

    const closeDialog = () => setVisible(false)

    React.useEffect(() => {

        if (visible === true) {
            document.body.style.overflow = 'hidden';
            setHideForm(false)
        }
        else {
            setTimeout(() => {
                setHideForm(true)
            }, 1000);

            if (visible === false) {
                document.body.style.overflow = 'unset';
            }
        }

        return () => {
            if (visible === false) {
                document.body.style.overflow = 'unset';
            }
        }

    }, [visible])

    const save = () => {


        if (createUserGroup(userGroupName)) {

            setName("")
        }
    }


    return <>
        <div id="small-modal-backdrop" tabindex="-1" style={{ zIndex: 10, background: "#333333cc", display: visible ? "block" : "none", opacity: visible ? 1 : 0 }} className={` fixed top-0 transition-all duration-1000 delay-100 left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}></div>
        <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", display: hideForm ? 'none' : '', top: visible ? "0%" : "-20%", opacity: visible ? 1 : 0 }} className={` fixed transition-all delay-100  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div class="relative w-full max-w-md max-h-full items-center justify-center select-none">
                <div class="flex flex-col  gap-2">
                    <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                                Create User Group
                            </h1>
                            <button type="button" onClick={() => closeDialog()} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-5 md:p-5 space-y-4">


                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Name</label>
                                <input type="text" name="userGroupName" id="userGroupName"
                                    onClick={() => { clearError() }}
                                    onKeyDown={(e) => { e.key === 'Enter' ? save() : e.key === 'Escape' ? closeDialog() : null }}
                                    onChange={(e) => setUserGroupName(e.target.value)}
                                    value={userGroupName}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name of User Group" required="" />
                                <span className="text-red-700 text-xs">{isError}&nbsp;</span>
                            </div>



                        </div>
                        <div class="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                            <button type="button" loading={isLoading} onClick={() => save()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                            <button type="button" loading={isLoading} onClick={() => closeDialog()} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>



}

export default CreateUserGroupDialog