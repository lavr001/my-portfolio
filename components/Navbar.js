import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = "mobile-menu";

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full h-16 bg-black flex items-center px-4 z-50"
      aria-label="Main navigation"
    >
      <ul className="hidden sm:flex space-x-4 p-8 text-white">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`px-4 py-2 transition-colors duration-300 hover:bg-white hover:text-black hover:scale-105 hover:shadow-md rounded-md ${
                router.pathname === item.href
                  ? "underline underline-offset-4 decoration-2 decoration-white"
                  : ""
              }`}
              aria-current={router.pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sm:hidden ml-auto relative z-50">
        <button
          onClick={toggleMobileMenu}
          className="text-white p-4 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
        >
          <div className="space-y-2">
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id={mobileMenuId}
          className="fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center sm:hidden"
          onClick={closeMobileMenu}
        >
          <ul className="text-white text-center space-y-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => {
                    closeMobileMenu();
                  }}
                  className={`block px-6 py-3 text-2xl transition-colors duration-300 hover:bg-white hover:text-black rounded-md ${
                    router.pathname === item.href
                      ? "underline underline-offset-4 decoration-2 decoration-white"
                      : ""
                  }`}
                  aria-current={
                    router.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
