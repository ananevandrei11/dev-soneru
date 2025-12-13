import { Link } from "react-router";
import { useState } from "react";
import { ROUTES } from "../../shared/route-path";

export const Header = ({ isLogged }: { isLogged?: boolean }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="shrink-0 flex items-center">
            <Link to={ROUTES.HOME} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dev-Soneru
            </Link>
          </div>

          {/* Center: Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-1">
            <Link
              to={ROUTES.HOME}
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to={ROUTES.TASKS}
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Tasks
            </Link>
            <Link
              to={ROUTES.COLLECTIONS}
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Collections
            </Link>
          </nav>

          {/* Right: Mobile Menu Button and Auth Buttons - Combined for better mobile layout */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons - visible on desktop */}
            {isLogged ? (
              <Link
                to="/logout"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hidden md:block"
              >
                Log Out
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hidden md:block"
              >
                Log In
              </Link>
            )}

            {/* Mobile menu button - only visible on small screens */}
            <div className="md:hidden flex">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - positioned below the header without overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border border-gray-200 shadow-2xs p-4 absolute left-0 right-0 opacity-80">
            <div className="flex flex-col space-y-3">
              <Link
                to={ROUTES.HOME}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to={ROUTES.TASKS}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Tasks
              </Link>
              <Link
                to={ROUTES.COLLECTIONS}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Collections
              </Link>
              {isLogged ? (
                <Link
                  to="/logout"
                  className="block bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-70 text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md text-center"
                  onClick={closeMobileMenu}
                >
                  Log Out
                </Link>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  className="block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-70 text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md text-center"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};