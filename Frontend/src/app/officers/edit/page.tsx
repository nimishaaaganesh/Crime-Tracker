'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CriminalForm from '../../components/CriminalForm';
import Sidebar from '@/components/Sidebar';
import OfficerForm from '@/components/OfficerForm';

interface OfficerFormData {
    officerName:string;
    passwordHash:string;
    email:string;
    firstName:string;
    lastName:string;
    role:string;
    phone:string;
    dateJoined:string;
}

const EditSearchPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [searchTerm, setSearchTerm] = useState('');
  const [officerData, setOfficerData] = useState<OfficerFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole === 'admin' || storedRole === 'officer') {
      setRole(storedRole as 'admin' | 'officer');
    } else {
      router.push('/login');
    }
  }, [router]);

 
  const searchOfficer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5051/api/Officers/Search?query=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setOfficerData({
            firstName: data.firstName,
            lastName: data.lastName,
            dateJoined: data.dateJoined ? data.dateJoined.split('T')[0] : "", 
            email: data.email,
            role: data.role,
            phone: data.phone,
            officerName: data.officer ,
            passwordHash: data.passwordHash
          });
          console.log('Officer Data:', data);
        } else {
          alert('No Officer found with the provided ID.');
          setOfficerData(null); 
        }
      } else {
        alert('Error searching for officer.');
      }
    } catch (error) {
      console.error('Error searching for officer:', error);
    }
    setLoading(false);
  };
  

  const handleUpdate = async (formData: OfficerFormData) => {
    try {
      const response = await fetch(`http://localhost:5051/api/Officers/${searchTerm}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Officer updated successfully!');
        router.push('/');
      } else {
        const errorData = await response.json();
        alert('Error updating officer: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while updating the officer.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
        backgroundImage: "url(/crimebg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Sidebar role={role} />

      <div className="p-6 bg-black bg-opacity-50 rounded-md shadow-md w-4/5 md:w-2/5 mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Officer ID"
            className="border border-yellow-500 rounded-md p-2 w-full bg-transparent text-white placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={searchOfficer}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>

      {loading && <div>Loading officer data...</div>}

      {officerData ? (
        <OfficerForm onSubmit={handleUpdate} initialData={officerData} />
      ) : (
        <div className='text-gray-200'>No officer data found. Please search using a valid ID.</div>
      )}
    </div>
  );
};

export default EditSearchPage;
