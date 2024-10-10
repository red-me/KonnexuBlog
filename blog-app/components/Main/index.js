import React from "react";

import BlogList from "../BlogList"
import Details from "../Details"

export const Main = (props) => {
  const { path } = props
  const InnerPage = ({ path }) => {

    if (path == null || path.length === 1) {
      //use default page
      return <BlogList {...props}></BlogList>
    }


    //url:/app/name/y/z
    const name = path[1]?.toLowerCase();
    //if matches app names... todo: get app names from backend
    if (['my','category'].indexOf(name) > -1) {
      return <BlogList {...props}></BlogList>
    }

    if (typeof path[1] !== 'undefined' && typeof path[2] !== 'undefined') {
      return <Details {...props}></Details>
    }

    return <BlogList {...props}></BlogList>
  }

  return (<>
    <InnerPage path={path} ></InnerPage>
  </>
  );
};

export default Main;
