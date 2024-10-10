'use client'
import React from "react";
import dynamic from 'next/dynamic'
import { injectScript } from '@module-federation/utilities';
import { importRemote } from "module-federation-import-remote";
/**
 * 
 * @param {string} moduleName module name of the container. example: Accounting
 * @param {string} componentName name of the component to use. example: Ledger
 * @param {string} url url where this container is served: ex: http://localhost:3023
 * @returns 
 */
async function loadRemoteModule(containerName, componentName, url) {
    try {
        return injectScript({
            url: `${url}/remoteEntry.js`,
            global: containerName
        })
            .then((container) => {
                return container.get(`./${componentName}`).then((factory) => {
                    return factory();
                });
            });

        /*  const container = await importRemote({ url: `${url}`, scope: containerName, module: componentName })
         const component = container[`${componentName}`]
         return component;
      */

    } catch (error) {
        console.error('Failed to load remote module:', error);
        return null;
    }
}

export default function DynamicApp() {

    const [DynamicComponent, setDynamicComponent] = React.useState(() => <>None</>)

    React.useEffect(() => {
        // window is accessible here.
        console.log("window.innerHeight", window.innerHeight);
        const fetchComponent = async () => {
            const dynamicComponent = await loadRemoteModule('HELLO', 'HelloWorld', `http://localhost:3023/apps/hello`);
            // if you wanted to use it server side/client side in next.js 
            setDynamicComponent(dynamic(() => dynamicComponent))

            /*  const ProductsList = React.lazy(() => importRemote({ url: "http://localhost:3023/apps/hello", scope: 'HELLO', module: 'HelloWorld' }));
            setDynamicComponent(ProductsList)  */
        }

        // call the function
        /*   fetchComponent()
          // make sure to catch any error
          .catch(console.error); */



    }, []);



    //const ProductsList = React.lazy(() => importRemote({ url: "http://localhost:3023/apps/hello", scope: 'HELLO', module: 'HelloWorld' }));
    const DynamicApp = dynamic(() => importRemote({ url: "http://localhost:3023/apps/hello", scope: 'HELLO', module: 'HelloWorld' }), { ssr: false })
    return (
        <React.Suspense fallback={<div>Loading App...</div>}>
            {/*  <DynamicComponent  /> */}
            <DynamicApp message={'This is the message'} > </DynamicApp>
        </React.Suspense>
    )

}


