import * as MTControls from "@material-tailwind/react";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import EditPhotoMenu from "../EditPhoto/EditPhotoMenu";
import EditPhotoDialog from "../EditPhoto/EditPhotoDialog";
import ImageWithPreloader from "../ImageWithPreloader";

export const index = (props) => {
  const { user, data, controls, components, path, app, hostReact, router, query, theme } = props

  const ControlsSource = controls || MTControls;
  const { Card, Button,
  } = ControlsSource


  //path must be in app/index/{albumid/{photoid}

  const albumId = parseInt(path[2]);
  const photoId = path[3];



  const [album, setAlbum] = hostReact.useState(null);
  const [photoIndex, setPhotoIndex] = hostReact.useState(0);
  const [photo, setPhoto] = hostReact.useState(null);


  const [title, setTitle] = hostReact.useState('')

  const loadAlbum = () => {
    try {


      var where = {};


      where = { type: app.name, id: albumId }
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

        setAlbum(data[0]);


      })
    }
    catch (error) {
      alert(error)
    }
  }

  hostReact.useEffect(() => {
    loadAlbum()

  }, [])

  hostReact.useEffect(() => {
    if (album) {

      const foundAt = album.content.photos.findIndex(p => { return p.id === photoId });

      if (foundAt > -1) {
        setPhotoIndex(foundAt)
      }
    }
    return () => {
      setPhotoIndex(0)
    }
  }, [album])



  const back = () => {
    if (album) {
      if (photoIndex > 0) setPhotoIndex(p => p - 1);
    }
  }
  const forward = () => {
    try {
      if (album) {
        if (photoIndex < album.content.photos.length - 1) setPhotoIndex(p => p + 1);
      }
    }
    catch (error) {
      alert(JSON.stringify(error))
    }
  }

  hostReact.useEffect(() => {

    if (album && photoIndex > -1) {
      setPhoto(album.content.photos[photoIndex])
    }
    return () => {
      setPhoto(null)
    }
  }, [photoIndex, album])





  const editPhotoClick = (e, data) => {

    const { album, photoId } = data;

    setPhoto(album.content.photos.find(p => p.id === photoId))

    e.preventDefault();

    setIsEditPhoto(true)

    return false;
  }
  const [isEditPhoto, setIsEditPhoto] = hostReact.useState(false)







  const h = { 'All Photos': 'all-photos', 'My Photos': 'my-photos', "All Albums": 'all-albums', "My Albums": 'my-albums', }

  const rh =
    Object.entries(h).reduce((acc, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});


  hostReact.useEffect(() => {
    let t = 'all-photos'
    if (path.length > 1) {
      t = path[1]
    }

    var tt = ''
    if (t === 'category') { tt = "Category: " + path[2] }
    else {
      tt = rh[t];
    }
    setTitle(tt)

  }, [path])


  const handlePhotoClick = (e, id, mode) => {
    e.preventDefault()
    router.push(`/${path[0]}/${mode}/${id}`)

    return false;
  }


  const [isFullScreen, setIsFullScreen] = hostReact.useState(false);


  hostReact.useEffect(() => {
    const handleEsc = (event) => {

      if (event.key === 'Escape') {

        setIsFullScreen(false)
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);


  return (<>
    <div className="block bg-white w-full shadow sticky top-14 z-10 py-2">
      <div className="mx-auto w-full  max-w-screen-xl  flex gap-2 items-center h-8">
        {h && Object.keys(h).map(p => <div className="text-sm text-black cursor-pointer" onClick={() => { router.push(`/${path[0]}/${h[p]}`) }}>{p}</div>)}

      </div>
    </div>
    <div className="mx-auto w-full max-w-screen-xl" style={{ paddingTop: "10px" }}>


      <div className="w-full">

        <div className="flex justify-end p-2 "><button type="button"style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} onClick={() => { router.push(`/${path[0]}/share-photo`) }}> Share Photo</button></div>
        <div class="flex  flex-row gap-4">

          <div class="w-full md:w-full "><Card className="p-0 " >

            {album && <div className="flex flex-col p-2">
              <h1 className="capitalize p-2  font-bold text-xl">{album.title}</h1>
              <div className="flex flex-row justify-between item-start">
                <div className="flex items-start  items-center gap-2 px-2">
                  <div className='flex-none'>
                    {album.author.profile.avatar &&
                      <img className="w-8 h-8 rounded-full border-2 border-spacing-2 dark:border-orange-600   border-orange-600" src={album.author.profile.avatar} alt="avatar" />
                    }
                    {album.author.profile.avatar === null &&
                      <div className="  relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100  rounded-full border-2 dark:bg-gray-100  dark:border-gray-500   border-gray-500">
                        <span className="font-bold  dark:text-gray-300 text-xs">{user.profile.firstName[0]}{album.author.profile.lastName[0]}</span>

                      </div>
                    }
                  </div>
                  <div className="grow  text-sm dark:text-white gap-0 p-0 text-xs flex flex-col  justify-start"> <span className="">By&nbsp;<span className="text-black">{album.author.name || (album.author.profile.firstName + ' ' + album.author.profile.lastName)}</span></span>
                    <span className="">{(new Date(album.createdAt)).toLocaleString()}</span>



                  </div>

                </div>
                <span className="px-4 text-sm"><span className="font-bold">{album.content.photos.length}</span> photo(s)</span>
              </div>
              <div className="gap-2 p-4">
                <p>{album.description}</p>
              </div>
            </div>}
            <div className="flex gap-3 flex-wrap gap-1 p-4 justify-start flex-row items-start">
              <>
                {album && album.content.photos && album.content.photos.map(({ id, url, title, description }) => {
                  return <article className="select-none hover-item group transition-all  relative isolate flex flex-col justify-end overflow-hidden rounded-xs px-0 pb-8 pt-40 max-w-sm  w-64 h-64 bg-gray-400 hover:shadow-xl">
                    <ImageWithPreloader controls={controls} hostReact={hostReact} src={url} alt={title} class="hover-img group-hover:scale-125 transition duration-500  absolute inset-0 h-full w-full object-cover" onClick={(e) => { handlePhotoClick(e, `${album.id}/${id}`, "view-photo") }} />

                    <div className="hover-backdrop absolute w-full h-full inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 " onClick={(e) => { handlePhotoClick(e, `${album.id}/${id}`, "view-photo") }}></div>

                    <div className="z-10 mt-3 text-xl p-2 h-32 transition " >
                      <div className="flex flex-row justify-between gap-1">
                        <p class=" text-md font-semibold text-white min-h-10 max-h-10 truncate  hover-label" title={description}>{title}</p>
                        {album.authorId === user.id &&
                          <EditPhotoMenu {...props} album={album} albumId={album.id} photoId={id} placement={"top-end"} menuItemClassName={"text-white "} editAction={editPhotoClick}></EditPhotoMenu>
                        }
                      </div>


                    </div>
                  </article>
                })}
              </>

            </div>

          </Card></div>
        </div>


      </div>

    </div>
    {photo && isFullScreen && <div style={{ background: "#333333" }} className="z-50  absolute top-0 left-0 w-full h-full"><img src={photo.url} alt={photo.title}
      style={{ cursor: isFullScreen ? "zoom-out" : "zoom-in" }}
      onClick={() => {

        if (isFullScreen) { setIsFullScreen(false) }
      }}
      className={`group-hover:scale-125 transition duration-500  object-contain absolute inset-0 h-full w-auto mx-auto `} />
      <div className="hover-show z-10 mt-3 text-xl p-2 h-0 transition absolute w-full top-0 justify-end flex "  >
        <div className="p-2 w-14 h-14 cursor-pointer rounded-md" style={{ background: "#333333aa", color: "#ffffff" }} onClick={() => setIsFullScreen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
          </svg>

        </div>

      </div>
      <div className="hover-show z-10 mt-3 text-xl p-2 h-0 transition absolute w-full top-1/2" onClick={() => setIsFullScreen(false)}>
        <div className="flex flex-row justify-between gap-1 block text-white ">

          <div className="p-2 w-14 h-14 cursor-pointer rounded-md" style={{ background: "#333333aa" }} >
            {photoIndex > 0 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10" onClick={(e) => { e.stopPropagation(); back() }}>
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>}</div>

          <div className="p-2 w-14 h-14 cursor-pointer rounded-md" style={{ background: "#333333aa" }} >
            {album && photoIndex < album.content.photos.length - 1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10" onClick={(e) => { e.stopPropagation(); forward() }}>
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>}
          </div>



        </div>


      </div>
    </div>}

    {photo && <EditPhotoDialog {...props} visible={isEditPhoto} album={album} updateAlbum={setAlbum} photoId={photo.id} closeDialog={() => { setIsEditPhoto(false) }}></EditPhotoDialog>}
  </>
  );
};

export default index;
