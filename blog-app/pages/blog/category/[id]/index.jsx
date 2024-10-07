import Sidebar from '@/components/Sidebar';
import Listing from '@/components/Listing';
import { queryPost, queryCategories } from '../../../api'

export default function PostByCategory({ data, categories, title }) {
  return (
    <>
      <div className="flex gap-6 p-10">
        <Sidebar categories={categories} />
        <Listing results={ data && data.length ? data : []} title={title} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  if (!params.id) { return { props: {} } }
  const categoryId = parseInt(params.id); 
  const query = {
    where: {
      AND: [
        {
          type: 'blog',
        },
        {
          content: {
            array_contains: categoryId,
            path: '$.categories'
          }
        }
      ]
    }
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

  let title = ''
  const category_data = categories.find(item => item.id === categoryId)
  if (category_data && category_data?.title) {
    title = category_data?.title
  }

  return {
    props: {
      data,
      categories,
      title
    }
  }
}