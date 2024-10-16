import React from 'react'
export const convertToSlug = (title) => {
  return title
    .toLowerCase()
    .trim() 
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}