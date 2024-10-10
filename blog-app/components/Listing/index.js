import React from 'react';
import Item from '../Item';
export default function Listing(props) {
  const { controls, title, posts, page, handleEdit, handleDelete } = props
  const { Typography } = controls
  return (
    <div className='w-full'>
      <div className="w-full">
        <Typography className='p-4' variant="h4" color="blue-gray">{ title }</Typography>
        <div className='flex flex-col gap-4'>
          { posts &&
            posts.map( item => {
              return (
                <Item
                  key={item.id}
                  {...props}
                  post={item}
                  action={ page === 'my' ? true : false }
                  handleEdit={(e, post) => handleEdit(e, post)}
                  handleDelete={(e, postId) => handleDelete(e, postId)}
                />
              )
            })
          }
          { posts && posts.length == 0 && <Typography className='p-4' variant="h5" color="blue-gray">No results found</Typography> }
        </div>
      </div>
    </div>
  );
}

