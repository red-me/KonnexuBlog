import React, { useState } from 'react'
import {
    Card, CardHeader, CardBody, CardFooter,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Typography,
    ButtonGroup,
    IconButton,
} from "@material-tailwind/react"
export default function StatusContentView({ post }) {

    const [isFullHeight, setIsFullHeight] = useState(false)
    const content = post.title.length > post.content.length ? post.title :
        JSON.stringify(post.content)
            .split("\\n")
            .map(s => <p>{s.split('\\').join('')}</p>);
    return (
        <div className={`transition-all duration-500 ease rounded-md p-2 m-4 mt-2 border   shadow-md bg-gradient-to-r from-blue-gray-50 to-gray-300 ${isFullHeight ? 'max-h-96 overflow-y-auto' : 'max-h-16 overflow-y-hidden'}`}>
            <div className="  text-pretty text-sm" onClick={() => { setIsFullHeight((prev) => !prev) }}>{content}</div>
        </div>
    )
}
