import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const Home = () => (
  <>
    <Navbar />
    <div className="flex flex-col items-center justify-center bg-gray-50 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-6">Matrix Operations</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/operasi" className="btn">
          Matrix Calculation
        </Link>
        <Link href="/determinan" className="btn">
          Determinant
        </Link>
        <Link href="/invers" className="btn">
          Inverse
        </Link>
        <Link href="/transpos" className="btn">
          Transpose
        </Link>
      </div>
    </div>
  </>
);

export default Home;
