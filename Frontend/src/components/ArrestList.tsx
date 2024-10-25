'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ArrestCard from '@/components/ArrestCard';
import ArrestForm from '@/components/ArrestForm';

interface Arrest {
  arrestID: number;
  criminalID: string;
  arrestDate: string;
  location: string;
  charges: string;
  arrestingOfficerID: string;
  remarks: string;
}

interface ArrestFormData {
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
  const [selectedArrest, setSelectedArrest] = useState<Arrest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [arrestData, setArrestData] = useState<ArrestFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [arrestID, setArrestID] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === 'admin' || storedRole === "officer") {
      setRole(storedRole as "admin" | "officer");
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchArrests = async () => {
      try {
        const response = await fetch('http://localhost:5051/api/Arrest');
        const data = await response.json();
        setArrests(data);
      } catch (error) {
        console.error('Error fetching arrests:', error);
        alert('An error occurred while fetching the arrests.');
      }
    };

    fetchArrests();
  }, []);

  const handleArrestClick = (arrest: Arrest) => {
    setSelectedArrest(arrest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArrest(null);
  };

  const handleDelete = async (arrestID: number) => {
    console.log('Attempting to delete arrest with ID:', arrestID);
    try {
      await fetch(`http://localhost:5051/api/Arrest/${arrestID}`, {
        method: 'DELETE',
      });
      setArrests(arrests.filter(a => a.arrestID !== arrestID));
      closeModal();
      alert('Arrest deleted successfully');
    } catch (error) {
      console.error('Error deleting arrest:', error);
      alert('An error occurred while deleting the arrest.');
    }
  };

  const handleUpdate = async (formData: ArrestFormData) => {
    try {
      const response = await fetch(
        `http://localhost:5051/api/Arrest/${arrestID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Arrest updated successfully!");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert("Error updating arrest: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while updating the arrest.");
    }
  };

  const handleEdit = async (arrestID: number) => {
    console.log("inside handle edit ",arrestID);
    setArrestID(arrestID);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5051/api/Arrest/${arrestID}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setArrestData({
            criminalID: data.criminalID,
            arrestDate: data.arrestDate ? data.arrestDate.split("T")[0] : "",
            location: data.location,
            charges: data.charges,
            arrestingOfficerID: data.arrestingOfficerID,
            remarks: data.remarks,
          });
          console.log("Arrest Data:", data);
        } else {
          alert("No arrest found with the provided ID.");
          setArrestData(null);
        }
      } else {
        alert("Error loading arrest.");
      }
    } catch (error) {
      console.error("Error loading arrest:", error);
    }
    setLoading(false);
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
      <div className="w-full max-w-5xl p-8 bg-black bg-opacity-50 ml-60 rounded-lg shadow-md">
        <h1 className="text-yellow-400 text-2xl font-bold mb-4">Arrests List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {arrests.map((arrest) => (
            <div
              key={arrest.arrestID}
              onClick={() => handleArrestClick(arrest)}
              className="text-yellow-300 cursor-pointer hover:bg-yellow-500 hover:text-black p-4 rounded transition-colors duration-300 bg-gray-800"
            >
              <h2 className="text-lg font-bold">{arrest.charges}</h2>
              <p>Location: {arrest.location}</p>
              <p>Date: {new Date(arrest.arrestDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedArrest && (
        <ArrestCard
          arrest={selectedArrest}
          onClose={closeModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {arrestData && (
        <ArrestForm
          initialData={arrestData}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default ArrestListPage;
