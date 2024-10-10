import React from 'react'
import EditBlogMenu from '../AddEdit/EditBlogMenu';

export default function Item(props) {
  const { post, action, hostReact, controls, handleEdit, handleDelete } = props
  const [sanitized, setSanitized] = hostReact.useState('');
  const {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } = controls
 
  hostReact.useEffect(() => {
    const sanitizedText = (txt) => {
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(txt, 'text/html');
      return parsedHtml.body.textContent || '';
    };

    setSanitized(sanitizedText(post?.description));
  }, [post?.description]);

  return (
    <>
      <Card className="w-full flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 shrink-0 rounded-r-none"
        >
          <div style={{backgroundImage: `url("${post?.content?.photo?.url}")` }} className="bg-contain bg-no-repeat bg-center block w-40 h-40"></div>
        </CardHeader>
        <CardBody>
          <div className="mb-4 flex gap-2 items-center">
            {
              post?.content?.categories?.map((cat, index) => (
                <a href={`/blog/category/${cat?.id}`} className="capitalize text-blue-900 text-sm font-medium" key={index}>
                  {cat?.title}
                </a>
              ))
              .reduce((prev, curr) => [prev, ' • ', curr])
            }
          </div>
          <a href={`/blog/${post?.id}/${post?.content?.slug}`} className="w-full">
            <Typography variant="h5" color="blue-gray" className="mb-2 hover:text-blue-900">
              { post?.title }
            </Typography>
          </a>
          <Typography className="mb-8 font-normal text-lg text-gray-800">
            {
              sanitized.length > 130
                ? sanitized.substring(0, 134).concat('...')
                : sanitized
            }
          </Typography>
          <Typography color="gray" className="mb-8 font-normal text-sm">
            Date Created: {(new Date(post.createdAt)).toDateString()}
          </Typography>
        </CardBody>
        { action &&
          <div className="absolute top-4 right-4 flex gap-3">
            <EditBlogMenu
              {...props}
              editAction={(e, post) => handleEdit(e, post)}
              deleteAction={(e, postId) => handleDelete(e, postId)}
              postId={post?.id}
              post={post}
            />
          </div>
        }
      </Card>
    </>
  );
}