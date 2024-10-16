import React from 'react'
import Item from '../Item'

export default function Listing(props) {
  const { app, query, hostReactQuery, hostReact, controls, handleEdit, handleDelete, user, path } = props
  const { Card, List, Typography } = controls
  const [catTitle, setCatTitle] = hostReact.useState('')
  const name = path[1]?.toLowerCase();

  hostReact.useEffect(() => {
    if (typeof path[1] !== 'undefined' && typeof path[2] !== 'undefined') {
      const current_cateegory = app?.settings?.categories.filter(c => c.id === parseInt(path[1]))
      setCatTitle(current_cateegory[0]?.name)
    }
  }, [])

  const fetchdata = async() => {
    try {
      let where = { type: 'forum', deleted: false }
      if (name === 'my-threads') {
        where = {
          authorId: user?.id,
          type: 'forum',
          deleted: false,
        }
      }
      if (typeof path[1] !== 'undefined' && typeof path[2] !== 'undefined') {
        where = {
          AND: [
            {
              type: 'forum',
              deleted: false,
            },
            {
              content: {
                equals: parseInt(path[1]),
                path: '$.category'
              }
            }
          ]
        }
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

      const response = await query('post', { where, include, orderBy })
      if (response.error) {
        return [{'error': response.error}];
      }
      return response;
    }
    catch (error) {
      return [{'error': error.message}];
    }
  }

  const { data: datas, status }= hostReactQuery.useQuery({
    queryFn: () => fetchdata(),
    queryKey: ['threads'],
  }) 

  if (status === 'pending') {
    return <div>...</div>
  }

  if (status === 'error') {
    return <div>We were unable to retrieve the thread</div>
  }
  return (
    <div className='w-full'>
      <div className="w-full">
        <Typography className='p-4' variant="h4" color="blue-gray">
          {name === 'my-threads' ? 'My Threads' : catTitle ? catTitle : 'All Threads'}
        </Typography>
        { datas.length > 0 &&
          <Card className="w-full flex-row rounded-none shadow-none">
            <List className="w-full">
              { datas?.map((item, index) => {
                return (
                  <div key={index}>
                    <Item
                      {...props}
                      item={item}
                      handleEdit={(e, post) => handleEdit(e, post)}
                      handleDelete={(e, postId) => handleDelete(e, postId)}
                    />
                  </div>
                )
              })}
            </List>
          </Card>
        }
        { datas.length === 0 && <Typography className='p-4' variant="h6" color="blue-gray">No results found</Typography> }
      </div>
    </div>
    
  )
}