'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CriminalForm from '../../components/CriminalForm';
import Sidebar from '@/components/Sidebar';

interface CriminalFormData {
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

const EditSearchPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [searchTerm, setSearchTerm] = useState('');
  const [criminalData, setCriminalData] = useState<CriminalFormData | null>(null);
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

 
  const searchCriminal = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5051/api/Criminal/Search?query=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setCriminalData({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            dob: data.dob ? data.dob.split('T')[0] : "", 
            nationality: data.nationality,
            address: data.address,
            phone: data.phone,
            physicalMarks: data.physicalMarks || "",
            knownAliases: data.knownAliases || "",
            criminalStatus: data.criminalStatus,
            dateAdded: data.dateAdded ? data.dateAdded.split('T')[0] : "", 
          });
          console.log('Criminal Data:', data);
        } else {
          alert('No criminal found with the provided ID.');
          setCriminalData(null); 
        }
      } else {
        alert('Error searching for criminal.');
      }
    } catch (error) {
      console.error('Error searching for criminal:', error);
    }
    setLoading(false);
  };
  

  const handleUpdate = async (formData: CriminalFormData) => {
    try {
      const response = await fetch(`http://localhost:5051/api/Criminal/${searchTerm}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Criminal updated successfully!');
        router.push('/');
      } else {
        const errorData = await response.json();
        alert('Error updating criminal: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while updating the criminal.');
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
            placeholder="Enter Criminal ID"
            className="border border-yellow-500 rounded-md p-2 w-full bg-transparent text-white placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={searchCriminal}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>

      {loading && <div>Loading criminal data...</div>}

      {criminalData ? (
        <CriminalForm onSubmit={handleUpdate} initialData={criminalData} />
      ) : (
        <div className='text-gray-200'>No criminal data found. Please search using a valid ID.</div>
      )}
    </div>
  );
};

export default EditSearchPage;
