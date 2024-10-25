'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileOfficerCard from '@/components/ProfileOfficerCard';
import ArrestCard from '@/components/ArrestCard';

interface Arrest {
    arrestId:number;
    criminalID : string;
    arrestDate: string;
    location:  string;
    charges: string;
    arrestingOfficerID: string;
    remarks: string;
}

const ArrestListPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [arrest, setArrest] = useState<Arrest[]>([]);
  const [selectedArrest, setSelectedArrest] = useState<Arrest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === 'admin' || storedRole === "officer") {
      setRole(storedRole as "admin" | "officer");
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await fetch('http://localhost:5051/api/Arrest');
        const data = await response.json();
        setArrest(data);
      } catch (error) {
        console.error('Error fetching arrests:', error);
        alert('An error occurred while fetching the arrests.');
      }
    };

    fetchOfficers();
  }, []);

  const handleOfficerClick = (arrest: Arrest) => {
    setSelectedArrest(arrest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArrest(null);
  };

  if (!role) {
    return <div>Loading....</div>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
        backgroundImage: "url(/crimebg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar role={role} />
      <div className="w-full max-w-md p-8 bg-black bg-opacity-50 ml-60 rounded-lg shadow-md">
        <h1 className="text-yellow-400 text-2xl font-bold mb-4">Arrests List</h1>
        <ul className="space-y-2">
          {arrest.map((arrest) => (
            <li
              key={arrest.arrestId}
              onClick={() => handleOfficerClick(arrest)}
              className="text-yellow-300 cursor-pointer hover:bg-yellow-500 hover:text-black p-2 rounded transition-colors duration-300"
            >
              {arrest.charges}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && selectedArrest && (
        <ArrestCard arrest={selectedArrest} onClose={closeModal} onEdit={} />
      )}
    </div>
  );
};

export default ArrestListPage;
