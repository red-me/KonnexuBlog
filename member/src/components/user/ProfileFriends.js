import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

function ProfileFriends({ user }) {

    const { email, name, profile } = user
    const { firstName, lastName } = profile
    return (

        <div class="block  p-3 bg-white border border-gray-100 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 mb-4">
            <div className=''>
                <h5 class="p-0 pb-2 text-1xl font-semibold tracking-wider text-gray-800 dark:text-white">Friends</h5></div>
            <div className='grid grid-cols-4 gap-4 p-3 border-t  border-gray-500 border-opacity-50'>
                TODO: subcomponent friends list.
            </div>
        </div>

    )
}

export default ProfileFriends