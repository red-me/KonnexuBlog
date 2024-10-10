
import React from 'react'

export default function index(props) {

    const { user, data, controls, components, path, app, hostReact, router, query, mutate, useFormik, createId, theme } = props




    const [showCreateAlbumDialog, setShowCreateAlbumDialog] = hostReact.useState(false);
    const openDialog = () => {

        setShowCreateAlbumDialog(true);
    }
    const closeDialog = () => {

        setShowCreateAlbumDialog(false);
    }




    const CreateAlbumDialog = (props) => {



        const validate = values => {
            const errors = {};


            if (!values.title) {
                errors.title = 'Name is required';
            }


            if (!values.description) {
                errors.description = 'Description is required.';
            } else if (values.description.length > 5000) {
                errors.description = 'Must be 5000 characters or less';
            }


            return errors;
        };
        const handleSaveNewAlbum = async ({ title, description }) => {
            //  alert(`name: ${name} \n decription: \n ${description}`)

            //FYI: an ALbum is a Post!!!!  
            var initialAlbumData = {
                type: app.name, content: { photos: [] }, title: title, description,
                author: { connect: { id: user.id } },

            }


            mutate('post', 'create', { data: initialAlbumData }).then(newAlbum => {
                if (newAlbum && newAlbum.id) {
                    //reload album list
                    // alert(JSON.stringify(newAlbum))
                    loadAlbums()
                    closeDialog();
                }
                else {
                    alert(JSON.stringify(newAlbum))
                }
            })
        }

        //const [isBusy, setIsBusy] = hostReact.useState(false)
        const formik = useFormik({
            initialValues: {
                title: '',
                description: '',
                userId: user.id
            },
            validate,
            onSubmit: values => {
                handleSaveNewAlbum(values)
            },

        });


        const { visible } = props

        const [hideForm, setHideForm] = hostReact.useState(true)


        hostReact.useEffect(() => {

            if (visible === true) {
                document.body.style.overflow = 'hidden';
                setHideForm(false)
            }
            else {
                setTimeout(() => {
                    setHideForm(true)
                }, 1000);

                if (visible === false) {
                    document.body.style.overflow = 'unset';
                }
            }

            return () => {
                if (visible === false) {
                    document.body.style.overflow = 'unset';
                }
            }

        }, [visible])

        return <>

            <>
                <div id="small-modal-backdrop" tabindex="-1" style={{ zIndex: 10, background: "#333333cc", display: visible ? "block" : "none", opacity: visible ? 1 : 0 }} className={` fixed top-0 transition-all delay-100 left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}></div>
                <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", display: hideForm ? 'none' : '', top: visible ? "0%" : "-100%", opacity: visible ? 1 : 0 }} className={` fixed transition-all delay-1000  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div class="relative w-full max-w-md max-h-full items-center justify-center">
                        <form onSubmit={formik.handleSubmit} class="flex flex-col  gap-2">
                            <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                                        Create a New Photo Album
                                    </h1>
                                    <button type="button" onClick={() => closeDialog()} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div class="p-5 md:p-5 space-y-4">


                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Name</label>
                                        <input type="text" name="title" id="title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name your album" required="" />
                                        <span className="text-red-700 text-xs">{formik.errors.title}&nbsp;</span>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Description</label>
                                        <textarea rows={5} name="description" id="description"
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is this album about?" required="" />
                                        <span className="text-red-700 text-xs">{formik.errors.description}&nbsp;</span>
                                    </div>



                                </div>
                                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                                    <button type="submit" style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `}>Save</button>
                                    <button type="button" onClick={() => closeDialog()} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>


        </>
    }

    //fileUrls, setFileUrls, isBusy, path

    const categories = app?.settings?.categories.filter(c => c.active)



    const [fileUrls, setFileUrls] = hostReact.useState([])
    const [isBusy, setIsBusy] = hostReact.useState(false)
    const [uploadPath, setUploadPath] = hostReact.useState('')


    const { FileUploadComponent, SelectOne, SelectMultiple } = components
    const { Button } = controls

    const [uploaderProps, setUploaderProps] = hostReact.useState({ fileUrls, setFileUrls, isBusy, path: uploadPath })
    // const uploaderProps = { fileUrls, setFileUrls, isBusy, path: uploadPath }
    const [albums, setAlbums] = hostReact.useState([]);
    const [category, setCategory] = hostReact.useState([]);
    const [albumId, setAlbumId] = hostReact.useState(0);
    const [photos, setPhotos] = hostReact.useState([]);

    const [title, setTitle] = hostReact.useState('');
    const [description, setDescription] = hostReact.useState('');

    const [canSave, setCanSave] = hostReact.useState(false)


    const loadAlbums = () => {
        try {

            query('post', { where: { authorId: user.id, type: app.name } }).then(data => {
                setAlbums(data)
                console.log(data)

            })
        }
        catch (error) {
            alert(error)
        }
    }


    const validate = () => {
        // basic input validation
        const isValid = fileUrls.length > 0 && albumId > 0 && category.length > 0;
        setCanSave(isValid)
    }

    // This is actually an update to the selected album a.k.a post
    const savePhotos = () => {
        if (canSave) {


            const newPhotos = fileUrls.map(url => {
                var urlsParts = url.split('/');
                const photoTitle = urlsParts[urlsParts.length - 1];// the filename

                return { id: createId(), url, title: photoTitle, description: '', categories: category }


            })


            const oldPhotos = photos;

            const combinedPhotos = [...oldPhotos, ...newPhotos]



            mutate('post', 'update', { where: { id: albumId }, data: { content: { photos: combinedPhotos } } }).then(updatedAlbum => {
                if (updatedAlbum.id) {

                    setTimeout(() => {
                        router.push(`/${path[0]}`)

                    }, 1000)

                }
                else {
                    alert('failed to share photos.')
                }
            })
        }
    }

    hostReact.useEffect(() => {
        validate()


    }, [fileUrls, category, albumId])



    const removePhotoByIndex = (index) => {
        if (photos) {
            var p = [...photos]
            p.splice(index, 1);
            setPhotos(p)
        }


    }



    const removeFileByIndex = (index) => {
        if (fileUrls) {
            var p = [...fileUrls]
            p.splice(index, 1);
            setFileUrls(p)
        }


    }

    hostReact.useEffect(() => {
        if (albumId && albumId > 0) {
            //alert(JSON.stringify(albumId))

            /* const photoUrls = albums.find(a => a.id === albumId).content.photos.map(p => { return p.url; })
            setFileUrls(photoUrls) */

            setPhotos(albums.find(a => a.id === albumId).content.photos)
        }
    }, [albumId])







    hostReact.useEffect(() => {
        loadAlbums()
        validate()

        setUploadPath(`${app.name}/${user.id}/${albumId}`)



    }, [albumId, user])

    hostReact.useEffect(() => {
        setUploaderProps({ fileUrls, setFileUrls, isBusy, path: uploadPath })
    }, [uploadPath])


    return (<>
       <div className="mx-auto w-full max-w-screen-xl" style={{ paddingTop: "10px" }}>
            <div className='w-full h-full shadow-md bg-white rounded p-0 mt-4'>
                <div className='flex justify-between items-center  bg-gray-50 p-4 border-b border-gray-700 rounded-t '>
                    <h1 className='text-xl capitalize font-black rounded-t'>Share Photos</h1>
                    <Button style={theme.data.button_primary.style} className={`${theme.data.button_primary.className}`} onClick={() => { router.push(`/${path[0]}`) }}>Close</Button>

                </div>

                <div className='flex flex-wrap gap-2 p-4 border-b border-gray-700 '>
                    {photos && photos.map(({ url, title, description }, i) => {
                        return <div className='flex w-56 h-56 bg-gray-100 relative'>
                            <img className="object-cover object-center max-w-full "
                                src={url}
                                title={title}
                                alt={title}
                            />
                            <div className='flex items-center justify-center w-8 h-8 absolute top-2 right-2  p-2 '  >
                                <span className='hover:bg-white hover:text:black flex-none block text-center rounded-xl text-white w-6 h-6  font-bold items-center justify-center text-md cursor-pointer hover:shadow-xl' style={{ backgroundColor: "#333333aa" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removePhotoByIndex(i);
                                        return false;
                                    }
                                    } >   &times;</span>
                            </div>
                        </div>
                    })}
                    {fileUrls.map((url, i) => {
                        return <div className='flex w-56 h-56 bg-gray-100 relative'>
                            <img className="object-cover object-center max-w-full "
                                src={url}
                                title={url}
                                alt={url}
                                onClick={() => { }} />
                            <div className='flex items-center justify-center w-8 h-8 absolute top-0 right-0 p-2 '  >
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFileByIndex(i);
                                        return false;
                                    }
                                    }
                                    className='flex-none block text-center rounded-xl w-6 h-6 my-4 font-bold  items-center justify-center text-md cursor-pointer hover:shadow-xl' style={{ backgroundColor: "#333333aa", color: "#ffffff" }}>   &times;</span>
                            </div>
                        </div>
                    })}
                    <div className={`${photos.length > 0 || fileUrls.length ? 'flex w-56 h-56' : 'w-full'}`}>
                        <FileUploadComponent {...uploaderProps} ></FileUploadComponent>
                    </div>
                </div>


                {/*  <div className='flex flex-col gap-2 p-4 border-b border-gray-700 '>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Title</label>
                    <input type="text" name="title" id="title"
                        onChange={(e) => { setTitle(e.target.value) }}
                        value={title}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of the photo" required="" />
                    
                </div>
                <div className='flex flex-col gap-2 p-4 border-b border-gray-700 '>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Description</label>
                    <textarea rows={5} name="description" id="description"
                        onChange={(e) => { setDescription(e.target.value) }}
                        value={description}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is this photo about?" required="" />
                    
                </div> */}


                <div className='flex flex-col gap-2 p-4 border-b border-gray-700 '>
                    <h6 className='font-semibold text-md'>Photo Album</h6>
                    <div className="flex  gap-2 items-center">
                        <div className={"grow"}>
                            <SelectOne items={albums} idField={"id"} textField={"title"} descriptionField={"description"} selectedValue={albumId} setSelectedValue={setAlbumId}
                            ></SelectOne>
                        </div>
                        <div className={"flex-none"}>
                            <Button style={theme.data.button_primary.style} className={`${theme.data.button_primary.className}`}  onClick={() => { setShowCreateAlbumDialog(true) }}>Create New Album</Button>
                        </div>
                    </div>


                </div>
                <div className='flex flex-col gap-2 p-4 border-b border-gray-700 '>
                    <h6 className='font-semibold text-md'>Photo(s) Category</h6>


                    <div className="flex  gap-2 items-center">
                        <div className={"grow"}>

                            <SelectMultiple items={categories} idField={"id"} textField={"name"} selectedValue={category} setSelectedValue={setCategory}
                            ></SelectMultiple>

                        </div>

                    </div>


                </div>
                <div className='flex flex-col gap-2 p-4 border-b border-gray-700 '>



                    <div className="flex  gap-2 items-center ">

                      
                        <Button loading={isBusy}  style={theme.data.button_primary.style} className={`${canSave ? theme.data.button_primary.className : 'bg-gray-300'}`} onClick={() => { savePhotos() }}>Share</Button>



                    </div>


                </div>


            </div>
        </div>
        <CreateAlbumDialog visible={showCreateAlbumDialog} handleOpen={closeDialog}></CreateAlbumDialog>
    </>)
}
