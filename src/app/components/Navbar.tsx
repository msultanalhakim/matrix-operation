import Link from "next/link"
import { Calculator, Grid3X3, RotateCcw, FlipHorizontal, Sigma } from "lucide-react"

const Navbar = () => (
  <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo / Home */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl group-hover:scale-105 transition-transform">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Matrix Calculator
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-1">
          {[
            { href: "/operation", label: "Operation", icon: Grid3X3, color: "blue" },
            { href: "/determinant", label: "Determinant", icon: Sigma, color: "emerald" },
            { href: "/inverse", label: "Inverse", icon: FlipHorizontal, color: "violet" },
            { href: "/transpose", label: "Transpose", icon: RotateCcw, color: "amber" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
