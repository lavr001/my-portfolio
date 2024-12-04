import Link from "next/link";

const Navbar = () => (
  <nav className="bg-black shadow">
    <ul className="flex space-x-4 p-4">
      <li>
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
      </li>
      <li>
        <Link href="/about" className="text-white hover:text-gray-300">
          About
        </Link>
      </li>
      <li>
        <Link href="/projects" className="text-white hover:text-gray-300">
          Projects
        </Link>
      </li>
      <li>
        <Link href="/contact" className="text-white hover:text-gray-300">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
