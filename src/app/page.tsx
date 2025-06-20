import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import { Grid3X3, Sigma, FlipHorizontal, RotateCcw, ArrowRight } from "lucide-react"

const Home = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Matrix Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Powerful and intuitive matrix operations at your fingertips. Calculate determinants, inverses, transposes,
            and perform matrix arithmetic with ease.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              href: "/operation",
              title: "Operations",
              description: "Add, subtract, multiply, and divide matrices",
              icon: Grid3X3,
              gradient: "from-blue-500 to-blue-600",
              bgGradient: "from-blue-50 to-blue-100/50",
            },
            {
              href: "/determinant",
              title: "Determinant",
              description: "Calculate matrix determinants with step-by-step solutions",
              icon: Sigma,
              gradient: "from-emerald-500 to-emerald-600",
              bgGradient: "from-emerald-50 to-emerald-100/50",
            },
            {
              href: "/inverse",
              title: "Inverse",
              description: "Find matrix inverses using advanced algorithms",
              icon: FlipHorizontal,
              gradient: "from-violet-500 to-violet-600",
              bgGradient: "from-violet-50 to-violet-100/50",
            },
            {
              href: "/transpose",
              title: "Transpose",
              description: "Transform matrices by swapping rows and columns",
              icon: RotateCcw,
              gradient: "from-amber-500 to-amber-600",
              bgGradient: "from-amber-50 to-amber-100/50",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div
                className={`bg-gradient-to-br ${item.bgGradient} p-6 rounded-2xl border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 h-full`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center text-gray-700 group-hover:text-gray-900 font-medium">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Our Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Fast & Accurate",
                description: "Lightning-fast calculations with precise results",
              },
              {
                title: "User-Friendly",
                description: "Intuitive interface designed for all skill levels",
              },
              {
                title: "Step-by-Step",
                description: "Detailed solutions to help you understand the process",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Home
