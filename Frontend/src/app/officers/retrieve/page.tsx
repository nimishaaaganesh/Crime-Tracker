'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileOfficerCard from '@/components/ProfileOfficerCard';

interface Officer {
    officerId:number;
    firstName:string;
    lastName:string;
    role:string;
    email:string;
    phone:string;
    dateJoined:string;
    officerName:string;
    passwordHash:string;
  }

const OfficerListPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [selectedOfficer, setselectedOfficer] = useState<Officer | null>(null);
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
        const response = await fetch('http://localhost:5051/api/Officers');
        const data = await response.json();
        setOfficers(data);
      } catch (error) {
        console.error('Error fetching officers:', error);
        alert('An error occurred while fetching the officers.');
      }
    };

    fetchOfficers();
  }, []);

  const handleOfficerClick = (officer: Officer) => {
    setselectedOfficer(officer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setselectedOfficer(null);
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
        <h1 className="text-yellow-400 text-2xl font-bold mb-4">Officers List</h1>
        <ul className="space-y-2">
          {officers.map((officer) => (
            <li
              key={officer.officerId}
              onClick={() => handleOfficerClick(officer)}
              className="text-yellow-300 cursor-pointer hover:bg-yellow-500 hover:text-black p-2 rounded transition-colors duration-300"
            >
              {officer.firstName} {officer.lastName}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && selectedOfficer && (
        <ProfileOfficerCard officer={selectedOfficer} onClose={closeModal} />
      )}
    </div>
  );
};

export default OfficerListPage;
