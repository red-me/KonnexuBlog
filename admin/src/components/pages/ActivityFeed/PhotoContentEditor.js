import React, { useEffect, useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { Card, Carousel, Typography } from '@material-tailwind/react';
import FileUploadComponent from "../../FileUploadComponent"
const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const PhotoContentEditor = (props) => {

    const { postContent, setPostContent, isCreatingPost } = props;
    const [imageUrls, setImageUrls] = useState(postContent.photos ? postContent.photos.map(p => p.url) : [])




    useEffect(() => {
        setPostContent(
            {
                album: postContent.album || {
                    title: "",
                    description: "",
                },
                photos: imageUrls.map(url => { return { url, title: '', description: '' } })
            }
        )


    }, [imageUrls])



    return (
        <FileUploadComponent fileUrls={imageUrls} setFileUrls={setImageUrls} isBusy={isCreatingPost}></FileUploadComponent>
    );
};
export default PhotoContentEditor;