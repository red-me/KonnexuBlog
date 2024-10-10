import { Typography } from "@material-tailwind/react";
import AppThemeContext from '../../context/AppThemeContext'
import { useContext, useEffect, useState } from "react";

import AppearanceContext from '../../context/admincp/AppearanceContext'
import HeroIconOutline from "../admincp/Common/HeroIconOutline";
import Link from "next/link";


export default function Footer() {
  const { theme } = useContext(AppThemeContext)
  const [footerProps, setFooterProps] = useState({ className: `flex  w-full shadow-xs ` })
  const [footerListItemProps, setFooterListItemProps] = useState({ className: `font-normal text-sm transition-colors hover:text-blue-500 focus:text-blue-500` })

  useEffect(() => {
    if (theme) {
      if (theme.data.footer) {

        setFooterProps({ ...theme.data.footer, className: `flex  w-full shadow-xs ${theme.data.footer.className}` })
      }
      if (theme.data.footer_list_item) {

        setFooterListItemProps({ ...theme.data.footer_list_item, className: `font-normal text-sm transition-colors ${theme.data.footer.footer_list_item}` })
      }
    }


  }, [theme])

  const { menus } = useContext(AppearanceContext)
  const [headerMenu, setHeaderMenu] = useState(null)

  useEffect(() => {
    if (menus && menus.find(m => m.name == "footer")) {
      setHeaderMenu(menus.find(m => m.name == "footer"))
    }
  }, [menus])

  return (
    <footer  {...footerProps}>
      <div className="mx-auto w-full px-4 py-2 lg:px-8 lg:py-2 max-w-screen-xl border-t border-gray-500 border-opacity-50 ">
        <div className="container mx-auto flex items-center justify-between text-black">
          <Typography className="font-normal text-sm">
            &copy; 2024 Konnexu.net
          </Typography>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">

            {headerMenu && headerMenu.data.map(menuItem => {
              return <Typography
                as="li"
                variant="small"

                {...footerListItemProps}
              >
               

                <Link href={menuItem.url} className="flex items-center   ">
                  {menuItem.name}
                </Link>
              </Typography>

            })}
            {/* <li>
              <Typography
                as="a"
                href="#"
                {...footerListItemProps}
              >
                About Us
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"

                {...footerListItemProps}
              >
                License
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"

                {...footerListItemProps}
              >
                Contribute
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"

                {...footerListItemProps}
              >
                Contact Us
              </Typography>
            </li> */}
          </ul></div>
      </div>

    </footer>
  );
}