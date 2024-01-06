import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';
import {ScrollText} from 'lucide-react';

const Navbar = () => {
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
        <ScrollText />
        </Link>
        <Link className={buttonVariants()} href='/sign-in'>Sign in</Link>
      </div>
    </div>
  )
}

export default Navbar