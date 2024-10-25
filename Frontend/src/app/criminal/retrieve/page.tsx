'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileCriminalCard from '@/components/ProfileCriminalCard';  

interface Criminal {
  criminalID: number;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  nationality: string;
  address: string;
  phone: string;
  physicalMarks: string;
  knownAliases: string;
  criminalStatus: string;
  dateAdded: string;
}

const CriminalListPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [criminals, setCriminals] = useState<Criminal[]>([]);
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);
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
    const fetchCriminals = async () => {
      try {
        const response = await fetch('http://localhost:5051/api/Criminal');
        const data = await response.json();
        setCriminals(data);
      } catch (error) {
        console.error('Error fetching criminals:', error);
        alert('An error occurred while fetching the criminals.');
      }
    };

    fetchCriminals();
  }, []);

  const handleCriminalClick = (criminal: Criminal) => {
    setSelectedCriminal(criminal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCriminal(null);
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
        <h1 className="text-yellow-400 text-2xl font-bold mb-4">Criminals List</h1>
        <ul className="space-y-2">
          {criminals.map((criminal) => (
            <li
              key={criminal.criminalID}
              onClick={() => handleCriminalClick(criminal)}
              className="text-yellow-300 cursor-pointer hover:bg-yellow-500 hover:text-black p-2 rounded transition-colors duration-300"
            >
              {criminal.firstName} {criminal.lastName}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && selectedCriminal && (
        <ProfileCriminalCard criminal={selectedCriminal} onClose={closeModal} />
      )}
    </div>
  );
};

export default CriminalListPage;
