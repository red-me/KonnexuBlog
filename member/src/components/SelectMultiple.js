import {
    Select, Option,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Card,
    Typography
} from "@material-tailwind/react"

import React from "react"

const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })

    React.useEffect(() => {
        const getDimensions = () => ({
            width: myRef.current.offsetWidth,
            height: myRef.current.offsetHeight
        })

        const handleResize = () => {
            setDimensions(getDimensions())
        }

        if (myRef.current) {
            setDimensions(getDimensions())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef])

    return dimensions;
};

const SelectMultiple = ({ items, setSelectedValue, selectedValue, idField = '', textField = '', buttonProps, }) => {

    //  const [selectedValue, setSelectedValue] = React.useState(null);
    const ChevronDownIcon = ({ className }) => {
        return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className || ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>)
    }
    const [openMenu, setOpenMenu] = React.useState(false);

    const [values, setValues] = React.useState([])

    const toggleValue = (value) => {
        setSelectedValue(prev => {
            const foundAt = prev.indexOf(value)
            if (foundAt > -1) {
                //remove
                var newArray = [...prev];
                newArray.splice(foundAt, 1);
                return newArray;
            }
            else {
                return [...prev, value];
            }

        })
    }


    const getText = (id) => {
        const i = items.find(item => (idField == '' ? item : item[idField]) === id);
        return i ? (textField == '' ? i : i[textField]) : ''
    }

    const className = buttonProps?.className;
    const btnClassName = "  flex   justify-between shadow-none hover:shadow-none capitalize p-2 m-0 h-11 w-full text-sm text-left text-base font-normal capitalize tracking-normal text-black bg-white border rounded-md border-gray-400";

    var allBtnClassNames = (btnClassName + (className || '')).split(" ")
    let outputArray = Array.from(new Set(allBtnClassNames)).join(" ")

    const componentRef = React.useRef()
    const [width, setWidth] = React.useState(0)
    React.useEffect(() => {
        if (componentRef.current) {
            setWidth(componentRef.current.offsetWidth)
        }



    }, [openMenu, componentRef.current])

    const SelectedItems = () => {
        return <div className="min-w-48 w-auto flex flex-row gap-2 ">{items.filter(item => {
            return selectedValue && selectedValue.indexOf((idField == '' ? item : item[idField])) > -1;

        }).map(item => {

            const itemValue = (textField == '' ? item : item[textField])
            return <div className=" rounded shadow hover:shadow-sm font-semibold text-md py-1 px-2 h- bg-blue-400 hover:bg-blue-300 text-white  flex justify-between gap-2 items-center"><span>{(textField == '' ? item : item[textField])}</span>
                {/* <span className="font-semibold text-lg cursor-pointer" onClick={(e) => {
                    toggleValue(itemValue); return false;
                }} >&times;</span> */} </div>
        })}</div>
    }

    const classWidth = 'w-[' + width + 'px]';
    return (
        <>
            <Menu placement="bottom-start" open={openMenu} ref={componentRef}
                dismiss={{
                    itemPress: false,
                }}

                handler={setOpenMenu}
            >

                <MenuHandler>
                    <div  {...buttonProps} className={outputArray + " flex flex-row justify-between items-center gap-2 "} >
                        <div className="overflow-hidden">
                            <SelectedItems></SelectedItems>
                        </div>
                        <div onClick={(e) => {
                            setOpenMenu(p => !p)
                        }}>
                            <ChevronDownIcon

                                strokeWidth={2.5}
                                className={`h-3.5 w-3.5  transition-all delay-600 ease-in-out cursor-pointer ${openMenu ? "rotate-180" : ""}`}
                            /></div></div>
                </MenuHandler>
                <MenuList className={`px-1 py-0  ${classWidth} z-50`} >
                    {
                        items.map(item => {

                            const itemValue = idField == '' ? item : item[idField]
                            const itemText = textField == '' ? item : item[textField]
                            return <>
                                <MenuItem key={item.id} onClick={() => { toggleValue(itemValue); }} className=" rounded-none my-1 flex flex-row justify-between items-center">
                                    <span>{itemText}</span>
                                    {selectedValue && selectedValue.indexOf(itemValue) > -1 &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>}

                                </MenuItem></>
                        })
                    }
                </MenuList>
            </Menu> </>
    );
}

export default SelectMultiple