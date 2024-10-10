import React from 'react'

const InputByType = (props) => {
    const { type, name, value, set, controls, hostReact, ...controlProps } = props
    const [newValue, setNewValue] = hostReact.useState(null)
    const { Switch, Badge, Button } = controls
    if (type === 'Boolean') {
        return <Switch {...controlProps} checked={value} onChange={(e) => { set(name, !value) }}></Switch>
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
    } else if (type === "ListOfInt") {

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

    return <div></div>
}


export default InputByType