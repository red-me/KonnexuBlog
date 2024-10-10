import React, { useEffect, useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { Card, Carousel, Typography } from '@material-tailwind/react';

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const FileUploadComponent = (props) => {

    const { fileUrls, setFileUrls, isBusy } = props;



    useEffect(() => {

        if (isBusy == true)
            setFileUrls([])

    }, [isBusy])

    const fileParams = ({ meta }) => {
        return { url: `${NEXT_URL}/api/upload` }
    }
    const onFileChange = ({ meta, file, xhr }, status) => {
        console.log(status, meta, file)

        if (status == 'done') {
            const url = `${NEXT_URL}/api/download/${JSON.parse(xhr.response).url}`;
            console.log(url);
            setFileUrls(prev => [...prev, url]);
        }
    }
    const onSubmit = (files, allFiles) => {
        // allFiles.forEach(f => f.remove())
        console.log(allFiles)
    }
    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }
    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Another' : 'Click to upload'
        return (
            <label className="font-semibold">{textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                /></label>

        )
    }

    const DropAndDragAreaComponent = (props) => {
        return (
            <></>
        )
    }

    const layoutComponent = (props) => {
        const {
            input,
            previews,
            submitButton,
            dropzoneProps,
            files,
            extra: { maxFiles },
        } = props

        return (
            <div {...dropzoneProps} className='flex shadow-sm min-h-56 p-4'>
                <div className="flex items-center justify-center w-full">
                    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">

                            {fileUrls.length == 0 && <>
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"> {files.length < maxFiles && input} or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </>}
                            <div className='flex'>
                                {fileUrls.length == 1 && <div className="h-56 "><img src={fileUrls[0].url} className="h-full w-full object-fill" /></div>}
                                {fileUrls.length > 1 && <Carousel >
                                    {fileUrls.map((url, index) => {
                                        return <div className="h-56 "><img src={url} className="h-full w-full object-scale-down" /></div>

                                    })}
                                </Carousel>}


                                {fileUrls.length > 0 && <div className="h-56 p-15  mr-4">
                                    <Typography
                                        variant="small"
                                        color="black"
                                        className="font-normal   p-4 m-10 mt-16"
                                    >   {files.length < maxFiles && input} </Typography>
                                </div>}
                                {/*  {previews} */}
                                {/* 
            {files.length < maxFiles && input}
      
            {files.length > 0 && submitButton} */}
                            </div>
                        </div>

                    </label>
                </div>

            </div>
        )
    }

    const formatBytes = (b) => {
        const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        let l = 0
        let n = b

        while (n >= 1024) {
            n /= 1024
            l += 1
        }

        return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)}${units[l]}`
    }

    const formatDuration = (seconds) => {
        const date = new Date(0)
        date.setSeconds(seconds)
        const dateString = date.toISOString().slice(11, 19)
        if (seconds < 3600) return dateString.slice(3)
        return dateString
    }

    const previewComponent = (props) => {

        const {
            className,
            imageClassName,
            style,
            imageStyle,
            fileWithMeta: { cancel, remove, restart },
            meta: { name = '', percent = 0, size = 0, previewUrl, status, duration, validationError },
            isUpload,
            canCancel,
            canRemove,
            canRestart,
            extra: { minSizeBytes },
        } = props

        let title = `${name || '?'}, ${formatBytes(size)}`
        if (duration) title = `${title}, ${formatDuration(duration)}`

        if (status === 'error_file_size' || status === 'error_validation') {
            return (
                <div className={className} style={style}>
                    <span className="dzu-previewFileNameError">{title}</span>
                    {status === 'error_file_size' && <span>{size < minSizeBytes ? 'File too small' : 'File too big'}</span>}
                    {status === 'error_validation' && <span>{String(validationError)}</span>}
                    {canRemove && <span className="dzu-previewButton" style={iconByFn.remove} onClick={remove} />}
                </div>
            )
        }

        if (status === 'error_upload_params' || status === 'exception_upload' || status === 'error_upload') {
            title = `${title} (upload failed)`
        }
        if (status === 'aborted') title = `${title} (cancelled)`

        return (
            <div className={className} style={style}>
                {previewUrl && <img className="w-25 h-25" src={previewUrl} alt={title} title={title} />}
                {!previewUrl && <span className="dzu-previewFileName">{title}</span>}

                <div className="dzu-previewStatusContainer">
                    {isUpload && (
                        <progress max={100} value={status === 'done' || status === 'headers_received' ? 100 : percent} />
                    )}

                    {status === 'uploading' && canCancel && (
                        <span className="dzu-previewButton" onClick={cancel} />
                    )}
                    {status !== 'preparing' && status !== 'getting_upload_params' && status !== 'uploading' && canRemove && (
                        <span className="dzu-previewButton" onClick={remove} />
                    )}
                    {['error_upload_params', 'exception_upload', 'error_upload', 'aborted', 'ready'].includes(status) &&
                        canRestart && <span className="dzu-previewButton" onClick={restart} />}
                </div>
            </div>
        )

    }





    return (
        <Dropzone
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}

            accept="image/*,audio/*,video/*"
            maxFiles={20}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: "100%", height: "100%", "overflow": "hidden" },
                dropzoneActive: { borderColor: 'green' },
            }}
            LayoutComponent={layoutComponent}
            PreviewComponent={isBusy ? null : previewComponent}
        />
    );
};
export default FileUploadComponent;