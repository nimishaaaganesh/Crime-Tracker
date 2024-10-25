'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProfileCriminalCard from '@/components/ProfileCriminalCard';

const DeleteCriminalPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [id, setId] = useState('');
  const [criminal, setCriminal] = useState(null);
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

  const fetchCriminal = async () => {
    setLoading(true);
    setError(null);
    setCriminal(null);

    try {
      const response = await fetch(`http://localhost:5051/api/Criminal/${id}`);
      if (!response.ok) {
        throw new Error('Criminal not found');
      }
      const data = await response.json();
      setCriminal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5051/api/Criminal/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete criminal');
      }
      alert('Criminal deleted successfully');
      router.push('/delete-criminal'); 
    } catch (err) {
      alert(err.message); 
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCriminal();
  };

  const closeModal = () => {
    setConfirmDelete(false);
    setCriminal(null);
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
        <h1 className="text-yellow-400 text-2xl font-bold mb-4">Delete Criminal</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            placeholder="Enter Criminal ID"
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

        {criminal && (
          <ProfileCriminalCard
            criminal={criminal}
            onClose={closeModal}
            onDelete={() => setConfirmDelete(true)}
          />
        )}

        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-white">Are you sure you want to delete this criminal?</p>
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
