import React, { useEffect, useState } from 'react'
import BasicFileUploadComponent from "../../../BasicFileUploadComponent"
import { Button } from '@material-tailwind/react'
function PictureUploader(props) {

    const { fileUrl, setFileUrl, path } = props

    const [fileUrls, setFileUrls] = useState([])
    const [uploaderProps, setUploaderProps] = useState({
        fileUrls: fileUrls,
        setFileUrls: setFileUrls,
        multiple: false,
        maxFiles: 1,
        multiple: false,
        maxFiles: 1, path: ''
    })


    useEffect(() => {
        if (path && setFileUrl) {
           // setFileUrls([])
            setUploaderProps({
                fileUrls: fileUrls,
                setFileUrls: setFileUrls,
                multiple: false,
                maxFiles: 1,
                path: path
            }
            )
        }
    }, [path, setFileUrl])


    const updatePhoto = () => {
        if (fileUrls.length > 0) {
            setFileUrl(fileUrls[0])
            setFileUrls([])
        }
    }


    return (<div className='flex flex-row  items-center justify-start gap-4'>
        <div className='flex flex-row  items-center gap-2'>
            {fileUrl && fileUrl.length > 0 && <div className='flex w-56 h-56 bg-gray-100 relative'>
                <img className="object-contain object-center max-w-full mx-auto"
                    src={fileUrl}
                    title={'Current Photo'}
                    alt={fileUrl}
                    onClick={() => { }} />

            </div>}
            {fileUrls.map((url, i) => {
                return <div className='flex w-56 h-56 bg-gray-100 relative'>
                    <img className="object-cover object-center max-w-full mx-auto"
                        src={url}
                        title={'New Photo'}
                        alt={url}
                        onClick={() => { }} />
                    <div className='flex items-center justify-center w-8 h-8 absolute top-0 right-0 p-2 '  >
                        <span
                            onClick={(e) => {
                                e.preventDefault();
                                setFileUrls([])
                                return false;
                            }
                            }
                            className='flex-none block text-center rounded-xl w-6 h-6 my-4 font-bold  items-center justify-center text-md cursor-pointer hover:shadow-xl' style={{ backgroundColor: "#333333aa", color: "#ffffff" }}>   &times;</span>
                    </div>

                    <div className='flex w-full flex-row p-2 justify-center items-center absolute  bottom-0'><Button onClick={() => { updatePhoto() }}>Use This Photo</Button></div>
                </div>
            })}
            {fileUrls.length == 0 && <div className='flex w-56 h-56'> <BasicFileUploadComponent {...uploaderProps} ></BasicFileUploadComponent></div>}
        </div>
        
    </div>
    )
}

export default PictureUploader