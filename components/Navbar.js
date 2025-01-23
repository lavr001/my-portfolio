import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-black shadow">
      <ul className="flex space-x-4 p-4 text-white">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`hover:text-gray-300 ${
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
