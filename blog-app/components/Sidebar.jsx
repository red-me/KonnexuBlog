import { Button, List, ListItem, Card, Typography } from './ui/MaterialUI';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <Card className="w-[14.5rem] rounded-md pt-3">
        <List className='p-0'>
          <ListItem className='hover:text-[#0059A5] hover:bg-[#DEEBF9] p-0 rounded-none'>
            <Link href='/blog' className="w-full p-4">All Blogs</Link>
          </ListItem>
          <ListItem className='hover:text-[#0059A5] hover:bg-[#DEEBF9] p-0 rounded-none'>
            <Link href='/blog/my' className="w-full p-4">My Blogs</Link>
          </ListItem>
        </List>
        <div className='p-4 w-full'>
          <Link href='/blog/add' className="w-full">
            <Button className='w-full bg-blue-500 capitalize text-base font-normal flex items-center gap-2'>
              <span className='text-2xl'>+</span> Create New Blog
            </Button>
          </Link>
        </div>
        <Typography className='p-4 text-base font-bold' color="blue-gray">Categories</Typography>
        <List className='p-0 border-t border-[#eee]'>
          <ListItem className='hover:text-[#0059A5] hover:bg-[#DEEBF9] p-4 rounded-none'>Books</ListItem>
          <ListItem className='hover:text-[#0059A5] hover:bg-[#DEEBF9] p-4 rounded-none'>Music</ListItem>
          <ListItem className='hover:text-[#0059A5] hover:bg-[#DEEBF9] p-4 rounded-none'>Video</ListItem>
        </List>
      </Card>
    </>
  );
}