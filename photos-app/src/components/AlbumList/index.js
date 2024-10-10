import * as MTControls from "@material-tailwind/react";
import React from "react";
import Sidebar from "../Sidebar";
import CreateAlbum from "../AddPhoto"
import ImageWithPreloader from "../ImageWithPreloader";
export const PhotoList = (props) => {
  const { user, data, controls, components, path, app, hostReact, router, query, theme } = props

  const ControlsSource = controls || MTControls;
  const { Card } = ControlsSource
  const userName = user && user.profile ? (user.profile.firstName + " " + user.profile.lastName) : '';
  const { FileUploadComponent } = components;

  const REACT = hostReact || React
  const [albums, setAlbums] = hostReact.useState([]);

  const [title, setTitle] = hostReact.useState('')

  const loadAlbums = () => {
    try {

      var type = path.length == 1 ? 'all-photos' : path[1];
      var where = { type: 'non-existent' };
      if (type === 'all-albums') {
        where = { type: app.name }
      } else if (type === 'my-albums') {
        where = { authorId: user.id, type: app.name }
      } else if (type === 'friends-albums') {
        where = { authorId: { not: user.id }, type: app.name }
      }

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
        setAlbums(data)
        console.log(data)

      })
    }
    catch (error) {
      alert(error)
    }
  }

  hostReact.useEffect(() => {
    loadAlbums()

  }, [])
  const h = { 'All Photos': 'all-photos', 'My Photos': 'my-photos', "All Albums": 'all-albums', "My Albums": 'my-albums', }

  const rh =
    Object.entries(h).reduce((acc, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});


  hostReact.useEffect(() => {
    let t = 'all-albums'
    if (path && path.length > 0) {
      t = path[1]
    }
    setTitle(rh[t])



  }, [path])


  const navigateToAlbum = (id) => {
    router.push(`/${path[0]}/view-album/${id}`)
  }

  return (<>
    <div className="block bg-white w-full shadow sticky top-14 z-10 py-2">
      <div className="mx-auto w-full  max-w-screen-xl  flex gap-2 items-center h-8">
        {h && Object.keys(h).map(p => <div className="text-sm text-black cursor-pointer" onClick={() => { router.push(`/${path[0]}/${h[p]}`) }}>{p}</div>)}

      </div>
    </div>
    <div className="mx-auto w-full max-w-screen-xl " style={{ paddingTop: "10px" }}>


      <div className="w-full">

        <div className="flex justify-end p-2 "><button type="button" style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} onClick={() => { router.push(`/${path[0]}/share-photo`) }}> Share Photo</button></div>
        <div class="flex  flex-row gap-4">

          <div class="w-full md:w-full "><Card className="p-0">
            <h1 className="capitalize p-4 border-b border-gray-100 bg-gray-50 font-black rounded-t-lg">{title}</h1>

            <div className="flex gap-3 flex-wrap gap-1 p-4 ">
              {albums && albums.map(album => {

                return <>
                  <div className='group flex flex-col p-0  max-w-sm mx-auto w-64 h-96'>
                    <article onClick={() => { navigateToAlbum(album.id) }} style={{ backgroundColor: "#333333" }} class="album-cover shadow-lg cursor-pointer relative flex flex-col isolate justify-end overflow-visible hover:shadow rounded-xs  max-w-sm mx-auto mt-24 w-64 h-64 hover:shadow-xl">
                      {album.content.photos && album.content.photos.length > 0 && (album.content.photos.length > 3 ? album.content.photos.slice(0, 3) : album.content.photos).map((photo, i, a) => {
                        return i === a.length - 1 ? <ImageWithPreloader controls={controls} hostReact={hostReact} src={photo.url} alt={photo.title} class="shadow-sm  group-hover:scale-125 transition duration-500  absolute inset-0 h-full w-full object-cover" />
                          : <img src={photo.url} alt={photo.title} class="shadow-sm  group-hover:scale-125 transition duration-500  absolute inset-0 h-full w-full object-cover" />

                      })


                      }

                      <div className=" z-10 mt-3 text-xl p-2 min-h-32 h-32 flex justify-end gap-2" style={{ zIndex: 101 }}>


                        <div class="text-normal font-bold text-white min-h-10 max-h-10 p-2 rounded flex flex-row gap-2 items-center" style={{ backgroundColor: "#333333aa" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                          </svg><span>{album.content.photos.length}</span></div>
                      </div>


                    </article>
                    <div className=" z-10 mt-3 text-xl p-2 min-h-32 h-32 gap-2 flex flex-col" >
                      <div className="flex flex-row gap-2 justify-between items-center">
                        <p class="text-normal font-normal text-black min-h-10 max-h-10">{album.title}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div class="z-10 gap-y-1 overflow-hidden text-xs leading-6  block h-12"><span className="text-gray-600">Created By</span>&nbsp;<span className="text-black">{album.author.name || (album.author.profile.firstName + ' ' + album.author.profile.lastName)}</span></div>
                    </div>
                  </div>
                  {/*  <div className={`flex-none min-w-56 h-56 w-56 bg-gray-50 border border-gray-300 shadow-sm`}>
                    <div className="min-w-56 ">
                      {album.content.photos && album.content.photos.length > 0 &&
                        <img className={` object-scale-down  w-64 h-64 `} alt={album.content.photos[0].title} src={album.content.photos[0].url} />}
                      <div className={"relative top-0"}>
                        <h5 className="font-semibold ">{album.title}</h5>
                        <p>({album.content.photos ? album.content.photos.length : 0}) Photos</p>
                        <p>{album.description}</p>
                      </div>
                    </div>
                  </div> */}
                </>
              })}
            </div>
          </Card></div>
        </div>


      </div>

    </div>
  </>
  );
};

export default PhotoList;
