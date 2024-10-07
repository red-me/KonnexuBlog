import AddEdit from '@/components/AddEdit';
import { queryPost, queryCategories } from '../../../../pages/api';
export default function Edit({ data, categories }) {
  return (
    <><AddEdit result={data ? data[0] : null} categoriesArr={categories ? categories : []} /></>
  );
}

export async function getServerSideProps({ params }) {
  if (!params.id) { return { props: {} } }
  const query = { where: { type: 'blog', id: Number(params.id) } }
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