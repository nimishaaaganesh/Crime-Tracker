"use client"
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
 
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
        <Sidebar role="admin" />
        <div className="ml-64 p-4 w-full flex flex-col items-center justify-center ">
          <h3
            className="text-4xl font-bold text-yellow-400 "
            style={{ textShadow: "3px 3px 6px black" }}
          >
            Welcome to the Admin Dashboard
          </h3>
          <p className="text-xl text-white mb-10">
            Manage your crime reports, officers, and cases efficiently. 
          </p>

         
        </div>
      </div>
    </div>
  );
};

export default page;
