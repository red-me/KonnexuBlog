import * as MTControls from "@material-tailwind/react";
import React from "react";
import Sidebar from "../Sidebar";

export const PhotoList = (props) => {
  const { user, data, controls, path, app } = props
  const ControlsSource = controls || MTControls;
  const { Card } = ControlsSource
  const userName = user.firstName + " " + user.lastName;
  return (<>
    <header className="container bg-deep-orange-200  w-full shadow-xs ">
      <div className="mx-auto flex items-center  text-black">
        {path && path.map(p => <span className="mr-2">{p}</span>)}
      </div>
    </header>

    <div className="flex flex-1 justify-center mt-2">
      <div className="flex flex-1  max-w-screen-xl">
        <div className="block w-full p-2 h-fit overflow-y-hidden">

          <h3>CURRENT: {`${userName}'s Photos`}</h3>
          <div class="flex  flex-wrap">
            <div class="w-full md:w-1/4  p-2"><Sidebar controls={ControlsSource} path={path} categories={app.settings.categories}></Sidebar></div>
            <div class="w-full md:w-3/4  p-2"><Card className="p-4">
              {data.photos.map(photo => <><div><img src={photo}></img></div></>)}</Card></div>
          </div>


        </div>
      </div>
    </div>
  </>
  );
};

export default PhotoList;
