import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-16 bg-black flex items-center px-4 z-10">
      <ul className="flex space-x-4 p-8 text-white">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`px-4 py-2 transition-colors duration-300 hover:bg-white hover:text-black hover:scale-105 hover:shadow-md rounded-md ${
                router.pathname === item.href
                  ? "underline underline-offset-4 decoration-2 decoration-white"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
