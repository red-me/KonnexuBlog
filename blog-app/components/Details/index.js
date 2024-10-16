import React from "react"
import '../../assets/css/common.css';
import Submenu from "../Submenu";
 
export default function Details(props) {
  const { app, controls, hostReact, path, query, theme } = props
  const { Card, CardHeader, CardBody, Typography } = controls
  const [post, setPost] = hostReact.useState({
    title: '',
    description: '',
  })
  const [catTitle, setCatTitle] = hostReact.useState('')

  hostReact.useEffect(() => {
    fetchdata()
  }, [])
  const fetchdata = async() => {
    try {
      const where = {
        AND: [
          {
            id: parseInt(path[1]),
          },
          {
            type: 'blog',
          },
          {
            content: {
              equals: path[2]?.toLowerCase(),
              path: '$.slug'
            }
          }
        ]
      }

      query('post', { where }).then(data => {
        setPost(data[0])
      })
    }
    catch (error) {
      alert(error)
    }
  }

  const getCatTitle = (id) => {
    const current_cateegory = app?.settings?.categories.filter(c => c.id === parseInt(id))
    return current_cateegory[0]?.name
  }

  return (
    <>
      <Submenu {...props}></Submenu>
      <div className="mx-auto w-full max-w-screen-xl pt-2.5">
        <div className='w-full flex gap-4 pt-5 py-10'>
          <Card className="mt-6 w-full">
            <CardHeader className="p-0 m-0 rounded-none relative w-full">
              <div style={{ backgroundImage: `url(${post?.content?.photo?.url})` }} className="relative z-10 w-full h-80 bg-no-repeat bg-contain bg-center"></div>
              <div style={{ backgroundImage: `url(${post?.content?.photo?.url})` }} className="absolute top-0 z-0 bg-[#ededed] bg-no-repeat bg-cover bg-center blur-3xl w-full h-full"></div>
            </CardHeader>
            <CardBody>
              <div className="mb-4 flex gap-2 items-center">
                {
                  post?.content?.categories?.map((id, index) => (
                    <a href={`/blog/category/${id}`} className="capitalize text-sm font-medium" style={{ color: theme.data.button_primary.style.backgroundColor }} key={index}>
                      {getCatTitle(id)}
                    </a>
                  ))
                  .reduce((prev, curr) => [prev, ' • ', curr])
                }
              </div>
              <Typography color="gray" className="mb-8 font-normal text-sm">
                {(new Date(post.createdAt)).toDateString()}
              </Typography>
              <Typography variant="h3" color="blue-gray" className="mb-4">
                {post?.title}
              </Typography>
              <div className="blog-details text-black">
                <div dangerouslySetInnerHTML={{ __html: post?.description }} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}