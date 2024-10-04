import Sidebar from '@/components/Sidebar';
import Listing from '@/components/Listing';
import { queryPost } from '../api'

export default function Home(results) {
  return (
    <>
      <div className="flex gap-6 p-10">
        <Sidebar />
        <Listing title='All Blogs' results={results?.results}/>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const query = {
    where: {
      type: 'blog',
      deleted: false,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  }
  const results = await queryPost(query)
  return {
    props: {
      results
    }
  }
}