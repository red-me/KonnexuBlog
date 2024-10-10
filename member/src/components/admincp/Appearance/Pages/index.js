import React, { useContext, useEffect, useRef, useState } from 'react'
import AppearanceContext from '../../../../context/admincp/AppearanceContext'
import AdminAuthContext from '../../../../context/admincp/AdminAuthContext'
import PageDetail from './PageDetail'
import { Button, Chip } from '@material-tailwind/react'
import * as icons from "@heroicons/react/24/outline";
import SettingRow from '../../Common/SettingRow'
import { useRouter } from 'next/navigation';

const index = ({ path }) => {


    const PageList = ({ path }) => {

        const router = useRouter();

        const { pages, loadPages, createPage } = useContext(AppearanceContext)

        const { user } = useContext(AdminAuthContext)
        const [hasNewRecord, setHasNewRecord] = useState(null)


        /*  useEffect(() => {
             if(pages){
                 if(pages.find(m=>m.id==))
             }
             testRef.current.focus();
          }, [pages]);
      */
        const createEmptyPage = async () => {

            const newPageData = {

                title: `Page-${Date.now()}`,
                description: ``,
                type: 'page',
                published: false,
                authorId: user.id,
                content: { url: '', data: "" }
            }
            const newPage = await createPage(newPageData)
            if (newPage.id) {
                loadPages().then(() => {
                    router.push([...path, newPage.id].join("/"))
                    setHasNewRecord(newPage.id)
                })

            }
        }


        const PageDetailRow = ({ page, path }) => {

            const edit = () => {
                router.push([path, page.id].join("/"))
            }

            return <SettingRow label={<div className='flex flex-row gap-2 justify-normal items-center'><div className='w-72'>{page.title}</div></div>} description={<div className='flex flex-row gap-2 justify-normal items-center'><Chip value={page.published ? 'Published' : 'Not Published'} className={`rounded-full w-32 text-center p-2 px-4 scale-75 ${page.published?'bg-green-300 to-green-700 ':'bg-gray-300 to-gray-500'}  bg-gradient-to-b`} size='sm'></Chip><div className='w-48'>URL: {page.description}</div><div className=''>Last Update: { (new Date(page.updatedAt)).toLocaleString()}</div></div>} type={0} >
                <div className='flex flex-row w-full justify-end items-center gap-2'>
                    <Button size='sm' variant='filled' color='blue' onClick={() => { edit() }}>Edit</Button>
                    <Button size='sm' variant='filled' color='red'>Delete</Button>
                </div>
            </SettingRow>
        }


        return (


            <div className='flex flex-col gap-4 w-full p-4'>
                <div className='text-white font-bold text-2xl flex flex-row justify-between items-center text-nowrap'><h1 >Page Manager</h1> <div className='flex flex-row w-full justify-end items-center'> <Button color='blue' size='sm' className='rounded-full' variant='gradient' onClick={() => { createEmptyPage() }}>Create New Page</Button></div></div>
                <div className="shadow bg-white border rounded-lg min-h-64 flex flex-col h-full gap-4 p-4">

                    <div className='flex flex-col w-full gap-4'>

                        {pages && pages.map(page => <PageDetailRow page={page} path={path}></PageDetailRow>)}

                    </div>

                </div>
            </div>
        )
    }



    if (path.length == 1) return <PageList path={path} ></PageList>
    else return <PageDetail path={path}></PageDetail>


}

export default index