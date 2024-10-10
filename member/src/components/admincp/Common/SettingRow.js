import React from 'react'

function SettingRow({ label, description, children, type = 0, bottomDivider = true }) {

    let flowDirection = "flex-row justify-between items-center py-4"
    let justify = "justify-items-center w-64 px-4 py-2"
    //type=0 default // horizontal {label-desc-children}
    if (type === 1) {
        //horizontal + reverse
        flowDirection = "flex-row flex-row-reverse justify-between items-center py-0"
        justify = "justify-end px-4 py-2"
    }
    else if (type === 2) {
        //vertical
        flowDirection = "flex-col justify-start items-left py-3"
        justify = "justify-start px-4 py-4"
    }

    return (<>
        <div className={`flex  ${flowDirection}   ${bottomDivider ? 'border-b border-gray-200 ' : ''} `}>
            <div className='flex flex-col  gap-2 grow'>

                <p className='text-sm font-bold antialiased text-gray-900'>{label}</p>
                {type != 2 && description && <p className='text-sm text-gray-500 '>{description}</p>}
            </div>
            <div className={`flex ${justify}  flex-none  `}>

                {children}


            </div>
            {type == 2 && description && <div className='flex flex-col px-4 py-2 grow'><p className='text-sm text-gray-500 '>{description}</p></div>}
        </div>
    </>)
}

export default SettingRow