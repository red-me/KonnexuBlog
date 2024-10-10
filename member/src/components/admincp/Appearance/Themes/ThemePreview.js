import React from 'react'
import MockBrowserWindow from "./MockBrowserWindow"
import HeaderPreview from "./HeaderPreview"
import { Button, Card } from '@material-tailwind/react'
const ThemePreview = ({theme}) => {
  return (
    <MockBrowserWindow>
    <div title='Website Background Color' className={` ${theme ? theme.data.background.className : ''} h-64 p-0 flex-grow  m-0 flex flex-col`} style={theme ? theme.data.background.style : {}} >
        <div className={`mBody h-lvh flex-grow flex flex-col `} >
            <HeaderPreview theme={theme}></HeaderPreview>
            <div className="mx-auto w-full max-w-screen-xl scale-75">
                <div className="flex flex-1 justify-center mt-2">
                    <div className="flex flex-1  ">
                        <div className="block w-full h-fit overflow-y-hidden">


                            <div className="flex ">

                                <div className="flex-1 w-full  p-1 justify-end"><Card title='Card Color' className='flex-1'>
                                    <h1 className="capitalize w-full p-4 border-b border-gray-100 bg-gray-50 font-black rounded-t-lg">Card Header</h1>
                                    <div className='p-3 '>
                                        <div title='Primary Button' className={`${theme.data.button_primary.className}`} style={theme.data.button_primary.style}> Primary Button </div>
                                    </div></Card>
                                </div>
                                <div className="shrink-0 md:w-1/2  p-1" > <Card title='Card Color' className='flex-1'>
                                    <h1 className="capitalize w-full p-4 border-b border-gray-100 bg-gray-50 font-black rounded-t-lg">Card Header</h1>
                                    <div className='p-3 flex flex-row items-center justify-end gap-3'>
                                        <div title='Primary Button' className={`${theme.data.button_primary.className}`} style={theme.data.button_primary.style}> Primary Button </div>
                                        <Button title='Unstyled Button' > Unstyled Button </Button>
                                    </div></Card>
                                </div>
                                <div className="flex-1 w-full   p-1 "><Card title='Card Color' className='flex-1'>
                                    <h1 className="capitalize w-full p-4 border-b border-gray-100 bg-gray-50 font-black rounded-t-lg">Card Header</h1>
                                    <div className='p-3 '>
                                        <div title='Primary Button' className={`${theme.data.button_primary.className}`} style={theme.data.button_primary.style}> Primary Button </div>
                                    </div></Card>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>

</MockBrowserWindow>
  )
}

export default ThemePreview