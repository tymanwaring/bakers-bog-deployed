import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-black/80 px-4 py-3 backdrop-blur-sm font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira_Sans','Droid_Sans','Helvetica_Neue',sans-serif]">
        <div className="max-w-7xl mx-auto relative">
          {/* Mobile Logo & Button Container */}
          <div className="flex justify-between items-center lg:hidden">
            <Link href="/#">
              <Image src="/img/Logo.png" alt="Baker's Bog Logo" width={50} height={50} className="w-[50px] h-[50px]" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop & Mobile Menu */}
          <div className={`${isOpen ? 'block' : 'hidden'} lg:block w-full`}>
            <ul className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8 py-4 lg:py-0">
              <li className="group">
                <Link 
                  href="/recipes" 
                  className={`block py-2 text-white hover:text-white transition-all duration-300 relative font-serif text-lg ${isActive('/recipes') ? 'after:w-full font-semibold' : 'font-normal'} group-hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300`}
                >
                  Recipes
                </Link>
              </li>

              {/* Desktop Logo */}
              <li className="hidden lg:block">
                <Link href="/#" className="block">
                  <Image src="/img/Logo.png" alt="Baker's Bog Logo" width={50} height={50} className="w-[50px] h-[50px]" />
                </Link>
              </li>

              <li className="group">
                <Link 
                  href="/locations" 
                  className={`block py-2 text-white hover:text-white transition-all duration-300 relative font-serif text-lg ${isActive('/locations') ? 'after:w-full font-semibold' : 'font-normal'} group-hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300`}
                >
                  Locations
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
