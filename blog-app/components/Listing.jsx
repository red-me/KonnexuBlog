import Item from '@/components/Item';
import { Typography, ThemeProvider } from './ui/MaterialUI';
// const NEXT_URL = process.env.NEXT_PUBLIC_API_URL
export default function Listing({ title, results }) {
  return (
    <ThemeProvider>
      <div className="w-full">
        <Typography className='p-4' variant="h3" color="blue-gray">{ title ? title : 'Blogs Details'}</Typography>
        <div className='flex flex-col gap-4'>
          { results &&
            results.map( result => {
              return (
                <Item key={result.id} result={result} action={ title === 'My Blogs' ? true : false }/>
              )
            })
          }
          { results && results.length == 0 && <Typography className='p-4' variant="h5" color="blue-gray">No results found</Typography> }
        </div>
      </div>
    </ThemeProvider>
  );
}

