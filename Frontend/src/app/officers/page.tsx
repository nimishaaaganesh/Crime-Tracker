'use client'
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [role,setRole]=useState<"admin" | "officer">("officer");
    const router = useRouter();
    useEffect(()=>{
        const storedRole=localStorage.getItem("role");
        if(storedRole === 'admin' || storedRole === "officer")
        {
            setRole(storedRole as "admin" | "officer");
        }
        else{
            router.push("/login");
        }
    },[]);
    if(!role){
        return <div>Loading....</div>
    }
  return (
    <div>
      <div
        className="flex h-screen w-screen"
        style={{
          backgroundImage: "url(/crimebg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Sidebar role={role} />
        <div className="ml-64 p-4 w-full flex flex-col items-center justify-center ">
          <h1
            className="text-8xl font-bold text-yellow-400 mb-36 "
            style={{ textShadow: "3px 3px 6px black" }}
          >
            Manage Officer
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <Link href="/officers/add">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md w-48">
                Add Officer
              </button>
            </Link>

            <Link href="/officers/retrieve">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md w-48">
                Retrieve Officer
              </button>
            </Link>

            <Link href="/officers/edit">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md w-48">
                Edit Officer
              </button>
            </Link>

            <Link href="/officers/delete">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md w-48">
                Delete Officer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
