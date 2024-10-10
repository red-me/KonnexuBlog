"use client";
import React from "react";
import { Button, Card } from "@material-tailwind/react";
import MegaMenu from "../../components/layout/MegaMenu";
import Footer from "../../components/layout/Footer";



const Page = ({ params }) => {


    return (<>
        <div className="h-screen flex flex-col ">
            <header className="flex m-2"><MegaMenu></MegaMenu></header>

            <div className="flex flex-1 justify-center overflow-auto">
                <div className="flex flex-1  max-w-screen-xl">
                    <div className="block w-full p-2">
                        <div className="flex  flex-wrap">

                            <div className="w-full md:w-1/4 bg-gray-400 p-4 text-center text-gray-700">2</div>
                            <div className="w-full md:w-3/4 bg-gray-500 p-4 text-center text-gray-200">1</div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="flex h-5 "><Footer></Footer></footer>
        </div>


    </>)
};
export default Page;