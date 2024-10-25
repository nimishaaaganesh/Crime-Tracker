'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import CaseCard from '@/components/CaseCard';

const DeleteCriminalPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [id, setId] = useState('');
  const [cases, setCases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === 'admin' || storedRole === "officer") {
      setRole(storedRole as "admin" | "officer");
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchCases = async () => {
    setLoading(true);
    setError(null);
    setCases(null);

    try {
      const response = await fetch(`http://localhost:5051/api/Case/${id}`);
      if (!response.ok) {
        throw new Error('Case not found');
      }
      const data = await response.json();
      setCases(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5051/api/Case/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete case');
      }
      alert('Case deleted successfully');
      router.push('/delete-case'); 
    } catch (err) {
      alert(err.message); 
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCases();
  };

  const closeModal = () => {
    setConfirmDelete(false);
    setCases(null);
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
        <h1 className="text-yellow-400 text-2xl font-bold mb-4">Delete Case</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            placeholder="Enter Case ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mb-2 p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-white p-2 rounded w-full"
          >
            Search
          </button>
        </form>

        {loading && <div className="text-white">Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}

        {cases && (
          <CaseCard
            caseData={cases}
            onClose={closeModal}
            onDelete={() => setConfirmDelete(true)}
          />
        )}

        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-white">Are you sure you want to delete this case?</p>
              <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white p-2 rounded mr-2"
              >
                Yes
              </button>
              <button 
                onClick={() => setConfirmDelete(false)} 
                className="bg-yellow-400 text-white p-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteCriminalPage;