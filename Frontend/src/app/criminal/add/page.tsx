'use client'
import { useRouter } from 'next/navigation';
import CriminalForm from '../../../components/CriminalForm';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

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

const AddCriminalPage = () => {
    const [role,setRole]=useState<"admin" | "officer">("officer");
    const router = useRouter();
    useEffect(()=>{
        const storedRole=localStorage.getItem("role");
        if(storedRole === 'admin' || storedRole === "officer")
        {
            setRole(storedRole as "admin" | "officer");
        }
        else{
            router.push("/login");
        }
    },[]);
    if(!role){
        return <div>Loading....</div>
    }
    const handleSubmit = async (formData: CriminalFormData) => {
        try {
            const response = await fetch('http://localhost:5051/api/Criminal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Criminal added successfully!');
                router.push('/manage-criminal');
            } else {
                const errorData = await response.json();
                alert('Error adding criminal: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while adding the criminal.');
        }
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
          backgroundImage: "url(/crimebg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}>
        <Sidebar role={role}/>
      <CriminalForm onSubmit={handleSubmit} />
  </div>
    );
};

export default AddCriminalPage;
