import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import AppThemeContext from '../../context/AppThemeContext'
   

import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {

    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function DialogBox({ open, setOpen, title, children, footerChildren }) {


    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(false);
        return false;
    }


    return (
        <>
            <Dialog open={open} >
                <DialogHeader className='p-0 m-0 ' ><div className='w-full rounded-t p-2 bg-deep-orange-300 text-md border-b border-gray-100 text-sm'>{title}</div></DialogHeader>
                <DialogBody>
                    {children}
                </DialogBody>
                <DialogFooter className='gap-4'>
                    {/*  <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button> */}
                    {footerChildren && footerChildren}
                    <Button size='sm' className='rounded-sm' variant="gradient" color="blue-gray" onClick={handleOpen}>
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export function EyeIcon({ enabled }) {
    return (
        <>{enabled ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
        }
        </>

    )
}

export function PasswordChangeForm({ updatePassword, passwordData, handleChangePasswordField, user, isLoading }) {


    const [seeOldPassword, setSeeOldPassword] = useState(false);
    const [seeNewPassword, setSeeNewPassword] = useState(false)




    return (
        <div className='grid grid-cols-2 gap-4 p-3 '>

            <div >
                <label for="oldPassword" class="mb-2 text-sm font-semibold text-gray-800 dark:text-white flex justify-between"><span>* Current Password </span><span className='button rounded bg-gray-50 text-xs font-light' onClick={() => { setSeeOldPassword(p => !p) }}><EyeIcon enabled={seeOldPassword}></EyeIcon> </span></label>
                <input type={seeOldPassword ? "text" : 'password'} id="oldPassword" value={passwordData.oldPassword} onChange={handleChangePasswordField} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div >
                <label for="newPassword" class="mb-2 text-sm font-semibold text-gray-800 dark:text-white flex justify-between"><span>* New Password </span><span className='button rounded bg-gray-50 text-xs font-light' onClick={() => { setSeeNewPassword(p => !p) }}><EyeIcon enabled={seeNewPassword}></EyeIcon></span></label>
                <input type={seeNewPassword ? "text" : 'password'} id="newPassword" value={passwordData.newPassword} onChange={handleChangePasswordField} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>


        </div>
    )
}

const Preloader = () => {
    return (
        <>
            <div class="block  p-0 mt-4  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 animate-pulse">
                <div className=''>
                    <h5 class="p-3 text-2xl font-normal tracking-wider text-gray-800 dark:text-white">Settings</h5></div>
                <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>

                    <div >
                        <label for="firstName" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">* First Name</label>
                        <input type="text" id="firstName" value="" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div >
                        <label for="lastName" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">Last Name</label>
                        <input type="text" id="lastName" value="" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div >
                        <label for="email" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">*Email Address</label>
                        <input type="text" id="email" value="" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div></div>
                    <div >
                        <label for="name" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">User Name</label>
                        <input type="text" id="name" value="" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div></div>
                    <div className='row-span-3 flex items-center justify-end'><Button disabled={true} className="bg-gray-500" >Save</Button></div>

                    <div className='row-span-3 flex items-center justify-start'>
                        {/* <label for="change_password" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">Change Password</label> */}
                        <Button className="bg-gray-500" disabled>Change Password</Button></div>
                    <div></div>


                </div>
                <div className='p-3 '>

                </div>


            </div>

        </>
    )
}

function Settings({ user, refreshCurrentUser, update, updatePassword, isError, isLoading }) {

    const { theme } = useContext(AppThemeContext)

    if (!user) return <Preloader></Preloader>

    const [updatedAt, setUpdatedAt] = useState(user?.updatedAt)
    const { id, email, name, profile } = user
    const { firstName, lastName } = profile

    const [userData, setUserData] = useState({ id, email, name, firstName, lastName })

    const [hasUpdated, setHasUpdated] = useState(false)

    const [openErrorMessage, setOpenErrorMessage] = useState(false)

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false)

    const [passwordTries, setPasswordTries] = useState(0)

    const handleChange = (e) => {
        const field = e.target.id;
        /* const newValue = e.target.value.trim(); */
        setUserData(prev => { return { ...prev, [e.target.id]: e.target.value.trim() } })
    }

    const onClick = (e) => {


        (async () => {
            try {
                update(userData).then((success) => {
                    if (success == true) {
                        setHasUpdated(true)
                        toast.success('Settings Updated.', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    }

                }).catch(e => {

                })

            } catch (err) {
                console.log('Error occurred when fetching user');
            }
        })();
    }

    const [passwordData, setPasswordData] = useState({ id: user.id, oldPassword: '', newPassword: '' })

    const handleChangePasswordField = (e) => {
        const field = e.target.id;
        /* const newValue = e.target.value.trim(); */
        setPasswordData(prev => { return { ...prev, [e.target.id]: e.target.value.trim() } })
    }

    const onChangePassword = (e) => {
        e.preventDefault();
        (async () => {
            try {
                updatePassword(passwordData).then((success) => {
                    if (success == true) {
                        setOpenPasswordDialog(false)
                        setHasUpdated(true)
                        toast.success('Password changed.', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    }
                })

            } catch (err) {
                console.log('Error occurred when fetching user');
            }
        })();
        return false;
    }

    useEffect(() => {

        console.log(userData)
    }, [userData])

    useEffect(() => {
        if (isError !== null && isError !== undefined) {
            setOpenErrorMessage(true)
        }

    }, [isError])





    return (
        <>
            <div class="block  p-0 mt-4 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className=''>
                    <h5 class="p-3 text-2xl font-normal tracking-wider text-gray-800 dark:text-white">Settings</h5></div>
                <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>

                    <div >
                        <label for="firstName" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">* First Name</label>
                        <input type="text" id="firstName" value={userData.firstName} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div >
                        <label for="lastName" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">Last Name</label>
                        <input type="text" id="lastName" value={userData.lastName} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div >
                        <label for="email" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">*Email Address</label>
                        <input type="text" id="email" value={userData.email} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div></div>
                    <div >
                        <label for="name" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">User Name</label>
                        <input type="text" id="name" value={userData.name} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div></div>
                    <div className='row-span-3 flex items-center justify-end'><Button disabled={isLoading} style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} shadow-sm`} onClick={onClick}>Save</Button></div>

                    <div className='row-span-3 flex items-center justify-start'>
                        {/* <label for="change_password" class="block mb-2 text-sm font-semibold text-gray-800 dark:text-white">Change Password</label> */}
                        <Button style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} shadow-sm`} onClick={() => { setOpenPasswordDialog(true) }}>Change Password</Button></div>
                    <div></div>


                </div>
                <div className='p-3 '>

                </div>

                {/* <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
            </div>
            <DialogBox className={isLoading ? 'blur grayscale' : ''} open={openPasswordDialog} setOpen={setOpenPasswordDialog} title={"Change Password"} footerChildren={<Button disabled={isLoading} size='sm' className='rounded-sm' variant="gradient" color="red" onClick={onChangePassword}>Update</Button>}>
                <PasswordChangeForm passwordData={passwordData} handleChangePasswordField={handleChangePasswordField} user={user} isLoading={user}></PasswordChangeForm>
            </DialogBox>
            <DialogBox open={openErrorMessage} setOpen={setOpenErrorMessage} title={"Update Error"} >{isError}</DialogBox>
            <ToastContainer></ToastContainer>
        </>
    )
}

export default Settings