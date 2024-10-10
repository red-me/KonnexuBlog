import React, { useState } from 'react'

const EditPhotoDialog = (props) => {

    const { user, album, photoId, controls, components, path, app, hostReact, router, query, mutate, useFormik, closeDialog, updatePhoto, updateAlbum, theme } = props

    const categories = app?.settings?.categories.filter(c => c.active)

    const { SelectMultiple, SelectOne, Toastify } = props.components
    const { Bounce, ToastContainer, toast } = Toastify;

    const [albums, setAlbums] = hostReact.useState([]);
    const [albumId, setAlbumId] = hostReact.useState(null);

    const [photo, setPhoto] = hostReact.useState({});


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




    const validate = values => {
        const errors = {};


        if (!values.title) {
            errors.title = 'Title is required';
        } else if (values.title.length > 255) {
            errors.title = 'Must be 255 characters or less';
        }


        /*   if (!values.description) {
              errors.description = 'Description is required.';
          } else if (values.description.length > 5000) {
              errors.description = 'Must be 5000 characters or less';
          }
   */

        return errors;
    };
    const handleUpdate = async ({ title, description }) => {

        var content = album.content;
        var albumPhotos = content.photos




        if (album.id === albumId) {
            //update existing photo
            albumPhotos = albumPhotos.map(p => {
                if (p.id && p.id === photo.id) {
                    return { ...p, title, description, categories: category }
                } else return p
            })

        }
        else {
            //remove from current album, since it will be moved to another album
            albumPhotos = albumPhotos.filter(p => p.id !== photo.id)
        }
        // we are re-using content because we might have other properties besides 'photos' that need to be added to the update as well.
        content.photos = albumPhotos

        //main/source album: change photo details or remove photo from album when moving to different album
        mutate('post', 'update', { where: { id: album.id }, data: { content } }).then(updatedAlbum => {
            if (updatedAlbum && updatedAlbum.id) {
                if (album.id === albumId) {
                    const currentPhoto = updatedAlbum.content.photos.find(p => p.id === photoId)
                    setPhoto(currentPhoto)
                    if (updatePhoto) updatePhoto(currentPhoto)
                    if (updateAlbum) {

                        var where = { type: app.name, id: album.id }
                        var include = {
                            author: {

                                select: {
                                    name: true,
                                    password: false,
                                    email: true,
                                    profile: true,
                                }
                            }
                        };

                        query('post', { where, include }).then(data => {

                            updateAlbum(data[0]);


                        })

                    }

                    toast.success('Photo updated successfully.', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }

                //moving only possible if phot was removed already from original album
                if (album.id !== albumId) {
                    //if also moving, add photo data to target album
                    query('post', { where: { id: albumId, type: app.name } }).then(targetAlbum => {

                        if (targetAlbum && targetAlbum.length === 1) {
                            var tContent = targetAlbum[0].content;

                            tContent.photos = [...tContent.photos, { ...photo, title, description, categories: category }];
                            mutate('post', 'update', { where: { id: targetAlbum[0].id }, data: { content: tContent } }).then(updatedTargetAlbum => {
                                if (updatedTargetAlbum && updatedTargetAlbum.id) {

                                    //reload album list
                                    toast.success(`Photo moved and updated successfully to album "${updatedTargetAlbum.title}".`, {
                                        position: "bottom-center",
                                        autoClose: 5000,
                                        hideProgressBar: true,
                                        closeOnClick: false,
                                        pauseOnHover: false,
                                        draggable: false,
                                        progress: undefined,
                                        theme: "light",
                                        transition: Bounce,
                                    });

                                    //loadAlbums()
                                    //closeDialog();
                                }
                                else {
                                    toast.error('Sorry, could not update photo details.', {
                                        position: "bottom-center",
                                        autoClose: 5000,
                                        hideProgressBar: true,
                                        closeOnClick: false,
                                        pauseOnHover: false,
                                        draggable: false,
                                        progress: undefined,
                                        closeButton: undefined,
                                        theme: "light",
                                        transition: Bounce,
                                    });
                                }
                            })

                        }
                    })
                }


                //loadAlbums()
                //closeDialog();
            }
            else {
                toast.error('Sorry, could not update the photo details.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    closeButton: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        })






    }

    //const [isBusy, setIsBusy] = hostReact.useState(false)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            albumId: album?.id || 0,
            title: photo?.title || '',
            description: photo?.description || '',

            /*   userId: user.id */
        },
        validate,
        onSubmit: values => {
            handleUpdate(values)
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



    hostReact.useEffect(() => {

        if (album) {
            setPhoto(album.content.photos.find(p => p.id === photoId))
        }

    }, [photoId])

    const [category, setCategory] = hostReact.useState([])
    hostReact.useEffect(() => {

        setCategory(photo.categories)

        return () => {

        }

    }, [photo])

    hostReact.useEffect(() => {
        loadAlbums()
    }, [])


    hostReact.useEffect(() => {
        if (album) setAlbumId(album.id)

    }, [album])











    return <>
        {<>
            <div id="small-modal-backdrop" tabindex="-1" style={{ zIndex: 10, background: "#333333cc", display: visible ? "block" : "none", opacity: visible ? 1 : 0 }} className={` fixed top-0 transition-all delay-1000 left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}></div>
            <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", display: hideForm ? 'none' : '', top: visible ? "0%" : "-20%", opacity: visible ? 1 : 0 }} className={` fixed transition-all delay-1000  left-0 right-0 z-50 items-center justify-center  flex  h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div class="relative w-full max-w-md max-h-full items-center justify-center select-none">
                    <form onSubmit={formik.handleSubmit} class="flex flex-col  gap-2">
                        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                                    Editing Photo
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
                                    <label htmlFor="album" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Album {album.id !== albumId && <span className="font-normal ">&nbsp;(photo will be moved to this Album)</span>} </label>
                                    <SelectOne items={albums} idField={"id"} textField={"title"} descriptionField={"description"} selectedValue={albumId} setSelectedValue={setAlbumId}
                                    ></SelectOne>
                                </div>

                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Title</label>
                                    <input type="text" name="title" id="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of the photo" required="" />
                                    <span className="text-red-700 text-xs">{formik.errors.title}&nbsp;</span>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Description</label>
                                    <textarea rows={5} name="description" id="description"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is this photo about?" required="" />
                                    <span className="text-red-700 text-xs">{formik.errors.description}&nbsp;</span>
                                </div>
                                <div >
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold text-md">Categories</label>
                                    <SelectMultiple items={categories} idField={"id"} textField={"name"} selectedValue={category} setSelectedValue={setCategory}
                                    ></SelectMultiple>
                                </div>

                            </div>
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                                <button type="submit" style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} >Save</button>
                                <button type="button" onClick={() => closeDialog()} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
        }

    </>
}

export default EditPhotoDialog