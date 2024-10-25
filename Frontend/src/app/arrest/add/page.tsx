'use client'
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ArrestForm from '@/components/ArrestForm';
import { useEffect, useState } from 'react';

interface ArrestFormData {
    CriminalID:string;
    ArrestDate:string;
    Location:string;
    Charges:string;
    ArrestingOfficerID:string;
    Remarks:string;
 }

const AddArrestForm = () => {
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
    

    const handleSubmit = async (formData: ArrestFormData) => {
        try {
            const response = await fetch('http://localhost:5051/api/Arrest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Arrest added successfully!');
                router.push('/manage-arrest');
            } else {
                const errorData = await response.json();
                alert('Error adding arrest: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while adding the arrest.');
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
      <ArrestForm onSubmit={handleSubmit} />
  </div>
    );
};

export default AddArrestForm;
