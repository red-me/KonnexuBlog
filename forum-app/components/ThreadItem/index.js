import React from 'react'
// import EditMenu from '../AddEdit/EditMenu'

export default function Item(props) {
  const { controls, item, app, path } = props
  const {
    Avatar,
    ListItem,
    ListItemPrefix,
    Typography,
  } = controls

  const name = path[1]?.toLowerCase();

  const formattedDate = (date) =>  {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const getCategory = (catId) => {
    const category = app?.settings?.categories.filter(c => c.id === catId)
    return category[0]?.name
  }

  return (
    <ListItem ripple={false} className="flex flex-col justify-start items-start gap-6 w-full hover:bg-transparent cursor-default border-b border-gray-200 p-6">
      <div className='relative w-full flex items-center gap-4 justify-between '>
        <div className="flex items-center w-full">
          <ListItemPrefix className="flex-none">
            <Avatar variant="circular" alt="candice" src={item?.author?.profile?.avatar} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              {item?.author?.profile?.firstName}
            </Typography>
            <Typography variant="small" color="gray" className="flex items-center gap-3 font-normal">
              {formattedDate(new Date(item?.updatedAt))}
            </Typography>
          </div>
        </div>
        {/* <div className="w-full h-full flex justify-end items-center">
          { name === 'my-threads' && 
            <div className="absolute top-4 right-4 flex gap-3">
              <EditMenu
                {...props}
                editAction={(e, post) => handleEdit(e, post)}
                deleteAction={(e, postId) => handleDelete(e, postId)}
                postId={item?.id}
                post={item}
              />
            </div>
          }
        </div> */}
      </div>
      <div className="w-full text-black">
        <div dangerouslySetInnerHTML={{ __html: item?.content }} />
      </div>
      <ul className='mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
        {item?.meta?.files.map((file, index) => (
          <li key={index} className='relative h-32 rounded-md shadow-sm'>
            <img
              src={file}
              width={100}
              height={100}
              className='h-full w-full object-contain rounded-md'
            />
          </li>
        ))}
      </ul>
    </ListItem>
  );
}