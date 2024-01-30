import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4 px-10 shadow-xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <p className=' font-extrabold text-lg'>PFT</p>
          <p className='hidden md:flex font-light text-sm'>Personal Finance Tracker</p>
        </div>
        
        
        <div className="float-end flex space-x-4">
          <div className="text-white font-semibold text-sm">
            <Link href={'/'}>
              Dashboard
            </Link>
          </div>
          <div className="text-white font-semibold text-sm">
            <Link href={'/history'}>
              Transaction History
            </Link>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;