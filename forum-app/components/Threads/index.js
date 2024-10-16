import React from 'react'
import Sidebar from '../Sidebar'
import Listing from '../Listing'
import Submenu from '../Submenu'
import AddEdit from '../AddEdit'
import ConfirmDialog from '../ConfirmDialog'

export default function index(props) {
  const { hostReact, hostReactQuery, mutate } = props
  const [postData, setPostData] = hostReact.useState({})
  const [isOpen, setIsOpen] = hostReact.useState(false)
  const [dialogOpen, setDialogOpen] = hostReact.useState(false);
  const [postId, setPostId] = hostReact.useState(0)
  const queryClient = hostReactQuery.useQueryClient()
  const handleAdd = () => {
    setPostData({})
    setIsOpen(true)
  }

  const handleEdit = (e, post) => {
    e.preventDefault();
    setPostData(post?.post)
    setIsOpen(true)
  }
  const handleDelete = async (e, id) => {
    e.preventDefault();
    setPostId(id)
    setDialogOpen(true)
  }

  const deleteThread = async ({ id }) => {
    const result = await mutate('post', 'update', { where: { id }, data: { deleted: true } }).then(res => {
      if (res && res.length) {
          return res
      }
      return JSON.stringify(res)
    })

    return result
  }
  
  function deleteThreadMutation() {
    return hostReactQuery.useMutation({
      mutationFn: deleteThread,
      onSuccess: () => {
        queryClient.invalidateQueries(['threads'])
      }
    })
  }

  const { mutate: mutateDeleteFn, status } = deleteThreadMutation()
  const confirmDelete = async (e, obj) => {
    e.preventDefault();

    await mutateDeleteFn({ id: obj?.postId } )
    setDialogOpen(false)
  }

  return (
    <>
      <Submenu {...props}></Submenu>
      <div className="mx-auto w-full max-w-screen-xl pt-2.5">
        <div className='w-full flex gap-4 pt-5 py-10'>
          <Sidebar {...props} handleClick={() => handleAdd()}></Sidebar>
          <Listing
            {...props}
            handleEdit={(e, post) => handleEdit(e, post)}
            handleDelete={(e, id) => handleDelete(e, id)}
          ></Listing>
        </div>
      </div>
      { isOpen &&
        <AddEdit
          {...props}
          visible={isOpen}
          hideForm={false}
          postData={postData}
          closeDialog={() => { setIsOpen(false) }}
        />
      }
      <ConfirmDialog
        {...props}
        postId={postId}
        isLoading={status === 'pending'? true : false}
        isOpen={dialogOpen}
        handleConfirm={(e, id) => confirmDelete(e, id)}
        handleClose={() => { setDialogOpen(false) }}
      />
    </>
  )
}
