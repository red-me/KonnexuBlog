import { Card } from '@material-tailwind/react'
import React from 'react'

const ProfileDetailCard = ({ title, children }) => {
    return <div class="block  p-3 bg-white border border-gray-100 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 mb-4">
        <div className=''>
            <h5 class="p-0 pb-2 text-1xl font-semibold tracking-wider text-gray-800 dark:text-white">{title}</h5></div>
        <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>
            {children}
        </div>
    </div>
}

export default function ProfileDetail({user}) {
    return (
        <div class="flex  flex-wrap">
            <div class="w-full md:w-1/4  gap-4 pr-4">
                <ProfileDetailCard title={"About me"} >--</ProfileDetailCard>
                <ProfileDetailCard title={"Liked Pages"}>--</ProfileDetailCard>
            </div>
            <div class="w-full md:w-1/2">
                <ProfileDetailCard title={"Status"}>Placeholder only.</ProfileDetailCard>
            </div>
            <div class="w-full md:w-1/4  pl-4">
                <ProfileDetailCard title={"Recent Photos"}>--</ProfileDetailCard>
            </div>
        </div>
    )
}
