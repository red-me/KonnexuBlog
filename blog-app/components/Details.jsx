import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from './ui/MaterialUI';
// import BlogPost from './BlogPost';

import dynamic from 'next/dynamic';

const BlogPost = dynamic(() => import('./BlogPost'), {
  ssr: false, // Disable server-side rendering for this component
});

 
export default function Details({ result }) {
  return (
    <Card className="mt-6 w-full">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h2" color="blue-gray" className="mb-4">
          {result?.title}
        </Typography>
        <BlogPost description={result?.description} />
      </CardBody>
    </Card>
  );
}