import * as MTControls from "@material-tailwind/react";


import React from "react";
import Sidebar from "../Sidebar";
import CreateAlbum from "../AddPhoto"
import EditPhotoMenu from "../EditPhoto/EditPhotoMenu";
import EditPhotoDialog from '../EditPhoto/EditPhotoDialog';
import ImageWithPreloader from "../ImageWithPreloader";
export const PhotoList = (props) => {
  const { user, controls, components, path, app, hostReact, router, query, theme } = props

  const ControlsSource = controls || MTControls;
  const { Card, Spinner } = ControlsSource


  const [albums, setAlbums] = hostReact.useState([]);
  const [filteredAlbums, setFilteredAlbums] = hostReact.useState([]);


  const [title, setTitle] = hostReact.useState('')
  const [search, setSearch] = hostReact.useState('')
  const [isLoading, setIsLoading] = hostReact.useState(false)



  const loadAlbums = () => {
    try {

      if (isLoading) return;
      setIsLoading(true)
      var type = path.length === 1 ? 'all-photos' : path[1];
      var where = {};

      if (type === 'all-photos') {
        where = { type: app.name }
      } else if (type === 'my-photos') {
        where = { authorId: user.id, type: app.name }
      } else if (type === 'friends-photos') {
        where = { authorId: { not: user.id }, type: app.name }
      }
      else if (type === 'category') {

        where = {


          type: app.name
        }
        if (app.settings) {

          const searchCategoryText = path[2]
          const categoryItem = app.settings.categories.find(c => c.name === searchCategoryText)

          const searchCategoryId = categoryItem ? categoryItem.id : ''
          where = {
            ...where,

            content: {
              path: '$.photos[*].categories[*]',
              array_contains: searchCategoryId,
            }
          }
        }
        else {

        }
      }

      // the search keyword.. DO the search on returned results for now..
      /*  if (search.length > 0) {
         if (where.content && where.content.path) {
           const prevWhere = { ...where }
           where = {
             AND: [
               prevWhere
               ,
               {
                 content: {
                   path: '$.photos[*].title',
                   array_contains: search,
                 },
               }
             ]
           }
 
         }
         else {
           where.content = {
             path: '$.photos[*].title',
             array_contains: search,
           }
         }
 
       } */

      query('post', { where }).then(data => {


        var updatedData = data;

        //quirky filters for category based search since backend does not allow yet returning pre-filtered photo list based on category.
        if (type === 'category') {


          // include only photos that has this category

          const categoryItem = app.settings.categories.find(c => c.name === path[2])

          updatedData = updatedData.map(album => {
            const { content, ...restOfAlbum } = album;
            const { photos, ...restOfContent } = content;

            const filteredPhotos = photos.filter(p => {
              return p.categories.findIndex(c => c === categoryItem.id) > -1 && (search.length === 0 ? true : p.title.includes(search))
            })
            content.photos = filteredPhotos;

            return {
              ...restOfAlbum, content: { ...restOfContent, photos: filteredPhotos }
            }
          })


        }

        setAlbums(updatedData)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);


      })
    }
    catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  hostReact.useEffect(() => {
    loadAlbums()

  }, [])

  hostReact.useEffect(() => {
    const getData = setTimeout(() => {
      loadAlbums()
    }, 2000)

    return () => clearTimeout(getData)


  }, [search, albums])


  hostReact.useEffect(() => {

    //let updatedData =
    if (albums) {
      /*  setFilteredAlbums(albums.map(album => {
         const { content, ...restOfAlbum } = album;
         const { photos, ...restOfContent } = content;
 
         const filteredPhotos = photos.filter(p => {
           if (search.length === 0) return true;
 
           return p.title.includes(search)
         })
         content.photos = filteredPhotos;
 
         return {
           ...restOfAlbum, content: { ...restOfContent, photos: filteredPhotos }
         }
       }).filter(m => m.content.photos.length > 0)) */

      setFilteredAlbums(albums)
    }


  }, [albums])





  const editPhotoClick = (e, data) => {

    e.preventDefault();
    setSelectedPhotoId(data.photoId);
    setAlbum(data.album)
    setIsEditPhoto(true)

    return false;
  }
  const [isEditPhoto, setIsEditPhoto] = hostReact.useState(false)


  const [album, setAlbum] = hostReact.useState(null)
  const [selectedPhotoId, setSelectedPhotoId] = hostReact.useState(null)


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
    const url = `/${path[0]}/${mode}/${id}`

    router.push(url)

    return false;
  }

  return (<>
    <div className="block bg-white w-full shadow sticky top-14 z-1 py-2">
      <div className="mx-auto w-full  max-w-screen-xl  flex gap-2 items-center h-8">
        {h && Object.keys(h).map(p => <div className="text-sm text-black cursor-pointer" onClick={() => { router.push(`/${path[0]}/${h[p]}`) }}>{p}</div>)}

      </div>
    </div>
    <div className="mx-auto w-full max-w-screen-xl" style={{ paddingTop: "10px" }}>


      <div className="w-full  ">

        <div className="flex justify-end p-2 "><button type="button" style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} onClick={() => { router.push(`/${path[0]}/share-photo`) }}> Share Photos</button></div>
        <div class="flex  flex-row gap-4">
          <div class="w-full md:w-1/4  "><Sidebar {...props}></Sidebar></div>
          <div class="w-full md:w-3/4 "><Card className="p-0 ">
            <h1 className="capitalize  border-b border-gray-100 bg-gray-50 font-black rounded-t-lg flex flex-row justify-between items-center gap-4 pr-4">
              <input className="block p-4 outline-none bg-transparent rounded-t-lg" placeHolder={'Find a photo by name...'} onChange={(e) => setSearch(e.target.value.trim())} />
              {isLoading ? <Spinner></Spinner> :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>}
            </h1>
            <h1 className="capitalize p-4  font-black ">{title}</h1>
            <div className="flex gap-3 flex-wrap gap-1 p-4 justify-start">
              {filteredAlbums && filteredAlbums.map(album => {

                return <>
                  {album.content.photos && album.content.photos.map(({ id, url, title, description }) => {
                    return <article className="select-none hover-item group transition-all  relative isolate flex flex-col justify-end overflow-hidden rounded-xs px-0 pb-8 pt-40 max-w-sm  w-64 h-64 bg-gray-400 hover:shadow-xl">
                      <ImageWithPreloader controls={controls} hostReact={hostReact} src={url} alt={title} class="hover-img group-hover:scale-125 transition duration-500  absolute inset-0 h-full w-full object-cover" onClick={(e) => { handlePhotoClick(e, `${album.id}/${id}`, "view-photo") }} />

                      <div className="hover-backdrop absolute w-full h-full inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 " onClick={(e) => { handlePhotoClick(e, `${album.id}/${id}`, "view-photo") }}></div>

                      <div className="z-10 mt-3 text-xl p-2 h-32 transition " >
                        <div className="flex flex-row justify-between gap-1">
                          <p class=" text-normal font-semibold text-white min-h-10 max-h-10 truncate  hover-label" title={description}>{title}</p>
                          {album.authorId === user.id &&
                            <EditPhotoMenu {...props} album={album} albumId={album.id} photoId={id} placement={"top-end"} menuItemClassName={"text-white "} editAction={editPhotoClick}></EditPhotoMenu>
                          }
                        </div>


                      </div>
                    </article>
                  })}

                </>
              })}
            </div>
          </Card></div>
        </div>


      </div>

    </div>
    {album && <EditPhotoDialog {...props} visible={isEditPhoto} album={album} photoId={selectedPhotoId} closeDialog={() => { setIsEditPhoto(false) }}></EditPhotoDialog>}
  </>
  );
};

export default PhotoList;
