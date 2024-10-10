import React, { useContext, useEffect, useRef, useState } from "react"
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
    Avatar,
    Tooltip,
} from "@material-tailwind/react"

import {
    UserPlusIcon,
    ClockIcon,
    MegaphoneIcon,
    PhotoIcon,
    VideoCameraIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";

import {
    UserPlusIcon as UserPlusIconOutlined,
    ClockIcon as ClockIconOutlined,

} from "@heroicons/react/24/outline";
import AuthContext from "../../../context/AuthContext";
import PostContext from "../../../context/PostContext";
import StatusContentView from "./StatusContentView";
import PhotoContentView from "./PhotoContentView";

import Comments from "./Comments"

import PhotoContentEditor from "./PhotoContentEditor"

/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time) {
    var date = new Date(time || "")
    var diff = (((new Date()).getTime() - date.getTime()) / 1000)

    var day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return time;

    return day_diff == 0 && (
        diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
}

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',

};

export default function ActivityFeed() {
    const { user } = useContext(AuthContext)
    const { activities, isLoading, createPost, isCreatingPost } = useContext(PostContext)
    const [activeTab, setActiveTab] = useState("status");
    const [data, setData] = useState([
        {
            label: "Status",
            value: "status",
            icon: MegaphoneIcon,
            desc: `What's on your mind?`,
        },
        {
            label: "Photo",
            value: "photo",
            icon: PhotoIcon,
            desc: `Say something about this photo...`,
        },
        {
            label: "Video",
            value: "video",
            icon: VideoCameraIcon,
            desc: `Say something about this video`,
        },

    ])
    useEffect(() => {
        if (user) {
            setData([
                {
                    label: "Status",
                    value: "status",
                    icon: MegaphoneIcon,
                    desc: `What's on your mind, ${user.profile.firstName}?`,
                },
                {
                    label: "Photo",
                    value: "photo",
                    icon: PhotoIcon,
                    desc: `Say something about this photo...`,
                },
                {
                    label: "Video",
                    value: "video",
                    icon: VideoCameraIcon,
                    desc: `Say something about this video`,
                },

            ])
        }


    }, [user])
    const [desc, setdesc] = React.useState('')
    React.useEffect(() => {
        setdesc(data.find(d => d.value == activeTab)?.desc || '')


    }, [user, activeTab])

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    }

    const prevIsCreatingPost = usePrevious(isCreatingPost)

    useEffect(() => {
        if (prevIsCreatingPost == true && isCreatingPost == false) {
            //cleart the post input text area
            setPostTitle('')
            setPostContent('')
        }


    }, [isCreatingPost])


    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    const submitPost = () => {

        var data = {
            type: activeTab, content: postContent, authorEmail: user.email, title: postTitle

        }

        if (activeTab == 'status') data["content"] = ""


        createPost(data)
    }

    const SelectContentViewer = ({ post }) => {
        if (post.type == 'status') return <StatusContentView post={post} ></StatusContentView>
        if (post.type == 'photo') return <PhotoContentView post={post} ></PhotoContentView>
        else return <div className="h-72 text-sm text-blue-gray-800 bg-gray-300 items-center justify-center align-middle flex "><span>Content not available.</span></div>
    }

    return (<>

        {user && <div className="flex flex-1 justify-center mt-2">
            <div className="flex flex-1  ">
                <div className="block w-full h-fit overflow-y-hidden">


                    <div className="flex flex-wrap ">
                        <div className="flex w-full md:w-1/3  p-1 justify-end">
                            <div className="flex w-auto flex-col space-y-2 ">
                                <Card className="p-2 rounded-md w-64  ">
                                    <CardHeader floated={false}
                                        shadow={false} className=' m-0 rounded-md rounded-b-none  border-b border-b-gray-100' >
                                        <Typography className="font-bold">
                                            Friends Online
                                        </Typography></CardHeader>
                                    <CardBody>
                                        No friends.

                                    </CardBody> </Card>
                                <Card className="p-2 rounded-md max-w-md ">
                                    Left</Card>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3  p-1" >
                            <Card className="w-full rounded-md">
                                <CardHeader floated={false}
                                    shadow={false} className='bg-gray-100 dark:bg-gray-800 m-0 rounded-md rounded-b-none' >
                                    <Tabs value={activeTab}>
                                        <TabsHeader
                                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0  content-start "
                                            indicatorProps={{
                                                className:
                                                    "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                                            }}
                                        >
                                            {data.map(({ label, value, icon }) => (
                                                <Tab
                                                    key={value}
                                                    value={value}
                                                    onClick={() => setActiveTab(value)}
                                                    className={`${activeTab === value ? "text-blue-500" : "text-gray-700"}  w-50 text-sm`}

                                                >
                                                    <div className="flex items-center gap-2  p-2 font-semibold">
                                                        {React.createElement(icon, { className: "w-4 h-4" })}

                                                        {label}

                                                    </div>
                                                </Tab>
                                            ))}
                                        </TabsHeader>

                                    </Tabs>
                                </CardHeader>
                                <CardBody className="p-0 m-0">
                                    {activeTab == "photo" && <PhotoContentEditor postContent={postContent} setPostContent={setPostContent} isCreatingPost={isCreatingPost} />}

                                    <textarea id="message" rows={activeTab == "status" ? "6" : "2"} className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-none outline-none shadow-sm border-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder={desc}
                                        value={postTitle} // ...force the input's value to match the state variable...
                                        onChange={e => setPostTitle(e.target.value)} // ... and update the state variable on any edits!
                                    ></textarea>

                                </CardBody>


                                <CardFooter className=' p-2 m-0 rounded-md rounded-t-none content-between border-t' >
                                    <div className="flex  flex-wrap">
                                        <div className="w-full md:w-1/2  p-0 justify-start flex ">

                                            <IconButton variant="text" > {React.createElement(UserPlusIconOutlined, { className: "w-4 h-4 text-gray-600" })}</IconButton>
                                            <IconButton variant="text" > {React.createElement(ClockIconOutlined, { className: "w-4 h-4 text-gray-600" })}</IconButton>

                                        </div>

                                        <div className="w-full md:w-1/2  p-0 justify-end flex "><Button loading={isCreatingPost} type="button" onClick={() => submitPost()} className="rounded-sm p-2 bg-blue-500 normal-case">Share</Button></div>


                                    </div>
                                </CardFooter>
                            </Card>
                            {/* feeds */}
                            {isCreatingPost && <Card className="my-5 p-0">
                                <CardHeader floated={false} shadow={false} className='animate-pulse m-0 rounded-md rounded-b-none text-sm px-3 py-3 ' >
                                    <div className="flex items-center gap-4">

                                        <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                        </svg>
                                        <div>
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                    </div>
                                    <span className="sr-only">Loading...</span>


                                </CardHeader>
                                <CardBody className="p-4 bg-blue-gray-100 ">
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </CardBody>
                                <CardFooter className="m-0 p-0">

                                    <Comments user={user}></Comments>
                                </CardFooter>
                            </Card>}
                            {activities && activities.map(a => {
                                const p=a.post;
                                return <Card className="my-5 p-0">
                                    <CardHeader floated={false} shadow={false} className='m-0 rounded-md rounded-b-none text-sm px-3 py-3 ' >
                                        <div className="flex items-center gap-4">
                                            {p.author.profile.avatar &&
                                                <img className="w-12 h-12 rounded-full border-2 border-spacing-2 dark:border-orange-600   border-orange-600" src={p.author.profile.avatar} alt="avatar" />
                                            }
                                            {p.author.profile.avatar === null &&
                                                <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full border-2 dark:bg-gray-100  dark:border-gray-500   border-gray-500">
                                                    <span className="font-bold text-gray-600 dark:text-gray-300">{p.author.profile.firstName[0]}{p.author.profile.lastName[0]}</span>
                                                </div>
                                            }
                                            <div className="font-medium dark:text-white">
                                                <div className="font-bold">{p.author.profile.firstName} {p.author.profile.lastName} <span className="font-medium text-gray-600 dark:text-gray-300">{a.type}.</span></div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">

                                                    <Tooltip className='bg-gray-100 border-gray-900 text-blue-gray-900 shadow-sm rounded-md' content={(new Date(p.updatedAt)).toLocaleDateString('en-US', dateOptions)} placement="bottom">
                                                        <span>{prettyDate(p.updatedAt)}</span>
                                                    </Tooltip>
                                                </div>
                                            </div>

                                        </div>
                                    </CardHeader>
                                    <CardBody className="p-0 bg-blue-gray-100">
                                        <SelectContentViewer post={p} ></SelectContentViewer>
                                    </CardBody>
                                    <CardFooter className="m-0 p-0">
                                        {/* <form>

                                            <div className="w-full border-t border-gray-200 rounded-b-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                    <label for="comment" className="sr-only">Your comment</label>
                                                    <textarea id="comment" rows="2" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required />
                                                </div>
                                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                        Post comment
                                                    </button>
                                                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                                            </svg>
                                                            <span className="sr-only">Attach file</span>
                                                        </button>
                                                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                            </svg>
                                                            <span className="sr-only">Set location</span>
                                                        </button>
                                                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                            </svg>
                                                            <span className="sr-only">Upload image</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form> */}
                                        <Comments user={user}></Comments>
                                    </CardFooter>
                                </Card>
                            })}

                        </div>
                        <div className="w-full md:w-1/3  p-1  s"><Card className="p-2 rounded-md max-w-md">
                            right</Card></div>
                    </div>


                </div >
            </div>
        </div>}
    </>
    )
}