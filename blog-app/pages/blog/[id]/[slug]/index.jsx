import Sidebar from '@/components/Sidebar';
import Details from '@/components/Details';
import { queryPost, queryCategories } from '../../../api'

export default function Blog({ data, categories }) {
  return (
    <>
      <div className="flex gap-6 p-10">
        <Sidebar categories={categories} />
        <Details result={ data && data.length ? data[0] : null} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  if (!params.id && params.slug) { return { props: {} } }
  const query = {
    where: {
      AND: [
        {
          id: Number(params.id),
        },
        {
          type: 'blog',
        },
        {
          content: {
            equals: params.slug,
            path: '$.slug'
          }
        }
      ]
    }
  }
  const data = await queryPost(query)

  const query2 = {
    orderBy: {
      title: 'desc',
    }
  }
  const categories = await queryCategories(query2)

  return {
    props: {
      data,
      categories
    }
  }
}