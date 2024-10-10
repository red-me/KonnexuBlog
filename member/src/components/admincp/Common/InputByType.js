import { Badge, Button, Chip, Switch, Select, Option } from '@material-tailwind/react'
import SelectOne from '../../SelectOne'
import DatePicker from "../../DatePicker"
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../context/admincp/UserContext'
import ProfilePictureUploader from "./InputControls/ProfilePictureUploader"
const CheckedIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
    </svg>

}

const EyeIcon = ({ see, toggle }) => {
    return (<div onClick={() => { toggle ? toggle() : null }} className='cursor-pointer' title={see ? 'Hide' : 'Show'}>{see ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
        </svg>
    }</div>
    )
}

const InputByType = (props) => {
    const { userGroups } = useContext(UserContext)
    const { type, name, value, set, unSet, ...controlProps } = props
    const [newValue, setNewValue] = useState(null)

    //password
    const [confirmValue, setConfirmValue] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordMatched, setPasswordMatched] = useState(false)


    useEffect(() => {
        setNewValue(value)

    }, [])

    useEffect(() => {
        setPasswordMatched(newValue && newValue.length > 0 && newValue === confirmValue)


    }, [newValue, confirmValue])

    useEffect(() => {
        if (type == 'Password' && passwordMatched == false) {
            unSet(name)
        }

    }, [passwordMatched])





    if (type === 'Boolean') {
        return <Switch {...controlProps} checked={value} onChange={(e) => { set(name, !value) }}></Switch>
    }
    else if (type === 'String') {

        const { className, ...p } = controlProps

        const onBlur = (e) => {
            if (newValue.length > 0 && newValue !== value) set(name, newValue)
            else if (newValue.length == 0) {
                if (newValue !== value) { unSet(name); setNewValue(value) }

            }
        }
        return <div className={`flex flex-row  gap-2 w-full`} >
            <input  {...p} type='text' value={newValue} onChange={(e) => { setNewValue(e.target.value.trim()) }} onBlur={onBlur}
                className={'w-full border border-gray-400 bg-gray-50 rounded p-1 ' + (className || '')}
            /></div>
    }
    else if (type === 'Password') {

        const { className, ...p } = controlProps

        const onBlur = (e) => {

            if (newValue && newValue.length > 0 && passwordMatched) set(name, newValue)
            else { unSet(name) }
        }


        return <div className='flex flex-row gap-2 items-center'>
            <EyeIcon see={showPassword} toggle={() => setShowPassword(p => !p)} />
            <label className=' text-nowrap text-right' for={"password_" + name}>New Password</label>
            <input name={"password_" + name} {...p} type={showPassword ? 'text' : 'password'} value={newValue == null ? '' : newValue}
                onChange={(e) => { setNewValue(e.target.value.trim()) }}
                onBlur={onBlur}
                className={'w-full text-sm border border-gray-400 bg-gray-50 rounded p-1 mr-6 ' + (className || '')}
            />
            <label className=' text-nowrap  text-right' for={"password_confirm_" + name}>Confirm New Password</label>
            <input name={"password_confirm_" + name} {...p} type={showPassword ? 'text' : 'password'} value={confirmValue == null ? '' : confirmValue}
                onChange={(e) => { setConfirmValue(e.target.value.trim()) }}
                onBlur={onBlur}
                className={'w-full border border-gray-400 bg-gray-50 rounded p-1 ' + (className || '')}
            />
            {newValue && newValue.length > 0 && passwordMatched && <div className='text-green-600'><CheckedIcon /></div>}
        </div>
    }
    else if (type === 'Int') {
        const validate = (n, v, p) => {

            if (v.trim().length > 0) {
                const pv = parseInt(v)
                if (isNaN(pv)) set(n, 0)
                else set(n, pv)
                //else set(n, 0)

            } else set(n, 0)
        }
        return <div className='flex flex-row gap-2'>

            <input {...controlProps} type='text' maxLength={4} value={value == null ? '' : value} onChange={(e) => { set(name, e.target.value) }} onBlur={(e) => { validate(name, e.target.value, value) }}
                className='border border-gray-50 shadow rounded p-1'
            /></div>
    }
    else if (type === "UserGroup") {

        const { className, ...p } = controlProps
        const selectItem = (v) => {
            set(name, v)
        }
        return <div className={className || 'w-full'} ><SelectOne menuListClassName={"max-h-72 shadow-xl " + className} items={controlProps.listSource} idField={"id"} textField={"name"} descriptionField={"name"} selectedValue={value} setSelectedValue={selectItem}
        ></SelectOne></div>
    }
    else if (type === "Country") {

        const { className, ...p } = controlProps
        const selectItem = (v) => {
            set(name, v)
        }
        return <div className={className || 'w-full'} ><SelectOne menuListClassName={"max-h-72 " + className} items={controlProps.listSource} idField={"id"} textField={"name"} descriptionField={"name"} selectedValue={value} setSelectedValue={selectItem}
        ></SelectOne></div>
    }
    else if (type === "PrivacySettings") {

        const { className, ...p } = controlProps
        const selectItem = (v) => {
            set(name, v)
        }
        return <div className={className || 'w-full'} ><SelectOne menuListClassName={"max-h-72 " + className} items={controlProps.listSource} idField={"id"} textField={"name"} descriptionField={"name"} selectedValue={value} setSelectedValue={selectItem}
        ></SelectOne></div>
    }
    else if (type === "Gender") {

        const { className, ...p } = controlProps
        const selectItem = (v) => {
            set(name, v)
        }
        return <div className={className || 'w-full'} ><SelectOne menuListClassName={"max-h-72 shadow-xl " + className} items={controlProps.listSource} idField={"id"} textField={"name"} descriptionField={"name"} selectedValue={value} setSelectedValue={selectItem}
        ></SelectOne></div>
    }
    else if (type === "Date") {

        const { className, ...p } = controlProps
        const selectItem = (v) => {
            set(name, v)
        }
        return <div className={className || 'w-full'} ><DatePicker menuListClassName={"max-h-72 shadow-xl " + className} value={value} onChange={selectItem}
        ></DatePicker></div>
    }
    else if (type === "Picture") {

        const { className, ...p } = controlProps
        const setUrl = (v) => {
            set(name, v)
        }
        return <div className={className || 'w-full'} ><ProfilePictureUploader fileUrl={value} setFileUrl={setUrl} id={controlProps.userId} ></ProfilePictureUploader></div>
    }
    else if (type === "ListOfInt") {

        const deleteAtIndex = (i) => {
            let newValue = [...value]
            newValue.splice(i, 1);
            set(name, newValue)


        }
        const addNewValue = () => {
            const pv = parseInt(newValue)
            if (!isNaN(pv) && pv > 0 && !value.includes(pv)) {
                const nv = [...value, pv].sort((a, b) => a - b)
                set(name, nv)
                setNewValue('')
            }

        }


        const sort = () => {
            let newValue = [...value]
            newValue.sort((a, b) => a - b);
            set(name, newValue)
        }
        const updateAtIndex = (i, v, l) => {
            let newValue = [...value]
            const nn = parseInt(v)

            if (!isNaN(nn) && nn > 0) {


                const foundAt = l.findIndex((x) => x === nn)
                if (foundAt === -1 || foundAt === i) {

                    newValue[i] = parseInt(v)
                    set(name, newValue)
                }
            }


        }

        const XMark = () => {
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
        }


        return <div className='flex flex-row gap-5 mt-2'>

            {value && value.map((v, i, l) =>
                <><div className="pl-5 pr-6">
                    <Badge onClick={() => { deleteAtIndex(i) }} content={<XMark />} className={"text-xs cursor-pointer"}>
                        <input className='border border-gray-50 shadow rounded py-1 w-12 h-8 text-center' maxLength={3} value={v} onChange={(e) => { updateAtIndex(i, e.target.value, l) }} onBlur={() => { sort() }} />
                    </Badge>
                </div></>)}

            <div class="flex flex-row gap-0 ">
                <input type="text" maxLength={3}
                    onChange={(e) => { setNewValue(e.target.value) }} onKeyDown={(e) => (
                        e.key === 'Enter' ? addNewValue() : null
                    )} value={newValue} id="hs-trailing-button-add-on-with-icon" name="hs-trailing-button-add-on-with-icon" className="outline-0 h-8 border border-gray-50 shadow rounded py-1 w-12 text-center rounded-r-none" />
                <Button size="small" color="blue" onClick={() => addNewValue()} className={"h-8 rounded-l-none py-2 "} >
                    Add
                </Button>
            </div>
        </div>
    } else if (type === "FixedListOfKeyedInt") {


        const updateAtKey = (key, v) => {
            let newValue = { ...value }
            const nn = parseInt(v)

            if (!isNaN(nn)) {

                newValue[key] = parseInt(v)
                set(name, newValue)

            }


        }

        return <div className='flex flex-row gap-5 mt-2'>

            {value && Object.keys(value).map((key) => {

                const vv = value[key]

                return <><div className="pl-5 pr-6 flex flex-row">
                    <label className='border border-gray-50 bg-gray-50 shadow rounded rounded-r-none py-1 w-12 h-8 text-center px-2'>{key}</label>
                    <input className='border border-gray-50 shadow rounded rounded-l-none  py-1 w-16 h-8 text-center' maxLength={5} value={vv} onChange={(e) => { updateAtKey(key, e.target.value) }} />

                </div></>

            })}


        </div>
    }
    else {

        const { className, ...p } = controlProps
        return <div className='flex flex-row gap-2'>

            <input {...p} type='text' value={value == null ? '' : value} onChange={(e) => { setNewValue(e.target.value) }} onBlur={(e) => { set(name, newValue) }}
                className={'border border-gray-400 bg-gray-50 rounded p-1 ' + (className || '')}
            /></div>
    }

    return <div></div>
}


export default InputByType