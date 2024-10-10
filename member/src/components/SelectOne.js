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

const SelectOne = (props) => {
    const { items, setSelectedValue, selectedValue, idField = '', textField = '', descriptionField = '', buttonProps, menuListClassName, ...otherProps } = props
    //  const [selectedValue, setSelectedValue] = React.useState(null);
    const ChevronDownIcon = ({ className }) => {
        return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className || ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>)
    }
    const [openMenu, setOpenMenu] = React.useState(false);



    const getText = (id) => {
        if (!items || !items.find) return '';
        const i = items.find(item => (idField == '' ? item : item[idField]) === id);
        return i ? (textField == '' ? i : i[textField]) : ''
    }

    const getDesc = (id) => {
        if (!items || !items.find) return '';
        const i = items.find(item => (idField == '' ? item : item[idField]) === id);
        return i ? (descriptionField == '' ? i : i[descriptionField]) : ''
    }

    const className = buttonProps?.className;
    const btnClassName = "  flex flex-row  justify-between items-center shadow-none hover:shadow-none capitalize p-1 m-0 h-10 w-full text-sm text-left text-base font-normal capitalize tracking-normal text-black bg-white border rounded-md border-gray-400";

    var allBtnClassNames = ((className || '') + btnClassName).split(" ")
    let outputArray = Array.from(new Set(allBtnClassNames)).join(" ")

    const componentRef = React.useRef()
    const [width, setWidth] = React.useState(0)
    React.useEffect(() => {
        if (componentRef.current) {
            setWidth(componentRef.current.offsetWidth)
        }



    }, [openMenu, componentRef.current])

    const classWidth = 'w-[' + width + 'px]';
    return (
        <Menu placement="bottom-start" open={openMenu} ref={componentRef}
            handler={setOpenMenu}>
            <MenuHandler>
                <div  {...buttonProps} className={outputArray} title={getDesc(selectedValue)} ><span>{getText(selectedValue)}</span>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3.5 w-3.5  transition-all delay-600 ease-in-out ${openMenu ? "rotate-180" : ""}`}
                    /></div>
            </MenuHandler>
            <MenuList className={`px-1 py-0 ${classWidth} ${menuListClassName || ''}`} >
                {
                    items.map(item => {

                        const itemValue = idField == '' ? item : item[idField]
                        const itemText = textField == '' ? item : item[textField]
                        return <>
                            <MenuItem key={item.id} className={`rounded-none my-1 ${itemValue == selectedValue ? 'bg-gray-100' : ''}`} onClick={() => { setSelectedValue(itemValue); setOpenMenu(false) }} >
                                {itemText}</MenuItem></>
                    })
                }
            </MenuList>
        </Menu>
    );
}

export default SelectOne