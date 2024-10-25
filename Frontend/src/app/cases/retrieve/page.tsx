'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import CaseCard from '@/components/CaseCard';

interface Case {
  caseID: number;
  caseNumber: string;
  title: string;
  description: string;
  filedDate: string;
  caseStatus: string;
  officerInChargeID: string;
  criminalID: string;
}

const CaseListPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
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
    const fetchCases = async () => {
      try {
        const response = await fetch('http://localhost:5051/api/Case');
        const data = await response.json();
        setCases(data);
      } catch (error) {
        console.error('Error fetching cases:', error);
        alert('An error occurred while fetching the cases.');
      }
    };

    fetchCases();
  }, []);

  const handleCaseClick = (caseData: Case) => {
    setSelectedCase(caseData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
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
        <h1 className="text-yellow-400 text-2xl font-bold mb-4">Cases List</h1>
        <ul className="space-y-2">
          {cases.map((caseData) => (
            <li
              key={caseData.caseID}
              onClick={() => handleCaseClick(caseData)}
              className="text-yellow-300 cursor-pointer hover:bg-yellow-500 hover:text-black p-2 rounded transition-colors duration-300"
            >
              {caseData.title}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && selectedCase && (
        <CaseCard caseData={selectedCase} onClose={closeModal} />
      )}
    </div>
  );
};

export default CaseListPage;
