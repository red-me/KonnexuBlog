'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';
import { Button, Card, Input } from './ui/MaterialUI';
import { mutatePost } from '../pages/api'
import dynamic from 'next/dynamic';
import BackIcon from '@/assets/icons/arrow-back-icon.svg';
import Link from 'next/link';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // Ensure this component is only loaded on the client side
});

export default function AddEdit({ result }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isClient, setIsClient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (result) {
      setTitle(result.title)
      setDescription(result.description)
    }
  }, [result]);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>Loading editor...</p>;
  }

  const convertToSlug = (title) => {
    return title
      .toLowerCase()
      .trim() 
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  

  const handleOnChange = async () => {
    if (!title || !description) {
      return
    }
    setIsSaving(true)
    const slug = convertToSlug(title)

    if (result) {
      const dataObj = {
        type: 'update',
        id: result.id,
        title,
        description,
        content: { slug, categories: ["Entertainment"] },
      }
      await mutatePost(dataObj)
      setIsSaving(false)
      router.push('/blog/my');
    }
    if (!result) {
      const dataObj = {
        type: 'create',
        title,
        description,
        content: { slug, categories: ["Entertainment"] },
        authorEmail: 'helen.sharpe@newamsterdam.com',
        published: true
      }
      await mutatePost(dataObj)
      setIsSaving(false)
      router.push('/blog/my');
    }
  }
  return (
    <div className="p-4 flex justify-center">
      <Card className="w-full flex-col max-w-[45rem] p-4">
          <div className="flex items-center gap-3">
            <Link href={ result ? '/blog/my' : '/blog'}>
              <BackIcon className="w-6 h-6 inline-block" />
            </Link>
            <h2 className="text-xl font-semibold">{ result ? 'Edit' : 'Add New'} Blog</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Title"
                size="lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <label htmlFor="description">Description</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className='min-h-36 w-full'
              />
            </div>
            <div className="flex items-center gap-4">
              <Button className="w-full bg-blue-500 mt-12 capitalize text-base" onClick={handleOnChange} disabled={isSaving}>
                { result ? `${isSaving ? 'Updating...' : 'Update'}` : `${isSaving ? 'Publishing...' : 'Publish'}`}
              </Button>
              <Link href={ result ? '/blog/my' : '/blog'}>
                <Button className="w-full bg-white text-blue-500 mt-12 capitalize text-base">Cancel</Button>
              </Link>
            </div>
          </div>
      </Card>
    </div>
  );
}