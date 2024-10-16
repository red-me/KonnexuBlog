import React, { useContext, useImperativeHandle, forwardRef, useCallback, useEffect, useState } from "react";
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon, PaperClipIcon } from '@heroicons/react/24/solid'
import AppThemeContext from '../context/AppThemeContext'

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL

const Dropzone = forwardRef((props, ref) => {
  const {
    className,
    accept = { 'image/*': [] },
    multiple,
    maxSize,
    maxFiles,
    displayType,
    existFiles = [],
  } = props

  const { theme } = useContext(AppThemeContext)
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  useEffect(() => {
    if (existFiles.length) {
      const filearray = []
      existFiles.map(file => filearray.push({ name: file, old: true }))
      setFiles(filearray)
    }
  }, [existFiles])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize: maxSize? maxSize : 1024 * 1000,
    maxFiles: maxFiles? maxFiles : 5,
    onDrop,
    multiple
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  const handleUpload = async () => {
    if (!files?.length) return

    const oldfiles = []
    const newfiles = []

    files.map( item => {
      if (item.old) {
        oldfiles.push(item)
      } else {
        newfiles.push(item)
      }
    })

    const urls = []
    if (newfiles.length) {
      const formData = new FormData()
      newfiles.forEach(file => formData.append('file', file))
      formData.append('multiresults', true)

      const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/file/upload`
      const data = await fetch(URL, {
        method: 'POST',
        body: formData
      }).then(res => res.json())

      if (data?.urls.length) {
        data?.urls.forEach(url => urls.push(`${NEXT_URL}/api/file/download/${url.id}`))
      }
    }

    if(oldfiles.length) {
      oldfiles.forEach(url => urls.push(url.name))
    }
    
    return urls
  };

  useImperativeHandle(ref, () => ({
    triggerFileUpload: handleUpload, // Expose the fetchData method to be called from outside
  }));

  return (
    <div>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        { displayType === 'drag&drop' &&
          <div className='flex flex-col items-center justify-center gap-4'>
            <ArrowUpTrayIcon className='w-5 h-5 fill-black' />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p className='text-center'>Drag & drop files here, or click to select files</p>
            )}
          </div>
        }
        { displayType === 'button' &&
          <div style={theme.data.button_primary.style} className='flex items-center justify-center gap-3 p-4 py-2 rounded-md'>
            <PaperClipIcon className={`w-5 h-5 fill-[${theme.data.button_primary.style.color}]`} />
            <span>
              Attached Files
            </span>
          </div>
        }
      </div>

      {/* Preview */}
      { (files.length > 0 || rejected.length > 0) && 
        <section className='mt-5'>
          {/* Accepted files */}
          {files.length > 0 && (
            // <div>
            //   <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
            //     {files.map(file => (
            //       <li key={file.name} className='relative h-12 rounded-md shadow-lg'>
            //         <Image
            //           src={file.preview}
            //           alt={file.name}
            //           width={100}
            //           height={100}
            //           onLoad={() => {
            //             URL.revokeObjectURL(file.preview)
            //           }}
            //           className='h-full w-full object-contain rounded-md'
            //         />
            //         <div
            //           className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 bg-white'
            //           onClick={() => removeFile(file.name)}
            //         >
            //           <XMarkIcon className='w-5 h-5 fill-black' />
            //         </div>
            //         <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
            //           {file.name}
            //         </p>
            //       </li>
            //     ))}
            //   </ul>
            // </div>
            <div>
              <ul className='mt-3 flex flex-col gap-2'>
                {files.map(file => (
                  <li key={file.name} className='flex items-center gap-3'>
                    <PaperClipIcon className='w-4 h-4 fill-neutral-400'/>
                    <div>
                      <p className='text-neutral-500 text-sm font-medium'>
                        {file.name}
                      </p>
                    </div>
                    <div
                      className='text-xs tracking-wider font-bold text-blue-800 hover:underline'
                      onClick={() => removeFile(file.name)}
                    >
                      Remove
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          

          {/* Rejected Files */}
          {rejected.length > 0 && (
            <div>
              <h3 className='title text-sm font-semibold text-neutral-600 mt-10 border-b pb-3'>
                Rejected Files
              </h3>
              <ul className='mt-4 flex flex-col'>
                {rejected.map(({ file, errors }) => (
                  <li key={file.name} className='flex items-start gap-3'>
                    <div>
                      <p className='text-neutral-500 text-sm font-medium'>
                        {file.name}
                      </p>
                      <ul className='text-[12px] text-red-400'>
                        {errors.map(error => (
                          <li key={error.code}>{error.code === 'too-many-files' ? 'File limit exceeded. Max 5 per upload.' : error.message}</li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className='text-xs tracking-wider font-bold text-blue-800 hover:underline'
                      onClick={() => removeRejected(file.name)}
                    >
                      Remove
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
        </section>
      }
    </div>
  )
})

export default Dropzone
