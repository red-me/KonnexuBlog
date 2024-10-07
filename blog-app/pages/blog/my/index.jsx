import Sidebar from '@/components/Sidebar';
import Listing from '@/components/Listing';
import { queryPost, queryCategories } from '@/pages/api'

export default function MyPost({ data, categories }) {
  return (
    <>
      <div className="flex gap-6 p-10">
        <Sidebar categories={categories} />
        <Listing title='My Blogs' results={data}/>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const query = {
    where: {
      authorId: 1,
      type: 'blog',
      deleted: false,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  }
  const results = await queryPost(query)

  const query2 = {
    orderBy: {
      title: 'desc',
    }
  }
  const categories = await queryCategories(query2)

  const getDataByIds = (arr, ids) => {
    return arr
      .filter(item => ids.includes(item.id))
      .map(item => ({ id: item.id, title: item.title }));
  };
  

  const data = results.map(item => {
    const catarr = getDataByIds(categories, item?.content?.categories) ;
    return {
      ...item,
      content: {
        ...item.content,
        categories: catarr
      }
    }
  })
  return {
    props: {
      data,
      categories
    }
  }
}