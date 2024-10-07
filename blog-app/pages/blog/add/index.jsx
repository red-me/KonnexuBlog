import AddEdit from '@/components/AddEdit';
import { queryCategories } from '../../../pages/api';
export default function Add({ data, categories }) {
  return (
    <><AddEdit result={data} categoriesArr={categories ? categories : []} /></>
  );
}

export async function getServerSideProps() {
  const query = {
    orderBy: {
      title: 'desc',
    }
  }
  const categories = await queryCategories(query)
  return {
    props: {
      data: null,
      categories
    }
  }
}