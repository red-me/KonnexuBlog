import React from 'react'
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function AddEdit(props) {
  const { app, visible, hideForm, hostReact, components, theme, useFormik, mutate, user, closeDialog, postData, createId } = props
  const { SelectMultiple, FileUploadComponent } = components
  const [post, setPost] = hostReact.useState({});
  const [isloading, setIsloading] = hostReact.useState(false);
  const [category, setCategory] = hostReact.useState([]);
  const categories = app?.settings?.categories.filter(c => c.active)

  const [fileUrls, setFileUrls] = hostReact.useState([])
  const [isBusy, setIsBusy] = hostReact.useState(false)
  const [uploadPath, setUploadPath] = hostReact.useState('')
  const [uploaderProps, setUploaderProps] = hostReact.useState({ 
    fileUrls,
    setFileUrls,
    isBusy,
    path: uploadPath,
    multiple: false,
    accept: 'image/*',
  })

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  }

  hostReact.useEffect(() => {
    setUploaderProps({ fileUrls, setFileUrls, isBusy, path: uploadPath })
  }, [uploadPath])

  hostReact.useEffect(() => {
    if (!isEmptyObject(postData)) {
      setPost(postData)
      const catArr = []
      postData?.content?.categories?.map(cat => {
        catArr.push(cat.id)
      })
      setCategory(catArr)
      if (postData?.content?.photo && typeof postData?.content?.photo !== 'undefined')
      setFileUrls([postData?.content?.photo?.url])
    }
  }, [postData])
  const convertToSlug = (title) => {
    return title
      .toLowerCase()
      .trim() 
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  
  const handleUpdate = async(data) => {
    const { title, description } = data
    setIsloading(true)
    const slug = convertToSlug(title)
    let photo = {}
    if( fileUrls.length > 0) {
      const newPhotos = fileUrls.map(url => {
        var urlsParts = url.split('/');
        const photoTitle = urlsParts[urlsParts.length - 1];// the filename

        return { id: createId(), url, title: photoTitle, description: '' }
      })
      photo = newPhotos[newPhotos.length - 1]
    }

    if (!isEmptyObject(postData)) {
      const dataObj = {
        type: app.name, content: { slug, categories: category, photo }, title, description,
      }
      await mutate('post', 'update', { where: { id: postData.id }, data: dataObj }).then(result => {
        if (result && result.length) {
            console.log(result);
        }
      })
      setIsloading(false)
      window.location.reload();
      // router.push('/blog/my');
      closeDialog()
    }
    if (isEmptyObject(postData)) {
      const postdata = {
          type: app.name, content: { slug, categories: category, photo }, title, description, published: true,
          author: { connect: { id: user.id } },
      }

      await mutate('post', 'create', { data: postdata }).then(result => {
          if (result && result.id) {
              closeDialog();
          }
          else {
              console.log(JSON.stringify(result))
          }
      })
      setIsloading(false)
      window.location.reload();
      // router.push('/blog/my');
      closeDialog()
    }
  }

  const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Title is required';
    } else if (values.title.length > 255) {
        errors.title = 'Must be 255 characters or less';
    }

    if (!values.description) {
        errors.description = 'Description is required.';
    } else if (values.description.length > 5000) {
        errors.description = 'Must be 5000 characters or less';
    }
    if (!category.length) {
        errors.category = 'Category is required';
    }

    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        id: post?.id || 0,
        title: post?.title || '',
        description: post?.description || '',
    },
    validate,
    onSubmit: values => {
      handleUpdate(values)
    },
  });

  const handleOnChange = (content) => {
    formik.setFieldValue('description', content);
  };

  return (
    <>
      <div id="small-modal-backdrop" tabindex="-1" style={{ zIndex: 10, background: "#333333cc", display: visible ? "block" : "none", opacity: visible ? 1 : 0 }} className="fixed top-0 transition-all delay-1000 left-0 right-0 z-50 items-center justify-center  flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"></div>
      <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", display: hideForm ? 'none' : '', top: visible ? "0%" : "-20%", opacity: visible ? 1 : 0 }} className="fixed transition-all delay-1000  left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full items-center justify-center select-none">
          <form onSubmit={formik.handleSubmit} class="flex flex-col gap-2 pb-10">
            <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                       { !isEmptyObject(postData) ? 'Edit Blog' : 'Add New Blog'}
                    </h1>
                    <button type="button" onClick={() => closeDialog()} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-5 md:p-5 space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md">Title</label>
                        <input type="text" name="title" id="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of the blog" required="" />
                        <span className="text-red-700 text-xs">{formik.errors.title}&nbsp;</span>
                    </div>
                    <div className='mb-4'>
                      <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md">Photo</label>
                      <div className='relative w-52'>
                        { fileUrls.length > 0 &&<div style={{backgroundImage: `url("${fileUrls[fileUrls.length - 1]}")` }} className="absolute z-10 w-full h-full block bg-center bg-no-repeat bg-contain"></div> }
                        <FileUploadComponent dropTitle="Add Photo" addTitle="" formatTitle="" {...uploaderProps} ></FileUploadComponent>
                      </div>
                      { fileUrls.length > 0 &&<label className="block cursor-pointer text-sm hover:underline" style={{ color: `${theme.data.button_primary.style.backgroundColor}` }} htmlFor="fileuploader">Change</label> }
                    </div>
                    
                    <div className='flex flex-col w-full shadow-sm rounded-l-md bg-gray-50'>
                      <label htmlFor="description" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md">Description</label>
                      <EditorToolbar />
                      <ReactQuill
                          name="description"
                          id="description"
                          theme="snow"
                          value={formik.values.description}
                          onChange={handleOnChange}
                          placeholder={"What is this blog about?"}
                          modules={modules}
                          formats={formats}
                          className='h-60'
                      />
                      <span className="text-red-700 text-xs">{formik.errors.description}&nbsp;</span>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md">Categories</label>
                      <SelectMultiple items={categories} idField={"id"} textField={"name"} selectedValue={category} setSelectedValue={setCategory}
                      ></SelectMultiple>
                      <span className="text-red-700 text-xs">{formik.errors.category}&nbsp;</span>
                  </div>
                </div>
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                    <button type="submit" disabled={isloading} style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} >
                      { !isEmptyObject(postData) ? 'Update' : 'Publish'}
                    </button>
                    <button type="button" onClick={() => closeDialog()} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      Cancel
                    </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}