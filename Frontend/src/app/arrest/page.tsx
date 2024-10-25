
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ArrestCard from "@/components/ArrestCard";
import { MdOutlineLibraryAdd } from "react-icons/md";

interface Arrest {
  arrestId: number;
  criminalID: string;
  arrestDate: string;
  location: string;
  charges: string;
  arrestingOfficerID: string;
  remarks: string;
}

const ArrestListPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [arrests, setArrests] = useState<Arrest[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedArrest, setSelectedArrest] = useState<Arrest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "admin" || storedRole === "officer") {
      setRole(storedRole as "admin" | "officer");
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchArrests = async () => {
      try {
        const response = await fetch("http://localhost:5051/api/Arrest");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArrests(data);
      } catch (error) {
        console.error("Error fetching arrests:", error);
        alert("An error occurred while fetching the arrests. Please try again later.");
      }
    };

    fetchArrests();
  }, []);

  const handleArrestClick = (arrest: Arrest) => {
    setSelectedArrest(arrest);
    setIsModalOpen(true);
  };

  const handleAddArrestClick = () => {
    router.push("/arrest/add");
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArrest(null);
  };

  const handleDelete = async (arrestId: number) => {
    try {
      const response = await fetch(`http://localhost:5051/api/Arrest/${arrestId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete arrest');
      }
      alert('Arrest deleted successfully');
      setArrests(arrests.filter(arrest => arrest.arrestId !== arrestId)); // Remove the deleted arrest from the list
      closeModal(); // Close modal after delete
    } catch (err) {
      alert(err.message); 
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  if (!role) {
    return <div>Loading....</div>;
  }

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        backgroundImage: "url(/crimebg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar role={role} />

      <main className="flex-grow ml-64 mt-16 mb-36 p-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 bg-black bg-opacity-50 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-yellow-400 text-2xl font-bold">Arrests</h1>

            <button
              onClick={handleAddArrestClick}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ml-auto"
            >
              <MdOutlineLibraryAdd />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {arrests.slice(0, visibleCount).map((arrest) => (
              <div
                key={arrest.arrestId}
                onClick={() => handleArrestClick(arrest)}
                className="text-yellow-300 cursor-pointer hover:bg-yellow-500 hover:text-black p-4 rounded transition-colors duration-300 bg-gray-800"
              >
                <h2 className="text-lg font-bold">{arrest.charges}</h2>
                <p>Location: {arrest.location}</p>
                <p>Date: {new Date(arrest.arrestDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {visibleCount < arrests.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleShowMore}
                className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
              >
                Show More
              </button>
            </div>
          )}

          {visibleCount > 6 && (
            <div className="text-center mt-4">
              <button
                onClick={handleShowLess}
                className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
              >
                Show Less
              </button>
            </div>
          )}
        </div>

        {isModalOpen && selectedArrest && (
          <ArrestCard arrest={selectedArrest} onClose={closeModal}  onDelete={handleDelete}/>
        )}
      </main>
    </div>
  );
};

export default ArrestListPage;
