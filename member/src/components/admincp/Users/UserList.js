import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../context/admincp/UserContext'
import { useRouter } from 'next/navigation';

import { Avatar, Button, Checkbox } from '@material-tailwind/react'
import CogMenu from "../../CogMenu"
const TH = (props) => {
    const { className, children } = props
    return <th {...props} className={"border-b  border-blue-gray-100  p-2 text-sm " + (className || '')}>{children}</th>
}
function UserList() {

    const router = useRouter();
    const { countUsers, queryUsers, mutateUsers, isLoading } = useContext(UserContext)

    const [users, setUsers] = useState([])
    const [allUserCount, setAllUserCount] = useState(0)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const [where, setWhere] = useState({}) //empty for now, todo search by name

    const loadList = () => {
        queryUsers({

            where,

            skip: pageIndex * pageSize,
            take: pageSize,
        }).then(data => {
            setUsers(data)
        })
    }
    useEffect(() => {

        countUsers({ where }).then(data => {
            setAllUserCount(data)
        })
    }, [])

    useEffect(() => {
        if (allUserCount > 0) {

            const diff = allUserCount / pageSize
            const floor = Math.floor(diff)
            setPageCount(floor + (diff !== floor ? 1 : 0))

            loadList()
        }
    }, [allUserCount, pageIndex])


    useEffect(() => {
        //reset to first when page size is chnaged..
        setPageIndex(0)


    }, [pageSize])

    const nextPage = () => {
        if (pageIndex < pageCount - 1) setPageIndex(p => p + 1)
    }

    const prevPage = () => {
        if (pageIndex > 0) setPageIndex(p => p - 1)
    }


    const [showCreateDialog, setShowCreateDialog] = useState(false)

    const closeCreateDialog = () => { setShowCreateDialog(false) }



    /* const manageSettingsAction = (id) => {
        //todo show edit dialog
        //alert(id)
        router.push(`./groups/settings/${id}`)
    } */

    const editAction = (id) => {
        //todo show edit dialog
        //alert(id)
        router.push(`./browse/${id}`)

    }

    const deleteAction = (id) => {
        //todo show delete dialog
        alert(id)
    }

    return (
        <>
            <div className="shadow bg-white border rounded-lg m-4 min-h-64">

                <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                        <tr>
                            <TH ><div className='flex justify-center'><Checkbox /></div></TH>
                            <TH>ID</TH>
                            <TH>Photo</TH>
                            <TH>Display Name</TH>
                            <TH>Email Address</TH>
                            <TH>Groups</TH>
                            <TH>Last Activity</TH>
                            <TH>Last IP Address</TH>
                            <TH className="text-center w-36">Settings</TH>
                        </tr>
                    </thead>

                    <tbody>
                        {users !== null && users.map((user, index) => {

                            const isLast = index === users.length - 1;
                            const classes = isLast
                                ? "p-1 px-2 text-sm"
                                : "p-1 px-2 text-sm border-b border-blue-gray-50 ";

                            return <tr>
                                <td className={classes + " w-4"} ><div className='flex justify-center'><Checkbox key={user.id} ch defaultChecked={false}></Checkbox></div></td>
                                <td className={classes}><p className='flex justify-center'>{user.id}</p></td>
                                <td className={classes}><div className='flex justify-center'>{user.profile.avatar ?
                                    <Avatar
                                        variant="circular"
                                        alt={`${user.profile.firstName} ${user.profile.lastName}`}
                                        className="cursor-pointer w-9 h-9 shadow-sm "
                                        src={user.profile.avatar}
                                    />
                                    :
                                    <div className=" cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full border-1 dark:bg-gray-100  dark:border-gray-400   border-gray-900">
                                        <span className="font-bold text-sm text-gray-900 dark:text-gray-300">{user.profile.firstName[0]}{user.profile.lastName[0]}</span>
                                    </div>
                                }</div></td>
                                <td className={classes}>{user.profile.displayName?.length > 0 ? user.profile.displayName : user.name}</td>
                                <td className={classes}>{user.email}</td>
                                <td className={classes}>{user.userGroup?.name}</td>
                                <td className={classes}>{new Date(user.lastActivity)?.toDateString()}</td>
                                <td className={classes}>{user.lastIPAddress}</td>
                                <td className={classes + " text-center"}>
                                    <div className='flex justify-center'>
                                        <CogMenu menuItems={[{ item: 'Edit', action: (e) => { editAction(user.id) } }]} ></CogMenu></div>
                                </td>
                            </tr>
                        })}</tbody>
                </table>
                <div className='flex flex-row gap-2 justify-center p-4'>
                    <Button loading={isLoading} onClick={() => prevPage()} className='w-40'>Previous</Button>
                    <div className='flex px-4 items-center'>{pageIndex + 1} of {pageCount}</div>
                    <Button loading={isLoading} onClick={() => nextPage()} className='w-40'>Next</Button>
                </div>
            </div>
        </>
    )
}

export default UserList