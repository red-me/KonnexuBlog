import React, { useCallback, useContext, useReducer, useRef, useState } from 'react'
import AppearanceContext from '../../../../context/admincp/AppearanceContext'
import { Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Switch, iconButton } from '@material-tailwind/react'
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from 'react';
import * as icons from "@heroicons/react/24/outline";
import HeroIconOutline from "../../Common/HeroIconOutline"
const iconKeys = Object.keys(icons)
const iconKeysFirstLetters = Array.from(new Set(iconKeys.map(i => i[0].toUpperCase())))
const IconSelect = ({ icon, index, updateRow }) => {
    const [iconList, setIconList] = useState(iconKeys)
    const [searchIcon, setSearchIcon] = useState('')

    useEffect(() => {
        setIconList(iconKeys.filter(i => { return searchIcon.trim() == '' || i[0].toLowerCase() == searchIcon.toLowerCase() }))
    }, [searchIcon])

    return <Menu placement='bottom-start' dismiss={{
        itemPress: false,
    }}>
        <MenuHandler>
            {icon == '' ? <Button size='sm' title="Select an Icon" variant='text' color='gray' className='w-10 h-10' >
                &hellip;
            </Button> : <div className='w-6 h-6 align-middle items-center m-4'> <HeroIconOutline icon={icon} className='w-6 h-6 '></HeroIconOutline></div>}
        </MenuHandler>
        <MenuList className='outline-none  w-96' >
            <div className='flex flex-col'>
                <div className='flex flex-wrap gap-1'>
                    <span className={`flex justify-center h-6 w-6 mx-auto items-center cursor-pointer ${'' == searchIcon ? 'bg-gray-50' : ''}`} onClick={() => { setSearchIcon('') }}>&nbsp;</span>
                    {iconKeysFirstLetters.map(f => <span className={`flex justify-center h-10 w-10 mx-auto items-center cursor-pointer ${f == searchIcon ? 'bg-gray-50' : ''}`} onClick={() => { setSearchIcon(f) }}>{f}</span>)}
                </div>
                <MenuItem key={'none'} className={`rounded-none my-1 ${icon == '' ? 'bg-gray-100' : ''}`} onClick={() => { updateRow(index, { id: 'icon', value: '' }); setSearchIcon('') }} >
                    None</MenuItem>
                <div className='max-h-72 overflow-y-scroll flex flex-row  flex-wrap gap-x-2'>
                    {iconList.filter(i => { return searchIcon.trim() == '' || i.includes(searchIcon) }).map(iconName => {


                        return <>
                            <MenuItem key={iconName} className={`flex flex-row justify-between items-center gap-1  w-auto rounded-none my-1 ${iconName == icon ? 'bg-gray-100' : ''}`} onClick={() => { updateRow(index, { id: 'icon', value: iconName }) }} >
                                <HeroIconOutline icon={iconName} className='w-6 h-6 '></HeroIconOutline> {iconName}</MenuItem></>

                    })}
                </div>
            </div>


        </MenuList>
    </Menu>
}


function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};


function Draggable({ dndMenuItem, moveRow, updateRow, deleteRow, index }) {
    const { name, url, active, position, icon } = dndMenuItem;
    //react-dnd uses refs as its vehicle to make elements draggable
    const ref = useRef(null);

    //we use `useDrop` to designate a drop zone
    //it returns `collectedProps` and a `drop` function
    const [collectedProps, drop] = useDrop({
        //collectedProps is an object containing collected properties from the collect function

        //`accept` is very important. It determines what items are allowed to be dropped inside it
        //this corresponds with the useDrag `type` value we'll see in a bit.
        accept: "dnd-MenuItem",

        //here's that collect function!
        //Usually the info we want out of `collect()` comes from the `monitor` object
        //react- dnd gives us. We can use `monitor` to know things about the state of dnd,
        //like isDragging, clientOffset, etc.
        //If we we want to expose this data outside of the hook and use in other places, we
        //should return it as a part of the `collect(monitor)` function.
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
                // Example: maybe you want `isOver: monitor.isOver()` for dynamic styles
            };
        },

        //`hover` gets called by react-dnd when an `accept`ed draggable item is hovering
        //over the drop zone. There is a decent amount of vanilla js that is required to
        //make the reorder ui work:
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    //useDrag allows us to interact with the drag source
    const [collectedDragProps, drag, preview] = useDrag({
        //here's that `type` that corresponds with `accept`. These two have to align.
        type: "dnd-MenuItem",
        //`item` describes the item being dragged. It's called by react-dnd when drag begins.
        //`item` gets passed into hover and we use that data there
        item: () => {
            return { position, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    //Here's an example of how we use `collectedProps`.
    //I'm using bgColor instead of opacity to demonstrate the difference between the item
    //being dragged and the preview, meaning the element in dragging state. isDragging affects
    //the actual dragged element, not the preview.
    //*Note: if we want to change the preview we would want to use a custom drag layer and render a preview component
    const bgColor = collectedDragProps.isDragging ? "gray" : "";

    //in the return statement, we assign the ref to be the value of the div

    //Join the two refs together. This is a shorthand that allows us to create
    //a drop zone around our draggables in one line.
    drag(drop(ref));
    /* 
    current: 
      <div draggable="true" data-handler-id="T16" style="border: 1px dotted; width: 50%; padding: 2px 12px;">
        <p>Class: Barbarian</p>
        <p>Race: Dragonborn</p>
      </div> 
    */
    console.log("coll", collectedDragProps.isOver);

    const [isEditName, setIsEditName] = useState(false)

    const [localName, setLocalName] = useState(name)

    const acceptNewName = () => {
        updateRow(index, { id: "name", value: localName })
    }

    const rejectNewName = () => {
        setLocalName(name)
        setIsEditName(false)
    }

    const [isEditUrl, setIsEditUrl] = useState(false)

    const [localUrl, setLocalUrl] = useState(url)

    const acceptNewUrl = () => {
        updateRow(index, { id: "url", value: localUrl })
    }

    const rejectNewUrl = () => {
        setLocalUrl(url)
        setIsEditUrl(false)
    }

    return (
        <div
            //here's that ref
            ref={ref}
            className='flex flex-row w-full border p-3 justify-between items-center gap-2'

            style={{ backgroundColor: bgColor }}
        >
            <div className='flex flex-none justify-center w-16 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            </div>
            <div className='flex flex-none w-20 '>
                <IconSelect icon={icon} index={index} updateRow={updateRow}></IconSelect>
            </div>
            <div className='flex flex-none w-48 text-xs text-left items-center'>{isEditName ? <input className='border border-gray-50 shadow-inner px-2 rounded py-1 w-52 h-8' value={localName} onChange={(e) => { setLocalName(e.target.value) }} onKeyDown={(e) => {
                if (e.key === 'Enter') acceptNewName();
                else if (e.key === 'Escape') rejectNewName();
            }} /> : <div className='border border-gray-50 shadow-inner px-2 rounded py-1 w-36 h-8' onClick={() => { setIsEditName(true) }}>{name}</div>}</div>
            <div className='flex-grow text-xs  items-center'>{isEditUrl ? <input className='border border-gray-50 px-2 shadow-inner rounded py-1 w-64 h-8' value={localUrl} onChange={(e) => { setLocalUrl(e.target.value) }} onKeyDown={(e) => {
                if (e.key === 'Enter') acceptNewUrl();
                else if (e.key === 'Escape') rejectNewUrl();
            }} /> : <div className='border border-gray-50 shadow-inner px-2 rounded py-1 w-64 h-8' onClick={() => { setIsEditUrl(true) }}>{url}</div>}</div>
            <div className='flex flex-none pr-3 gap-2'><Switch checked={active} onChange={(e) => { updateRow(index, { id: "active", value: !active }) }}></Switch> <HeroIconOutline title="remove this menuitem." onClick={() => { deleteRow(index) }} icon={'TrashIcon'} className='w-6 h-6 '></HeroIconOutline> </div>
        </div>
    );
}

function MenuItemRow({ item, moveRow, updateRow, deleteRow, index }) {
    const { name, url, active, position, icon } = item;


    const [isEditName, setIsEditName] = useState(false)

    const [localName, setLocalName] = useState(name)

    const acceptNewName = () => {
        updateRow(index, { id: "name", value: localName })
    }

    const rejectNewName = () => {
        setLocalName(name)
        setIsEditName(false)
    }

    const [isEditUrl, setIsEditUrl] = useState(false)

    const [localUrl, setLocalUrl] = useState(url)

    const acceptNewUrl = () => {
        updateRow(index, { id: "url", value: localUrl })
    }

    const rejectNewUrl = () => {
        setLocalUrl(url)
        setIsEditUrl(false)
    }

    return (
        <div className='flex flex-row w-full border p-3 justify-between items-center gap-2'>
            <div className='flex flex-none justify-center w-16 cursor-pointer'>
                <div className='flex flex-col '>
                    <svg title={"Move up"} xmlns="http://www.w3.org/2000/svg" className='hover:text-blue-600' viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" onClick={() => { moveRow(index, index - 1) }}>
                        <path fill-rule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clip-rule="evenodd" />
                    </svg>
                    <svg title={"Move down"} xmlns="http://www.w3.org/2000/svg" className='hover:text-blue-600' viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" onClick={() => { moveRow(index, index + 1) }}>
                        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>


                </div>
            </div>
            <div className='flex flex-none w-20 '>
                <IconSelect icon={icon} index={index} updateRow={updateRow}></IconSelect>
            </div>
            <div className='flex flex-none w-48 text-xs text-left items-center'><input className='border border-gray-50 shadow-inner px-2 rounded py-1 w-52 h-8' value={name} onChange={(e) => { updateRow(index, { id: "name", value: e.target.value }) }} /> </div>
            <div className='flex-grow text-xs  items-center'><input className='border border-gray-50 px-2 shadow-inner rounded py-1 w-64 h-8' value={url} onChange={(e) => { updateRow(index, { id: "url", value: e.target.value }) }} /> </div>
            <div className='flex flex-none pr-3 gap-2'><Switch checked={active} onChange={(e) => { updateRow(index, { id: "active", value: !active }) }}></Switch> <HeroIconOutline title="remove this menuitem." onClick={() => { deleteRow(index) }} icon={'TrashIcon'} className='w-6 h-6 '></HeroIconOutline> </div>
        </div>
    );
}

function DropZone({ dndMenuItemData, count, dispatch }) {
    //grabbing api data and rendering it with `renderDndMenuItemCards`
    const [dndMenuItems, setDndMenuItems] = useState(dndMenuItemData);
    const [initial, setInitial] = useState(true);
    //a memoized function that uses js `immutability-helper` & `splice` to update the
    //order of our rows
    const moveRow = useCallback((dragIndex, hoverIndex) => {
        setInitial(false)
        setDndMenuItems((prevMenuItems) =>
            update(prevMenuItems, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevMenuItems[dragIndex]]
                ]
            })
        );
    }, []);

    const updateRow = useCallback((updateIndex, data) => {
        setInitial(false)
        setDndMenuItems((prevMenuItems) => {

            return prevMenuItems.map((p, i) => {
                if (i == updateIndex) {
                    return { ...p, [data.id]: data.value }
                }
                else return p;

            })

        });
    }, []);

    const deleteRow = useCallback((deleteIndex) => {
        setInitial(false)
        setDndMenuItems((prevMenuItems) => {

            return prevMenuItems.filter((p, i) => {
                return i != deleteIndex
            })

        });
    }, []);

    const renderDndMenuItemCards = () =>
        dndMenuItems.map((dndMenuItem, index) => (
            <Draggable
                index={index}
                key={dndMenuItem.id}
                dndMenuItem={dndMenuItem}
                moveRow={moveRow}
                updateRow={updateRow}
                deleteRow={deleteRow}
            />
        ));

    useEffect(() => {
        if (dndMenuItems && initial == false) {
            dispatch({ type: 'SET', id: 'data', value: dndMenuItems })
        }
    }, [dndMenuItems, initial])


    return (
        <div
            className='w-full border-blue-gray-50'
        >

            {renderDndMenuItemCards()}
        </div>
    );
}

const dndCharacterData = [
    { id: 1, classType: "Barbarian", race: "Dragonborn" },
    { id: 2, classType: "Barbarian", race: "Dwarf" },
    { id: 3, classType: "Fighter", race: "Elf" },
    { id: 4, classType: "Fighter", race: "Gnome" },
    { id: 5, classType: "Monk", race: "Half - elf" },
    { id: 6, classType: "Monk", race: "Half - orc" },
    { id: 7, classType: "Druid", race: "Halfling" },
    { id: 8, classType: "Druid", race: "Tiefling" }
];


const MenuDetail = ({ menu }) => {

    const { updateMenu, loadMenus } = useContext(AppearanceContext)

    const [hasChanged, setHasChanged] = useState(false)
    const [localMenu, dispatch] = useReducer((state, action) => {

        switch (action.type) {
            case 'LOAD':
                setHasChanged(false)
                return { ...state, ...action.value }
            case 'SET':
                setHasChanged(true)
                return { ...state, [action.id]: action.value }

            /* case 'SET_DATA':

                const { data, ...other } = state
                const newState = { ...other, data: { ...data, [action.id]: action.value } }
                return newState;

            case 'UNSET_DATA':
                const { data: oldData, ...otherProperties } = state
                let newData = { ...oldData };
                delete newData[action.id]

                return { ...otherProperties, data: { ...newData } } */

        }

        return state

    }, menu)

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')



    /* 
        const acceptNewName = () => {
    
            dispatch({ type: 'SET', id: 'name', value: name })
    
    
        }
    
        const rejectNewName = () => {
            setName(localMenu.name)
        } */

    const saveChanges = () => {
        if (localMenu && hasChanged) {
            /*  setName(localMenu.name)
             setDesc(localMenu.description) */
            updateMenu(localMenu).then(result => {
                if (result.id) {
                    //setHasChanged(false)
                    loadMenus()
                }
            })
        }
    }

    const xaddMenuItem = () => {
        const nextId = menu.data.length == 0 ? 1 : Math.max(menu.data.map(m => parseInt(m.position))) + 1;
        const newData = { ...localMenu, data: [...menu.data, { name: `MenuItem${Date.now()}`, url: '', active: true, icon: '', position: isNaN(nextId) ? 1 : nextId, }] }


        updateMenu(newData).then(result => {
            if (result.id) {
                //setHasChanged(false)
                loadMenus()
            }
        })

    }


    const addMenuItem = () => {
        const nextId = localMenu.data.length == 0 ? 1 : Math.max(localMenu.data.map(m => parseInt(m.position))) + 1;
        dispatch({ type: 'SET', id: "data", value: [...localMenu.data, { position: isNaN(nextId) ? 1 : nextId, name: `MenuItem${Date.now()}`, url: '', active: true, icon: '' }] })
        setHasChanged(false)


    }

    const revert = () => {
        dispatch({ type: 'SET', id: "data", value: menu.data })
        setHasChanged(false)
    }

    /* 
        const [menuItems, setMenuItems] = useState([])
    
        useEffect(() => {
            if (localMenu) {
                setMenuItems(localMenu.data)
            }
    
        }, [localMenu]) */

    const moveRow = (from, to) => {

        let updated = [...localMenu.data];
        if (to > -1 && to <= localMenu.data.length-1)
            updated = array_move(updated, from, to)

        dispatch({ type: 'SET', id: 'data', value: updated })
    }

    const updateRow = (index, data) => {

        dispatch({
            type: 'SET', id: 'data', value: localMenu.data.map((m, i) => {
                return (index == i) ? { ...m, [data.id]: data.value } : m
            })
        })

    }
    const deleteRow = (index) => {

        let updated = [...localMenu.data];
        updated.splice(index, 1)

        dispatch({ type: 'SET', id: 'data', value: updated })
    }


    return (
        <div className='flex flex-col w-full shadow-sm rounded-md border '>
            <div className='flex flex-row justify-between items-center rounded-sm p-2 bg-gray-50'>
                <div className='flex flex-row justify-start items-center gap-2'>


                    <span className='text-sm'>Menu</span>
                    <h2 className='text-sm font-semibold'>{localMenu.name} ({localMenu.data.length} item(s))</h2>
                </div>
                <div className='flex flex-row gap-2'><Button color='green' size='sm' onClick={() => { addMenuItem() }}>Add Menu Item</Button> {hasChanged && <><Button color='blue-gray' size='sm' onClick={() => { saveChanges() }}>Save Changes</Button> <Button color='blue-gray' size='sm' onClick={() => { revert() }}>Revert</Button></>}</div></div>
            <h3 className='text-sm font-semibold p-3'>{localMenu.description}</h3>
            <div className='flex w-full p-5 flex-col'>
                <div
                    className='flex flex-row w-full border p-3 justify-between'
                >
                    <div className='flex flex-none justify-center w-16 '>&nbsp;
                    </div>
                    <div className='flex flex-none w-20 text-xs text-center items-center font-semibold mx-auto'>Icon</div>
                    <div className='flex flex-none w-48 text-xs text-left items-start font-semibold'>Name</div>
                    <div className='flex-grow text-xs font-semibold'>Url</div>
                    <div className='flex flex-none text-xs font-semibold pr-3'>Active</div>
                </div>
                {/*  <DndProvider backend={HTML5Backend}> 
                    <DropZone dndMenuItemData={localMenu.data} count={localMenu.data} dispatch={dispatch} />
                 </DndProvider> */}
                {localMenu && localMenu.data.map((m, mi) => <MenuItemRow total={localMenu.data.length} item={m} moveRow={moveRow} updateRow={updateRow} deleteRow={deleteRow} index={mi}></MenuItemRow>)
                }

                <div>

                </div>
            </div>
        </div>
    )
}

export default MenuDetail