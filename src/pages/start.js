"use client";
import Image from "next/image";
import Logo from "../../public/assets/image/logo.png";
import { useRouter } from "next/navigation";

import card from "../pages/card";
export default function Splash() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-gray-400 to-pink-800">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4"></h1>
            <Image src={Logo} alt="my logo" className="w-20 h-20" />
          </div>

          <div>
            <button
              onClick={() => router.push("/card")}
              className="bg-black text-white font-mono text-lg font-bold w-40 m-10 rounded-full h-10"
            >
              Lets Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
