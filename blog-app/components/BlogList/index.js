import React from 'react'
import Sidebar from '../Sidebar'
import Listing from '../Listing'
import AddEdit from '../AddEdit';
import ConfirmDialog from '../ConfirmDialog';
import Submenu from '../Submenu';

export default function index(props) {
  const { hostReact, query, path, user, app, router, mutate } = props
  const [posts, setPosts] = hostReact.useState([])
  const [page, setPage] = hostReact.useState('')
  const [isOpen, setIsOpen] = hostReact.useState(false)
  const [postId, setPostId] = hostReact.useState(0)
  const [dialogOpen, setDialogOpen] = hostReact.useState(false);
  // const [isSaving, setIsSaving] = hostReact.useState(false);
  const [postData, setPostData] = hostReact.useState([])
  const [catTitle, setCatTitle] = hostReact.useState('')

  hostReact.useEffect(() => {
    const name = path[1]?.toLowerCase();
    if (name === 'category') {
      const current_cateegory = app?.settings?.categories.filter(c => c.id === parseInt(path[2]))
      setCatTitle(current_cateegory[0]?.name)
    }
    setPage(name)
    fetchdata(name)
  }, [])

  const getDataByIds = (arr, ids) => {
    return arr
      .filter(item => ids.includes(item.id))
      .map(item => ({ id: item.id, title: item.name }));
  };
  const fetchdata = async(name) => {
    try {
      let where = { type: 'blog', deleted: false }
      if (name === 'my') {
        where = {
          authorId: user?.id,
          type: 'blog',
          deleted: false,
        }
      }
      if (name === 'category') {
        where = {
          AND: [
            {
              type: 'blog',
              deleted: false,
            },
            {
              content: {
                array_contains: parseInt(path[2]),
                path: '$.categories'
              }
            }
          ]
        }
      }

      query('post', { where }).then(data => {
        const result = data.map(item => {
          const catarr = getDataByIds(app?.settings?.categories, item?.content?.categories) ;
          return {
            ...item,
            content: {
              ...item.content,
              categories: catarr
            }
          }
        })
        setPosts(result)
      })
    }
    catch (error) {
      alert(error)
    }
  }

  const handleEdit = (e, post) => {
    e.preventDefault();
    setPostData(post?.post)
    // setPostId(post.postId)
    setIsOpen(true)
  }
  const handleDelete = async (e, id) => {
    e.preventDefault();
    setPostId(id)
    setDialogOpen(true)
  }

  const confirmDelete = async (e, obj) => {
    e.preventDefault();
    await mutate('post', 'update', { where: { id: obj?.postId }, data: { deleted: true } }).then(result => {
      if (result && result.length) {
          console.log(result);
      }
    })
    setDialogOpen(false)
    window.location.reload();
  }

  const handleAdd = () => {
    setPostData({})
    setIsOpen(true)
  }
  
  return (
    <>
      <Submenu {...props}></Submenu>
      <div className="mx-auto w-full max-w-screen-xl pt-2.5">
        <div className='w-full flex gap-4 pt-5 py-10'>
          <Sidebar {...props} handleClick={() => handleAdd()}></Sidebar>
          <Listing
            {...props} 
            posts={posts} 
            title={page === 'my' ? 'My Blogs' : page === 'category' ? `Category: ${catTitle}` : 'All Blogs'}
            page={page}
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
        isLoading={false}
        isOpen={dialogOpen}
        handleConfirm={(e, id) => confirmDelete(e, id)}
        handleClose={() => { setDialogOpen(false) }}
      />
    </>
  )
}
