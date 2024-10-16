import React from 'react'
import EditorToolbar, { modules, formats } from "./EditorToolbar"
import { convertToSlug } from '../../utilities/common'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function AddEdit(props) {
  const { app, visible, hostReact, hostReactQuery, components, theme, useFormik, mutate, user, closeDialog, postData, createId } = props
  const { SelectOne, Dropzone } = components
  const [post, setPost] = hostReact.useState({});
  const [category, setCategory] = hostReact.useState(null);
  const [existFiles, setExistFiles] = hostReact.useState([]);
  const categories = app?.settings?.categories.filter(c => c.active)
  const childRef = hostReact.useRef()
  const queryClient = hostReactQuery.useQueryClient()

  const [fileUrls, setFileUrls] = hostReact.useState([])

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  }

  hostReact.useEffect(() => {
    if (!isEmptyObject(postData)) {
      setPost(postData)
      setCategory(postData?.content?.category)
      setExistFiles(postData?.content?.photos)
    }
  }, [postData])
  
  const createThread = async ({ title, description, content }) => {
    const postdata = {
        type: app.name, title, description, content, published: true,
        author: { connect: { id: user.id } },
    }

    const result = await mutate('post', 'create', { data: postdata }).then(res => {
        if (res && res.id) {
            return res
        }
        return JSON.stringify(res)
    })

    return result
  }

  const updateThread = async ({ id, title, description, content }) => {
    const postdata = {
        type: app.name, title, description, content
    }

    const result = await mutate('post', 'update', { where: { id }, data: postdata }).then(res => {
      if (res && res.length) {
          return res
      }
      return JSON.stringify(res)
    })

    return result
  }

  function createThreadMutation() {
    return hostReactQuery.useMutation({
      mutationFn: createThread,
      onSuccess: () => {
        queryClient.invalidateQueries(['threads'])
      }
    })
  }

  function updateThreadMutation() {
    return hostReactQuery.useMutation({
      mutationFn: updateThread,
      onSuccess: () => {
        queryClient.invalidateQueries(['threads'])
      }
    })
  }

  const { mutate: mutateCreateFn, status: createStatus } = createThreadMutation()
  const { mutate: mutateUpdateFn, status: updateStatus } = updateThreadMutation()

  const handleUpdate = async(data) => {
    const { title, description } = data
    const slug = convertToSlug(title)
    const result = await childRef.current.triggerFileUpload();

    if (isEmptyObject(postData)) {
      await mutateCreateFn({ title, description, content: { slug, category, photos: result } })
    }

    if (!isEmptyObject(postData)) {
      await mutateUpdateFn({ id: postData.id, title, description, content: { slug, category, photos: result } })
    }
    closeDialog()
  }

  const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Title is a required field.';
    } else if (values.title.length > 255) {
        errors.title = 'Must be 255 characters or less';
    }

    if (!values.description) {
        errors.content = 'Content is a required field.';
    } else if (values.description.length > 5000) {
        errors.content = 'Must be 5000 characters or less';
    }
    if (!category) {
        errors.category = 'Forum is a required field.';
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
      <div id="small-modal" tabindex="-1" style={{ zIndex: 11, background: "transparent", top: visible ? "0%" : "-20%", opacity: visible ? 1 : 0 }} className="fixed transition-all delay-1000  left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full items-center justify-center select-none">
          <form onSubmit={formik.handleSubmit} class="flex flex-col gap-2 pb-10">
            <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                       { !isEmptyObject(postData) ? 'Edit Thread' : 'Create New Thread'}
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
                      <label className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md">
                        Forum <span className="text-xs text-red-500">*</span>
                      </label>
                      <SelectOne className={"grow"} items={categories} idField={"id"} textField={"name"} contentField={"category"} selectedValue={category} setSelectedValue={setCategory}
                      ></SelectOne>
                      <span className="text-red-700 text-xs">{formik.errors.category}&nbsp;</span>
                  </div>
                  <div className="m-0">
                      <label htmlFor="name" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md">
                        Title <span className="text-xs text-red-500">*</span>
                      </label>
                      <input type="text" name="title" id="title"
                          onChange={formik.handleChange}
                          value={formik.values.title}
                          className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of the thread" required="" />
                      <span className="text-red-700 text-xs">{formik.errors.title}&nbsp;</span>
                  </div>
                  
                  <div className='flex flex-col w-full shadow-sm rounded-l-md m-0'>
                    <label htmlFor="content" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold text-md">
                      Content <span className="text-xs text-red-500">*</span>
                    </label>
                    <EditorToolbar />
                    <ReactQuill
                        name="content"
                        id="content"
                        theme="snow"
                        value={formik.values.description}
                        onChange={handleOnChange}
                        placeholder={"What is this thread about?"}
                        modules={modules}
                        formats={formats}
                        className='h-60'
                    />
                    { formik?.errors?.content && <span className="text-red-700 text-xs">{formik.errors.content}&nbsp;</span> }
                  </div>
                  <div>
                    <Dropzone {...props} multiple={true} maxSize={1024 * 5000} maxFiles={5} displayType="button" existFiles={existFiles} className='w-48 cursor-pointer' ref={childRef}/>
                  </div>
                </div>
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 gap-3">
                    <button type="submit" disabled={createStatus === "pending" || updateStatus === "pending"} style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} `} >
                      { !isEmptyObject(postData) ? `${ updateStatus === "pending" ? '...' : "Update" }` : `${ createStatus === "pending" ? '...' : "Create" }`}
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