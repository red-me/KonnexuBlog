import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
  // Menu,
  // MenuHandler,
  // MenuList,
  // MenuItem,
  Typography
} from './ui/MaterialUI';
import { mutatePost } from '../pages/api'
import Link from 'next/link';
import DeleteIcon from '@/assets/icons/delete-icon.svg';
import EditIcon from '@/assets/icons/edit-icon.svg';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/Modal'), {
  ssr: false, // Ensure this component is only loaded on the client side
});

export default function Item({ result, action }) {
  const [sanitized, setSanitized] = useState('');
  const [open, setOpen] = React.useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    const sanitizedText = (txt) => {
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(txt, 'text/html');
      return parsedHtml.body.textContent || '';
    };

    setSanitized(sanitizedText(result?.description));
  }, [result?.description]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleDelete = async(id) => {
    setOpen(false)
    setIsSaving(true)
    const dataObj = {
      type: 'update delete',
      id,
    }
    await mutatePost(dataObj)
    setIsSaving(false)
    router.push('/blog/my');
  }
  return (
    <>
      <Card className="w-full flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 shrink-0 rounded-r-none"
        >
          <span className="bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')] bg-cover block w-40 h-40"></span>
          {/* <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
            width={100}
            height={100}
            layout="responsive"
          /> */}
        </CardHeader>
        <CardBody>
          <div className="mb-4 flex gap-2 items-center">
            {
              result?.content?.categories?.map((cat, index) => (
                <Link href={`/blog/category/${cat?.id}`} className="capitalize text-blue-900 text-sm font-medium" key={index}>
                  {cat?.title}
                </Link>
              ))
              .reduce((prev, curr) => [prev, ' • ', curr])
            }
          </div>
          <Link href={`/blog/${result?.id}/${result?.content?.slug}`} className="w-full">
            <Typography variant="h5" color="blue-gray" className="mb-2 hover:text-blue-900">
              { result?.title }
            </Typography>
          </Link>
          <Typography className="mb-8 font-normal text-lg text-gray-800">
            {
              sanitized.length > 130
                ? sanitized.substring(0, 134).concat('...')
                : sanitized
            }
          </Typography>
          <Typography color="gray" className="mb-8 font-normal text-sm">
            Date Created: {(new Date(result.createdAt)).toDateString()}
          </Typography>
        </CardBody>
        { action &&
          <div className="absolute top-4 right-4 flex gap-3">
            <IconButton variant='text' onClick={handleOpen}>
              <DeleteIcon className="w-6 h-6" />
            </IconButton>
            <Link href={`/blog/edit/${result?.id}`}>
              <IconButton variant='text'>
                <EditIcon className="w-6 h-6" />
              </IconButton>
            </Link>
          </div>
        }
        {/* <IconButton className="mr-3 mt-1 shadow-none hover:shadow-none rounded-1" size="sm" color='white'>
          <DottedMore className="w-4 h-4"/>
        </IconButton> */}
        {/* <Menu placement="bottom-start">
          <MenuHandler>
            
          </MenuHandler>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu> */}
      </Card>
      {open && (
        <Modal 
          title="Confirm"
          content="Are you sure you want to permanently delete this blog?"
          isOpen={open}
          isSaving={isSaving}
          onCancel={handleClose}
          onConfirm={() => handleDelete(result?.id)}
        />
      )}
    </>
  );
}