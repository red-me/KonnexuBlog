import Sidebar from '@/components/Sidebar';
import Details from '@/components/Details';
import { queryPost } from '../../../api'

export default function Blog({ results }) {
  return (
    <>
      <div className="flex gap-6 p-10">
        <Sidebar />
        <Details result={ results && results.length ? results[0] : null} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  if (!params.id && params.slug) { return { props: {} } }
  const query = {
    where: { 
      type: 'blog',
      id: Number(params.id),
      // content: { equals: { slug: params.slug } }
    }
  }
  const results = await queryPost(query)
  // console.log(results)
  return {
    props: {
      results
    }
  }
}