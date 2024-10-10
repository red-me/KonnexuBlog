import { Card } from '@material-tailwind/react'
import React from 'react'

const MockBrowserWindow = ({ children }) => {
    return (
        <Card className='bg-blue-gray-50 p-1 shadow-md w-full rounded rounded-t-md pt-4'>
            <div className=' h-10 flex flex-row items-center gap-2 px-2 py-3 max-w-screen-xl'>
                <div className='flex-none rounded-full h-6 w-40 bg-blue-gray-100'></div>
                <div className='flex-grow rounded-sm h-6 w-40 bg-white shadow-inner'></div>

            </div>
            <div className='border-gray-700  bg-white rounded p-1 m-2'>{children}</div>
        </Card>
    )
}

export default MockBrowserWindow