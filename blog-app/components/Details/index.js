import React from "react"
import '../../assets/css/common.css';
 
export default function Details(props) {
  const { controls, hostReact, path, query } = props
  const { Card, CardHeader, CardBody, Typography } = controls
  const [post, setPost] = hostReact.useState({
    title: '',
    description: '',
  })

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
  return (
    <div className="mx-auto w-full max-w-screen-xl pt-2.5">
      <div className='w-full flex gap-4 pt-5 py-10'>
        <Card className="mt-6 w-full">
          <CardHeader color="blue-gray" className="relative min-h-56">
            <img
              src={post?.content?.photo?.url}
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h2" color="blue-gray" className="mb-4">
              {post?.title}
            </Typography>
            <div className="blog-details text-black">
              <div dangerouslySetInnerHTML={{ __html: post?.description }} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}