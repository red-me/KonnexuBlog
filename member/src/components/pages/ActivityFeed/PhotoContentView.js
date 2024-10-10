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
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
} from "@material-tailwind/react"
import { Carousel } from "@material-tailwind/react";


export default function PhotoContentView({ post }) {

    const [isFullHeight, setIsFullHeight] = useState(false)

    const [photoIndex, setPhotoIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleOpen = () => {

        setOpen((cur) => !cur);
    }
    const handleIsFavorite = () => setIsFavorite((cur) => !cur);


    const photos = post.content.photos || []

    const photosShort = photos.length > 5 ? photos.slice(0, 5) : photos;

    return (<>

        <div className='p-4 bg-gray-100 dark:bg-gray-900'>
            <Typography
                variant="small"
                color="blue-gray"
                className="font-medium pb-3"
            >
                {post.title}
            </Typography>

            {photosShort.length == 1 && <div className="grid ">
                {photosShort.map((photo, index) => {

                    const { url, title, description } = photo
                    return <div>
                        <img className="object-cover object-center w-full h-80 max-w-full rounded-lg"
                            src={url}
                            title={title}
                            alt={description}
                            onClick={() => { setPhotoIndex(index); handleOpen() }} />
                    </div>


                })}</div>
            }

            {photosShort.length == 2 && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                {photosShort.map((photo, index) => {

                    const { url, title, description } = photo
                    return <div>
                        <img className="object-cover object-center w-full h-80 max-w-full rounded-lg"
                            src={url}
                            title={title}
                            alt={description}
                            onClick={() => { setPhotoIndex(index); handleOpen() }} />
                    </div>


                })}</div>
            }

            {photosShort.length == 3 && <><div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-1 ">
                    <div>
                        <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                            src={photosShort[0].url}
                            title={photosShort[0].title}
                            alt={photosShort[0].description}
                            onClick={() => { setPhotoIndex(0); handleOpen() }} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 grid-">
                    <div className="grid grid-cols-1  ">
                        <div>
                            <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                src={photosShort[1].url}
                                title={photosShort[1].title}
                                alt={photosShort[1].description}
                                onClick={() => { setPhotoIndex(0); handleOpen() }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 ">
                        <div>
                            <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                src={photosShort[2].url}
                                title={photosShort[2].title}
                                alt={photosShort[2].description}
                                onClick={() => { setPhotoIndex(0); handleOpen() }} />
                        </div>
                    </div>
                </div>
            </div>
            </>
            }
            {photosShort.length == 4 && <><div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                            src={photosShort[0].url}
                            title={photosShort[0].title}
                            alt={photosShort[0].description}
                            onClick={() => { setPhotoIndex(0); handleOpen() }} />
                    </div>
                    <div>
                        <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                            src={photosShort[1].url}
                            title={photosShort[1].title}
                            alt={photosShort[1].description}
                            onClick={() => { setPhotoIndex(1); handleOpen() }} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 grid-">
                    <div className="grid grid-cols-1  ">
                        <div>
                            <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                src={photosShort[2].url}
                                title={photosShort[2].title}
                                alt={photosShort[2].description}
                                onClick={() => { setPhotoIndex(2); handleOpen() }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 ">
                        <div>
                            <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                src={photosShort[3].url}
                                title={photosShort[3].title}
                                alt={photosShort[3].description}
                                onClick={() => { setPhotoIndex(3); handleOpen() }} />
                        </div>
                    </div>
                </div>
            </div>
            </>
            }


            {photosShort.length > 4 && <><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {photosShort.map((photo, index) => {

                    const { url, title, description } = photo
                    return <div>
                        <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                            src={url}
                            title={title}
                            alt={description}
                            onClick={() => { setPhotoIndex(index); handleOpen() }} />
                    </div>

                })}
                {photos.length > 5 && <div
                    onClick={() => { setPhotoIndex(photosShort.length + 1); handleOpen() }}
                > <div className="w-full h-full  relative ">
                        <img src={photos[5].url} alt="" className="object-cover object-center w-full h-40 max-w-full rounded-lg" />
                        <div className="absolute bottom-0 right-0  h-40 px-4 py-3 bg-gray-500/80 w-full rounded-lg">
                            <h1 className="text-white font-semibold text-4xl absolute bottom-1/3 right-1/3 ">  +{photos.length - photosShort.length}</h1>

                        </div>
                    </div></div>}

            </div>
            </>

            }







            {/* <Carousel className='h-72'>
            {photos.map((url, index) => {
                return <img src={url} className="h-full w-full object-scale-down" onClick={() => { setPhotoIndex(index); handleOpen() }} alt="..." />

            })}

        </Carousel> */}
            < Dialog open={open} size='xxl' handler={handleOpen} className='bg-blue-gray-100' >
                {/*   <DialogHeader className="justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt={post.author.profile.firstName}
                            src={post.author.profile.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
                        />
                        <div className="-mt-px flex flex-col">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                {post.author.profile.firstName} {post.author.profile.lastName}
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="text-xs font-normal"
                            >
                                {post.author.email}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconButton
                            variant="text"
                            size="sm"
                            color={isFavorite ? "red" : "blue-gray"}
                            onClick={handleIsFavorite}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        </IconButton>
                        <Button color="gray" size="sm">
                            Free Download
                        </Button>
                    </div>
                </DialogHeader> */}
                <DialogBody DialogBody >
                    <div className='w-full h-[calc(100vh-204px)] '>
                        <Carousel
                            prevArrow={({ handlePrev }) => (
                                <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    size="lg"
                                    onClick={handlePrev}
                                    className="!absolute top-2/4 left-4 -translate-y-2/4 "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-6 w-6 "
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                        />
                                    </svg>
                                </IconButton>
                            )}
                            nextArrow={({ handleNext }) => (
                                <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    size="lg"
                                    onClick={handleNext}
                                    className="!absolute top-2/4 !right-4 -translate-y-2/4 shadow-sm"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </IconButton>
                            )}
                        >
                            {photos.map((photo, index) => {
                                const { url, title, description } = photo
                                return <>
                                    {/*  <img src={url} className="w-full h-full object-contain " title={title} alt={description} /> */}
                                    <div className="w-full h-full  relative">
                                        <img src={url} alt="" className='w-full h-full object-contain' />
                                        {(title.length > 0 || description.length > 0) && <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full">
                                            <h1 className="text-white font-semibold text-4xl">  {title}</h1>
                                            <p className="text-gray-200">
                                                {description}
                                            </p>
                                        </div>}
                                    </div>
                                </>

                            })}

                        </Carousel>
                    </div>
                </DialogBody >
                <DialogFooter className="justify-between">
                    <div className="flex items-center gap-16">
                        <div>
                            <Typography variant="small" color="gray" className="font-normal">
                                Views
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                44,082,044
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray" className="font-normal">
                                Downloads
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                553,031
                            </Typography>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="blue-gray"
                        className="mr-5 flex items-center"
                    >
                        Share
                    </Button>
                </DialogFooter>
            </Dialog >
        </div >
    </>)
}
