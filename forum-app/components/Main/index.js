import React from "react";
import Threads from '../Threads'
import Details from '../Details'

export const Main = (props) => {
  const { hostReactQuery, path } = props
  const { QueryClient, QueryClientProvider } = hostReactQuery

  const queryClient = new QueryClient()
  const InnerPage = ({ path }) => {

    if (path == null || path.length === 1) {
      //use default page
      return <Threads {...props}></Threads>
    }


    //url:/app/name/y/z
    const name = path[1]?.toLowerCase();
    //if matches app names... todo: get app names from backend
    if (['my-threads'].indexOf(name) > -1) {
      return <Threads {...props}></Threads>
    }

    if (['thread'].indexOf(name) > -1) {
      return <Details {...props}></Details>
    }

    if (typeof path[1] !== 'undefined' && typeof path[2] !== 'undefined') {
      return <Threads {...props}></Threads>
    }

    return <Threads {...props}></Threads>
  }

  return (<>
    <QueryClientProvider client={queryClient}>
      <InnerPage path={path} ></InnerPage>
    </QueryClientProvider>
  </>
  );
};

export default Main;
