'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';
import { Button, Card, Input, Select, Option, Chip } from './ui/MaterialUI';
import { mutatePost } from '../pages/api'
import dynamic from 'next/dynamic';
import BackIcon from '@/assets/icons/arrow-back-icon.svg';
import Link from 'next/link';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // Ensure this component is only loaded on the client side
});

export default function AddEdit({ result, categoriesArr }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isClient, setIsClient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState([]);
  const [catlist, setCatlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (categoriesArr.length) {
      setCategoryId(categoriesArr[0].id)
      const catArr = []
      categoriesArr.map(cat => {
        catArr.push({id: cat.id, title: cat.title})
      })
      setCategories([{id: categoriesArr[0].id, title: categoriesArr[0].title}])
      setCatlist(catArr)
    }
    if (result) {
      setTitle(result?.title)
      setDescription(result?.description)
      const catArr = []
      if (result?.content?.categories?.length) {
        result?.content?.categories.map(catid => {
          const selected_category = categoriesArr.find(item => item.id === catid)
          catArr.push({id: selected_category.id, title: selected_category.title})
        })
        setCategoryId(catArr[0].id)
        setCategories(catArr)
      }
    }
  }, [result, categoriesArr]);
  
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
    if (!title || !description || !categories.length) {
      return
    }
    setIsSaving(true)
    const slug = convertToSlug(title)
    const category_ids = categories.map(item => item.id)

    if (result) {
      const dataObj = {
        type: 'update',
        id: result.id,
        title,
        description,
        content: { slug, categories: category_ids },
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
        content: { slug, categories: category_ids },
        authorEmail: 'helen.sharpe@newamsterdam.com',
        published: true
      }
      await mutatePost(dataObj)
      setIsSaving(false)
      router.push('/blog/my');
    }
  }

  const toggleCategoriesInArray = (id) => {
    const selected_category = catlist.find(item => item.id === Number(id))
    let category_array = categories
    setCategoryId(selected_category.id)
    if (category_array.some(item => item.id === selected_category.id)) {
      category_array = category_array.filter(item => item.id !== selected_category.id)
      setCategories(category_array); // Remove the object if it exists
      if(category_array.length === 0) {
        setCategoryId('')
      }
    } else {
      setCategories([...category_array, selected_category]); // Add the object if it doesn't exist
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
          <div className="grid grid-cols-1 gap-6 mt-10">
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Title"
                size="lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-12">
              <label htmlFor="description">Description</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className='min-h-36 w-full'
              />
            </div>
            <div className="relative w-full">
              {
                categories.length > 0 && 
                <>
                  <label htmlFor="categories" className="bg-transparent absolute top-0 left-0 categories w-full h-full z-10 block">
                    <span className="bg-white relative w-56 h-3/4 block top-2 left-1"></span>
                  </label>
                  <div className="bg-white relative top-1.5 left-1 z-20 min-h-8 min-w-11 inline-flex flex-wrap items-center gap-2">
                    {
                      categories.map((cat, index) => (
                        <Chip className="bg-blue-500 rounded-full" key={index} value={cat.title} onClose={() => toggleCategoriesInArray(cat.id)} />
                      ))
                    }
                  </div>
                </>
              }
              
              
              <div className={`${categories.length > 0 ? 'absolute' : ''} top-0 left-0 z-0 flex flex-wrap w-full h-full`}>
                <Select
                  id="categories"
                  name="categories"
                  label="Categories"
                  value={`${categoryId}`}
                  onChange={(val) => toggleCategoriesInArray(val)}
                >
                  {
                    catlist.map((cat, index) => (
                      <Option key={index} value={`${cat.id}`}>{cat.title}</Option>
                    ))
                  }
                </Select>
              </div>
              
            </div>
            <div className="flex items-center gap-4">
              <Button className="w-full bg-blue-500 capitalize text-base" onClick={handleOnChange} disabled={isSaving}>
                { result ? `${isSaving ? 'Updating...' : 'Update'}` : `${isSaving ? 'Publishing...' : 'Publish'}`}
              </Button>
              <Link href={ result ? '/blog/my' : '/blog'}>
                <Button className="w-full bg-white text-blue-500 capitalize text-base">Cancel</Button>
              </Link>
            </div>
          </div>
      </Card>
    </div>
  );
}