import 'tailwindcss/tailwind.css'
import { Button } from '../../components/ui/MaterialUI';

const Shop = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to the Shop! hello test</h1>
      <button className='text-red-300 border border-white rounded-2xl hover:bg-blue-300 p-4'>HIello</button>
      <Button>Button</Button>
    </div>
  );
};

export default Shop;