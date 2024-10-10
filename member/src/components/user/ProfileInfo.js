import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

import { useRouter } from 'next/navigation';

function ProfileInfo({ user }) {
    const router = useRouter();
    const { email, name, profile } = user
    const { firstName, lastName } = profile
    return (

        <div class="block  p-3 bg-white border border-gray-100 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 mb-4">
            <div className='flex justify-between items-center pb-2'>
                <h5 class="p-0  text-1xl font-semibold tracking-wider text-gray-800 dark:text-white">Basic Info</h5>

                <Button color='blue' size='sm' className='rounded-sm  flex items-center gap-2  capitalize' onClick={(e) => { e.preventDefault(); router.push('/user/profile/edit') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>Update Profile Info</span></Button>
            </div>
            <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>
                TODO: subcomponent profile Info form..
            </div>
        </div>

    )
}

export default ProfileInfo