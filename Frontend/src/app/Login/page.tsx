"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setLogin((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login.username === "officer" && login.password === "officer123") {
      localStorage.setItem("role", "officer");
      router.push("/officer");
    } else if (login.username === "admin" && login.password === "admin123") {
      localStorage.setItem("role", "admin");
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <div
      className="flex h-screen w-screen justify-center items-center p-4"
      style={{
        backgroundImage: "url(/crimebg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col">
        <h1
          className="text-xl font-bold text-yellow-400 mb-4"
          style={{ textShadow: "3px 3px 6px  black" }}
        >
          Criminal Report Management System
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black bg-opacity-75 p-6 rounded shadow-lg"
        >
          <label className="text-yellow-400">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={login.username}
            onChange={handleChange}
            placeholder="username"
            className="mt-2 mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
          <label className="text-yellow-400">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="password"
            className="mt-2 mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black w-full rounded p-2 mt-4 text-sm font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
