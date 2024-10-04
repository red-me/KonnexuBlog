import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import DottedMore from '@/assets/icons/dotted-more.svg';
export default function MenuBtn() {
  return (
    <Menu placement="bottom-start">
          <MenuHandler>
            <IconButton className="mr-3 mt-1 shadow-none hover:shadow-none rounded-1" size="sm" color='white'>
              <DottedMore className="w-4 h-4"/>
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
  )
}