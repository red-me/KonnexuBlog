import React from 'react'
import EditMenu from '../AddEdit/EditMenu'
import { convertToSlug } from '../../utilities/common'

export default function Item(props) {
  const { controls, item, app, handleEdit, handleDelete, path, router, theme } = props
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

  const getSlug = (id) => {
    const name = getCategory(id)
    return convertToSlug(name)
  }

  return (
    <ListItem ripple={false} className="relative flex items-center gap-4 justify-between w-full hover:bg-transparent cursor-default border-b border-gray-200">
      <div className="flex items-center w-full">
        <ListItemPrefix className="flex-none">
          <Avatar variant="circular" alt="candice" src={item?.author?.profile?.avatar} />
        </ListItemPrefix>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            style={{ color: theme.data.button_primary.style.backgroundColor }}
            className="cursor-pointer hover:underline"
            onClick={() => { router.push(`/forum/thread/${item?.id}/${item?.content?.slug}`) }}
          >
            {item?.title}
          </Typography>
          <Typography variant="small" color="gray" className="flex items-center gap-3 font-normal">
            <span>{item?.author?.profile?.firstName}</span>
            <span className="font-bold text-lg">·</span>
            <span>{formattedDate(new Date(item?.updatedAt))}</span>
            <span className="font-bold text-lg">·</span>
            <button
              style={{ color: theme.data.button_primary.style.backgroundColor }}
              className="cursor-pointer hover:underline"
              onClick={() => { router.push(`/forum/${item?.content?.category}/${getSlug(item?.content?.category)}`) }}>{getCategory(item?.content?.category)}
            </button>
          </Typography>
        </div>
      </div>
      <div className="w-full h-full flex justify-end items-center">
        {/* <span>...</span> */}
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
      </div>
    </ListItem>
  );
}