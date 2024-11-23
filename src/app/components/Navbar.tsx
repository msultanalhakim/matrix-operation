import Link from "next/link";

const Navbar = () => (
  <nav className="bg-gray-900 p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo / Home */}
      <h1 className="text-2xl font-semibold text-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7 text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m9-9H3"
            />
          </svg>
          <span className="text-yellow-400">Matrix App</span>
        </Link>
      </h1>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {[
          { href: "/operasi", label: "Operasi" },
          { href: "/determinan", label: "Determinan" },
          { href: "/invers", label: "Invers" },
          { href: "/transpos", label: "Transpos" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-300 text-lg font-medium transition hover:text-yellow-400 hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  </nav>
);

export default Navbar;
