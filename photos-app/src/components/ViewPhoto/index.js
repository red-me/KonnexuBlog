import * as MTControls from "@material-tailwind/react";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import EditPhotoMenu from "../EditPhoto/EditPhotoMenu";
import EditPhotoDialog from "../EditPhoto/EditPhotoDialog";

async function getImageBlob(url) {
  const resp = await fetch(url);
  return resp.ok ? resp.blob() : Promise.reject(resp.status);
}

const getSize = (bytes) => {
  if (bytes === 0) {
    return "0.00 B";
  }

  let e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, e)).toFixed(2) +
    ' ' + ' KMGTP'.charAt(e) + 'B';
}
export const ViewPhoto = (props) => {
  const { user, data, controls, components, path, app, hostReact, router, query, theme } = props

  const ControlsSource = controls || MTControls;
  const { Card, Button,
  } = ControlsSource


  //path must be in app/viewphoto/{albumid/{photoid}

  const albumId = parseInt(path[2]);
  const photoId = path[3];



  const [album, setAlbum] = hostReact.useState(null);
  const [photoIndex, setPhotoIndex] = hostReact.useState(0);
  const [photoCategories, setPhotoCategories] = hostReact.useState('');
  const [photo, setPhoto] = hostReact.useState(null);
  const [photoDimensions, setPhotoDimensions] = hostReact.useState([0, 0]);
  const [photoFileSize, setPhotoFileSize] = hostReact.useState('');



  const [title, setTitle] = hostReact.useState('')

  const loadAlbum = () => {
    try {


      var where = {};
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

      where = { type: app.name, id: albumId }


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


  hostReact.useEffect(() => {

    if (photo) {


      // alert(JSON.stringify(app.settings.categories))





      /*  getImageBlob(photo.url).then(imgBlob => {
         createImageBitmap(imgBlob).then(bmp => {
           const { width, height } = bmp;
           bmp.close(); // free memory
           setPhotoDimensions([width, height]);
           alert(width + " x " + height)
         })
       }) */
      (async () => {
        const imgBlob = await getImageBlob(photo.url);
        setPhotoFileSize(getSize(imgBlob.size));
        const bmp = await createImageBitmap(imgBlob);
        const { width, height } = bmp;
        bmp.close(); // free memory
        setPhotoDimensions([width, height]);
      })();
    }

  }, [photo])

  hostReact.useEffect(() => {
    if (app && photo) {
      const cats = app.settings.categories.filter(cat => {

        return cat.active === true && photo.categories.includes(cat.id);
        //return photo.categories.find(c => { return c === cat.id && cat.active === true }) > -1
      }).map(cat => cat.name).join(', ')

      setPhotoCategories(cats)
    }
  }, [photo, app])





  const editPhotoClick = (e, data) => {

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
    alert(mode + "/" + id)

    return false;
  }


  const [isFullScreen, setIsFullScreen] = hostReact.useState(false);
  const [lastScrollTop, setLastScrollTop] = hostReact.useState(0);



  hostReact.useEffect(() => {

    if (isFullScreen === true) {
      setLastScrollTop(window.scrollY)
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';

    }
    else {

      if (isFullScreen === false) {
        document.body.style.overflow = 'unset';
        window.scrollTo(0, lastScrollTop);
      }
    }

    return () => {
      if (isFullScreen === false) {
        document.body.style.overflow = 'unset';
      }
    }

  }, [isFullScreen])

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

        <div className="flex justify-end p-2 "><button type="button" style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} onClick={() => { router.push(`/${path[0]}/share-photo`) }}> Share Photo</button></div>
        <div class="flex  flex-row gap-4">

          <div class="w-full md:w-full "><Card className="p-0 " >

            <div className="flex gap-3 flex-wrap gap-1 p-4 justify-start flex-col">
              <><article style={{ minHeight: '60vh', background: "#333333" }} className="select-none bg-gray-900 w-full h-full hover-item  group transition-all  relative isolate flex flex-col justify-end overflow-hidden rounded-xs px-0 pb-8 pt-40 max-w-sm mx-auto w-full min-h-64 min-w-64 max-h-[calc(100vh-2rem)] bg-gray-400 hover:shadow-xl">

                {/* {album && album.content.photos.map((photo, index) => <img src={photo.url} alt={photo.title}

                  onClick={() => {

                    setIsFullScreen(p => !p)
                  }}
                  className={`${index === photoIndex ? 'show' : ''} group-hover:scale-125 transition duration-500  object-contain absolute inset-0 h-full w-auto mx-auto `} />
                )
                } */}

                {photo && <img src={photo.url} alt={photo.title}
                  style={{ cursor: isFullScreen ? "zoom-out" : "zoom-in" }}
                  onClick={() => {

                    if (!isFullScreen) { setIsFullScreen(true) }
                  }}
                  className={`group-hover:scale-125 transition duration-500  object-contain absolute inset-0 h-full w-auto mx-auto `} />}

                <div className="hover-show z-10 mt-3 text-xl p-2 h-72 transition absolute w-full top-1/2 flex flex-col justify-between" onClick={() => { if (!isFullScreen) { setIsFullScreen(true) } }}>
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

                  <div className="flex flex-nowrap flex-row justify-center items-center w-full h-16 gap-2 mb-4">
                    {album && album.content.photos.map((p, pi) => {
                      return <div className={`w-16 h-16 cursor-pointer`} onClick={(e) => { e.stopPropagation(); e.preventDefault(); if (pi !== photoIndex) { setPhotoIndex(pi) } }
                      }><img src={p.url} alt={p.title} className={`p-1 h-full w-full object-fit ${photoIndex === pi ? 'bg-blue-400' : 'bg-gray-50'}`} /></div>
                    })}

                  </div>


                </div>
              </article>
              </>

            </div>

            {photo && <div className="flex flex-col gap-2 justify-start border-t border-gray-50">
              <div className="flex flex-row justify-between gap-4 px-2 items-center select-none">
                <h1 className="capitalize p-2  font-semibold">{photo.title}</h1>

                <div className="flex flex-row gap-2 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => { setIsFullScreen(p => true) }}>
                    <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                  </svg>
                  {album.authorId === user.id && photo &&
                    <EditPhotoMenu {...props} album={album} albumId={album.id} photoId={photo.id} placement={"top-end"} menuItemClassName={"text-black"} editAction={editPhotoClick}></EditPhotoMenu>
                  }
                </div></div>
              <div className="flex capitalize px-4 gap-4 pb-10 " >
                <div className="flex flex-row justify-between item-start">
                  <div className="flex items-start  items-center gap-2 px-2">
                    <div className='flex-none'>
                      {album.author.profile.avatar &&
                        <img className="w-8 h-8 rounded-full border-2 border-spacing-2 dark:border-orange-600   border-orange-600" src={album.author.profile.avatar} alt="avatar" />
                      }
                      {album.author.profile.avatar === null &&
                        <div className="  relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100  rounded-full border-2 dark:bg-gray-100  dark:border-gray-500   border-gray-500">
                          <span className="font-bold  dark:text-gray-300 text-xs">{album.author.profile.firstName[0]}{album.author.profile.lastName[0]}</span>

                        </div>
                      }
                    </div>
                    <div className="grow  text-sm dark:text-white gap-0 p-0 text-xs flex flex-col  justify-start">
                      <span className="">By&nbsp;<span className="text-black">{album.author.name || (album.author.profile.firstName + ' ' + album.author.profile.lastName)}</span> on <span className="">{(new Date(album.createdAt)).toDateString()}</span></span>

                      <span>Views: </span>


                    </div>

                  </div>

                </div>

              </div>
              <div className="flex flex-col justify-between item-start text-xs p-4">
                <div className="">In Album: <span className="text-black">{album.title}</span></div>
                <div className="">Categories: <span className="text-black">{photoCategories}</span></div>
                <div className="">Dimension: <span className="text-black">{photoDimensions.join('x')}</span></div>
                <div className="">File Size: <span className="text-black">{photoFileSize}</span></div>


              </div>

            </div>}
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

    {photo && <EditPhotoDialog {...props} visible={isEditPhoto} album={album} updatePhoto={setPhoto} photoId={photo.id} closeDialog={() => { setIsEditPhoto(false) }}></EditPhotoDialog>}
  </>
  );
};

export default ViewPhoto;
