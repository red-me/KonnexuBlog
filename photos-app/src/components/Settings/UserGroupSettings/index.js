import React from 'react'
import defaultUserGroupSettings from "./defaultSettings"
import SettingRow from '../SettingRow'

import InputByType from "./InputByType"

function index(props) {
    const { app, hostReact, queryPost, mutate } = props
    const { SelectOne } = props.components
    const { Button, Switch } = props.controls
    const { Toastify } = props.components;
    const { Bounce, toast } = Toastify;

    const [userGroups, setUserGroups] = hostReact.useState([])
    const [appConfig, setAppConfig] = hostReact.useState([])
    const [selectedUserGroupId, setSelectedUserGroupId] = hostReact.useState(null)
    const [userGroupSettings, setUserGroupSettings] = hostReact.useState(null)
    const [isChanged, setIsChanged] = hostReact.useState(false);
    const [isNew, setIsNew] = hostReact.useState(false);

    const [updatedSettings, dispatch] = hostReact.useReducer((state, action) => {

        const newState = { ...state, [action.id]: action.value };
        return newState

    }, {})

    const updateAction = (id, value) => {
        setIsChanged(true)
        dispatch({ id, value })
    }

    hostReact.useEffect(() => {
        setUserGroupSettings(prev => { return { ...prev, ...updatedSettings } })

    }, [updatedSettings])


    hostReact.useEffect(() => {
        queryPost('userGroup', {
            where: {

            }
        }).then(results => {
            if (results && results.length) {
                setUserGroups(results)
            }
        })


    }, [])

    //transiitonal: load local version of app data. 
    hostReact.useEffect(() => {
        if (app.id) {

            queryPost('app', {
                where: {
                    id: app.id
                }
            }).then(results => {
                if (results && results.length) {
                    setAppConfig(results[0])
                }
            })
        }
    }, [app])

    hostReact.useEffect(() => {
        if (userGroups.length > 0) {
            //select first entry on initial load
            setSelectedUserGroupId((userGroups[0].name))
        }
    }, [userGroups])

    hostReact.useEffect(() => {
        try {


            if (selectedUserGroupId) {
                setIsChanged(false)
                //load or initialize defaults

                const defaults = Object.fromEntries(
                    Object.entries(defaultUserGroupSettings).map(([key, val]) => [key, val.defaultValue]),
                );


                if (appConfig && appConfig.settings.userGroupSettings && appConfig.settings.userGroupSettings[selectedUserGroupId]) {
                    setIsNew(false)
                    setUserGroupSettings(appConfig.settings.userGroupSettings[selectedUserGroupId])

                } else {
                    setUserGroupSettings(defaults)
                    setIsNew(true)
                }
            }
        } catch (error) {

        }

    }, [selectedUserGroupId, appConfig])



    const saveSettings = () => {

        const currentUserGroupSettings = appConfig.settings.userGroupSettings || {}

        const newSettings = { ...appConfig.settings, userGroupSettings: { ...currentUserGroupSettings, [selectedUserGroupId]: userGroupSettings } }


        if (isChanged) mutate('update', {
            where: { id: appConfig.id },
            data: { settings: newSettings }
        }).then(result => {
            setIsChanged(false);
            if (result.id) {
                // setUserGroupSettings(result.settings.userGroupSettings[selectedUserGroupId])
                setAppConfig(result)
                toast.success(`${selectedUserGroupId}  Group Settings updated successfully.`, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    /*  onClose: () => { closeAction() }, */
                });


            }
            else toast.error('Failed to update.', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
    }


    return (
        <div className='p-4 flex flex-col gap-1' >

            <div className='flex flex-row items-center gap-4 bg-gray-50 p-6 rounded shadow-sm '>
                <label className="flex-none">Group</label>
                <SelectOne className={"grow"} items={userGroups} idField={"name"} textField={"name"} descriptionField={"name"} selectedValue={selectedUserGroupId} setSelectedValue={setSelectedUserGroupId}
                ></SelectOne>

                <Button className={`flex-none transition-all  ${isChanged ? 'opacity-1' : 'opacity-0'}`} size="small" variant="gradient" color="blue" onClick={(e) => { saveSettings() }}>Save Changes

                </Button>
            </div>

            <div className={`flex flex-col justify-start gap-4  transition duration-1000 ease-in-out ${selectedUserGroupId ? 'opacity-1' : 'opacity-0'}`}>
                {defaultUserGroupSettings && Object.keys(defaultUserGroupSettings).map((key, index, list) => {
                    const value = userGroupSettings && userGroupSettings[key] ? userGroupSettings[key] : defaultUserGroupSettings[key].defaultValue;
                    const types = { "Boolean": 0, "Int": 2, "ListOfInt": 2, "FixedListOfKeyedInt": 2 }
                    return <SettingRow label={defaultUserGroupSettings[key].title} description={defaultUserGroupSettings[key].description} type={types[defaultUserGroupSettings[key].type]}>
                        <InputByType hostReact={hostReact} controls={props.controls} name={key} type={defaultUserGroupSettings[key].type} value={value} set={updateAction}></InputByType>
                    </SettingRow>
                })}
            </div>

        </div>
    )
}

export default index