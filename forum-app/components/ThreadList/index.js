import React from 'react'
import EditorToolbar, { modules, formats } from "../AddEdit/EditorToolbar"
import ThreadItem from '../ThreadItem'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const PAGE_SIZE = 10
export default function ThreadList(props) {
  const { controls, components, hostReact, hostReactQuery, useFormik, theme, path, user, mutate, query, count } = props
  const { Card, CardBody, List } = controls
  const { Dropzone } = components
  const [post, setPost] = hostReact.useState({});
  const childRef = hostReact.useRef()
  const queryClient = hostReactQuery.useQueryClient()
  const [page, setPage] = hostReact.useState(1)
  const targetDivRef = hostReact.useRef(null);

  hostReact.useEffect(() => {
    setPost(
      { id: parseInt(path[2]) }
    )
  }, []);

  const fetchTotalThread = async(postId) => {
    try {
      const response = await count('reply', { where: { postId } })
      if (response.error) {
        return [{'error': response.error}];
      }
      return response;
    }
    catch (error) {
      return [{'error': error.message}];
    }
  }
  const fetchdata = async(page) => {
    const limit = PAGE_SIZE
    const skip = (page - 1) * limit
  
    try {
      const where = {
        postId: parseInt(path[2]),
        published: true,
      }
      const include = {
        author: {
            select: {
                password: false,
                email: false,
                profile: true,
            }
        }
      }
      const orderBy = { updatedAt: 'desc' }

      const response = await query('reply', { where, include, orderBy, skip, take: limit })

      if (response.error) {
        return [{'error': response.error}];
      }
      return response;
    }
    catch (error) {
      return [{'error': error.message}];
    }
  }

  const { data: totalthread, status: totalthreadstatus }= hostReactQuery.useQuery({
    queryFn: () => fetchTotalThread(parseInt(path[2])),
    queryKey: ['replies'],
  })

  function getReplyQueryOptions(page) {
    return {
      queryKey: ['replythreads', { page }],
      queryFn: () => fetchdata(page),
      staleTime: 1 * 1000
    }
  }
  function useReply(page) {
    hostReact.useEffect(() => {
      queryClient.prefetchQuery(getReplyQueryOptions(page + 1))
    }, [page, queryClient])

    return hostReactQuery.useQuery({
      ...getReplyQueryOptions(page),
      placeholderData: (previousData) => previousData
    })
  }
 
  const { data: datalist, status: liststatus, isPlaceholderData }= useReply(page)

  const validate = values => {
    const errors = {};
    if (!values.description) {
        errors.content = 'Content is a required field.';
    } else if (values.description.length > 5000) {
        errors.content = 'Must be 5000 characters or less';
    }
    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        id: post?.id || 0,
        description: post?.description || '',
    },
    validate,
    onSubmit: values => {
      handleUpdate(values)
    },
  });

  const replyThread = async ({ id, content, meta }) => {
    const postdata = {
        content, meta,
        author: { connect: { id: user.id } },
        post: { connect: { id } },
    }

    const result = await mutate('reply', 'create', { data: postdata }).then(res => {
        if (res && res.id) {
            return res
        }
        return JSON.stringify(res)
    })

    return result
  }

  function replyThreadMutation() {
    return hostReactQuery.useMutation({
      mutationFn: replyThread,
      onSuccess: () => {
        queryClient.invalidateQueries(['replies'])
      }
    })
  }

  const { mutate: mutateReplyFn, status: replyStatus } = replyThreadMutation()

  const handleUpdate = async(data) => {
    const result = await childRef.current.triggerFileUpload();
    await mutateReplyFn({ id: data.id, content: data.description, meta: { files: result } })
    formik.setFieldValue('description', '');
    await childRef.current.triggerRemoveAll();
    scrollToDiv();
  }

  const handleOnChange = (content) => {
    formik.setFieldValue('description', content);
  };

  const scrollToDiv = () => {
    // This will scroll to the div element
    targetDivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (liststatus === 'pending') {
    return <div>...</div>
  }

  if (liststatus === 'error') {
    return <div>We were unable to retrieve the thread</div>
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <Card className="my-6 w-full p-0">
        <CardBody ref={targetDivRef} style={{ opacity: isPlaceholderData ? 0.5 : 1 }} className="p-0">
          { totalthreadstatus === 'success' && totalthread > PAGE_SIZE &&
            <div className='flex items-center justify-end gap-4 p-4'>
              <button
                style={{
                  backgroundColor: page === 1 ? 'lightgray' : theme.data.button_primary.style.backgroundColor,
                  color: page === 1 ? 'white' : theme.data.button_primary.style.color,
                }}
                className='px-4 py-1 rounded-md'
                onClick={() => setPage((p) => p - 1)}
                disabled={isPlaceholderData || page === 1}
              >
                Previous
              </button>
              <span>Page {page}</span>
              <button
                className='px-4 py-1 rounded-md'
                style={{
                  backgroundColor: isPlaceholderData || datalist?.length < PAGE_SIZE ? 'lightgray' : theme.data.button_primary.style.backgroundColor,
                  color: isPlaceholderData || datalist?.length < PAGE_SIZE ? 'white' : theme.data.button_primary.style.color,
                }}
                disabled={isPlaceholderData || datalist?.length < PAGE_SIZE}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          }
          { datalist.length > 0 &&
            <List className="w-full p-0">
              { datalist?.map((item, index) => {
                return (
                  <div key={index}>
                    <ThreadItem
                      {...props}
                      item={item}
                      handleEdit={(e, post) => handleEdit(e, post)}
                      handleDelete={(e, postId) => handleDelete(e, postId)}
                    />
                  </div>
                )
              })}
            </List>
          }
          <form onSubmit={formik.handleSubmit} class="flex flex-col gap-2 p-6">
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
                  placeholder={"Write your reply"}
                  modules={modules}
                  formats={formats}
                  className='h-60'
              />
              { formik?.errors?.content && <span className="text-red-700 text-xs">{formik.errors.content}</span> }
            </div>
            <div className="py-3">
              <Dropzone {...props} multiple={true} maxSize={1024 * 5000} maxFiles={5} displayType="button" className='w-44 cursor-pointer text-sm' ref={childRef}/>
            </div>
            <div class="flex items-center pt-4 md:pt-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="submit" style={theme.data.button_primary.style} className={`${theme.data.button_primary.className} capitalize`} >
                { replyStatus === 'pending' ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}