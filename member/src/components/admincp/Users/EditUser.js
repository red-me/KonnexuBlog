import { Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import UserContext from '../../../context/admincp/UserContext'
import UserFields from "./UserSettingFields.js"
import Countries from "./Countries"
import PrivacyAudiences from "./PrivacyAudiences"
import SettingRow from "../Common/SettingRow"
import InputByType from "../Common/InputByType"

import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast, ToastContainer } from 'react-toastify';

function EditUser(props) {
    const router = useRouter();
    const pathname = usePathname()

    const { queryUsers, mutateUsers, isLoading, userGroups, isError, clearError } = useContext(UserContext)

    const [isChanged, setIsChanged] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const [userId, setUserId] = useState(null);

    const [title, setTitle] = useState('')

    const basicInfoFields = UserFields.filter(i => i.id > 0 && i.id < 16)
    const profilePictureFields = UserFields.filter(i => i.id == 16)
    const privacySettingFields = UserFields.filter(i => i.type == 'PrivacySettings')

    const [allUserGroups, setAllUserGroups] = useState([])

    useEffect(() => {
        //combine usergroups
        if (userGroups) {
            setAllUserGroups([...userGroups.defaultUserGroupList, ...userGroups.customUserGroupList])
        }


    }, [userGroups])


    const userDataReducer = (state, action) => {
        switch (action.type) {

            case 'LOAD':
                return action.payload.data;

            case 'UPDATE_ITEM':

                return { ...state, [action.payload.field]: action.payload.data }
            default:
                return state;
        }
    };


    const [userData, setUserData] = useState(null);

    const [newUserData, dispatch] = useReducer((state, action) => {

        switch (action.type) {
            // case 'LOAD':
            //      return action.payload.data;
            case 'UPDATE_ITEM':
                const newState = { ...state, [action.id]: action.value };
                return newState

            case 'REMOVE_ITEM':

                const { [action.id]: _, ...newStateRemoved } = state;
                return newStateRemoved
        }

    }, {})

    useEffect(() => {
        if (pathname.length > 0) {
            const p = pathname.split("/")
            const id = parseInt(p[p.length - 1])
            queryUsers({
                where: { id },
                /* include: {
                    id: true,
                    email: true,
                    name: true,
                    active: true,
                    role: true,
                    profile: true,
                    userGroup: true,
                    createdAt: true,
                    updatedAt: true,
                    lastActivity: true,
                    lastIPAddress: true
                } */
            }).then(results => {
                if (results && results.length) {
                    const user = results[0]
                    setTitle(user.name)
                    setUserId(user.id)
                    setUserData(user)
                    /* dispatch({
                        type: 'LOAD',
                        payload: {

                            data: user,
                        }
                    }); */
                }


            })

        }

    }, [pathname])




    const updateAction = (id, value) => {
        setIsChanged(true)
        const type = "UPDATE_ITEM"
        dispatch({ type, id, value })
    }

    const removeAction = (id) => {
        setIsChanged(true)
        const type = "REMOVE_ITEM"
        dispatch({ type, id })
    }


    const saveChanges = () => {


        let data = {};

        // restructure update data
        for (let key in newUserData) {
            if (key.startsWith('profile_')) {
                if (!data.profile) data.profile = { update: { data: {} } }
                data.profile.update.data[key.split("_")[1]] = newUserData[key]
            } else if (key.startsWith('privacySettings_')) {
                if (!data.privacySettings) data.privacySettings = { upsert: { create: { userId: userId }, update: {} } }
                data.privacySettings.upsert.create[key.split("_")[1]] = newUserData[key]


                data.privacySettings.upsert.update[key.split("_")[1]] = newUserData[key]
            }
            else data[key] = newUserData[key]
        }


        //TODO: validate data

        mutateUsers('update', {
            where: { id: userId },
            data: data,
            include: {
                profile: true,
            },
        }
        ).then(updatedUser => {

            if (updatedUser.id) {

                setTitle(updatedUser.name)
                setUserId(updatedUser.id)
                setUserData(updatedUser)

                toast.success('User information Updated.', {
                    toastId: "user-save-response",
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            else {
                let additionalInfo = '';
                if (updatedUser.error && updatedUser.error.includes('Unique constraint failed on the constraint')) {
                    if (updatedUser.error.includes('User_name_key')) additionalInfo = 'Username already exists.'

                }
                toast.error(`Failed to update User information. ${additionalInfo}`, {
                    toastId: "user-save-response",
                    position: "top-center",
                    autoClose: 6000,
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
    }


    return (<>


        <div className='p-0  flex flex-col gap-2 relative' >

            <div className={`flex justify-between items-center m-4  `}>
                <span className='font-bold text-xl p-2'>Editing Member: {title} </span>

            </div>

            <div className="shadow bg-white  rounded-lg mx-4 min-h-48">

                <div className='flex flex-row justify-between items-center rounded-l rounded-r p-4 bg-blue-gray-50/50'>
                    <p className="flex-none">Basic Information</p>
                </div>
                <div className=' p-4'>

                    {userData && basicInfoFields && basicInfoFields.map((field, index, list) => {
                        let value = null;
                        if (field.type !== 'Password') {
                            if (newUserData && newUserData[field.key]) value = newUserData[field.key]
                            else if (userData) {
                                if (field.key.startsWith("profile_")) {
                                    value = userData.profile[field.key.split("_")[1]]
                                }
                                else { value = userData[field.key] }

                            }
                            else value = field.defaultValue
                        }

                        const inputProps = {};
                        if (field.prefer && field.prefer.className) inputProps["className"] = field.prefer.className;
                        if (field.type == 'UserGroup') inputProps["listSource"] = allUserGroups
                        else if (field.type == 'Country') inputProps["listSource"] = Countries;
                        else if (field.type == 'Gender') inputProps["listSource"] = [{ id: 'm', name: 'Male' }, { id: 'f', name: 'Female' }, { id: '', name: 'Unknown' }];
                        else if (field.type == 'Picture') inputProps["id"] = userData.id


                        return <SettingRow label={field.title} description={field.description} type={2}>
                            <InputByType name={field.key} type={field.type} value={value} set={updateAction} {...inputProps} unSet={removeAction} ></InputByType>
                        </SettingRow>
                    })}


                </div>

            </div>

            <div className="shadow bg-white  rounded-lg m-4 min-h-48">

                <div className='flex flex-row justify-between items-center rounded-l rounded-r p-4 bg-blue-gray-50/50'>
                    <p className="flex-none">Profile Picture</p>
                </div>
                <div className=' p-4'>
                    {userData && profilePictureFields && profilePictureFields.map((field, index, list) => {
                        let value = null;

                        if (newUserData && newUserData[field.key]) value = newUserData[field.key]
                        else if (userData) {
                            if (field.key.startsWith("profile_")) {
                                value = userData.profile[field.key.split("_")[1]]
                            }
                            else { value = userData[field.key] }

                        }
                        else value = field.defaultValue


                        const inputProps = {};
                        inputProps["id"] = userData.id


                        return <SettingRow label={field.title} description={field.description} type={2}>
                            <InputByType name={field.key} type={field.type} value={value} set={updateAction} {...inputProps} unSet={removeAction} ></InputByType>
                        </SettingRow>
                    })}
                </div>

            </div>

            <div className="shadow bg-white  rounded-lg m-4 min-h-48">

                <div className='flex flex-row justify-between items-center rounded-l rounded-r p-4 bg-blue-gray-50/50'>
                    <p className="flex-none">Profile Privacy</p>
                </div>
                <div className=' p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        {userData && privacySettingFields && privacySettingFields.map((field, index, list) => {
                            let value = null;
                            if (field.type !== 'Password') {
                                if (newUserData && newUserData[field.key]) value = newUserData[field.key]
                                else if (userData) {
                                    if (field.key.startsWith("privacySettings_")) {
                                        const key = field.key.split("_")[1]
                                        value = userData.privacySettings && userData.privacySettings[key] ? userData.privacySettings[key] : field.defaultValue
                                    }
                                    else { value = userData[field.key] }

                                }
                                else value = field.defaultValue
                            }

                            const inputProps = {};
                            if (field.prefer && field.prefer.className) inputProps["className"] = field.prefer.className;
                            inputProps["listSource"] = PrivacyAudiences

                            return <div className=''> <SettingRow label={field.title} description={field.description} type={0} >
                                <InputByType name={field.key} type={field.type} value={value} set={updateAction} {...inputProps} unSet={removeAction} ></InputByType>
                            </SettingRow></div>
                        })}
                    </div>

                </div>
            </div>

            <div className={`flex flex-row justify-end items-center m-4 sticky transition-all bottom-0  ${isHovered ? 'bg-opacity-90 opacity-100' : 'bg-opacity-5 opacity-50'} bg-white p-4`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                <div className={`flex gap-4`}><Button loading={isLoading} className={`flex-none transition-all duration-1000 ${isChanged ? 'opacity-1' : 'opacity-0'}`} size="small" variant="gradient" color="blue" onClick={(e) => { saveChanges() }}>Save Changes</Button>
                    <Button loading={isLoading} onClick={() => router.back()} variant="gradient" color="black">Return</Button></div>
            </div>

        </div>
        <ToastContainer></ToastContainer>


    </>
    )
}

export default EditUser