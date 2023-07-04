import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="  w-full h-screen flex justify-center items-center">
      <div className="bg-gray-300 rounded-md m-10 p-10 w-80 flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-center mb-10">Home</h1>

        {/*<div className="m-5 w-fit p-5 border-2 border-black flex flex-col gap-2 ">*/}
        <p className=" text-xl text-center"> choose the service</p>
        <select className=" h-fit p-2">
          <option value="all">All</option>
          <option value="plumber">Plumber</option>
          <option value="carpenter">Carpenter</option>
          <option value="electrician">Electrician</option>
          <option value="gardener">Gardener</option>
        </select>
        <Link
          href="/viewService"
          className="px-4 py-3 bg-amber-100 rounded-md w-full text-center"
        >
          ViewService
        </Link>
        {/*</div>*/}

        <Link
          href="/provideInfo"
          className="px-4 py-3 bg-violet-400 rounded-md w-full text-center"
        >
          ProvideInfo
        </Link>
      </div>
    </div>
  );
}
