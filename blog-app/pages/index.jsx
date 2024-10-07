import Sidebar from '@/components/Sidebar';
import Listing from '@/components/Listing';
import { queryPost, queryCategories } from './api'

export default function Home({ data, categories }) {
  return (
    <>
      <div className="flex gap-6 p-10">
        <Sidebar categories={categories}/>
        <Listing results={ data ? data : []}/>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const query = { where: { type: 'blog', deleted: false } }
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