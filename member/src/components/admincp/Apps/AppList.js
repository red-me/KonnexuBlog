import React, { useContext, useEffect, useState } from 'react'




import AppContext from '../../../context/admincp/AppContext'

import { Avatar, Button, Checkbox, Switch } from '@material-tailwind/react'
import { useRouter } from 'next/navigation';

const TH = ({ className, children }) => {
    return <th className={"border-b  border-blue-gray-100 bg-blue-gray-50/50 p-2 text-sm " + (className || '')}>{children}</th>
}





function AppList(props) {
    const router = useRouter();
    const { count, query, mutate, isLoading, isError, createId } = useContext(AppContext)

    const [apps, setApps] = useState([])
    const [allAppsCount, setAllAppsCount] = useState(0)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [pageSize, setPageSize] = useState(2)

    const [where, setWhere] = useState({}) //empty for now, todo search by name

    const loadList = () => {
        query({
            /* include: { users: true }, */
            where,

            skip: pageIndex * pageSize,
            take: pageSize,
        }).then(data => {
            setApps(data)
        })
    }
    useEffect(() => {

        count({ where }).then(data => {
            setAllAppsCount(data)
        })
    }, [])

    useEffect(() => {
        if (allAppsCount > 0) {

            setPageCount(allAppsCount / pageSize + (allAppsCount % pageSize))

            loadList()
        }
    }, [allAppsCount, pageIndex])


    useEffect(() => {
        //reset to first when page size is chnaged..
        setPageIndex(0)


    }, [pageSize])

    const nextPage = () => {
        if (pageIndex < pageCount-1) setPageIndex(p => p + 1)
    }

    const prevPage = () => {
        if (pageIndex > 0) setPageIndex(p => p - 1)
    }


    const navigateToApp=(name)=>{
        router.push(`/admincp/apps/installed/${name.toLowerCase()}`)
    }
    return (
        <>
            <div className="shadow bg-white border rounded-lg m-4 min-h-64">
                <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                        <tr>
                            <TH className={"rounded-l"}><div className='flex justify-center'><Checkbox /></div></TH>
                            <TH>Name</TH>
                            <TH>Version</TH>
                            <TH>Latest</TH>
                            <TH>Active</TH>
                            <TH className={"text-center rounded-r"}>Settings</TH>

                        </tr>
                    </thead>

                    <tbody>
                        {apps !== null && apps.map((app, index) => {

                            const isLast = index === apps.length - 1;
                            const classes = isLast
                                ? "p-1 px-2 text-sm"
                                : "p-1 px-2 text-sm border-b border-blue-gray-50 ";

                            return <tr>
                                <td className={classes + " w-4"} ><div className='flex justify-center'><Checkbox key={app.id} ch defaultChecked={false}></Checkbox></div></td>

                                <td className={classes}><Button variant='text' size='sm' onClick={()=>{ navigateToApp(app.name) }}>{app.name}</Button></td>

                                <td className={classes}>&nbsp;</td>
                                <td className={classes}>&nbsp;</td>
                                <td className={classes}><Switch checked={app.enabled} /></td>

                                <td className={classes + " text-center"}>
                                    <div className='flex justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    </div>
                                </td>
                            </tr>
                        })}</tbody>
                </table>
                <div className='flex flex-row gap-2 justify-center p-4'>
                    <Button size='sm' loading={isLoading} onClick={() => prevPage()} className='w-32'>Previous</Button>
                    <div className='flex px-4 items-center'>{pageIndex + 1} of {pageCount}</div>
                    <Button size='sm' loading={isLoading} onClick={() => nextPage()} className='w-32'>Next</Button>
                </div>
            </div>
        </>
    )
}

export default AppList