import React, { useState } from 'react'
import { Button, Card, Typography } from '@material-tailwind/react'

import { useRouter } from 'next/navigation';

import ProfileDetail from './ProfileDetail'
import ProfileInfo from './ProfileInfo'
import ProfileFriends from './ProfileFriends'


const Preloader = () => {
    return (
        <>
            <Card className="mt-4 mb-4 bg-white w-full overflow-hidden rounded-lg shadow-lg flex flex-col animate-pulse">
                <div className="card-image">
                    :
                    <div className="w-full h-96 py-40 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg"></div>

                    <div className='relative -mt-24  py-2 '>

                        <div className="card-content  py-2  pr-4 border-t pl-52 border-gray-500 border-opacity-50 relative -m-l-40 flex justify-between gap-2">
                            <Typography variant="h3" color="white" className='capitalize py-2 w-full rounded' >
                                &nbsp;
                            </Typography>
                            <div className='flex items-end'>
                                <Button color='white' size='sm' className='rounded-full w-44 h-9 flex items-center gap-2 text-gray-700 capitalize'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    <span>&nbsp;</span></Button>

                            </div>


                        </div></div>
                </div>
                <div className='relative -mt-44 py-1 w-48 '>
                    <div className='flex gap-4 px-4  items-end'>
                        <div className="profile-image w-40 flex-none">
                            :
                            <div className="cursor-pointer relative inline-flex items-center justify-center w-40 h-40 overflow-hidden bg-gray-100 rounded-full border-1 dark:bg-gray-100  dark:border-gray-400   border-4 border-white  transition-transform duration-400 transform hover:scale-110">
                                <span className="font-bold text-6xl text-white dark:text-gray-300">&nbsp;</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="icons flex justify-start relative mt-4">
                    <div className='flex '>
                        <Button color='white' size='sm' variant='text' className={`min-w-20 rounded-none pt-2 border-r border-gray-200 border-opacity-50  flex flex-col items-center gap-2 text-gray-500`} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <span>&nbsp;</span></Button>
                        <Button color='white' size='sm' variant='text' className={`min-w-20 rounded-none pt-2 border-r border-gray-200 border-opacity-50  flex flex-col items-center gap-2 text-gray-500`} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>


                            <span>&nbsp;</span></Button>
                        <Button color='white' size='sm' variant='text' className={`min-w-20 rounded-none pt-2 border-r border-gray-200 border-opacity-50  flex flex-col items-center gap-2 text-gray-500`} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>

                            <span>&nbsp</span></Button>
                    </div>
                </div>
            </Card>

            <div class="flex  flex-wrap">
                <div class="w-full md:w-1/4  gap-4 pr-4">
                    <div class="block  p-3 bg-white border border-gray-100 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 mb-4">
                        <div className=''>
                            <h5 class="p-0 pb-2 text-1xl font-semibold tracking-wider text-gray-800 dark:text-white">&nbsp;</h5></div>
                        <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>
                            <div className='rounded w-full bg-gray-500'>&nbsp;</div>
                        </div>
                    </div>
                    <div class="block  p-3 bg-white border border-gray-100 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 mb-4">
                        <div className=''>
                            <h5 class="p-0 pb-2 text-1xl font-semibold tracking-wider text-gray-800 dark:text-white">&nbsp;</h5></div>
                        <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>
                            <div className='rounded w-full bg-gray-500'>&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/2">
                    <div class="block  p-3 bg-white border border-gray-100 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 mb-4">
                        <div className=''>
                            <h5 class="p-0 pb-2 text-1xl font-semibold tracking-wider text-gray-800 dark:text-white">&nbsp;</h5></div>
                        <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>
                            <div className='rounded w-full bg-gray-500'>&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/4  pl-4">
                    <div class="block  p-3 bg-white border border-gray-100 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 mb-4">
                        <div className=''>
                            <h5 class="p-0 pb-2 text-1xl font-semibold tracking-wider text-gray-800 dark:text-white">&nbsp;</h5></div>
                        <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>
                            <div className='rounded w-full bg-gray-500'>&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
function ProfileCard({ user, view, setView }) {

    //const [viewType, setViewType] = useState(view || 'profile')
    const router = useRouter();


    return (
        <>{ user?<>
            <Card className="mt-4 mb-4 bg-white w-full overflow-hidden rounded-lg shadow-lg flex flex-col">
                <div className="card-image">
                    {user.profile.backgroundPhoto ? <img src="https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Image"
                        className="w-full h-96 object-cover rounded-t-lg" /> :
                        <div className="w-full h-96 py-40 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg"></div>}

                    <div className='relative -mt-24  py-2 '>

                        <div className="card-content  py-2  pr-4 border-t pl-52 border-gray-500 border-opacity-50 relative -m-l-40 flex justify-between gap-2">
                            <Typography variant="h3" color="white" className='capitalize py-2' >
                                {user.name || `${user.profile.firstName} ${user.profile.lastName} `}
                            </Typography>
                            <div className='flex items-end'>
                                <Button color='white' size='sm' className='rounded-full  h-9 flex items-center gap-2 text-gray-700 capitalize' onClick={(e) => { e.preventDefault(); router.push('/user/profile/edit') }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    <span>Edit Profile</span></Button>

                            </div>


                        </div></div>
                </div>
                <div className='relative -mt-44 py-1 w-48 '>
                    <div className='flex gap-4 px-4  items-end'>
                        <div className="profile-image w-40 flex-none">
                            {user.profile.avatar ? <img src={user.profile.avatar}
                                alt=""
                                className="z-10 w-40 h-40 block rounded-full border-4 border-white object-cover  transition-transform duration-400  transform hover:scale-110" /> :
                                <div className="cursor-pointer relative inline-flex items-center justify-center w-40 h-40 overflow-hidden bg-orange-100 rounded-full border-1 dark:bg-gray-100  dark:border-gray-400   border-4 border-white  transition-transform duration-400 transform hover:scale-110">
                                    <span className="font-bold text-6xl text-white dark:text-gray-300">{user.profile.firstName[0]}{user.profile.lastName[0]}</span>
                                </div>}
                        </div>
                    </div>

                </div>

                <div className="icons flex justify-start relative mt-4">
                    <div className='flex '>
                        <Button color='white' size='sm' variant='text' className={`min-w-20 rounded-none pt-2 border-r border-gray-200 border-opacity-50  flex flex-col items-center gap-2 text-${view == 'profile' ? 'blue' : 'gray'}-500`} onClick={(e) => { setView('profile') }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <span>Profile</span></Button>
                        <Button color='white' size='sm' variant='text' className={`min-w-20 rounded-none pt-2 border-r border-gray-200 border-opacity-50  flex flex-col items-center gap-2 text-${view == 'info' ? 'blue' : 'gray'}-500`} onClick={(e) => { setView('info') }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>


                            <span>Info</span></Button>
                        <Button color='white' size='sm' variant='text' className={`min-w-20 rounded-none pt-2 border-r border-gray-200 border-opacity-50  flex flex-col items-center gap-2 text-${view == 'friends' ? 'blue' : 'gray'}-500`} onClick={(e) => { setView('friends') }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>

                            <span>Friends</span></Button>
                    </div>
                </div>
            </Card>

            {view == 'profile' && <ProfileDetail user={user}></ProfileDetail>}
            {view == 'info' && <ProfileInfo user={user}></ProfileInfo>}
            {view == 'friends' && <ProfileFriends user={user}></ProfileFriends>}
            </>: <Preloader></Preloader>}
        </>
    )
}

export default ProfileCard