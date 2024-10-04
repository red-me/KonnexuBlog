import AddEdit from '@/components/AddEdit';
import { queryPost } from '../../../../pages/api';
export default function Edit({ results }) {
  return (
    <><AddEdit result={results ? results[0] : null} /></>
  );
}

export async function getServerSideProps({ params }) {
  if (!params.id) { return { props: {} } }
  const query = { where: { type: 'blog', id: Number(params.id) } }
  const results = await queryPost(query)
  return {
    props: {
      results
    }
  }
}