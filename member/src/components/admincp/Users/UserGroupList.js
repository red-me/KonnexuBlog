import React, { useContext, useEffect, useReducer, useState } from 'react'





import UserContext from '../../../context/admincp/UserContext'
import { Avatar, Button, Checkbox } from '@material-tailwind/react'
import CreateUserGroupDialog from "./CreateUserGroupDialog"
import UpdateUserGroupDialog from "./UpdateUserGroupDialog"
import CogMenu from "../../CogMenu"
const TH = (props) => {
    const { className, children } = props
    return <th {...props} className={"border-b  border-blue-gray-100  p-2 text-sm " + (className || '')}>{children}</th>
}

import { useRouter } from 'next/navigation';



function UserGroupList() {
    const router = useRouter();
    const { userGroups, isLoading } = useContext(UserContext)

    const [editId, setEditId] = useState(null)


    const manageSettingsAction = (id) => {
        //todo show edit dialog
        //alert(id)
        router.push(`./groups/settings/${id}`)
    }

    const editAction = (id) => {
        //todo show edit dialog
        //alert(id)
        setEditId(id)
        setShowUpdateDialog(true)
    }

    const deleteAction = (id) => {
        //todo show delete dialog
        alert(id)
    }


    const [showCreateDialog, setShowCreateDialog] = useState(false)

    const closeCreateDialog = () => { setShowCreateDialog(false) }

    const [showUpdateDialog, setShowUpdateDialog] = useState(false)
    const closeUpdateDialog = () => { setShowUpdateDialog(false) }
    return (
        <>
            <div className='flex justify-end m-4 relative '>
                <Button color="blue" variant='gradient' onClick={() => setShowCreateDialog(true)}>Create User Group</Button>
            </div>
            <div className="shadow bg-white  rounded-lg m-4 min-h-64">

                <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                        <tr>
                            <TH className={"rounded-l rounded-r p-4 bg-blue-gray-50/50"} colSpan='4'>Default User Groups</TH>
                        </tr>

                        <tr>
                            <TH className=" w-4"><div className='flex justify-center'><Checkbox /></div></TH>
                            <TH>Name</TH>
                            <TH className="text-center w-36">Users</TH>
                            <TH className="text-center w-36">Settings</TH>

                        </tr>
                    </thead>

                    <tbody>
                        {userGroups.defaultUserGroupList !== null && userGroups.defaultUserGroupList.map((group, index) => {

                            const isLast = index === userGroups.defaultUserGroupList.length - 1;
                            const classes = isLast
                                ? "p-1 px-2 text-sm"
                                : "p-1 px-2 text-sm border-b border-blue-gray-50 ";

                            return <tr>
                                <td className={classes + " w-4"} ><div className='flex justify-center'><Checkbox key={group.id} ch defaultChecked={false}></Checkbox></div></td>

                                <td className={classes}>{group.name}</td>

                                <td className={classes + " text-center w-36"}>{group.users?.length}</td>

                                <td className={classes + " text-center"}>
                                    <div className='flex justify-center'>
                                        <CogMenu menuItems={[{ item: 'App Settings', action: (e) => { manageSettingsAction(group.id) } }, { item: 'Edit', action: (e) => { editAction(group.id) } }]} ></CogMenu></div>
                                </td>
                            </tr>
                        })}</tbody>
                </table>

            </div>

            <div className="shadow bg-white  rounded-lg m-4 min-h-64">

                <table className='w-full min-w-max table-auto text-left'>
                    <thead>
                        <tr>
                            <TH className={"rounded-l rounded-r p-4 bg-blue-gray-50/50"} colSpan='4'>Custom User Groups</TH>
                        </tr>

                        <tr>
                            <TH className=" w-4"><div className='flex justify-center'><Checkbox /></div></TH>
                            <TH>Name</TH>
                            <TH className="text-center w-36">Users</TH>
                            <TH className="text-center w-36">Settings</TH>

                        </tr>
                    </thead>

                    <tbody>
                        {userGroups.customUserGroupList !== null && userGroups.customUserGroupList.map((group, index) => {

                            const isLast = index === userGroups.customUserGroupList.length - 1;
                            const classes = isLast
                                ? "p-1 px-2 text-sm"
                                : "p-1 px-2 text-sm border-b border-blue-gray-50 ";

                            return <tr>
                                <td className={classes + " w-4"} ><div className='flex justify-center'><Checkbox key={group.id} ch defaultChecked={false}></Checkbox></div></td>

                                <td className={classes}>{group.name}</td>

                                <td className={classes + " text-center w-36"}>{group.users?.length}</td>

                                <td className={classes}>
                                    <div className='flex justify-center'>
                                        <CogMenu menuItems={[{ item: 'App Settings', action: (e) => { manageSettingsAction(group.id) } }, { item: 'Edit', action: (e) => { editAction(group.id) } }, (group.users?.length > 0 ? null : { item: 'Delete', action: (e) => { deleteAction(group.id) } })]} ></CogMenu></div>
                                </td>
                            </tr>
                        })}</tbody>
                </table>

            </div>

            <CreateUserGroupDialog visible={showCreateDialog} setVisible={setShowCreateDialog}></CreateUserGroupDialog>
            <UpdateUserGroupDialog id={editId} visible={showUpdateDialog} setVisible={setShowUpdateDialog}></UpdateUserGroupDialog>
        </>
    )
}

export default UserGroupList