import { Link } from 'react-router-dom';

function HomeNavbar() {
  
  return (
    <header className="bg-[--primary-color] text-xl font-semibold flex    justify-between items-center p-4 px-7">
      <div>
        <Link to="/">
          <img src="./white-logo.svg" alt="logo" className="object-cover w-16 cursor-pointer" />
        </Link>
      </div>

      {/* Main Navigation Links */}
      <div className="   sm:flex md:hidden lg:flex ">
        <ul className="list-none  hidden sm:flex  gap-2 text-[--text-color]">
          <li><a href="#Home" className="scroll-smooth">Home</a></li>
          <li><a href="#Features" className="scroll-smooth">Features</a></li>
          <li><a href="#About" className="transition delay-1000 duration-300 scroll-smooth">About</a></li>
        </ul>
        
      </div>
        <Link to="/formation" className="text-decoration-none">
          <button className="py-1 px-3 rounded-md bg-[--button-color] text-[--text-color] text-md font-medium lg:block sm:hidden">
            Courses
          </button>
        </Link>
      </header>
  );
}

export default HomeNavbar;
