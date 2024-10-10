import * as MTControls from "@material-tailwind/react";
import React from "react";

import PhotoList from "../PhotoList"
import AddPhoto from "../AddPhoto"
import AlbumList from "../AlbumList"
import ViewPhoto from "../ViewPhoto";
import ViewAlbum from "../ViewAlbum";
import Settings from "../Settings";

export const Main = (props) => {
  const { path } = props

  const InnerPage = ({ path }) => {

    if (path == null || path.length === 1) {
      //use default page
      return <PhotoList {...props}></PhotoList>
    }


    //url:/app/name/y/z
    const name = path[1].toLowerCase();
    //if matches app names... todo: get app names from backend
    if (['category', 'all-photos', 'my-photos', 'friends-photos',].indexOf(name) > -1) {
      return <PhotoList {...props}></PhotoList>
    }

    if (['all-albums', 'my-albums','friends-albums'].indexOf(name) > -1) {
      return <AlbumList {...props}></AlbumList>
    }


    //url: user/name/y/z

    if (['share-photo'].indexOf(name) > -1) {
      return <AddPhoto {...props}> </AddPhoto>
    }

    if (['view-album'].indexOf(name) > -1) {
      return <ViewAlbum {...props}> </ViewAlbum>
    }


    if (['view-photo'].indexOf(name) > -1) {
      return <ViewPhoto {...props}> </ViewPhoto>
    }

    if (['settings'].indexOf(name) > -1) {
      return <Settings {...props}> </Settings>
    }


    // lastly, user names

    return <PhotoList {...props}></PhotoList>



    /* return (
        <>
            {slug}
        </>
    ); */
  }




  return (<>
    <InnerPage path={path} ></InnerPage>
  </>
  );
};

export default Main;
