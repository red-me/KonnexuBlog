import React from "react"
import '../../assets/css/common.css'
import Submenu from "../Submenu"
import ThreadList from "../ThreadList"
 
export default function Details(props) {
  const { app, controls, hostReactQuery, path, query, theme } = props
  const { Avatar, Card, CardBody, Typography, ListItemPrefix } = controls

  const fetchdata = async() => {
    try {
      const where = {
        AND: [
          {
            id: parseInt(path[2]),
          },
          {
            type: 'forum',
          },
          {
            content: {
              equals: path[3]?.toLowerCase(),
              path: '$.slug'
            }
          }
        ]
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

      const datas = await query('post', { where, include }).then(data => {
        return data[0]
      })

      return datas
    }
    catch (error) {
      return {error: error.message}
    }
  }

  const { data, status }= hostReactQuery.useQuery({
    queryFn: () => fetchdata(),
    queryKey: ['thread_details'],
  }) 

  const getCatTitle = (id) => {
    const current_cateegory = app?.settings?.categories.filter(c => c.id === parseInt(id))
    return current_cateegory[0]?.name
  }

  const formattedDate = (date) =>  {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  if (status === 'pending') {
    return <div>...</div>
  }

  if (status === 'error') {
    return <div>We were unable to retrieve the thread</div>
  }

  return (
    <>
      <Submenu {...props}></Submenu>
      <div className="mx-auto w-full max-w-screen-xl pt-2.5">
        <Card className="mt-6 w-full">
          <CardBody>
            <Typography variant="h3" color="blue-gray" className="mb-4">
              {data?.title}
            </Typography>
            <div className="flex items-center w-full">
              <ListItemPrefix className="flex-none">
                <Avatar variant="circular" alt="candice" src={data?.author?.profile?.avatar} />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {data?.author?.profile?.firstName}
                </Typography>
                <Typography variant="small" color="gray" className="flex items-center gap-3 font-normal">
                  {formattedDate(new Date(data?.updatedAt))}
                </Typography>
              </div>
            </div>
            { data?.content?.categories &&
              <div className="mb-4 flex gap-2 items-center">
                {
                  data?.content?.categories?.map((id, index) => (
                    <a href={`/blog/category/${id}`} className="capitalize text-sm font-medium" style={{ color: theme.data.button_primary.style.backgroundColor }} key={index}>
                      {getCatTitle(id)}
                    </a>
                  ))
                  .reduce((prev, curr) => [prev, ' • ', curr])
                }
              </div>
            }
            <div className="text-black">
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
            </div>
            { data?.content?.photos &&
              <div className="flex flex-col gap-2 pt-5">
                <Typography className="font-bold text-lg">Attachments</Typography>
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
                  {data?.content?.photos.map((file, index) => (
                    <li key={index} className='relative h-32 rounded-md shadow-sm'>
                      <a href={file} target="_blank">
                        <img
                          src={file}
                          width={100}
                          height={100}
                          className='h-full w-full object-contain rounded-md'
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }
          </CardBody>
        </Card>
      </div>
      <ThreadList {...props}></ThreadList>
    </>
  );
}